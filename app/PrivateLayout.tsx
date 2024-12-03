"use client";

import { Show } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { PropsWithChildren, useState } from "react";
import { Providers } from "./Provider";
import SideNav from "./Sidenav/SideNav";
import { GiHamburgerMenu } from "react-icons/gi";
import { motion } from "framer-motion";
import classNames from "classnames";
import MenuItems from "./Sidenav/MenuItems";

const PrivateLayout = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();
  const pathCount = pathname.split("/").length;
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const shouldRenderLayout = () => {
    const allowedPaths = [
      "/dashboard",
      "/insights",
      "/templates",
      "/manage-cards",
      "/leads",
      "/settings",
    ];
    return allowedPaths.some((path) => pathname.startsWith(path));
  };

  if (!shouldRenderLayout()) {
    return <Providers>{children}</Providers>;
  }

  // const shouldRenderLayout = () => {
  //   return !["/", "/new", "/login", "/register", "/s/terms-services"].includes(
  //     pathname
  //   );
  // };

  if (!shouldRenderLayout()) return <Providers>{children}</Providers>;
  return (
    <Providers>
      <div className="flex">
        <div className="hidden md:flex max-h-screen transition-all duration-150 flex-col justify-between bg-iPrimary min-h-screen p-5">
          <SideNav />
        </div>

        {pathCount === 2 && pathname !== "/settings" && (
          <div
            className="w-[100%] flex justify-end md:hidden z-40 fixed top-0 right-0"
            onClick={() => setIsDrawerOpen(false)}
          >
            <motion.div
              className={classNames({
                "p-4": true,
                "h-screen bg-black w-[80%]": isDrawerOpen,
              })}
            >
              <div className="w-full h-full relative">
                <button
                  className="absolute right-2 top-2 text-2xl ml-auto bg-black text-white rounded-full hover:bg-opacity-60 duration-150 transition-all"
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
                    <MenuItems tab={pathname.slice(1)} pathCount={pathCount} />
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        )}
        <div className="w-full max-h-screen overflow-y-scroll no-bar">
          {children}
        </div>
      </div>
    </Providers>
  );
};

export default PrivateLayout;
