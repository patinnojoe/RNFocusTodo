import { createSlice } from '@reduxjs/toolkit';

export const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
  },

  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    completeTodo: (state, action) => {
      state.todos = state.todos.map((todo) => (todo.id === action.payload ? { ...todo, completed: true } : todo));
    },
  },
});

export const { addTodo, removeTodo, completeTodo } = todoSlice.actions;
export default todoSlice.reducer;
