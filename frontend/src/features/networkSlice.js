import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  network: false,
};

const networkSlice = createSlice({
  name: "network",
  initialState,
  reducers: {
    setNetwork: (state) => {
      state.network = true;
    },
    setUnsetNetwork: (state) => {
      state.network = false;
    },
  },
});

export const { setNetwork, setUnsetNetwork } = networkSlice.actions;
export const selectNetwork = (state) => state.network.network;
export default networkSlice.reducer;
