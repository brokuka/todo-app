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
import TextField from "../../../UI/TextField";
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
  const parent = useRef<HTMLLIElement | null>(null);

  const onEdit = () => {
    inputRef.current?.focus();

    if (!inputValue.trim().length) {
      return toast.error(TODO_MESSAGES.NON_EMPTY);
    }

    setEditing(!isEditing);
    setValue((value) => value.trim());

    if (inputValue.trim() !== value.trim() && inputValue.trim().length) {
      dispatch(
        updateTodo({ id, value: inputValue.trim(), checked: isChecked })
      );
      toast.success(TODO_MESSAGES.UPDATE);
    }
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
    if (!inputValue.length) {
      return toast.error(TODO_MESSAGES.NON_EMPTY);
    }

    setChecked(boolean);
    dispatch(updateTodo({ id, value: inputValue.trim(), checked: boolean }));
    toast.success(TODO_MESSAGES.UPDATE);
  };

  const onRestoreValue = (e: any) => {
    if (parent.current?.contains(e.target) || !isEditing || inputValue.length)
      return;

    setValue(value);
    setEditing(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", onRestoreValue);

    return () => {
      document.removeEventListener("mousedown", onRestoreValue);
    };
  });

  return (
    <li ref={parent}>
      <form className="flex justify-between items-center" onSubmit={onSubmit}>
        <TextField
          className={cn(
            "outline-none transition-all max-w-xs w-full dark:text-white",
            {
              "border-b border-dashed border-b-black dark:border-b-white":
                isEditing,
              "outline-none": !isEditing,
              "line-through": isChecked,
            }
          )}
          type="text"
          readOnly={!isEditing}
          onChange={(e) => setValue(e.target.value)}
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
