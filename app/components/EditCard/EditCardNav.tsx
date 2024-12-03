"use client";

import Link from "next/link";
import { RiArrowLeftLine } from "react-icons/ri";
import MenuItems from "./MenuItems";
import { motion } from "framer-motion";

const EditCardNav = ({ page = "dashboard" }: { page?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "linear" }}
      className="border bg-sPrimary border-dSecondary w-full h-full rounded-lg"
    >
      <div className="w-full h-full p-5 rounded-lg">
        <Link
          href={`/${page}`}
          className="flex items-center text-xl space-x-3 py-2"
        >
          <span className="text-2xl mr-3">
            <RiArrowLeftLine />
          </span>
          Edit Card
        </Link>

        <ul className="space-y-5 my-8">
          <MenuItems page={page} />
        </ul>
      </div>
    </motion.div>
  );
};

export default EditCardNav;
