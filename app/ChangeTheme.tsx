"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import mobile from "@/public/mockup.svg";
import mobileDark from "@/public/mockup-dark.svg";
import { motion } from "framer-motion";
import { fadeInAnimationVariants } from "./utils/hooks/useFadeinAnimation";
import CheckUrl from "./components/CheckUrl";

const ChangeTheme = () => {
  const customTheme = {
    light: { background: "sSecondary", text: "black" },
    dark: { background: "black", text: "white" },
  };

  const [isLight, setIsLight] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState(customTheme["light"]);

  useEffect(() => {
    setSelectedTheme(isLight ? customTheme["light"] : customTheme["dark"]);
  }, [isLight]);

  return (
    <div>
      <div
        className={`flex flex-col min-h-screen md:space-x-10 justify-center md:justify-normal md:flex-row px-4 md:px-12 py-5 items-center bg-${selectedTheme.background} transition-all ease-in`}
      >
        <motion.div
          className="w-full md:w-[70%] py-6 lg:pl-28"
          variants={fadeInAnimationVariants()}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <h1
            className={`text-3xl text-${selectedTheme.text} md:text-4xl lg:text-5xl pb-7 md:pb-14`}
          >
            {`Didn't liked what you saw? Customize according to your need`}
          </h1>

          <p className="text-md md:text-lg text-tSecondary pb-7">
            {`Your profile is not static - why should your digital card be?
              Update and refresh your card as often as you like. Whether you're
              rebranding, launching a new product, or just want a fresh look,
              Flax adapts to your evolving needs.`}
          </p>
          <button
            className="bg-blue text-sm md:text-md text-white py-3 px-2 rounded-lg"
            onClick={() => setIsLight(!isLight)}
          >
            Click me for a change
          </button>
        </motion.div>
        <div className="w-full md:w-[30%] min-h-[610px] flex justify-center relative">
          <Image
            className="object-contain"
            src={isLight ? mobile : mobileDark}
            alt="mobile"
            fill
          />
        </div>
      </div>
      <div
        className={`flex flex-col-reverse min-h-screen justify-center md:justify-between md:flex-row px-4 md:px-12 py-5 items-center bg-${selectedTheme.background} transition-all duration-200 ease-in`}
      >
        <div className="w-full md:w-[30%] min-h-[610px] flex justify-center relative">
          <Image
            className="object-contain"
            src={isLight ? mobile : mobileDark}
            alt="mobile"
            fill
          />
        </div>

        <motion.div
          variants={fadeInAnimationVariants()}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="w-full md:w-[70%] py-6 lg:pr-28"
        >
          <h1
            className={`text-3xl text-${selectedTheme.text} md:text-5xl pb-7 md:pb-14`}
          >
            {` Whether you're an entrepreneur, freelancer, artist, or professional,
            Flax is designed for you.`}{" "}
          </h1>
          <div>
            <p className="text-md md:text-lg text-tSecondary pb-7">
              {`Showcase your skills, portfolio, or business details in a way
              that's as unique as your talent. Choose from a spectrum of colors,
              fonts, and themes to match your style. Add buttons for social
              media profiles, contact information, or anything else that matters
              to you. The possibilities are limitless, ensuring your digital
              card is as dynamic as you are.`}
            </p>
            <CheckUrl />
            {/* <div className="md:flex md:space-x-5">
              <input className="my-4 md:my-0" type="text" />
              <button
                className="bg-blue text-sm md:text-md text-white py-3 px-2 rounded-lg"
                // onClick={() => setIsLight(!isLight)}
              >
                Claim your flax
              </button>
            </div> */}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ChangeTheme;
