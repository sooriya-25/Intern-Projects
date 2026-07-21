import React, { useContext } from "react";
import {
  render,
  screen,
  fireEvent,
} from "@testing-library/react";

import {
  AuthProvider,
  AuthContext,
  normalizeUserData,
} from "./AuthContext";

const TestComponent = () => {

  const { user, login, logout } =
    useContext(AuthContext);

  return (
    <>
      <h1 data-testid="user">
        {user ? user.name : "No User"}
      </h1>

      <button
        onClick={() =>
          login({
            id: 1,
            name: "John",
          })
        }
      >
        Login
      </button>

      <button
        onClick={logout}
      >
        Logout
      </button>
    </>
  );
};

describe("normalizeUserData", () => {

    test("returns null when input is null", () => {

        expect(
            normalizeUserData(null)
        ).toBeNull();

    });

    test("returns data when API response contains success and data", () => {

    const response = {
        success: true,
        data: {
            id: 1,
            name: "John"
        }
    };

    expect(
        normalizeUserData(response)
    ).toEqual({
        id: 1,
        name: "John"
    });

});

test("returns original object when already normalized", () => {

    const user = {
        id: 1,
        name: "John"
    };

    expect(
        normalizeUserData(user)
    ).toEqual(user);

});

});

describe("AuthProvider", () => {

  test("shows No User initially", () => {

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(
      screen.getByTestId("user")
    ).toHaveTextContent("No User");

  });

  test("logs in the user", () => {

  render(
    <AuthProvider>
      <TestComponent />
    </AuthProvider>
  );

  fireEvent.click(
    screen.getByText("Login")
  );

  expect(
    screen.getByTestId("user")
  ).toHaveTextContent("John");

});

test("logs out the user", () => {

  render(
    <AuthProvider>
      <TestComponent />
    </AuthProvider>
  );

  fireEvent.click(
    screen.getByText("Login")
  );

  fireEvent.click(
    screen.getByText("Logout")
  );

  expect(
    screen.getByTestId("user")
  ).toHaveTextContent("No User");

});

});