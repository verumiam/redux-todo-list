import SortableList from 'react-easy-sort';
import { arrayMoveImmutable } from 'array-move';
import { moveTodoItem } from './actions';
import { Todo } from './types';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hook';
import { FC } from 'react';
import TodoInput from '../todo-input';
import TodoListItem from './todo-list-item';
import TodoPanel from '../todo-panel';
import { filterTodos } from '../../lib/filterTodos';

const TodoList: FC = () => {
  const filter = useAppSelector((state) => state.todos.filter);
  const todos: Todo[] = useAppSelector((state) => state.todos.todos);
  const dispatch = useAppDispatch();

  const handleSortEnd = (oldIndex: number, newIndex: number) => {
    dispatch(moveTodoItem(arrayMoveImmutable(todos, oldIndex, newIndex)));
  };

  return (
    <div>
      <h1 className="uppercase text-[72px] font-thin leading-normal">todos</h1>
      <div className="border-white w-[600px] mx-auto mt-4 min-h-auto border">
        <TodoInput />
        <SortableList as="ul" className="list-none" onSortEnd={handleSortEnd}>
          {filterTodos(todos, filter).map((item) => (
            <TodoListItem key={item.id} {...item} />
          ))}
        </SortableList>
        <TodoPanel />
      </div>
    </div>
  );
};

export default TodoList;
