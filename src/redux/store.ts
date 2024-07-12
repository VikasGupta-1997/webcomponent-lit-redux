import { configureStore } from "@reduxjs/toolkit";
import message from "./messageReducer";

export const store = configureStore({
  reducer: {
    message,
  },
});
