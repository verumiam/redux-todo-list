import { SortableItem } from 'react-easy-sort';
import { Todo } from './types';
import { FC, useState } from 'react';
import { useAppDispatch } from '../../hooks/redux.hook';
import { deleteTodoItem, updateTodoItem, updateTodoStatus } from './actions';

const TodoListItem: FC<Todo> = ({ id, text, completed }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(text || '');
  const dispatch = useAppDispatch();

  const handleChangeStatus = () => {
    dispatch(
      updateTodoStatus({
        id,
        completed: !completed,
      })
    );
  };

  const handleDeleteTodo = () => {
    dispatch(deleteTodoItem(id));
  };

  const handleCancelEdit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleChangeTodoItemText();
    }
  };

  const handleChangeTodoItemText = () => {
    if (text.trim() !== '') {
      dispatch(updateTodoItem({ id, text: newText }));
    }

    setIsEditing(false);
  };

  return (
    <>
      {isEditing ? (
        <li>
          <input
            className="w-full text-[20px] bg-transparent p-3 outline-none border-none h-full"
            autoFocus
            type="text"
            value={newText}
            onKeyDown={handleCancelEdit}
            onBlur={handleChangeTodoItemText}
            onChange={(e) => setNewText(e.target.value)}
          />
        </li>
      ) : (
        <SortableItem>
          <li className="text-[20px] font-light border-b p-3 border-white w-full flex gap-x-4 items-center">
            <input
              className="w-5 h-5"
              checked={completed}
              type="checkbox"
              id={id}
              onChange={handleChangeStatus}
            />
            <label htmlFor={id} className="w-full text-left cursor-pointer">
              {text}
            </label>
            <span className="flex gap-x-4">
              <button className="p-px" onClick={() => setIsEditing(!isEditing)}>
                Edit
              </button>
              <button className="p-px" onClick={handleDeleteTodo}>
                Delete
              </button>
            </span>
          </li>
        </SortableItem>
      )}
    </>
  );
};

export default TodoListItem;
