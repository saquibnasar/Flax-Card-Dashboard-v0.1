"use client";

import { RiSearchLine } from "react-icons/ri";
const SearchInput = () => {
  return (
    <div className="form-control border border-dSecondary rounded-lg">
      <label className="input-group">
        <span className="text-2xl bg-white text-tSecondary">
          <RiSearchLine />
        </span>
        <input type="text" placeholder="search" className="input" />
      </label>
    </div>
  );
};

export default SearchInput;
