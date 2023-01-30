import React, { ButtonHTMLAttributes, SVGProps } from "react";
import cn from "classnames";
import { ReactComponent as Delete } from "../assets/delete.svg";
import { ReactComponent as Edit } from "../assets/edit.svg";
import { ReactComponent as Save } from "../assets/save.svg";
import { ReactComponent as Check } from "../assets/check.svg";
import { ReactComponent as DarkMode } from "../assets/darkmode.svg";
import { ReactComponent as LightMode } from "../assets/lightmode.svg";

type Props = {
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
  className?: string;
} & IconProps;

type IconProps = {
  icon?: "delete" | "edit" | "save" | "check" | "darkmode" | "lightmode";
} & Omit<SVGProps<SVGSVGElement>, "onClick">;

const chooseIcon = ({ icon, ...props }: IconProps) => {
  switch (icon) {
    case "delete":
      return <Delete {...props} />;
    case "edit":
      return <Edit {...props} />;
    case "save":
      return <Save {...props} />;
    case "check":
      return <Check {...props} />;
    case "darkmode":
      return <DarkMode {...props} />;
    case "lightmode":
      return <LightMode {...props} />;
  }
};

const IconButton: React.FC<Props> = ({
  icon,
  className,
  onClick,
  type = "button",
  ...props
}): JSX.Element => {
  return (
    <button
      className={cn(
        "transition-all hover:bg-blackish outline-none rounded-full p-2 opacity-50 hover:opacity-75 text-gray-400 dark:hover:bg-slate-800",
        className
      )}
      onClick={onClick}
      type={type}
    >
      {chooseIcon({ icon, ...props })}
    </button>
  );
};

export default IconButton;
