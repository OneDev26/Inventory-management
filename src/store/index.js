import { configureStore } from "@reduxjs/toolkit";
import consumablesReducer from "./consumablesSlice";
import reportsReducer from "./reportsSlice";

export const store = configureStore({
  reducer: {
    consumables: consumablesReducer,
    reports: reportsReducer,
  },
  devTools: import.meta.env.DEV,
});

export default store;
