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
    toggleTodo: (state, action) => {
      // Renamed from completeTodo to toggleTodo
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo,
      );
    },
  },
});
export const selectTotalTodos = (state) => state.todos.todos.length;
export const selectCompletedTodos = (state) => state.todos.todos.filter((todo) => todo.completed).length;
export const selectUncompletedTodos = (state) => state.todos.todos.filter((todo) => !todo.completed).length;
export const { addTodo, removeTodo, toggleTodo } = todoSlice.actions;
export default todoSlice.reducer;
