const Watchlist = require("../../models/Watchlist");

describe("Watchlist model", () => {
  test("exports mongoose model", () => {
    expect(Watchlist.modelName).toBe("Watchlist");
  });
});
