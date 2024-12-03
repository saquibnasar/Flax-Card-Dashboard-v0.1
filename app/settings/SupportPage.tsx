"use client";
import React from "react";
import CroppedImage from "../components/CroppedImage";
import { RiUpload2Line } from "react-icons/ri";

const SupportPage = () => {
  return (
    <div className="flex justify-center w-full space-y-10 h-full py-10">
      <form className="space-y-5 px-4 md:px-0 w-full md:w-[60%]">
        <div>
          <h1 className="text-2xl">Support</h1>
          <p className="text-tSecondary">To info@flaxcard.com</p>
        </div>
        <div className="form-control">
          <label className="label text-tSecondary text-sm">Subject</label>
          <input className="input border border-dSecondary" type="text" />
        </div>
        <div className="form-control">
          <label className="label text-tSecondary text-sm">Message</label>
          <textarea className="textarea border border-dSecondary h-36" />
        </div>

        <div className="flex flex-col mb-5 w-fit">
          <p className="mb-3">Attach Screenshot ()</p>
          <CroppedImage
            name="profileImage"
            aspectRatio={1}
            setFile={(file) => {}}
          >
            <div className="px-8 py-3 text-tSecondary border border-dSecondary rounded-md flex items-center space-x-2 hover:text-black transition-all ease-linear duration-150">
              <span className="mr-2">
                <RiUpload2Line />
              </span>
              Add Image
            </div>
          </CroppedImage>
        </div>

        <button
          type="button"
          className="w-full py-2 bg-black rounded-lg text-white hover:scale-[0.98] active:scale-[0.95] transition-all duration-150 ease-linear"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default SupportPage;
