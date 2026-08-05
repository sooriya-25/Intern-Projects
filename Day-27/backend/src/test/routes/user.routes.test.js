const express = require("express");
const userRoutes = require("../../routes/user.routes");

describe("user.routes", () => {
  test("defines user routes", () => {
    const paths = userRoutes.stack.map((layer) => layer.route && layer.route.path).filter(Boolean);

    expect(paths).toContain("/");
    expect(paths).toContain("/:id/status");
  });
});
