import React from "react";
import { RiInformationFill } from "react-icons/ri";

const Info = () => {
  return (
    <div className="w-full border-b border-[#4353FF] sticky py-4 space-x-2 flex justify-center items-center top-0 bg-[#F7F1E6] text-center">
      <span className="text-3xl">
        <RiInformationFill />
      </span>
      <p className="text-sm">
        Page is under development, Check back later stats might be available
        soon.
      </p>
    </div>
  );
};

export default Info;
