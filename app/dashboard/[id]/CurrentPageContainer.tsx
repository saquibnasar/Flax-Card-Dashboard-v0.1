"use client";
import { motion } from "framer-motion";
import { PropsWithChildren } from "react";

const CurrentPageContainer = ({ children }: PropsWithChildren) => {
  return (
    <motion.div
      className="h-full overflow-y-scroll"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileInView={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "linear" }}
    >
      {children}
    </motion.div>
  );
};

export default CurrentPageContainer;
