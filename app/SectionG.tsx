import React from "react";
import Image from "next/image";
import bg from "@/public/earth-bg.svg";
import { motion } from "framer-motion";
import { zoomOutAnimationVariants } from "./utils/hooks/useFadeinAnimation";
import CheckUrl from "./components/CheckUrl";

const SectionG = () => {
  return (
    <div className="p-3 z-0 w-full max-w-full min-h-screen h-full flex items-center justify-center relative">
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <Image layout="fill" objectFit="cover" src={bg} alt="earth-bg" />
      </div>
      <motion.div
        className="z-10 w-full md:w-[70%] py-6 text-center flex flex-col items-center"
        variants={zoomOutAnimationVariants()}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <h1 className={`text-3xl text-white md:text-5xl pb-7 md:pb-14`}>
          {`Wait....we equally care for your teams as well`}
        </h1>
        <div className="w-full flex flex-col items-center">
          <p className="text-md md:text-lg text-tSecondary pb-7">
            {`Say goodbye to scattered efforts and hello to streamlined efficiency. The Team Dashboard provides you with a bird's-eye view of all the digital cards within your team. Easily oversee customization, updates, and data collection efforts, ensuring a consistent and cohesive brand image.`}
          </p>
        </div>
        <CheckUrl />
      </motion.div>
    </div>
  );
};

export default SectionG;
