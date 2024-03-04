export const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('todosState');
    if (!serializedState) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error('Error loading state from localStorage:', error);
    return undefined;
  }
};
