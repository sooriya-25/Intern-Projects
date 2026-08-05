const express = require("express");
const dashboardRoutes = require("../../routes/dashboard.routes");

describe("dashboard.routes", () => {
  test("defines dashboard route", () => {
    const paths = dashboardRoutes.stack.map((layer) => layer.route && layer.route.path).filter(Boolean);

    expect(paths).toContain("/");
  });
});
