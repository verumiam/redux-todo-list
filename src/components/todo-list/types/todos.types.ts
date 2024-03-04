export type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

export type TodoStatus = {
  id: string;
  completed: boolean;
};

export type Filter = 'all' | 'completed' | 'active';

export interface initialStateType {
  todos: Todo[];
  filter: Filter;
}
