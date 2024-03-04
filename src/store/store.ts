import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import todosReducer from '../components/todo-list/actions/todos.slice';
import { saveStateToLocalStorage } from '../lib/saveState';

const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

store.subscribe(() => {
  saveStateToLocalStorage(store.getState().todos);
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
