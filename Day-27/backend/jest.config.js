module.exports = {
  testEnvironment: "node",
  testMatch: ["**/?(*.)+(test).[jt]s"],
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.js",
    "!src/server.js",
    "!src/app.js",
    "!src/config/**",
    "!src/routes/**",
    "!src/validators/**",
    "!src/controllers/**",
    "!src/middlewares/**",
    "!src/models/**",
    "!src/constants/**"
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
