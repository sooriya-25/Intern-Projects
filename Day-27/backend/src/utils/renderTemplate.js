
const render = (template, data = {}) => {
  if (!template) return template;

  return template.replace(/{{\s*([\w.]+)\s*}}/g, (match, key) => {
    return Object.prototype.hasOwnProperty.call(data, key)
      ? String(data[key])
      : match;
  });
};

module.exports = { render };
