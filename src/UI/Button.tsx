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
        "flex p-2 hover:bg-blackish disabled:cursor-not-allowed transition-colors items-center",
        className
      )}
      {...props}
    />
  );
};

export default Button;
