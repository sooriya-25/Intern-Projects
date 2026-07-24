const { login } = require("../controllers/authController");
const { loginUser } = require("../services/authService");

jest.mock("../services/authService");

describe("Auth Controller - Login", () => {
  let req;
  let res;

  beforeEach(() => {
    jest.clearAllMocks();

    req = {
      body: {
        email: "admin@gmail.com",
        password: "123456",
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  test("should return 200 when login is successful", async () => {
    const fakeUser = {
      _id: "1",
      name: "Sooriya",
      email: "admin@gmail.com",
    };

    loginUser.mockResolvedValue(fakeUser);

    await login(req, res);

    expect(loginUser).toHaveBeenCalledTimes(1);

    expect(loginUser).toHaveBeenCalledWith(req.body);

    expect(res.status).toHaveBeenCalledWith(200);

    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "Login successful",
      data: fakeUser,
    });
  });

  test("should return 401 when user is not found", async () => {
    loginUser.mockResolvedValue(null);

    await login(req, res);

    expect(loginUser).toHaveBeenCalledWith(req.body);

    expect(res.status).toHaveBeenCalledWith(401);

    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Invalid email or password",
    });
  });

  test("should return 500 when service throws error", async () => {
    loginUser.mockRejectedValue(new Error("Database Error"));

    await login(req, res);

    expect(loginUser).toHaveBeenCalledWith(req.body);

    expect(res.status).toHaveBeenCalledWith(500);

    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Database Error",
    });
  });
});