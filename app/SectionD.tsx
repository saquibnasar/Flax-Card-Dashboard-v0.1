"use client";
import Image from "next/image";
import mobile from "@/public/mockup.svg";
import card from "@/public/fc-mock-card.svg";
import qr from "@/public/fc-mock-qr.svg";
import cardQr from "@/public/card-qr.svg";
import cardQrSm from "@/public/card-qr-sm.svg";
import { motion } from "framer-motion";
import {
  fadeInAnimationVariants,
  moveInAnimationVariants,
} from "./utils/hooks/useFadeinAnimation";

const SectionD = () => {
  return (
    <div
      className={`flex flex-col md:space-x-10 min-h-screen justify-between md:justify-between md:flex-row px-4 md:px-12 py-5 items-center transition-all duration-200 ease-in`}
    >
      <motion.div
        className="md:w-[60%] w-full py-6 lg:pl-28"
        variants={fadeInAnimationVariants()}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <h1 className={`text-3xl md:text-5xl pb-7 md:pb-14`}>
          Seamless sharing so you have to worry less
        </h1>
        <div>
          <p className="text-md md:text-lg text-tSecondary pb-7">
            {`Easily share your digital card with a simple link or tap. No more
            fussing with paper cards or worrying about outdated information.
            Flax ensures that your contacts always have access to your latest
            and greatest.`}
          </p>
        </div>
      </motion.div>
      <div className="md:w-[40%] relative flex">
        {/*  xl:h-[930px] xl:w-[460px] */}
        <motion.div
          className="hidden md:flex justify-end w-[100%] md:w-full h-[610px] relative"
          variants={moveInAnimationVariants()}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <Image
            className="object-contain ml-auto"
            src={cardQr}
            alt="mobile"
            fill
          />
        </motion.div>
        <motion.div
          className="md:hidden w-full relative"
          variants={moveInAnimationVariants()}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <Image
            className="w-full object-contain"
            src={cardQrSm}
            alt="mobile"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default SectionD;
