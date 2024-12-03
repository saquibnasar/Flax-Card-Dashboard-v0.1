import { ReactNode, useEffect, useState } from "react";

interface Props {
  message: string;
}

const Toast = ({ message }: Props) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(true);
      clearTimeout(timeout);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [message]);

  return visible && message ? (
    <div className="fixed text-center bottom-10 max-w-[400px] w-full py-2 bg-blue rounded-xl">
      <h1 className="text-white font-bold">{message}</h1>
    </div>
  ) : null;
};

export default Toast;
