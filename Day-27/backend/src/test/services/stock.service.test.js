const mockCreate = jest.fn();
const mockFind = jest.fn();
const mockCountDocuments = jest.fn();
const mockFindByIdAndUpdate = jest.fn();
const mockFindByIdAndDelete = jest.fn();

jest.mock("../../models/Stock", () => ({
  create: mockCreate,
  find: mockFind,
  countDocuments: mockCountDocuments,
  findByIdAndUpdate: mockFindByIdAndUpdate,
  findByIdAndDelete: mockFindByIdAndDelete,
}));

const stockService = require("../../services/stock.service");

describe("stock.service", () => {
  beforeEach(() => {
    mockCreate.mockReset();
    mockFind.mockReset();
    mockCountDocuments.mockReset();
    mockFindByIdAndUpdate.mockReset();
    mockFindByIdAndDelete.mockReset();
  });

  test("getStocks returns paginated stocks and hasMore flag", async () => {
    const stockData = [{ _id: "1" }, { _id: "2" }];
    mockFind.mockReturnValue({
      sort: jest.fn().mockReturnValue({
        skip: jest.fn().mockReturnValue({
          limit: jest.fn().mockResolvedValue(stockData),
        }),
      }),
    });
    mockCountDocuments.mockResolvedValue(15);

    const result = await stockService.getStocks({
      page: "2",
      limit: "5",
      search: "apple",
      sort: "company",
      order: "desc",
    });

    expect(mockFind).toHaveBeenCalledWith({
      $text: { $search: "apple" },
    });
    expect(result).toEqual({
      stocks: stockData,
      page: 2,
      limit: 5,
      total: 15,
      hasMore: true,
    });
  });

  test("getStocks returns paginated stocks without a search query and ascending order", async () => {
    const stockData = [{ _id: "3" }];
    mockFind.mockReturnValue({
      sort: jest.fn().mockReturnValue({
        skip: jest.fn().mockReturnValue({
          limit: jest.fn().mockResolvedValue(stockData),
        }),
      }),
    });
    mockCountDocuments.mockResolvedValue(1);

    const result = await stockService.getStocks({
      page: 1,
      limit: 10,
      search: "",
      sort: "symbol",
      order: "asc",
    });

    expect(mockFind).toHaveBeenCalledWith({});
    expect(result).toEqual({
      stocks: stockData,
      page: 1,
      limit: 10,
      total: 1,
      hasMore: false,
    });
  });

  test("getStocks uses defaults when no parameters are provided", async () => {
    const stockData = [{ _id: "4" }];
    mockFind.mockReturnValue({
      sort: jest.fn().mockReturnValue({
        skip: jest.fn().mockReturnValue({
          limit: jest.fn().mockResolvedValue(stockData),
        }),
      }),
    });
    mockCountDocuments.mockResolvedValue(1);

    const result = await stockService.getStocks();

    expect(mockFind).toHaveBeenCalledWith({});
    expect(result).toEqual({
      stocks: stockData,
      page: 1,
      limit: 10,
      total: 1,
      hasMore: false,
    });
  });

  test("createStock forwards stock creation to the model", async () => {
    mockCreate.mockResolvedValue({ _id: "new-stock" });
    const stock = await stockService.createStock({ company: "Test" });

    expect(mockCreate).toHaveBeenCalledWith({ company: "Test" });
    expect(stock).toEqual({ _id: "new-stock" });
  });

  test("updateStock forwards update to the model", async () => {
    mockFindByIdAndUpdate.mockResolvedValue({ _id: "update-id" });
    const stock = await stockService.updateStock("update-id", { company: "Updated" });

    expect(mockFindByIdAndUpdate).toHaveBeenCalledWith(
      "update-id",
      { company: "Updated" },
      { new: true, runValidators: true }
    );
    expect(stock).toEqual({ _id: "update-id" });
  });

  test("deleteStock forwards delete to the model", async () => {
    mockFindByIdAndDelete.mockResolvedValue({ _id: "delete-id" });
    const stock = await stockService.deleteStock("delete-id");

    expect(mockFindByIdAndDelete).toHaveBeenCalledWith("delete-id");
    expect(stock).toEqual({ _id: "delete-id" });
  });
});
