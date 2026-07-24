import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import Login from "./Login";

import { AuthContext } from "../context/AuthContext";
import { loginUser } from "../api/authApi";

// Mock API
jest.mock("../api/authApi");

// Mock Navigation
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

// Fake Context Login()
const mockLogin = jest.fn();

// Render Helper
const renderLogin = ({ user = null, login = mockLogin } = {}) => {
  return render(
    <MemoryRouter>
      <AuthContext.Provider
        value={{
          user,
          login,
        }}
      >
        <Login />
      </AuthContext.Provider>
    </MemoryRouter>,
  );
};

// Reset every test
beforeEach(() => {
  jest.clearAllMocks();
});

// Login Component
describe("Login Component", () => {
  test("renders login page correctly", () => {
    renderLogin();

    expect(screen.getByText(/task manager login/i)).toBeInTheDocument();

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();

    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /login/i,
      }),
    ).toBeInTheDocument();
  });

  test("allows user to type email and password", async () => {
    renderLogin();

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    await userEvent.type(emailInput, "admin@gmail.com");

    await userEvent.type(passwordInput, "password123");

    expect(emailInput).toHaveValue("admin@gmail.com");

    expect(passwordInput).toHaveValue("password123");
  });

  test("calls login API with correct credentials", async () => {
    loginUser.mockResolvedValue({
      token: "abc123",
      user: {
        id: 1,
        name: "Sooriya",
      },
    });

    renderLogin();

    await userEvent.type(screen.getByLabelText(/email/i), "admin@gmail.com");

    await userEvent.type(screen.getByLabelText(/password/i), "password123");

    await userEvent.click(
      screen.getByRole("button", {
        name: /login/i,
      }),
    );

    expect(loginUser).toHaveBeenCalledTimes(1);

    expect(loginUser).toHaveBeenCalledWith("admin@gmail.com", "password123");
  });

  test("calls login context after successful login", async () => {
    const fakeUser = {
      token: "abc123",
      user: {
        id: 1,
        name: "Sooriya",
      },
    };

    loginUser.mockResolvedValue(fakeUser);

    renderLogin();

    await userEvent.type(screen.getByLabelText(/email/i), "admin@gmail.com");

    await userEvent.type(screen.getByLabelText(/password/i), "password123");

    await userEvent.click(
      screen.getByRole("button", {
        name: /login/i,
      }),
    );

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledTimes(1);
    });

    expect(mockLogin).toHaveBeenCalledWith(fakeUser);
  });

  test("navigates to dashboard after successful login", async () => {
    loginUser.mockResolvedValue({
      token: "abc123",
      user: {
        id: 1,
      },
    });

    renderLogin();

    await userEvent.type(screen.getByLabelText(/email/i), "admin@gmail.com");

    await userEvent.type(screen.getByLabelText(/password/i), "password123");

    await userEvent.click(
      screen.getByRole("button", {
        name: /login/i,
      }),
    );

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
    });
  });

  test("shows error message when login fails", async () => {
    loginUser.mockRejectedValue(new Error("Invalid Credentials"));

    renderLogin();

    await userEvent.type(screen.getByLabelText(/email/i), "wrong@gmail.com");

    await userEvent.type(screen.getByLabelText(/password/i), "wrongpassword");

    await userEvent.click(
      screen.getByRole("button", {
        name: /login/i,
      }),
    );

    expect(await screen.findByText(/invalid credentials/i)).toBeInTheDocument();
  });

  test("shows loading while logging in", async () => {
    loginUser.mockImplementation(() => new Promise(() => {}));

    renderLogin();

    await userEvent.type(screen.getByLabelText(/email/i), "admin@gmail.com");

    await userEvent.type(screen.getByLabelText(/password/i), "password123");

    const button = screen.getByRole("button", {
      name: /login/i,
    });

    await userEvent.click(button);

    await waitFor(() => {
      expect(button).toBeDisabled();
    });
  });
});
