import { configureStore } from "@reduxjs/toolkit";
import { todoSlice } from "./todo/todo.slice";

export const store = configureStore({
  reducer: {
    [todoSlice.name]: todoSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
