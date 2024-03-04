import { useAppDispatch, useAppSelector } from '../../hooks/redux.hook';
import clsx from 'clsx';
import { clearAllTodoItems, setFilter } from '../todo-list/actions';
import { filterTodos } from '../../lib/filterTodos';
import { FC } from 'react';

const TodoPanel: FC = () => {
  const dispatch = useAppDispatch();
  const filter = useAppSelector((state) => state.todos.filter);
  const todos = useAppSelector((state) => state.todos.todos);

  const handleClearTodos = () => {
    dispatch(clearAllTodoItems());
  };

  return (
    <div className="p-3.5 flex justify-between">
      <span className="text-[18px]">todo tasks: {filterTodos(todos, filter).length}</span>
      <span className="flex gap-x-4">
        <button
          className={clsx('text-[18px] py-p px-4 rounded-md', {
            'border border-white': filter === 'all',
          })}
          onClick={() => dispatch(setFilter('all'))}
        >
          all
        </button>
        <button
          className={clsx('text-[18px] py-p px-4 rounded-md', {
            'border border-white': filter === 'active',
          })}
          onClick={() => dispatch(setFilter('active'))}
        >
          active
        </button>
        <button
          className={clsx('text-[18px] py-p px-4 rounded-md', {
            'border border-white': filter === 'completed',
          })}
          onClick={() => dispatch(setFilter('completed'))}
        >
          completed
        </button>
      </span>
      <button className="text-[18px]" onClick={handleClearTodos}>
        clear all
      </button>
    </div>
  );
};

export default TodoPanel;
