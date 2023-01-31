import { forwardRef, InputHTMLAttributes } from "react";
import cn from "classnames";

const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref): JSX.Element => {
  return (
    <input
      className={cn(
        "border-b border-gray-400 dark:border-white dark:text-white pb-1 outline-none hover:border-black dark:hover:border-blue-500 transition-colors bg-transparent",
        className
      )}
      type="text"
      ref={ref}
      {...props}
    />
  );
});
export default Input;
