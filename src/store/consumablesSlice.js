import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  createdItems: [],
  status: "idle",
  error: null,
};

const consumablesSlice = createSlice({
  name: "consumables",
  initialState,
  reducers: {
    consumableAdded: {
      reducer(state, action) {
        state.createdItems.unshift(action.payload);
      },
      prepare(item) {
        return {
          payload: {
            id: nanoid(),
            status: "In Stock",
            updated: new Date().toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }),
            ...item,
          },
        };
      },
    },
    consumablesRequestStarted(state) {
      state.status = "loading";
      state.error = null;
    },
    consumablesRequestSucceeded(state) {
      state.status = "succeeded";
    },
    consumablesRequestFailed(state, action) {
      state.status = "failed";
      state.error = action.payload ?? "Unable to update consumables.";
    },
  },
});

export const {
  consumableAdded,
  consumablesRequestStarted,
  consumablesRequestSucceeded,
  consumablesRequestFailed,
} = consumablesSlice.actions;
export const selectCreatedConsumables = (state) =>
  state.consumables.createdItems;
export const selectConsumablesStatus = (state) => state.consumables.status;
export default consumablesSlice.reducer;
