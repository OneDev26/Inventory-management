import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = { items: [] };

const assetsSlice = createSlice({
  name: "assets",
  initialState,
  reducers: {
    assetsLoaded(state, action) { state.items = action.payload; },
    assetAdded: {
      reducer(state, action) { state.items.unshift(action.payload); },
      prepare(asset) { return { payload: { id: asset.id ?? nanoid(), ...asset } }; },
    },
    assetUpdated(state, action) {
      const index = state.items.findIndex((asset) => asset.id === action.payload.id);
      if (index !== -1) state.items[index] = { ...state.items[index], ...action.payload.changes };
    },
    assetRemoved(state, action) { state.items = state.items.filter((asset) => asset.id !== action.payload); },
  },
});

export const { assetsLoaded, assetAdded, assetUpdated, assetRemoved } = assetsSlice.actions;
export const selectAssets = (state) => state.assets.items;
export const selectAssetById = (state, assetId) => state.assets.items.find((asset) => asset.id === assetId);
export default assetsSlice.reducer;