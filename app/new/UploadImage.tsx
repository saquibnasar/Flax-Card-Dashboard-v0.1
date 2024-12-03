"use client";

import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { ChangeEvent } from "react";

interface Props {
  icon: StaticImport;
  label?: string;
  width?: string;
}

const UploadImage = ({ icon, label, width }: Props) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
    }
  };
  return (
    <>
      <label
        htmlFor="fileInput"
        className={`cursor-pointer w-${width} min-w-[160px] h-[160px] bg-sSecondary rounded-2xl flex flex-col justify-center items-center`}
      >
        <Image src={icon} alt="" />
        {label}
      </label>
      <input
        className="hidden"
        id="fileInput"
        type="file"
        onChange={handleFileChange}
      />
    </>
  );
};

export default UploadImage;
