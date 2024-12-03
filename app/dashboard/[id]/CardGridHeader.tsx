import React, { useState } from "react";

const CardGridHeader = () => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div className="px-5 h-[80px] flex justify-between items-center">
      <div className="flex space-x-2">
        <input
          className="checkbox border-dPrimary border-2 cursor-pointer w-6 h-6 top-2 left-2 z-10 checked:text-aPurple"
          type="checkbox"
          onChange={() => {
            setIsChecked(!isChecked);
          }}
          checked={isChecked}
        />
        <p className="text-tSecondary">Select all</p>
      </div>

      {isChecked && (
        <button
          className="bg-black px-4 py-3 text-white rounded-lg"
          type="button"
          onClick={() => {
            setIsChecked(false);
          }}
        >
          Delete All
        </button>
      )}
    </div>
  );
};

export default CardGridHeader;
