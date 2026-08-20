jest.mock("../../utils/logger", () => jest.fn());

const logger = require("../../utils/logger");
const requestLogger = require("../../middlewares/requestLogger.middleware");

describe("requestLogger.middleware", () => {
  test("logs request lifecycle and exposes a request id", () => {
    const finishHandlers = [];
    const req = {
      get: jest.fn().mockReturnValue(null),
      method: "GET",
      originalUrl: "/api/health",
      ip: "127.0.0.1",
      user: { id: "user-1" },
    };
    const res = {
      statusCode: 200,
      setHeader: jest.fn(),
      on: jest.fn((event, handler) => {
        if (event === "finish") finishHandlers.push(handler);
      }),
    };
    const next = jest.fn();

    requestLogger(req, res, next);
    finishHandlers[0]();

    expect(next).toHaveBeenCalled();
    expect(req.requestId).toEqual(expect.any(String));
    expect(req.log).toEqual(expect.any(Function));
    expect(res.setHeader).toHaveBeenCalledWith(
      "x-request-id",
      req.requestId
    );
    expect(logger).toHaveBeenNthCalledWith(
      1,
      "info",
      "request.received",
      expect.objectContaining({
        requestId: req.requestId,
        method: "GET",
        path: "/api/health",
      })
    );
    expect(logger).toHaveBeenNthCalledWith(
      2,
      "info",
      "request.completed",
      expect.objectContaining({
        requestId: req.requestId,
        statusCode: 200,
        userId: "user-1",
        durationMs: expect.any(Number),
      })
    );
  });
});