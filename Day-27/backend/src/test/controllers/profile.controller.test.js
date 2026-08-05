const profileController = require("../../controllers/profile.controller");

describe("profile.controller", () => {
  const json = jest.fn();
  const status = jest.fn(() => ({ json }));
  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("getProfile returns 200", async () => {
    const req = { user: { _id: "user1" } };
    const res = { json };
    jest.spyOn(require("../../services/profile.service"), "getProfile").mockResolvedValue({ id: "user1" });

    await profileController.getProfile(req, res, next);

    expect(json).toHaveBeenCalledWith({ success: true, data: { id: "user1" } });
  });

  test("updateProfile returns 200", async () => {
    const req = { user: { _id: "user1" }, body: { name: "New" } };
    const res = { json };
    jest.spyOn(require("../../services/profile.service"), "updateProfile").mockResolvedValue({ id: "user1", name: "New" });

    await profileController.updateProfile(req, res, next);

    expect(json).toHaveBeenCalledWith({ success: true, message: "Profile updated successfully", data: { id: "user1", name: "New" } });
  });
});
