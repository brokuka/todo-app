import { InputHTMLAttributes } from "react";

const Input: React.FC<InputHTMLAttributes<HTMLInputElement>> = ({
  className,
  ...props
}): JSX.Element => {
  return (
    <input
      className={[
        className,
        "border-b border-gray-400 pb-1 outline-none hover:border-black focus:border-black transition-colors",
      ].join(" ")}
      type="text"
      {...props}
    />
  );
};

export default Input;
