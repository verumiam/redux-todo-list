import { FC, useState } from 'react';
import { Todo } from '../todo-list/types';
import { useAppDispatch } from '../../hooks/redux.hook';
import { createTodoItem } from '../todo-list/actions';
import { v4 as uuidv4 } from 'uuid';

const TodoInput: FC = () => {
  const dispatch = useAppDispatch();
  const [text, setText] = useState('');

  const handleCreateTodo = () => {
    if (text.trim() !== '') {
      const id = `todo-${uuidv4()}`;

      const newTodo: Todo = {
        id,
        text,
        completed: false,
      };

      dispatch(createTodoItem(newTodo));
      setText('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCreateTodo();
    }
  };

  return (
    <input
      value={text}
      className="outline-none w-full italic text-[22px] font-light p-3 bg-gray-300 text-black placeholder:text-black"
      placeholder="What's need to be done"
      type="text"
      onKeyDown={handleKeyDown}
      onChange={(e) => setText(e.target.value)}
    />
  );
};

export default TodoInput;
