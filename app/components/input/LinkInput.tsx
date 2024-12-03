"use client";

import { Reorder } from "framer-motion";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { UseFormRegisterReturn } from "react-hook-form";
import { GrDrag } from "react-icons/gr";

interface Link {
  name: string;
  label: string;
  icon: StaticImport;
}

interface Props {
  link: Link;
}

const LinkInput = ({ link }: Props) => {
  return (
    <Reorder.Item
      value={link}
      id={link.name}
      className="flex items-center cursor-grab space-x-3"
    >
      <GrDrag />

      <Image src={link.icon} alt="twitter" />

      <div className="form-control w-full">
        <input
          type="text"
          className="input input-bordered"
          placeholder={link.label}
        />
      </div>
    </Reorder.Item>
  );
};

export default LinkInput;
