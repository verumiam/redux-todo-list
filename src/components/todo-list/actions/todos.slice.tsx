import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialStateType, Todo, TodoStatus, Filter } from '../types';
import { produce } from 'immer';
import { loadStateFromLocalStorage } from '../../../lib/loadState';

const preloadedState = loadStateFromLocalStorage();

const initialState: initialStateType = preloadedState || {
  todos: [],
  filter: 'all',
};

const todos = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    createTodoItem: (state: initialStateType, action: PayloadAction<Todo>) => {
      return produce(state, (draftState) => {
        draftState.todos.push(action.payload);
      });
    },
    updateTodoStatus: (state, action: PayloadAction<TodoStatus>) => {
      return produce(state, (draftState) => {
        const todoItem = draftState.todos.find((item) => item.id === action.payload.id);
        if (todoItem) {
          todoItem.completed = action.payload.completed;
        }
      });
    },
    updateTodoItem: (state, action: PayloadAction<{ id: string; text: string }>) => {
      return produce(state, (draftState) => {
        const todoItem = draftState.todos.find((item) => item.id === action.payload.id);
        if (todoItem) {
          todoItem.text = action.payload.text;
        }
      });
    },
    moveTodoItem: (state, action: PayloadAction<Todo[]>) => {
      return produce(state, (draftState) => {
        draftState.todos = action.payload;
      });
    },
    deleteTodoItem: (state, action: PayloadAction<Todo['id']>) => {
      return produce(state, (draftState) => {
        draftState.todos = draftState.todos.filter((item) => item.id !== action.payload);
      });
    },
    setFilter: (state, action: PayloadAction<Filter>) => {
      return produce(state, (draftState) => {
        draftState.filter = action.payload;
      });
    },
    clearAllTodoItems: (state) => {
      return produce(state, (draftState) => {
        draftState.todos = [];
      });
    },
  },
});

export const {
  createTodoItem,
  updateTodoStatus,
  updateTodoItem,
  moveTodoItem,
  deleteTodoItem,
  clearAllTodoItems,
  setFilter,
} = todos.actions;

export default todos.reducer;
