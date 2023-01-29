import { useAppSelector } from "../../../hooks/store";
import { selectTodo } from "../../../store/todo/todo.slice";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import TodoListItem from "./TodoListItem";

const TodoBody: React.FC = (): JSX.Element => {
  const { data } = useAppSelector(selectTodo);
  const [parent] = useAutoAnimate<HTMLUListElement>();

  // console.log(data.map(({ value }) => value.trim()));

  return (
    <div>
      <ul ref={parent} className="flex flex-col gap-2">
        {data?.map(({ id, value, checked }) => (
          <TodoListItem key={id} id={id} value={value} checked={checked} />
        ))}
      </ul>
    </div>
  );
};

export default TodoBody;
