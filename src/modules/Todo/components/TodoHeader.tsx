import classNames from "classnames";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import { createTodo, selectTodo } from "../../../store/todo/todo.slice";
import Button from "../../../UI/Button";
import TextField from "../../../UI/TextField";
import { TODO_MESSAGES } from "../constants/message";

const TodoHeader: React.FC = (): JSX.Element => {
  const [value, setValue] = useState<string>("");
  const dispatch = useAppDispatch();
  const { data } = useAppSelector(selectTodo);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!value.trim().length) {
      return toast.error(TODO_MESSAGES.NON_EMPTY);
    }

    dispatch(
      createTodo({
        id: window.crypto.randomUUID(),
        value: value.trim(),
        checked: false,
      })
    );
    setValue("");
    toast.success(TODO_MESSAGES.CREATE);
  };

  useEffect(() => {
    if (data.length) {
      localStorage.setItem("todos", JSON.stringify(data));
    }
  });

  return (
    <form className="flex gap-10 items-center" onSubmit={onSubmit}>
      <TextField
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full "
        placeholder="Example: watch favorite tv series"
      />
      <Button
        className={classNames({
          "cursor-not-allowed": !value.trim().length,
        })}
        type="submit"
      >
        Create
      </Button>
    </form>
  );
};

export default TodoHeader;
