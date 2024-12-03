"use client";

import { allSocialMediaItems } from "@/app/utils/socialMediaItems";
import { Icon } from "@chakra-ui/react";
import classNames from "classnames";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { SocialProps, container } from "../Socials";

const Drawer = ({ links, theme }: SocialProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div
      className={classNames({
        "shadow-lg p-2 rounded-lg flex flex-col justify-between items-center":
          true,
        "bg-gradient-to-b from-[#333333] to-[#212121] border-none":
          theme === "dark",
        "border border-dSecondary": theme === "light",
      })}
    >
      <motion.div
        initial={{ height: "auto" }}
        animate={{ height: isExpanded ? "auto" : "5rem" }}
        transition={{ duration: 0.2 }}
        className={classNames({
          "max-width:[100%] overflow-x-hidden grid grid-cols-4 place-content-between gap-3 overflow-y-hidden":
            true,
          "h-10": !isExpanded,
          "h-fit": isExpanded,
        })}
      >
        {links?.map(
          (link) =>
            link.value.length > 0 &&
            link.isActive &&
            container(
              <Image
                key={link.type}
                className="shadow-md rounded-lg"
                src={allSocialMediaItems[link.type!].icon}
                alt={link.type}
                fill
              />,
              link.title.charAt(0).toUpperCase() + link.title.slice(1, 8)
            )
        )}
      </motion.div>

      {!isExpanded && links && links.length > 4 && (
        <Icon
          cursor="pointer"
          onClick={() => setIsExpanded(true)}
          boxSize={7}
          as={RiArrowDownSLine}
        />
      )}

      {isExpanded && (
        <Icon
          cursor="pointer"
          onClick={() => setIsExpanded(false)}
          boxSize={7}
          as={RiArrowUpSLine}
        />
      )}
    </div>
  );
};

export default Drawer;
