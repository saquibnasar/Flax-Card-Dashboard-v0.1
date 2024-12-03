"use client";
import React, { useState } from "react";
import { RiInformationLine } from "react-icons/ri";
import ToggleButton from "../components/ToggleButton";

const AccountPage = () => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div className="w-full p-5 border border-dSecondary flex justify-center bg-sPrimary rounded-lg h-screen overflow-y-scroll py-10">
      <div className="w-full md:w-[60%] space-y-10 h-full py-10">
        <h1 className="text-2xl">Account Settings</h1>

        <form className="space-y-7">
          <div>
            <label className="text-sm mb-2 text-tSecondary flex items-center">
              Your Public domain URL{" "}
              <span className="ml-2">
                <RiInformationLine />
              </span>
            </label>
            <div className="input w-full flex items-center space-x-1 border border-dSecondary">
              <p>https://flax.bio/</p>
              <input
                defaultValue={window.localStorage.getItem("username") || ""}
                className="w-full border-none outline-none"
              />
            </div>
          </div>
          <div className="form-control">
            <label className="text-sm mb-2 text-tSecondary flex items-center">
              Registered Email
            </label>
            <input
              className="input border border-dSecondary"
              defaultValue={window.localStorage.getItem("email") || ""}
            />
          </div>

          <div className="flex justify-center md:justify-end space-x-5">
            <button
              type="button"
              className="text-tSecondary border border-dSecondary rounded-lg w-full md:px-16 py-2"
            >
              Cancel
            </button>
            <button
              type="button"
              className="bg-tSecondary text-white border border-dSecondary rounded-lg w-full md:px-16 py-2"
            >
              Save
            </button>
          </div>
        </form>

        <div className="space-y-8">
          <h1 className="text-2xl">Two factor authentication</h1>
          <div className="flex justify-between space-x-5">
            <p>{`Protect your account with two factor authentication. When enabled each time you sign we’ll send you a one time use code to check it’s you signing in`}</p>
            <ToggleButton
              isChecked={isChecked}
              onChange={() => {}}
              setIsChecked={setIsChecked}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
