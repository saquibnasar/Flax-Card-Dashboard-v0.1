"use client";

import { getCookie } from "cookies-next";
import Link from "next/link";
import { useState, useEffect } from "react";

const Navbar = () => {
  // State to track authentication status
  // const [authenticated, setAuthenticated] = useState(false);

  // useEffect(() => {
  //   // Check authentication status on component mount
  //   const token = getCookie("accessToken");
  //   setAuthenticated(!!token);
  // }, []);

  return (
    <div className="text-white h-20 px-5 md:p-5 bg-black flex justify-between items-center">
      <h1 className="text-lg md:text-2xl font-light">
        <span className="font-bold">Flax</span> Card
      </h1>

      <ul className="flex items-center list-none space-x-10 font-medium">
        {/* {authenticated ? (
          <li className="md:block">
            <Link
              href="/dashboard"
              className="bg-blue hover:opacity-70 rounded-md px-5 py-3 duration-150"
            >
              Dashboard
            </Link>
          </li>
        ) : (
          <> */}
        <li className="cursor-pointer hover:bg-tSecondary ease-linear px-5 py-2 duration-150 rounded-md">
          <Link href="/login">Login</Link>
        </li>
        <li className="hidden md:block">
          <Link
            href="/register"
            className="bg-blue hover:opacity-70 rounded-md px-5 py-3 duration-150"
          >
            Try for free
          </Link>
        </li>
        {/* </>
        )} */}
      </ul>
    </div>
  );
};

export default Navbar;
