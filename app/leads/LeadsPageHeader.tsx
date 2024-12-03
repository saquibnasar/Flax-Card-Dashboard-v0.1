import React from "react";
import SearchInput from "../components/SearchInput";
import { RiDownload2Line } from "react-icons/ri";

const LeadsPageHeader = () => {
  return (
    <div className="flex justify-between">
      <div>
        <h1 className="text-2xl mb-2">Leads</h1>
        <p className="text-lg text-tSecondary">
          <span className="text-aGreen">2934</span> leads generated{" "}
        </p>
      </div>
      <ul className="flex items-center list-none space-x-5">
        <li>
          <SearchInput />
        </li>
        <li>
          <button className="flex items-center text-white px-4 py-2 bg-blue rounded-md">
            <span className="mr-2">
              <RiDownload2Line />
            </span>
            Export All
          </button>
        </li>
      </ul>
    </div>
  );
};

export default LeadsPageHeader;
