"use client";
import { useState } from "react";
import { RiAddCircleLine } from "react-icons/ri";
import SearchInput from "../components/SearchInput";
import ActivateCardModal from "./ActivateCardModal.tsx/ActivateCardModal";

const ManageCardsNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div>
        <h1 className="text-2xl mb-2">Card management</h1>
        <p className="text-lg text-tSecondary">Current active cards</p>
      </div>
      <div className="flex flex-col md:flex-row gap-4 md:items-center">
        <SearchInput />
        <button
          className="bg-blue w-fit text-white flex items-center px-5 py-3 rounded-lg hover:opacity-95 hover:scale-[0.98] active:scale-[0.95] transition-all duration-150 ease-linear"
          onClick={() => setIsOpen(true)}
        >
          <span className="mr">
            <RiAddCircleLine />
          </span>
          Activate
        </button>
        <ActivateCardModal isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </div>
  );
};

export default ManageCardsNavbar;
