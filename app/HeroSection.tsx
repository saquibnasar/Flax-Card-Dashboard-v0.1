import { motion } from "framer-motion";
import { fadeInAnimationVariants } from "./utils/hooks/useFadeinAnimation";
import center from "@/public/mockup-center.svg";
import left from "@/public/mockup-left.svg";
import right from "@/public/mockup-right.svg";
import Image from "next/image";
import bg from "@/public/hero-bg.svg";

const HeroSection = () => {
  return (
    <div
      className={`flex w-full min-w-full min-h-screen -mt-2 flex-col px-4 md:px-12 py-5 items-center justify-center transition-all ease-in relative z-40`}
    >
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <Image layout="fill" objectFit="cover" src={bg} alt="earth-bg" />
      </div>
      <motion.div
        className="z-10 w-full md:w-[70%] py-6 flex flex-col items-center text-center"
        variants={fadeInAnimationVariants()}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <h1 className={`text-3xl md:text-5xl pb-7 md:pb-14`}>
          {`Accelerate Your Growth with Flax Card Enhance Your Modern Networking Experience with Ease`}
        </h1>
        <div>
          <p className="text-md md:text-lg text-tSecondary pb-7">
            {`Millions of businesses of all sizes - from MSME startups to large enterprises - use Flax software and Smart Card to accept Verified Leads, send Business info in ease, and manage their Business & Employees online.`}
          </p>
        </div>
      </motion.div>

      <div className="flex justify-between z-10">
        <Image className="hidden lg:block" src={left} alt="left" />
        <Image src={center} alt="center" />
        <Image className="hidden lg:block" src={right} alt="right" />
      </div>
    </div>
  );
};

export default HeroSection;
