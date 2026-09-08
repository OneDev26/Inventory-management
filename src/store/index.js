import { configureStore } from "@reduxjs/toolkit";
import consumablesReducer from "./consumablesSlice";
import reportsReducer from "./reportsSlice";
import assetsReducer from "./assetsSlice";
import assignmentsReducer from "./assignmentsSlice";
import notificationsReducer from "./notificationsSlice";

export const store = configureStore({
  reducer: {
    consumables: consumablesReducer,
    reports: reportsReducer,
    assets: assetsReducer,
    assignments: assignmentsReducer,
    notifications: notificationsReducer,
  },
  devTools: import.meta.env.DEV,
});

export default store;
