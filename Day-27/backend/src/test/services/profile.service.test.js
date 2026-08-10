const mockFindById = jest.fn();
const mockFindByIdAndUpdate = jest.fn();

jest.mock("../../models/User", () => ({
  findById: mockFindById,
  findByIdAndUpdate: mockFindByIdAndUpdate,
}));

const profileService = require("../../services/profile.service");

describe("profile.service", () => {
  beforeEach(() => {
    mockFindById.mockReset();
    mockFindByIdAndUpdate.mockReset();
  });

  test("getProfile returns user without password", async () => {
    const mockUser = { _id: "user1" };
    const mockSelect = jest.fn().mockResolvedValue(mockUser);
    const mockPopulate = jest.fn().mockReturnValue({ select: mockSelect });
    mockFindById.mockReturnValue({ populate: mockPopulate });

    const result = await profileService.getProfile("user1");

    expect(mockFindById).toHaveBeenCalledWith("user1");
    expect(mockPopulate).toHaveBeenCalledWith("role");
    expect(mockSelect).toHaveBeenCalledWith("-password");
    expect(result).toBe(mockUser);
  });

  test("updateProfile updates name and profileImage", async () => {
    const mockUser = { _id: "user1" };
    const mockSelect = jest.fn().mockResolvedValue(mockUser);
    const mockPopulate = jest.fn().mockReturnValue({ select: mockSelect });
    mockFindByIdAndUpdate.mockReturnValue({ populate: mockPopulate });

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
    expect(mockPopulate).toHaveBeenCalledWith("role");
    expect(mockSelect).toHaveBeenCalledWith("-password");
    expect(result).toBe(mockUser);
  });

  test("updateProfilePhoto stores the uploaded image path without password", async () => {
    const mockUser = { _id: "user1", profileImage: "/uploads/profile/avatar.png" };
    const mockSelect = jest.fn().mockResolvedValue(mockUser);
    const mockPopulate = jest.fn().mockReturnValue({ select: mockSelect });
    mockFindByIdAndUpdate.mockReturnValue({ populate: mockPopulate });

    const result = await profileService.updateProfilePhoto("user1", "avatar.png");

    expect(mockFindByIdAndUpdate).toHaveBeenCalledWith(
      "user1",
      {
        profileImage: "/uploads/profile/avatar.png",
      },
      { new: true }
    );
    expect(mockPopulate).toHaveBeenCalledWith("role");
    expect(mockSelect).toHaveBeenCalledWith("-password");
    expect(result).toBe(mockUser);
  });
});
