"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const MotionContainer = ({ children }: Props) => {
  const fadeInAnimationVariants = () => ({
    initial: {
      opacity: 0,
      x: -100,
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.2,
      },
    },
  });
  return (
    <motion.div
      className="w-full h-full"
      variants={fadeInAnimationVariants()}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
};

export default MotionContainer;
