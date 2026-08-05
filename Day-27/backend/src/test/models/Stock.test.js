const Stock = require("../../models/Stock");

describe("Stock model", () => {
  test("exports mongoose model", () => {
    expect(Stock.modelName).toBe("Stock");
  });
});
