import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mails: [],
};

const mails = createSlice({
  name: "mails",
  initialState,
  reducers: {
    setMails: (state, action) => {
      return {
        mails: action.payload,
      };
    },
  },
});

export const { setMails } = mails.actions;
export const selectMails = (state) => state.mails.mails;
export default mails.reducer;
