import { configureStore } from "@reduxjs/toolkit";
import mailReducer from "../features/emailSlice";
import userReducer from "../features/userSlice";
import sendingReducer from "../features/sendingMail";
import networkReducer from "../features/networkSlice";
import emailReducer from "../features/mails";

export const store = configureStore({
  reducer: {
    mail: mailReducer,
    user: userReducer,
    sending: sendingReducer,
    network: networkReducer,
    mails: emailReducer,
  },
});
