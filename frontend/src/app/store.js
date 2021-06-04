import { configureStore } from "@reduxjs/toolkit";
import mailReducer from "../features/emailSlice";

export const store = configureStore({
  reducer: {
    mail: mailReducer,
  },
});
