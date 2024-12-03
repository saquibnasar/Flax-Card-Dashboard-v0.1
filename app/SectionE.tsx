import React from "react";
import Image from "next/image";
import mockup from "@/public/mockup-leadform.svg";
import leftIndicator from "@/public/left-indicator.svg";
import rightIndicator from "@/public/right-indicator.svg";
import { motion } from "framer-motion";
import { fadeInAnimationVariants } from "./utils/hooks/useFadeinAnimation";

const SectionE = () => {
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
          {` Making connections and saving contacts couldn't be more easier`}
        </h1>
        <div className="w-full flex flex-col items-center">
          <p className="text-md md:text-lg text-tSecondary pb-7">
            {`Unlock the full potential of networking with Flax Forms. From
            creating a stunning digital card to gathering information
            seamlessly, the power to connect is now in your hands. Elevate your
            networking game and make every interaction count.`}
          </p>
        </div>
      </motion.div>
      <div className="hidden md:flex justify-center relative">
        <div className="relative -top-16 -right-10 flex items-center space-x-3">
          <p className="-mb-5">Turn off your form anytime you want</p>
          <Image width={150} height={30} src={leftIndicator} alt="indicator" />
        </div>
        <div className="w-[340px] h-[500px] relative">
          <Image className="object-contain" src={mockup} alt="mobile" fill />
        </div>
        <div className="flex top-20 -left-10 items-center space-x-3 relative">
          <Image
            className=""
            width={150}
            height={30}
            src={rightIndicator}
            alt="indicator"
          />
          <p className="mb-10">Customize your form how you want</p>
        </div>
      </div>
    </div>
  );
};

export default SectionE;
