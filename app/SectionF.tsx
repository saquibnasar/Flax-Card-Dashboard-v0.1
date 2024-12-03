import React from "react";
import mockup from "@/public/dashboard-mockup.svg";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeInAnimationVariants } from "./utils/hooks/useFadeinAnimation";

const SectionF = () => {
  return (
    <div
      className={`flex flex-col justify-center px-4 md:px-12 py-5 items-center transition-all duration-200 ease-in`}
    >
      <motion.div
        className="w-full md:w-[70%] py-6 text-center flex flex-col items-center"
        variants={fadeInAnimationVariants()}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <h1 className={`text-3xl md:text-5xl pb-7 md:pb-14`}>
          {`Wait....we equally care for your teams as well`}
        </h1>
        <div className="w-full flex flex-col items-center">
          <p className="text-md md:text-lg text-tSecondary pb-7">
            {`Say goodbye to scattered efforts and hello to streamlined efficiency. The Team Dashboard provides you with a bird's-eye view of all the digital cards within your team. Easily oversee customization, updates, and data collection efforts, ensuring a consistent and cohesive brand image.`}
          </p>
        </div>
        <Link
          href="/register"
          className="bg-blue text-white hover:opacity-70 rounded-md px-5 py-3 duration-150"
        >
          Try for free
        </Link>
      </motion.div>
      <div className="flex justify-center relative">
        <div className="w-[340px] h-[240px] md:w-[800px] md:h-[500px] relative">
          <Image className="object-contain" src={mockup} alt="mobile" fill />
        </div>
      </div>
    </div>
  );
};

export default SectionF;
