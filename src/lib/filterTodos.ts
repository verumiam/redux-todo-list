import { Todo } from '../components/todo-list/types';

export const filterTodos = (todos: Todo[], filter: string) => {
  switch (filter) {
    case 'all':
      return todos;
    case 'active':
      return todos.filter((todo) => !todo.completed);
    case 'completed':
      return todos.filter((todo) => todo.completed);
    default:
      return todos;
  }
};
