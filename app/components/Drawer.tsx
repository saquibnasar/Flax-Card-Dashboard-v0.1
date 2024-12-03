"use client";

import classNames from "classnames";
import { motion } from "framer-motion";
import React, { ReactNode, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

const Drawer = ({ children }: { children: ReactNode }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div
      className="w-[100%] flex justify-end md:hidden z-40 fixed top-0 right-0"
      onClick={() => setIsDrawerOpen(false)}
    >
      <motion.div
        className={classNames({
          "p-4": true,
          "h-screen border-r bg-white border-r-dSecondary w-[80%]":
            isDrawerOpen,
        })}
      >
        <div className="w-full h-full relative">
          <button
            className="fixed right-4 top-4 text-2xl ml-auto bg-black text-white rounded-full hover:bg-opacity-60 duration-150 transition-all"
            onClick={(event) => {
              event.stopPropagation();
              setIsDrawerOpen((drawer) => !drawer);
            }}
          >
            <div className="p-3">
              <GiHamburgerMenu />
            </div>
          </button>
          {isDrawerOpen && (
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 100 }}
              transition={{ duration: 0.4 }}
              className="pt-24 w-full h-full flex flex-col"
            >
              {children}
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Drawer;
