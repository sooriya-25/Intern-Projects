import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import ProtectedRoute from "./ProtectedRoute";

const reducer = (state = {}) => state;

const renderWithStore = (state, ui, route = "/") => {
  const store = configureStore({
    reducer: { auth: reducer },
    preloadedState: { auth: state },
  });

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>
        {ui}
      </MemoryRouter>
    </Provider>
  );
};

describe("ProtectedRoute", () => {
  test("renders children when authenticated", () => {
    renderWithStore(
      { isAuthenticated: true, user: { role: "USER" } },
      <Routes>
        <Route path="/" element={<ProtectedRoute>Protected</ProtectedRoute>} />
      </Routes>
    );

    expect(screen.getByText("Protected")).toBeInTheDocument();
  });

  test("redirects to login when unauthenticated", () => {
    renderWithStore(
      { isAuthenticated: false, user: null },
      <Routes>
        <Route path="/" element={<ProtectedRoute>Protected</ProtectedRoute>} />
        <Route path="/login" element={<div>Login Page</div>} />
      </Routes>
    );

    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });

  test("redirects to home when role is not authorized", () => {
    renderWithStore(
      { isAuthenticated: true, user: { role: "USER" } },
      <Routes>
        <Route path="/" element={<ProtectedRoute roles={["ADMIN"]}>Protected</ProtectedRoute>} />
        <Route path="/login" element={<div>Login Page</div>} />
        <Route path="/" element={<div>Home Page</div>} />
      </Routes>
    );

    expect(screen.queryByText("Protected")).not.toBeInTheDocument();
  });
});
