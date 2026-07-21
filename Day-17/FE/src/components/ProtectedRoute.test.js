import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { AuthContext } from "../context/AuthContext";

describe("ProtectedRoute", () => {

  test("renders children when user is logged in", () => {

    render(
      <MemoryRouter>
        <AuthContext.Provider
          value={{
            user: {
              id: 1,
              name: "John",
            },
          }}
        >
          <ProtectedRoute>
            <h1>Dashboard</h1>
          </ProtectedRoute>
        </AuthContext.Provider>
      </MemoryRouter>
    );

    expect(
      screen.getByText("Dashboard")
    ).toBeInTheDocument();

  });

  test("redirects to login when user is not logged in", () => {

    render(
      <MemoryRouter initialEntries={["/dashboard"]}>
        <AuthContext.Provider
          value={{
            user: null,
          }}
        >
          <ProtectedRoute>
            <h1>Dashboard</h1>
          </ProtectedRoute>
        </AuthContext.Provider>
      </MemoryRouter>
    );

    expect(
      screen.queryByText("Dashboard")
    ).not.toBeInTheDocument();

  });

});