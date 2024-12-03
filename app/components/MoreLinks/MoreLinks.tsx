"use client";

import React, { useState } from "react";
import { RiArrowDownLine } from "react-icons/ri";
import AddMoreLinks from "./AddMoreLinks";

const MoreLinks = () => {
  const [showMore, setShowMore] = useState(true);
  return (
    <div className="flex flex-col">
      <div className="w-full">
        <button
          className="w-fit mx-auto button-primary justify-center flex space-x-2 items-center px-2 py-1 text-sm border-2 border-black rounded-full duration-100"
          type="button"
          onClick={() => setShowMore(!showMore)}
        >
          <span className={`${showMore ? "rotate-180 pb-1" : "rotate-0 pt-1"}`}>
            <RiArrowDownLine />
          </span>
          {showMore ? "Show less" : "Show more"}
        </button>
      </div>
      <div className="my-5 duration-75">{showMore && <AddMoreLinks />}</div>
    </div>
  );
};

export default MoreLinks;
