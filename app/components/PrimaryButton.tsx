import React, { ReactNode } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}
const PrimaryButton = ({ children, ...rest }: ButtonProps) => {
  return (
    <button
      className="bg-blue w-fit text-white flex items-center h-8 rounded-lg hover:opacity-95 hover:scale-[0.98] active:scale-[0.95] transition-all duration-150 ease-linear"
      {...rest}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
