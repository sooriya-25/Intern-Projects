const User = require("../../models/User");

describe("User model", () => {
  test("exports mongoose model", () => {
    expect(User.modelName).toBe("User");
  });
});
