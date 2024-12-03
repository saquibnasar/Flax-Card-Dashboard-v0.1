"use client";

import { useMotionValueEvent, useScroll } from "framer-motion";
import { ReactNode, useRef, useState } from "react";
import ShowPdf from "./ShowPdf";

interface Props {
  children: ReactNode;
  enableContact?: boolean;
  theme?: "light" | "dark";
}

const MockupPreview = ({ children, enableContact, theme }: Props) => {
  const ref = useRef(null);

  const [scrollPosition, setScrollPosition] = useState(0);
  const [isShareClicked, setIsShareClicked] = useState(false);
  const { scrollY } = useScroll({ container: ref });
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrollPosition(latest);
  });

  return (
    <div
    //   ref={ref}
    //   data-theme={theme === "dark" ? "flax-dark" : "flax-light"}
    //   className={classNames({
    //     "no-bar bg-primary text-secondary space-y-5 px-2 pt-2 relative w-[310px] flex flex-col border border-dSecondary rounded-3xl h-[620px] shadow-2xl z-10 overflow-y-scroll transition-all duration-200":
    //       true,
    //   })}
    >
      {/* <div />
      <div className="sticky top-0 z-40">
        {scrollPosition > 140 && (
          <ScrollNavbar setIsSharing={setIsShareClicked} />
        )}
      </div>

      <ProfileHeader />

      {enableContact && (
        <button
          className={classNames({
            "bg-blue text-xs font-semibold text-white rounded-xl w-full py-3":
              true,
            hidden: scrollPosition > 100,
          })}
        >
          Exchange Contact
        </button>
      )}

      <Socials /> */}

      <div className="z-20 mb-5 relative">
        {/* <ShowPdf /> */}
        {children}
      </div>

      {/* {enableContact && scrollPosition > 100 && (
        <motion.button
          initial={{ y: -550, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          whileInView={{ y: 0, opacity: 1 }}
          exit={{ y: -550, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={classNames({
            "z-30 py-3 bg-blue text-xs sticky bottom-5 font-semibold text-white rounded-xl w-full":
              true,
            "opacity-0": scrollPosition <= 100,
          })}
        >
          Exchange Contact
        </motion.button>
      )}

      {scrollPosition > 100 && (
        <div className="flex justify-self-end justify-items-center">
          <button
            className="mx-auto text-lg font-light my-7 text-center"
            onClick={() => setIsShareClicked(!isShareClicked)}
          >
            <span className="font-semibold">Flax</span> Card
          </button>
        </div>
      )}

      <SharePopup
        isOpen={isShareClicked}
        setIsOpen={() => setIsShareClicked(false)}
      /> */}
    </div>
  );
};

export default MockupPreview;
