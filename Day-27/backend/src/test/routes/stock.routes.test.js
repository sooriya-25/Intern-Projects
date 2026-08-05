const express = require("express");
const stockRoutes = require("../../routes/stock.routes");

describe("stock.routes", () => {
  test("defines stock CRUD routes", () => {
    const routes = stockRoutes.stack
      .map((layer) => layer.route && layer.route.path)
      .filter(Boolean);

    expect(routes).toContain("/");
    expect(routes).toContain("/:id");
  });
});
