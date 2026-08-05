const mockFind = jest.fn();
const mockFindByIdAndUpdate = jest.fn();

jest.mock("../models/User", () => ({
  find: mockFind,
  findByIdAndUpdate: mockFindByIdAndUpdate,
}));

const userService = require("./user.service");

describe("user.service", () => {
  beforeEach(() => {
    mockFind.mockReset();
    mockFindByIdAndUpdate.mockReset();
  });

  test("getUsers returns users without passwords", async () => {
    const mockUsers = [{ _id: "1" }, { _id: "2" }];
    mockFind.mockReturnValue({ select: jest.fn().mockResolvedValue(mockUsers) });

    const result = await userService.getUsers();

    expect(mockFind).toHaveBeenCalledWith();
    expect(result).toBe(mockUsers);
  });

  test("updateUserStatus updates status and returns user without password", async () => {
    const mockUser = { _id: "1", status: "INACTIVE" };
    mockFindByIdAndUpdate.mockReturnValue({ select: jest.fn().mockResolvedValue(mockUser) });

    const result = await userService.updateUserStatus("1", "INACTIVE");

    expect(mockFindByIdAndUpdate).toHaveBeenCalledWith(
      "1",
      { status: "INACTIVE" },
      { new: true }
    );
    expect(result).toBe(mockUser);
  });
});
