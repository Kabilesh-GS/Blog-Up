import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slice/authSlice";
import blogReducer from "./Slice/blogSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    blogs: blogReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;