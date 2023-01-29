import { InputHTMLAttributes } from "react";
import cn from "classnames";

const Input: React.FC<InputHTMLAttributes<HTMLInputElement>> = ({
  className,
  ...props
}): JSX.Element => {
  return (
    <input
      className={cn(
        "border-b border-gray-400 pb-1 outline-none hover:border-black focus:border-black transition-colors",
        className
      )}
      type="text"
      {...props}
    />
  );
};

export default Input;
