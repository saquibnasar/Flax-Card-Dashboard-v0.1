import classNames from "classnames";
import { ReactNode } from "react";
import Header from "./Header";
import { motion } from "framer-motion";

interface Props {
  children: ReactNode;
  title: string;
  subtitle: string;
  width?: boolean;
}

const FormContainer = ({ children, title, subtitle, width }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      whileInView={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={classNames({
        "form-container h-full flex flex-col px-6 md:px-24 pt-8 pb-8": true,
        // "w-100": width,
        // "w-52": !width,
      })}
    >
      <div className="h-fit">
        <Header title={title} subtitle={subtitle} />
      </div>

      <div className="form w-full space-y-[24px] md:pr-10">{children}</div>
    </motion.div>
  );
};

export default FormContainer;
