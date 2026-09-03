import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  generatedReports: [],
  status: "idle",
  error: null,
};

const reportsSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {
    reportGenerated: {
      reducer(state, action) {
        state.generatedReports.unshift(action.payload);
      },
      prepare(report) {
        const now = new Date();
        return {
          payload: {
            id: nanoid(),
            generatedBy: "Inventory Admin",
            status: "Completed",
            date: now.toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }),
            time: now.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            }),
            ...report,
          },
        };
      },
    },
    reportsRequestStarted(state) {
      state.status = "loading";
      state.error = null;
    },
    reportsRequestSucceeded(state) {
      state.status = "succeeded";
    },
    reportsRequestFailed(state, action) {
      state.status = "failed";
      state.error = action.payload ?? "Unable to generate report.";
    },
  },
});

export const {
  reportGenerated,
  reportsRequestStarted,
  reportsRequestSucceeded,
  reportsRequestFailed,
} = reportsSlice.actions;
export const selectGeneratedReports = (state) => state.reports.generatedReports;
export const selectReportsStatus = (state) => state.reports.status;
export default reportsSlice.reducer;
