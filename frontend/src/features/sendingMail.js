import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sending: false,
  refresh: false,
  starRefresh: false,
};

const sendingMail = createSlice({
  name: "sending",
  initialState,
  reducers: {
    setSending: (state) => {
      state.sending = true;
    },
    setRefresh: (state) => {
      state.refresh = true;
    },
    setComplete: (state) => {
      state.sending = false;
    },
    setOnRefresh: (state) => {
      state.refresh = false;
    },
    setStarRefresh: (state) => {
      state.starRefresh = true;
    },
    setStarRefreshComplete: (state) => {
      state.starRefresh = false;
    },
  },
});

export const {
  setSending,
  setComplete,
  setRefresh,
  setOnRefresh,
  setStarRefresh,
  setStarRefreshComplete,
} = sendingMail.actions;
export const selectSending = (state) => state.sending.sending;
export const selectRefresh = (state) => state.sending.refresh;
export const selectStarRefresh = (state) => state.sending.starRefresh;
export default sendingMail.reducer;
