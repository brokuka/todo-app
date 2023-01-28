import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type PayloadType = { id: string; value: string; checked: boolean };

type InitialStateType = {
  data: PayloadType[];
};

const initialState: InitialStateType = {
  data: [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    createTodo: (state, action: PayloadAction<PayloadType>) => {
      state.data.push(action.payload);
    },
    readTodo: (state, action) => {
      state.data = action.payload;
    },
    updateTodo: (state, action: PayloadAction<PayloadType>) => {
      state.data.forEach((todo) => {
        if (todo.id === action.payload.id) {
          todo.value = action.payload.value;
          todo.checked = action.payload.checked;
        }
      });
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.data = state.data?.filter((data) => data.id !== action.payload);
    },
  },
});

export const { createTodo, readTodo, updateTodo, deleteTodo } =
  todoSlice.actions;

export const selectTodo = (state: RootState) => state.todo;
export const selectCheckedTodo = (state: RootState, id: string) =>
  state.todo.data.find((todo) => todo.id === id)?.checked;
