import TodoBody from "./components/TodoBody";
import TodoHeader from "./components/TodoHeader";
import { Toaster } from "react-hot-toast";
import { useAppDispatch } from "../../hooks/store";
import { readTodo } from "../../store/todo/todo.slice";
import { useEffect } from "react";

const Todo: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const todos = window.localStorage.getItem("todos");

    if (todos) {
      console.log(JSON.parse(todos));
      dispatch(readTodo(JSON.parse(todos)));
    }
  }, []);

  return (
    <div className="border border-blue-400 rounded-xl p-4 flex flex-col gap-6">
      <TodoHeader />
      <TodoBody />
      <Toaster
        position="top-left"
        reverseOrder
        toastOptions={{
          duration: 3500,
        }}
      />
    </div>
  );
};

export default Todo;
