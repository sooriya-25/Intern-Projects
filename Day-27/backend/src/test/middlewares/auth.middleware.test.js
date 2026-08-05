const authenticate = require("../../middlewares/auth.middleware");

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

  test("returns 401 when Authorization header is missing", async () => {
    const req = { headers: {} };
    const json = jest.fn();
    const status = jest.fn(() => ({ json }));
    const res = { status };
    const next = jest.fn();

    await authenticate(req, res, next);

    expect(status).toHaveBeenCalledWith(401);
    expect(json).toHaveBeenCalledWith({ success: false, message: "Access token is required" });
    expect(next).not.toHaveBeenCalled();
  });

  test("returns 401 when token is invalid", async () => {
    mockVerifyToken.mockImplementation(() => { throw new Error("Invalid"); });
    const req = { headers: { authorization: "Bearer invalid" } };
    const json = jest.fn();
    const status = jest.fn(() => ({ json }));
    const res = { status };
    const next = jest.fn();

    await authenticate(req, res, next);

    expect(status).toHaveBeenCalledWith(401);
    expect(json).toHaveBeenCalledWith({ success: false, message: "Invalid or expired token" });
    expect(next).not.toHaveBeenCalled();
  });

  test("calls next when token and user are valid", async () => {
    mockVerifyToken.mockReturnValue({ id: "user1" });
    mockUserFindById.mockReturnValue({ _id: "user1", role: "USER" });
    const req = { headers: { authorization: "Bearer valid" } };
    const res = {};
    const next = jest.fn();

    await authenticate(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(req.user).toEqual({ _id: "user1", role: "USER" });
  });
});
