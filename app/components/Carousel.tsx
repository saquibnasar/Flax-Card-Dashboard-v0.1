"use client";

import classNames from "classnames";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RiCircleLine } from "react-icons/ri";
import { RxDotFilled } from "react-icons/rx";

interface Props {
  slides: string[];
  slideshow?: boolean;
}

const Carousel = ({ slides, slideshow = false }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    if (slideshow)
      if (Array.isArray(slides) && slides.length > 0) {
        const intervalId = setInterval(() => {
          setCurrentIndex((prevCounter) => (prevCounter + 1) % slides.length);
        }, 2000);

        return () => clearInterval(intervalId);
      }
    setIsClicked(false);
  }, [slides, slideshow]);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  if (slides && slides[currentIndex] !== "undefined")
    return (
      <div
        className={`z-0 group group-hover:[transition-all duration-150 ease-linear] cursor-pointer w-full m-auto relative group flex items-end justify-center`}
      >
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ backgroundImage: `url(${slides[currentIndex]})` }}
          onClick={() => nextSlide()}
          className="w-full rounded-lg bg-center bg-cover duration-500"
        >
          <Image
            className={`object-contain rounded-lg`}
            width={300}
            height={180}
            src={slides[currentIndex]}
            alt="carousel"
          />
        </motion.div>

        {!slideshow && (
          <button className="absolute hidden group-hover:flex space-x-1 w-fit h-8 rounded-full focus:outline-none">
            {slides.map((slide, index) => (
              <div
                key={`slide_${index}`}
                onClick={() => setCurrentIndex(index)}
                className={classNames({
                  "w-2 h-2  rounded-full": true,
                  "bg-tSecondary": currentIndex !== index,
                  "bg-blue": currentIndex === index,
                })}
              />
            ))}
          </button>
        )}
      </div>
    );
};

export default Carousel;
