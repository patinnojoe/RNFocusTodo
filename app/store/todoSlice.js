import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice } from '@reduxjs/toolkit';

export const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
  },

  reducers: {
    addTodo: (state, action) => {
      // add todo tolocal storage

      state.todos.push(action.payload);
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    toggleTodo: (state, action) => {
      const todo = state.todos.find((t) => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },

    setTodos: (state, action) => {
      state.todos = action.payload; // Load todos from storage
    },
  },
});
export const selectTotalTodos = (state) => state.todos.todos.length;
export const selectCompletedTodos = (state) => state.todos.todos.filter((todo) => todo.completed).length;
export const selectUncompletedTodos = (state) => state.todos.todos.filter((todo) => !todo.completed).length;
export const { addTodo, removeTodo, toggleTodo, setTodos } = todoSlice.actions;
export default todoSlice.reducer;
