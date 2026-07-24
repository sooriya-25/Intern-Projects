const User = require("../models/User");
const { loginUser } = require("../services/authService");

jest.mock("../models/User");

describe("Auth Service - loginUser", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should return user when email and password are correct", async () => {
    const fakeUser = {
      _id: "1",
      name: "Sooriya",
      email: "admin@gmail.com",
    };

    User.findOne.mockReturnValue({
      select: jest.fn().mockResolvedValue(fakeUser),
    });

    const result = await loginUser({
      email: "admin@gmail.com",
      password: "123456",
    });

    expect(User.findOne).toHaveBeenCalledWith({
      email: "admin@gmail.com",
      password: "123456",
    });

    expect(result).toEqual(fakeUser);
  });

  test("should return null when user does not exist", async () => {
    User.findOne.mockReturnValue({
      select: jest.fn().mockResolvedValue(null),
    });

    const result = await loginUser({
      email: "wrong@gmail.com",
      password: "wrong",
    });

    expect(User.findOne).toHaveBeenCalled();

    expect(result).toBeNull();
  });

  test("should throw error when database fails", async () => {
    User.findOne.mockReturnValue({
      select: jest.fn().mockRejectedValue(new Error("Mongo Error")),
    });

    await expect(
      loginUser({
        email: "admin@gmail.com",
        password: "123456",
      })
    ).rejects.toThrow("Mongo Error");
  });
});