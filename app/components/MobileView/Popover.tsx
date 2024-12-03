import { motion } from "framer-motion";
import { ReactNode } from "react";
import { RiCloseLine } from "react-icons/ri";

interface Props {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Popover = ({ children, isOpen, setIsOpen }: Props) => {
  if (isOpen)
    return (
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        onClick={() => setIsOpen(false)}
        className="relative my-3 max-w-full"
      >
        <span
          className="text-xl hover:text-black z-40 absolute top-1 right-1 p-2 rounded-full bg-tSecondary hover:bg-opacity-80 transition-all duration-150 ease-linear cursor-pointer"
          onClick={() => setIsOpen(false)}
        >
          <RiCloseLine />
        </span>
        {children}
      </motion.div>
    );
};

export default Popover;
