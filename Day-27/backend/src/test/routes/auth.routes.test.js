const express = require("express");
const authRoutes = require("../../routes/auth.routes");

describe("auth.routes", () => {
  test("defines register and login routes", () => {
    const stack = authRoutes.stack.map((layer) => layer.route && layer.route.path).filter(Boolean);

    expect(stack).toContain("/register");
    expect(stack).toContain("/login");
  });
});
