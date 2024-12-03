"use client";
import { MotionValue, useScroll, useTransform } from "framer-motion";
import { PropsWithChildren, useRef } from "react";

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

const ParallaxContainer = ({ children }: PropsWithChildren) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useParallax(scrollYProgress, 300);
  return <div ref={ref}>{children}</div>;
};

export default ParallaxContainer;
