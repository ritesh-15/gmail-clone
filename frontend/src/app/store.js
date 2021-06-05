import { configureStore } from "@reduxjs/toolkit";
import mailReducer from "../features/emailSlice";
import userReducer from "../features/userSlice";

export const store = configureStore({
  reducer: {
    mail: mailReducer,
    user: userReducer,
  },
});
