import { configureStore, combineReducers } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";
import taskReducer from "../features/tasks/taskSlice";
import uiReducer from "../features/ui/uiSlice";

import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  persistStore,
} from "redux-persist";

const rootReducer = combineReducers({
  auth: authReducer,
  tasks: taskReducer,
  ui: uiReducer,
});

const persistConfig = {
  key: "root",
  storage,

  whitelist: ["auth"],
};

const persistedReducer = persistReducer(
  persistConfig,
  rootReducer
);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);