const express = require("express");
const profileRoutes = require("../../routes/profile.routes");

describe("profile.routes", () => {
  test("defines profile routes", () => {
    const paths = profileRoutes.stack.map((layer) => layer.route && layer.route.path).filter(Boolean);

    expect(paths).toContain("/");
  });
});
