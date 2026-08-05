const validate = require("../../middlewares/validate.middleware");
const { validationResult } = require("express-validator");

jest.mock("express-validator", () => ({
  validationResult: jest.fn(),
}));

describe("validate.middleware", () => {
  test("returns 400 when validation errors exist", () => {
    validationResult.mockReturnValue({ isEmpty: () => false, array: () => [{ msg: "Error" }] });
    const json = jest.fn();
    const status = jest.fn(() => ({ json }));
    const req = {};
    const res = { status };
    const next = jest.fn();

    validate(req, res, next);

    expect(status).toHaveBeenCalledWith(400);
    expect(json).toHaveBeenCalledWith({ success: false, message: "Error" });
    expect(next).not.toHaveBeenCalled();
  });

  test("calls next when there are no validation errors", () => {
    validationResult.mockReturnValue({ isEmpty: () => true });
    const req = {};
    const res = {};
    const next = jest.fn();

    validate(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});
