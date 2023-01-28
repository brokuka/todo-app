import React, { ButtonHTMLAttributes } from "react";
import cn from "classnames";
import { ReactComponent as Delete } from "../assets/delete.svg";
import { ReactComponent as Edit } from "../assets/edit.svg";
import { ReactComponent as Save } from "../assets/save.svg";
import { ReactComponent as Check } from "../assets/check.svg";

type IconButtonProps = {
  icon?: "delete" | "edit" | "save" | "check";
} & ButtonHTMLAttributes<HTMLButtonElement>;

const chooseIcon = (icon: IconButtonProps["icon"]) => {
  switch (icon) {
    case "delete":
      return <Delete />;
    case "edit":
      return <Edit />;
    case "save":
      return <Save />;
    case "check":
      return <Check />;
  }
};

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  className,
  ...props
}): JSX.Element => {
  return (
    <button
      className={cn(
        "transition-all hover:bg-blackish outline-none rounded-full p-2 opacity-50 hover:opacity-75 text-gray-400",
        className
      )}
      {...props}
    >
      {chooseIcon(icon)}
    </button>
  );
};

export default IconButton;
