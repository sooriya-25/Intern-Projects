const watchlistController = require("../../controllers/watchlist.controller");

describe("watchlist.controller", () => {
  const json = jest.fn();
  const status = jest.fn(() => ({ json }));
  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("addToWatchlist returns 201 on success", async () => {
    const req = { user: { _id: "user1" }, body: { stockId: "stock1" } };
    const res = { status };
    jest.spyOn(require("../../services/watchlist.service"), "addToWatchlist").mockResolvedValue({ id: "watchlist1" });

    await watchlistController.addToWatchlist(req, res, next);

    expect(status).toHaveBeenCalledWith(201);
    expect(json).toHaveBeenCalledWith({ success: true, message: "Stock added to watchlist", data: { id: "watchlist1" } });
  });

  test("getWatchlist returns 200", async () => {
    const req = { user: { _id: "user1" } };
    const res = { status };
    jest.spyOn(require("../../services/watchlist.service"), "getWatchlist").mockResolvedValue([{ id: "watchlist1" }]);

    await watchlistController.getWatchlist(req, res, next);

    expect(status).toHaveBeenCalledWith(200);
    expect(json).toHaveBeenCalledWith({ success: true, data: [{ id: "watchlist1" }] });
  });

  test("removeFromWatchlist returns 200", async () => {
    const req = { user: { _id: "user1" }, params: { stockId: "stock1" } };
    const res = { status };
    jest.spyOn(require("../../services/watchlist.service"), "removeFromWatchlist").mockResolvedValue({ id: "watchlist1" });

    await watchlistController.removeFromWatchlist(req, res, next);

    expect(status).toHaveBeenCalledWith(200);
    expect(json).toHaveBeenCalledWith({ success: true, message: "Stock removed from watchlist" });
  });
});
