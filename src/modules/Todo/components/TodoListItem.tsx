import cn from "classnames";
import { FormEvent, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import IconButton from "../../../components/IconButton";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import {
  deleteTodo,
  selectCheckedTodo,
  updateTodo,
} from "../../../store/todo/todo.slice";
import { TODO_MESSAGES } from "../constants/message";

type Props = {
  id: string;
  value: string;
  checked: boolean;
};

const TodoListItem: React.FC<Props> = ({ id, value, checked }): JSX.Element => {
  const topicalCheckedState = useAppSelector((state) =>
    selectCheckedTodo(state, id)
  );
  const [isEditing, setEditing] = useState<boolean>(false);
  const [isChecked, setChecked] = useState<boolean>(
    topicalCheckedState ? topicalCheckedState : checked
  );
  const [inputValue, setValue] = useState<string>(value);
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onEdit = () => {
    inputRef.current?.focus();

    if (inputValue !== value && inputValue.length) {
      inputValue.trim();
      dispatch(updateTodo({ id, value: inputValue, checked: isChecked }));
      toast.success(TODO_MESSAGES.UPDATE);
    }

    if (!inputValue.length) {
      return toast.error(TODO_MESSAGES.NON_EMPTY);
    }

    setEditing(!isEditing);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    onEdit();
  };

  const onDelete = () => {
    const todos = window.localStorage.getItem("todos");

    dispatch(deleteTodo(id));

    if (todos) {
      const parsed: Props[] = JSON.parse(todos);

      const existTodo = parsed.filter((todo) => todo.id !== id);

      window.localStorage.setItem("todos", JSON.stringify(existTodo));
    }

    toast.success(TODO_MESSAGES.DELETE);
  };

  const onComplete = (boolean: boolean) => {
    setChecked(boolean);
    dispatch(updateTodo({ id, value: inputValue, checked: boolean }));
    toast.success(TODO_MESSAGES.UPDATE);
  };

  return (
    <li>
      <form className="flex justify-between items-center" onSubmit={onSubmit}>
        <input
          className={cn("outline-none transition-all", {
            "border-b border-dashed border-b-black": isEditing,
            "outline-none": !isEditing,
            "line-through": isChecked,
          })}
          type="text"
          readOnly={!isEditing}
          onChange={(e) =>
            setValue(e.target.value.replace(/^[ \t]+|[ \t]+$/gm, ""))
          }
          value={inputValue}
          ref={inputRef}
        />

        <div className="flex gap-1">
          <IconButton
            type="button"
            onClick={() => onComplete(isChecked ? false : true)}
            icon="check"
            className={cn({
              "text-green-500": isChecked,
            })}
          />
          <IconButton
            type="button"
            onClick={onEdit}
            icon={isEditing ? "save" : "edit"}
            className={cn({
              "hover:text-blue-600": !isEditing,
              "hover:text-green-500": isEditing,
            })}
          />
          <IconButton
            type="button"
            onClick={onDelete}
            icon="delete"
            className="hover:text-red-600"
          />
        </div>
      </form>
    </li>
  );
};

export default TodoListItem;
