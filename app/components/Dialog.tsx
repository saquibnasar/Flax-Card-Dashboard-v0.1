import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Dialog = ({ children, isOpen, onClose }: Props) => {
  if (isOpen)
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 100 }}
        whileInView={{ opacity: 100 }}
        // bg-tSecondary bg-opacity-50
        className="w-full bg-tSecondary bg-opacity-50 transition-all duration-150 ease-in left-0 top-0 fixed flex justify-center items-end lg:items-center z-50 h-full"
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            onClose();
          }
        }}
      >
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          whileInView={{ y: 0 }}
          className="w-full space-y-5 shadow-2xl max-w-[600px] h-fit p-4 bg-white border border-dSecondary rounded-lg"
        >
          {children}
        </motion.div>
      </motion.div>
    );
};

export default Dialog;
