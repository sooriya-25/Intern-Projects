import React from "react";
import ReactDOM from "react-dom/client";

import "antd/dist/reset.css";
import "./index.css";

import App from "./App";

import { Provider } from "react-redux";
import { store } from "./redux/store";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5000,
      gcTime: 3000,
      refetchOnWindowFocus: false,
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </Provider>
);