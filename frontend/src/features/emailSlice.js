import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mail: false,
};

const emailSlice = createSlice({
  name: "mail",
  initialState,
  reducers: {
    setSendMail: (state) => {
      state.mail = true;
    },
    defaultMail: (state) => {
      state.mail = false;
    },
  },
});

export const { setSendMail, defaultMail } = emailSlice.actions;
export const selectSendMail = (state) => state.mail.mail;
export default emailSlice.reducer;
