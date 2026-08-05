const stockController = require("../../controllers/stock.controller");

describe("stock.controller", () => {
  const json = jest.fn();
  const status = jest.fn(() => ({ json }));
  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("createStock returns 201 when successful", async () => {
    const req = { body: { company: "Test" } };
    const res = { status };
    jest.spyOn(require("../../services/stock.service"), "createStock").mockResolvedValue({ id: "1" });

    await stockController.createStock(req, res, next);

    expect(status).toHaveBeenCalledWith(201);
    expect(json).toHaveBeenCalledWith({
      success: true,
      message: "Stock created successfully",
      data: { id: "1" },
    });
  });

  test("getStocks returns 200 and result", async () => {
    const req = { query: { page: 1 } };
    const res = { status };
    jest.spyOn(require("../../services/stock.service"), "getStocks").mockResolvedValue({ stocks: [] });

    await stockController.getStocks(req, res, next);

    expect(status).toHaveBeenCalledWith(200);
    expect(json).toHaveBeenCalledWith({
      success: true,
      data: { stocks: [] },
    });
  });

  test("updateStock returns 404 when not found", async () => {
    const req = { params: { id: "1" }, body: {} };
    const res = { status };
    jest.spyOn(require("../../services/stock.service"), "updateStock").mockResolvedValue(null);

    await stockController.updateStock(req, res, next);

    expect(status).toHaveBeenCalledWith(404);
    expect(json).toHaveBeenCalledWith({
      success: false,
      message: "Stock not found",
    });
  });

  test("deleteStock returns 200 when successful", async () => {
    const req = { params: { id: "1" } };
    const res = { status };
    jest.spyOn(require("../../services/stock.service"), "deleteStock").mockResolvedValue({ id: "1" });

    await stockController.deleteStock(req, res, next);

    expect(status).toHaveBeenCalledWith(200);
    expect(json).toHaveBeenCalledWith({
      success: true,
      message: "Stock deleted successfully",
    });
  });
});
