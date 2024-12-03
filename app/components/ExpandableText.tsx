import { Icon } from "@chakra-ui/react";
import classNames from "classnames";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";

interface Props {
  text: string;
  theme: "light" | "dark";
}

const ExpandableText = ({ text, theme }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldFitHeight = text.length > 100;

  return (
    <div
      className={classNames({
        "shadow-lg p-2 rounded-lg flex flex-col px-2 justify-between items-center":
          true,
        "bg-gradient-to-b from-[#333333] to-[#212121] border-none":
          theme === "dark",
        "border border-dSecondary": theme === "light",
      })}
    >
      <motion.div
        initial={{ height: "10px" }}
        animate={{
          height: "auto",
        }}
        transition={{ duration: 0.2 }}
        className={classNames({
          "overflow-y-hidden h-fit": true,
        })}
      >
        {/* //expandable-text  */}
        <h1
          key={`EmbedText${text}`}
          className={classNames({ "line-clamp-3": !isExpanded })}
          // className={classNames("text-sm px-2 pb-1 font-semibold", {
          //   "h-10": !isExpanded && !shouldFitHeight,
          //   "h-28": isExpanded && shouldFitHeight, // Adjust the height value as needed
          // })}
        >
          {text}
        </h1>
        {/* <h1
          key={`EmbedText${text}`}
          className="text-sm px-2 pb-1 font-semibold"
        >
          {text}
        </h1> */}
      </motion.div>

      {shouldFitHeight && !isExpanded && (
        <Icon
          cursor="pointer"
          onClick={() => setIsExpanded(true)}
          boxSize={7}
          as={RiArrowDownSLine}
        />
      )}

      {shouldFitHeight && isExpanded && (
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

export default ExpandableText;
