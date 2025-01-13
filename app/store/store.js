import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './todoSlice';
import modalReducer from './modalSlice';

export default configureStore({
  reducer: {
    todos: todosReducer,
    modals: modalReducer,
  },
});
