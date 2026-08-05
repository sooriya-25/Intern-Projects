const express = require("express");
const watchlistRoutes = require("../../routes/watchlist.routes");

describe("watchlist.routes", () => {
  test("defines watchlist routes", () => {
    const paths = watchlistRoutes.stack.map((layer) => layer.route && layer.route.path).filter(Boolean);

    expect(paths).toContain("/");
    expect(paths).toContain("/:stockId");
  });
});
