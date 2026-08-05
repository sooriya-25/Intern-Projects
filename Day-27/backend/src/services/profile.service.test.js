const mockFindById = jest.fn();
const mockFindByIdAndUpdate = jest.fn();

jest.mock("../models/User", () => ({
  findById: mockFindById,
  findByIdAndUpdate: mockFindByIdAndUpdate,
}));

const profileService = require("./profile.service");

describe("profile.service", () => {
  beforeEach(() => {
    mockFindById.mockReset();
    mockFindByIdAndUpdate.mockReset();
  });

  test("getProfile returns user without password", async () => {
    const mockUser = { _id: "user1" };
    mockFindById.mockReturnValue({ select: jest.fn().mockResolvedValue(mockUser) });

    const result = await profileService.getProfile("user1");

    expect(mockFindById).toHaveBeenCalledWith("user1");
    expect(result).toBe(mockUser);
  });

  test("updateProfile updates name and profileImage", async () => {
    const mockUser = { _id: "user1" };
    mockFindByIdAndUpdate.mockReturnValue({ select: jest.fn().mockResolvedValue(mockUser) });

    const result = await profileService.updateProfile("user1", {
      name: "New Name",
      profileImage: "avatar.png",
    });

    expect(mockFindByIdAndUpdate).toHaveBeenCalledWith(
      "user1",
      {
        name: "New Name",
        profileImage: "avatar.png",
      },
      {
        new: true,
        runValidators: true,
      }
    );
    expect(result).toBe(mockUser);
  });
});
