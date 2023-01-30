import { ButtonHTMLAttributes } from "react";
import cn from "classnames";

const Button: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  type = "button",
  className,
  ...props
}): JSX.Element => {
  return (
    <button
      className={cn(
        "flex p-2 hover:bg-blackish disabled:cursor-not-allowed transition-colors items-center dark:text-white dark:hover:bg-slate-800",
        className
      )}
      {...props}
    />
  );
};

export default Button;
