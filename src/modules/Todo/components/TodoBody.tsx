import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import {
  PayloadType,
  selectTodo,
  updateList,
  updateTodo,
} from "../../../store/todo/todo.slice";
import TodoListItem from "./TodoListItem";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { DragEvent, useEffect, useState } from "react";

const TodoBody: React.FC = (): JSX.Element => {
  const { data } = useAppSelector(selectTodo);
  const [parent] = useAutoAnimate<HTMLUListElement>();
  const [cardList, setCardList] = useState(data);
  const [currentItem, setCurrentItem] = useState<PayloadType>();
  const [isChanged, setChanged] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data) setCardList(data);
  }, [data]);

  useEffect(() => {
    if (isChanged) {
      dispatch(updateList(cardList));
    }
  }, [isChanged]);

  const onDragStart = (data: PayloadType) => {
    setCurrentItem(data);
    setChanged(false);
  };

  const onDrop = (e: DragEvent<HTMLLIElement>, data: PayloadType) => {
    e.preventDefault();
    setCardList(
      cardList.map((item) => {
        if (currentItem) {
          if (item.id === data.id) {
            return { ...currentItem };
          }

          if (item.id === currentItem.id) {
            return { ...data };
          }
        }

        return item;
      })
    );
    setChanged(true);
    e.currentTarget.style.borderColor = "transparent";
  };

  const onDragOver = (e: DragEvent<HTMLLIElement>) => {
    e.preventDefault();
    e.currentTarget.style.borderColor = "#3b82f6";
  };

  const onDragEnd = (e: DragEvent<HTMLLIElement>) => {
    // e.currentTarget.style.borderColor = "transparent";
  };

  return (
    <div>
      <ul className="flex flex-col gap-2 relative" ref={parent}>
        {cardList.map((item) => {
          const { checked, id, value } = item;

          return (
            <TodoListItem
              onDragStart={() => onDragStart(item)}
              onDrop={(e) => onDrop(e, item)}
              onDragOver={onDragOver}
              onDragLeave={(e) => e.currentTarget.removeAttribute("style")}
              onDragEnd={onDragEnd}
              key={id}
              id={id}
              value={value}
              checked={checked}
              draggable
            />
          );
        })}
      </ul>
    </div>
  );
};

export default TodoBody;
