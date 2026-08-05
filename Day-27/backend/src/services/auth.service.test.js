const mockCreate = jest.fn();
const mockFindOne = jest.fn();

jest.mock("../models/User", () => ({
  findOne: mockFindOne,
  create: mockCreate,
}));

const mockHashPassword = jest.fn();
const mockComparePassword = jest.fn();

jest.mock("../utils/password", () => ({
  hashPassword: mockHashPassword,
  comparePassword: mockComparePassword,
}));

const mockGenerateToken = jest.fn();

jest.mock("../utils/jwt", () => ({
  generateToken: mockGenerateToken,
}));

const authService = require("./auth.service");

describe("auth.service", () => {
  beforeEach(() => {
    mockFindOne.mockReset();
    mockCreate.mockReset();
    mockHashPassword.mockReset();
    mockComparePassword.mockReset();
    mockGenerateToken.mockReset();
  });

  test("register creates a new user when email is free", async () => {
    mockFindOne.mockResolvedValue(null);
    mockHashPassword.mockResolvedValue("hashed-password");
    mockCreate.mockResolvedValue({
      _id: "user-id",
      name: "Test User",
      email: "test@example.com",
    });

    const result = await authService.register({
      name: "Test User",
      email: "test@example.com",
      password: "Password123",
    });

    expect(mockFindOne).toHaveBeenCalledWith({ email: "test@example.com" });
    expect(mockHashPassword).toHaveBeenCalledWith("Password123");
    expect(result).toEqual({
      id: "user-id",
      name: "Test User",
      email: "test@example.com",
    });
  });

  test("register throws when email already exists", async () => {
    mockFindOne.mockResolvedValue({ email: "test@example.com" });

    await expect(
      authService.register({
        name: "Test User",
        email: "test@example.com",
        password: "Password123",
      })
    ).rejects.toThrow("Email already exists");
  });

  test("login throws when user does not exist", async () => {
    mockFindOne.mockResolvedValue(null);

    await expect(
      authService.login({ email: "missing@example.com", password: "Password123" })
    ).rejects.toThrow("Invalid email or password");
  });

  test("login throws when password is incorrect", async () => {
    mockFindOne.mockResolvedValue({ password: "hashed", status: "ACTIVE" });
    mockComparePassword.mockResolvedValue(false);

    await expect(
      authService.login({ email: "test@example.com", password: "wrong" })
    ).rejects.toThrow("Invalid email or password");
  });

  test("login throws when user is inactive", async () => {
    mockFindOne.mockResolvedValue({
      _id: "user-id",
      password: "hashed",
      status: "INACTIVE",
      name: "Test User",
      email: "test@example.com",
      role: "USER",
      save: jest.fn(),
    });
    mockComparePassword.mockResolvedValue(true);

    await expect(
      authService.login({ email: "test@example.com", password: "Password123" })
    ).rejects.toThrow("Your account has been deactivated");
  });

  test("login returns token and user profile on success", async () => {
    const saveMock = jest.fn();
    mockFindOne.mockResolvedValue({
      _id: "user-id",
      password: "hashed",
      status: "ACTIVE",
      name: "Test User",
      email: "test@example.com",
      role: "ADMIN",
      save: saveMock,
    });
    mockComparePassword.mockResolvedValue(true);
    mockGenerateToken.mockReturnValue("jwt-token");

    const response = await authService.login({
      email: "test@example.com",
      password: "Password123",
    });

    expect(mockComparePassword).toHaveBeenCalledWith("Password123", "hashed");
    expect(saveMock).toHaveBeenCalled();
    expect(response).toEqual({
      token: "jwt-token",
      user: {
        id: "user-id",
        name: "Test User",
        email: "test@example.com",
        role: "ADMIN",
      },
    });
  });
});
