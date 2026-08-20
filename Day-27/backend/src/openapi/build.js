const logger = require("../utils/logger");
const fs = require("node:fs");
const path = require("node:path");
const yaml = require("js-yaml");

const MODULES_DIR = path.join(__dirname, "modules");

/**
 * Deep-merges `source` into `target` (mutates and returns `target`).
 * Objects are merged key by key; arrays and primitives from `source`
 * overwrite whatever is on `target`. Good enough for merging OpenAPI
 * fragments (paths / components.schemas) where module authors are
 * expected to use unique keys (e.g. "Auth_LoginRequest").
 */
const deepMerge = (target, source) => {
  for (const key of Object.keys(source)) {
    const sourceValue = source[key];
    const targetValue = target[key];

    const bothPlainObjects =
      sourceValue &&
      targetValue &&
      typeof sourceValue === "object" &&
      typeof targetValue === "object" &&
      !Array.isArray(sourceValue) &&
      !Array.isArray(targetValue);

    if (bothPlainObjects) {
      deepMerge(targetValue, sourceValue);
    } else {
      if (
        Object.prototype.hasOwnProperty.call(target, key) &&
        typeof sourceValue !== "object"
      ) {
        logger("warn", "openapi.duplicate_key", {
          key,
          message:
            "The key was defined in more than one module file and was overwritten.",
        });
      }
      target[key] = sourceValue;
    }
  }

  return target;
};

const loadYaml = (filePath) => yaml.load(fs.readFileSync(filePath, "utf8"));

/**
 * Reads openapi/base.yaml plus every openapi/modules/*.yaml file and
 * merges them into a single OpenAPI document: base info/servers/security
 * schemes + each module's own `paths` and `components.schemas`.
 *
 * Used both by express-openapi-validator (request validation) and by
 * swagger-ui-express (interactive docs at /api-docs), so the two can
 * never drift apart.
 */
const buildOpenApiSpec = () => {
  const spec = loadYaml(path.join(__dirname, "base.yaml"));

  const moduleFiles = fs
    .readdirSync(MODULES_DIR)
    .filter((file) => file.endsWith(".yaml") || file.endsWith(".yml"))
    .sort();

  for (const file of moduleFiles) {
    const fragment = loadYaml(path.join(MODULES_DIR, file)) || {};

    if (fragment.paths) {
      deepMerge(spec.paths, fragment.paths);
    }

    if (fragment.components) {
      deepMerge(spec.components, fragment.components);
    }
  }

  return spec;
};

module.exports = buildOpenApiSpec;
