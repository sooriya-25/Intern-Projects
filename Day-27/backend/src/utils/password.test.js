const { hashPassword, comparePassword } = require("./password");

describe("password utilities", () => {
  test("hashPassword produces a hash and comparePassword validates it", async () => {
    const password = "SuperSecret123";
    const hashed = await hashPassword(password);

    expect(typeof hashed).toBe("string");
    expect(hashed).not.toBe(password);

    const isMatch = await comparePassword(password, hashed);
    expect(isMatch).toBe(true);
  });

  test("comparePassword returns false for invalid password", async () => {
    const password = "SuperSecret123";
    const hashed = await hashPassword(password);

    const isMatch = await comparePassword("WrongPassword", hashed);
    expect(isMatch).toBe(false);
  });
});
