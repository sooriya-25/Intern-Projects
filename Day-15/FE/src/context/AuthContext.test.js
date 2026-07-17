import { normalizeUserData } from "./AuthContext";

describe("normalizeUserData", () => {
  it("unwraps the backend response payload", () => {
    const normalized = normalizeUserData({
      success: true,
      data: {
        id: "1",
        name: "Jane",
        email: "jane@example.com",
      },
    });

    expect(normalized).toEqual({
      id: "1",
      name: "Jane",
      email: "jane@example.com",
    });
  });

  it("returns a plain user object as-is", () => {
    const user = {
      id: "2",
      name: "John",
      email: "john@example.com",
    };

    expect(normalizeUserData(user)).toEqual(user);
  });
});
