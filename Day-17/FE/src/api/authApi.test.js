import axios from "axios";
import { loginUser, getProfile } from "./authApi";

jest.mock("axios");

describe("authApi", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("loginUser", () => {

    test("should login successfully", async () => {

      axios.post.mockResolvedValue({
        data: {
          token: "abc123",
          user: {
            id: 1,
            name: "John"
          }
        }
      });

      const result = await loginUser(
        "john@gmail.com",
        "123456"
      );

      expect(axios.post).toHaveBeenCalledTimes(1);

      expect(axios.post).toHaveBeenCalledWith(
        `${process.env.REACT_APP_API_BASE_URL}/auth/login`,
        {
          email: "john@gmail.com",
          password: "123456"
        }
      );

      expect(result).toEqual({
        token: "abc123",
        user: {
          id: 1,
          name: "John"
        }
      });

    });

    test("should throw error when login fails", async () => {

      const error = new Error("Invalid Credentials");

      axios.post.mockRejectedValue(error);

      await expect(
        loginUser(
          "john@gmail.com",
          "wrongpassword"
        )
      ).rejects.toThrow("Invalid Credentials");

    });

  });

  describe("getProfile", () => {

    test("should fetch profile successfully", async () => {

      axios.get.mockResolvedValue({
        data: {
          id: 1,
          name: "John"
        }
      });

      const result = await getProfile(1);

      expect(axios.get).toHaveBeenCalledTimes(1);

      expect(axios.get).toHaveBeenCalledWith(
        `${process.env.REACT_APP_API_BASE_URL}/auth/profile?id=1`
      );

      expect(result).toEqual({
        id: 1,
        name: "John"
      });

    });

    test("should throw error when profile request fails", async () => {

      axios.get.mockRejectedValue(
        new Error("Server Error")
      );

      await expect(
        getProfile(1)
      ).rejects.toThrow("Server Error");

    });

  });

});