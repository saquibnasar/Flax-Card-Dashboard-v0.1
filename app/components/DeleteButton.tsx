import React from "react";
import { RiDeleteBinLine } from "react-icons/ri";

const DeleteButton = ({ handleOnClick }: { handleOnClick: () => void }) => {
  return (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation();
        handleOnClick();
      }}
      className="group-hover:opacity-100 opacity-0 transition-all duration-150 hover:bg-sSecondary text-aRed absolute top-1 right-1 p-2 rounded-full text-xl"
    >
      <RiDeleteBinLine />
    </button>
  );
};

export default DeleteButton;
