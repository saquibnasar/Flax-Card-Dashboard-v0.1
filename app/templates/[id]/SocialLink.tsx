import React from "react";
import { RiAddCircleLine } from "react-icons/ri";

const SocialLink = () => {
  return (
    <div className="flex py-20 items-center justify-center">
      <div className="flex flex-col items-center space-y-3 h-full">
        <h1 className="text-xl">This template does not have any links</h1>
        <p className="text-tSecondary">
        Add links to website, social network and start connecting
        </p>
        <button className="bg-black text-white text-center flex items-center px-5 py-3 rounded-lg hover:opacity-95 hover:scale-[0.98] active:scale-[0.95] transition-all duration-150 ease-linear">
          <span className="mr">
            <RiAddCircleLine />
          </span>
          Add template
        </button>
      </div>
    </div>
  );
};

export default SocialLink;
