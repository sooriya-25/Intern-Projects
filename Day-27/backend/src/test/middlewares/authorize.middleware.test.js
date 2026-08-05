const authorize = require("../../middlewares/authorize.middleware");

describe("authorize.middleware", () => {
  test("returns 403 when role is not allowed", () => {
    const req = { user: { role: "USER" } };
    const json = jest.fn();
    const status = jest.fn(() => ({ json }));
    const res = { status };
    const next = jest.fn();

    const middleware = authorize("ADMIN");
    middleware(req, res, next);

    expect(status).toHaveBeenCalledWith(403);
    expect(json).toHaveBeenCalledWith({ success: false, message: "Access denied" });
    expect(next).not.toHaveBeenCalled();
  });

  test("calls next when role is allowed", () => {
    const req = { user: { role: "ADMIN" } };
    const res = {};
    const next = jest.fn();

    const middleware = authorize("ADMIN");
    middleware(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});
