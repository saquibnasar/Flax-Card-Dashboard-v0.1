"use client";

import classNames from "classnames";
import Link from "next/link";
import React, { useState } from "react";
import { RiBankCardLine, RiPhoneLine, RiSettings2Line } from "react-icons/ri";

const SettingsNavbar = ({ tab }: { tab: string }) => {
  const [selectedTab, setSelectedTab] = useState(
    typeof tab === "undefined" ? "account" : tab
  );

  const lists = [
    { icon: <RiSettings2Line />, label: "Account Settings", tab: "account" },
    { icon: <RiBankCardLine />, label: "Subscription", tab: "subscribe" },
    { icon: <RiPhoneLine />, label: "Support", tab: "support" },
  ];
  return (
    <ul className="w-full md:w-[230px] h-full border-0 md:border border-dSecondary bg-sPrimary space-y-5 p-5 rounded-lg">
      {lists.map((list) => (
        <Link
          key={list.label}
          href={`/settings?tab=${list.tab}`}
          onClick={() => setSelectedTab(list.tab)}
          className={classNames({
            "bg-blue text-white": list.tab === selectedTab,
            "cursor-pointer flex items-center space-x-5 text-md p-2 rounded-md transition duration-100 ease-linear":
              true,
          })}
        >
          <span className="text-xl mr-3">{list.icon}</span>
          {list.label}
        </Link>
      ))}
    </ul>
  );
};

export default SettingsNavbar;
