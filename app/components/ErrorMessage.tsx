import { PropsWithChildren } from "react";
import { RiErrorWarningLine } from "react-icons/ri";

const ErrorMessage = ({ children }: PropsWithChildren) => {
  if (!children) return null;
  return (
    <p className="pt-2 pl-2 text-sm flex items-center space-x-2 text-aRed">
      <RiErrorWarningLine />
      {children}
    </p>
  );
};

export default ErrorMessage;
