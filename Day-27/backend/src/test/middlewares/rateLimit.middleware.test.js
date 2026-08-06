jest.mock("express-rate-limit", () =>
  jest.fn((options) => (req, res, next) => {
    res.setHeader("x-rate-limit", options.max);
    next();
  }),
  { virtual: true }
);

const createRateLimiter = require("../../middlewares/rateLimit.middleware");

describe("rateLimit.middleware", () => {
  test("creates a limiter with the expected default options", () => {
    const limiter = createRateLimiter();
    const req = {};
    const res = { setHeader: jest.fn() };
    const next = jest.fn();

    limiter(req, res, next);

    expect(res.setHeader).toHaveBeenCalledWith("x-rate-limit", 100);
    expect(next).toHaveBeenCalled();
  });
});
