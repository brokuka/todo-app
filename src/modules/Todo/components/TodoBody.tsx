import { useAppSelector } from "../../../hooks/store";
import { selectTodo } from "../../../store/todo/todo.slice";
import TodoListItem from "./TodoListItem";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const TodoBody: React.FC = (): JSX.Element => {
  const { data } = useAppSelector(selectTodo);
  const [parent] = useAutoAnimate<HTMLUListElement>();

  return (
    <div>
      <ul className="flex flex-col gap-2" ref={parent}>
        {data?.map(({ id, value, checked }) => (
          <TodoListItem key={id} id={id} value={value} checked={checked} />
        ))}
      </ul>
    </div>
  );
};

export default TodoBody;
