import { motion } from "framer-motion";
import React, { ReactNode } from "react";
import { RiCloseLine } from "react-icons/ri";

interface Props {
  children: ReactNode;
  background?: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Popup = ({
  children,
  background = "white",
  isOpen,
  setIsOpen,
}: Props) => {
  if (isOpen)
    return (
      <motion.div
        initial={{ y: 1000 }}
        animate={{ y: 0 }}
        whileInView={{ y: 0 }}
        exit={{ y: 1000 }}
        transition={{ duration: 0.3 }}
        className={`z-30 w-full h-full overflow-y-scroll bg-${background} shadow-lg rounded-lg absolute -top-[-50%] border border-dSecondary`}
      >
        <span
          className="cursor-pointer p-2 hover:bg-sSecondary rounded-full absolute top-2 right-2 text-2xl text-tSecondary"
          onClick={() => setIsOpen(false)}
        >
          <RiCloseLine />
        </span>
        {children}
      </motion.div>
    );
};

export default Popup;
