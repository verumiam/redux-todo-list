import { initialStateType } from '../components/todo-list/types';

export const saveStateToLocalStorage = (state: initialStateType) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('todosState', serializedState);
  } catch (error) {
    console.error('Error saving state to localStorage:', error);
  }
};
