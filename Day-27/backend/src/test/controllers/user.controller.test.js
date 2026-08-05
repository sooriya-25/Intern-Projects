const userController = require("../../controllers/user.controller");

describe("user.controller", () => {
  const json = jest.fn();
  const status = jest.fn(() => ({ json }));
  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("getUsers returns users successful", async () => {
    const req = {};
    const res = { status };
    jest.spyOn(require("../../services/user.service"), "getUsers").mockResolvedValue([{ id: "1" }]);

    await userController.getUsers(req, res, next);

    expect(status).toHaveBeenCalledWith(200);
    expect(json).toHaveBeenCalledWith({ success: true, data: [{ id: "1" }] });
  });

  test("updateUserStatus returns 404 when user not found", async () => {
    const req = { params: { id: "1" }, body: { status: "INACTIVE" } };
    const res = { status };
    jest.spyOn(require("../../services/user.service"), "updateUserStatus").mockResolvedValue(null);

    await userController.updateUserStatus(req, res, next);

    expect(status).toHaveBeenCalledWith(404);
    expect(json).toHaveBeenCalledWith({ success: false, message: "User not found" });
  });
});
