"use client";

import logo from "@/public/logo.svg";
import { deleteCookie } from "cookies-next";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiLogoutBoxLine, RiMoonLine } from "react-icons/ri";
import MenuItems from "./MenuItems";

const SideNav = () => {
  const pathname = usePathname();
  const pathCount = pathname.split("/").length;

  return (
    <>
      <Link className="flex flex-col items-center space-y-2" href="/">
        {pathCount < 3 && (
          <div className="pt-4">
            <h1 className="text-2xl font-bold text-white">
              Flax<span className="font-light">Card</span>
            </h1>
          </div>
        )}
      </Link>
      <MenuItems pathCount={pathCount} />

      <div className="space-y-5">
        <button className="text-sSecondary space-x-3 flex justify-center items-center w-full px-4 py-3 border-2 border-sSecondary rounded-lg">
          <RiMoonLine />
          {pathCount < 3 && <span>Dark Mode</span>}
        </button>
        <button
          className="text-aRed flex justify-center space-x-3 items-center w-full px-4 py-3 border-2 border-aRed rounded-lg"
          onClick={() => {
            deleteCookie("accessToken");
            window.localStorage.removeItem("accessToken");
            window.localStorage.removeItem("refreshToken");
            window.localStorage.removeItem("email");
            window.location.href = "/";
          }}
        >
          <RiLogoutBoxLine />
          {pathCount < 3 && <span>Logout</span>}
        </button>
      </div>
    </>
  );
};

export default SideNav;
