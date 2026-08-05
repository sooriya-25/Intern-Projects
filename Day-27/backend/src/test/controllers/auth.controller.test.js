const authController = require("../../controllers/auth.controller");

describe("auth.controller", () => {
  test("register returns 201 on success", async () => {
    const req = { body: { name: "Test", email: "test@example.com", password: "password" } };
    const json = jest.fn();
    const status = jest.fn(() => ({ json }));
    const res = { status };
    const next = jest.fn();

    jest.spyOn(require("../../services/auth.service"), "register").mockResolvedValue({ id: "1", name: "Test", email: "test@example.com" });

    await authController.register(req, res, next);

    expect(status).toHaveBeenCalledWith(201);
    expect(json).toHaveBeenCalledWith({
      success: true,
      message: "User registered successfully",
      data: { id: "1", name: "Test", email: "test@example.com" },
    });
    expect(next).not.toHaveBeenCalled();
  });

  test("login returns 200 on success", async () => {
    const req = { body: { email: "test@example.com", password: "password" } };
    const json = jest.fn();
    const status = jest.fn(() => ({ json }));
    const res = { status };
    const next = jest.fn();

    jest.spyOn(require("../../services/auth.service"), "login").mockResolvedValue({ token: "abc", user: { id: "1", name: "Test", email: "test@example.com" } });

    await authController.login(req, res, next);

    expect(status).toHaveBeenCalledWith(200);
    expect(json).toHaveBeenCalledWith({
      success: true,
      message: "Login successful",
      data: { token: "abc", user: { id: "1", name: "Test", email: "test@example.com" } },
    });
    expect(next).not.toHaveBeenCalled();
  });
});
