const authenticate = require("../../middlewares/auth.middleware");
const AppError = require("../../utils/appError");

const mockVerifyToken = jest.fn();
const mockUserFindById = jest.fn();

jest.mock("../../utils/jwt", () => ({
  verifyToken: (token) => mockVerifyToken(token),
}));

jest.mock("../../models/User", () => ({
  findById: () => ({ select: () => mockUserFindById() }),
}));

describe("auth.middleware", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("passes a 401 AppError when Authorization header is missing", async () => {
    const req = { headers: {} };
    const res = {};
    const next = jest.fn();

    await authenticate(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(AppError));
    expect(next.mock.calls[0][0].statusCode).toBe(401);
    expect(next.mock.calls[0][0].message).toBe("Access token is required");
  });

  test("passes a 401 AppError when token is invalid", async () => {
    mockVerifyToken.mockImplementation(() => { throw new Error("Invalid"); });
    const req = { headers: { authorization: "Bearer invalid" } };
    const res = {};
    const next = jest.fn();

    await authenticate(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(AppError));
    expect(next.mock.calls[0][0].statusCode).toBe(401);
    expect(next.mock.calls[0][0].message).toBe("Invalid or expired token");
  });

  test("calls next without error when token and user are valid", async () => {
    mockVerifyToken.mockReturnValue({ id: "user1" });
    mockUserFindById.mockReturnValue({ _id: "user1", role: "USER" });
    const req = { headers: { authorization: "Bearer valid" } };
    const res = {};
    const next = jest.fn();

    await authenticate(req, res, next);

    expect(next).toHaveBeenCalledWith();
    expect(req.user).toEqual({ _id: "user1", role: "USER" });
  });
});
