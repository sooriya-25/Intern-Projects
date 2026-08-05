module.exports = {
  testEnvironment: "node",
  testMatch: ["**/src/test/**/*.test.js", "**/?(*.)+(test).[jt]s"],
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.js",
    "!src/server.js",
    "!src/app.js",
    "!src/config/**",
    "!src/test/**"
  ],
  coverageDirectory: "coverage",
  coverageThreshold: {
    global: {
      branches: 85,
      functions: 85,
      lines: 85,
      statements: 85,
    },
  },
};
