describe("JWT utils", () => {
  let jwtUtils;

  beforeAll(() => {
    process.env.JWT_SECRET = "test-secret";
    process.env.JWT_EXPIRES_IN = "1h";
    jest.resetModules();
    jwtUtils = require("../../utils/jwt");
  });

  test("generateToken returns a signed token", () => {
    const token = jwtUtils.generateToken({ id: "123" });

    expect(typeof token).toBe("string");
    expect(token.split(".")).toHaveLength(3);
  });

  test("verifyToken decodes previously generated token", () => {
    const payload = { id: "123", role: "ADMIN" };
    const token = jwtUtils.generateToken(payload);

    const decoded = jwtUtils.verifyToken(token);

    expect(decoded.id).toBe(payload.id);
    expect(decoded.role).toBe(payload.role);
  });
});
