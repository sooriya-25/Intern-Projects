const mockFindOne = jest.fn();
const mockCreate = jest.fn();
const mockFind = jest.fn();
const mockFindOneAndDelete = jest.fn();

jest.mock("../models/Watchlist", () => ({
  findOne: mockFindOne,
  create: mockCreate,
  find: mockFind,
  findOneAndDelete: mockFindOneAndDelete,
}));

const watchlistService = require("./watchlist.service");

describe("watchlist.service", () => {
  beforeEach(() => {
    mockFindOne.mockReset();
    mockCreate.mockReset();
    mockFind.mockReset();
    mockFindOneAndDelete.mockReset();
  });

  test("addToWatchlist creates an entry when none exists", async () => {
    mockFindOne.mockResolvedValue(null);
    mockCreate.mockResolvedValue({ _id: "watchlist-id" });

    const result = await watchlistService.addToWatchlist("user1", "stock1");

    expect(mockFindOne).toHaveBeenCalledWith({ user: "user1", stock: "stock1" });
    expect(mockCreate).toHaveBeenCalledWith({ user: "user1", stock: "stock1" });
    expect(result).toEqual({ _id: "watchlist-id" });
  });

  test("addToWatchlist throws if stock already exists", async () => {
    mockFindOne.mockResolvedValue({ _id: "exists" });

    await expect(watchlistService.addToWatchlist("user1", "stock1")).rejects.toThrow(
      "Stock already exists in watchlist"
    );
  });

  test("getWatchlist returns populated watchlist data", async () => {
    const mockData = [{ _id: "1" }];
    mockFind.mockReturnValue({ populate: jest.fn().mockResolvedValue(mockData) });

    const result = await watchlistService.getWatchlist("user1");

    expect(mockFind).toHaveBeenCalledWith({ user: "user1" });
    expect(result).toBe(mockData);
  });

  test("removeFromWatchlist deletes the matching entry", async () => {
    mockFindOneAndDelete.mockResolvedValue({ _id: "deleted" });

    const result = await watchlistService.removeFromWatchlist("user1", "stock1");

    expect(mockFindOneAndDelete).toHaveBeenCalledWith({ user: "user1", stock: "stock1" });
    expect(result).toEqual({ _id: "deleted" });
  });
});
