const mockCountDocuments = jest.fn();
const mockAggregate = jest.fn();
const mockFind = jest.fn();

jest.mock("../models/Stock", () => ({
  countDocuments: mockCountDocuments,
  aggregate: mockAggregate,
  find: mockFind,
}));

const mockUserCountDocuments = jest.fn();
const mockWatchlistCountDocuments = jest.fn();

jest.mock("../models/User", () => ({
  countDocuments: mockUserCountDocuments,
}));

jest.mock("../models/Watchlist", () => ({
  countDocuments: mockWatchlistCountDocuments,
}));

const dashboardService = require("./dashboard.service");

describe("dashboard.service", () => {
  beforeEach(() => {
    mockCountDocuments.mockReset();
    mockAggregate.mockReset();
    mockFind.mockReset();
    mockUserCountDocuments.mockReset();
    mockWatchlistCountDocuments.mockReset();
  });

  test("getDashboard returns aggregated dashboard data", async () => {
    mockCountDocuments.mockResolvedValueOnce(20);
    mockUserCountDocuments.mockResolvedValueOnce(5);
    mockWatchlistCountDocuments.mockResolvedValueOnce(12);

    mockAggregate
      .mockResolvedValueOnce([{ total: 12345 }])
      .mockResolvedValueOnce([
        { sector: "Tech", count: 3 },
        { sector: "Finance", count: 2 },
      ]);

    const topSort = jest.fn().mockReturnValue({ limit: jest.fn().mockResolvedValue([{ company: "A" }]) });
    const recentSort = jest.fn().mockReturnValue({ limit: jest.fn().mockResolvedValue([{ company: "B" }]) });
    mockFind.mockImplementationOnce(() => ({ sort: topSort })).mockImplementationOnce(() => ({ sort: recentSort }));

    const result = await dashboardService.getDashboard();

    expect(mockCountDocuments).toHaveBeenCalled();
    expect(mockUserCountDocuments).toHaveBeenCalled();
    expect(mockWatchlistCountDocuments).toHaveBeenCalled();
    expect(mockAggregate).toHaveBeenCalledTimes(2);
    expect(result).toEqual({
      stats: {
        totalStocks: 20,
        totalUsers: 5,
        totalWatchlist: 12,
        marketCap: 12345,
      },
      sectors: [
        { sector: "Tech", count: 3 },
        { sector: "Finance", count: 2 },
      ],
      topStocks: [{ company: "A" }],
      recentStocks: [{ company: "B" }],
    });
  });
});
