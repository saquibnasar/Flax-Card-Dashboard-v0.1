"use client";

import classNames from "classnames";
import Link from "next/link";
import { ReactNode, useState } from "react";
import {
  RiArchive2Line,
  RiBankCardLine,
  RiDashboardLine,
  RiLineChartLine,
  RiNumbersLine,
  RiSettings2Line,
} from "react-icons/ri";

type ButtonType = { name: string; link: string; icon: ReactNode };

const buttons: ButtonType[] = [
  { name: "Dashboard", link: "dashboard", icon: <RiDashboardLine /> },
  { name: "Insights", link: "insights", icon: <RiLineChartLine /> },
  { name: "Templates", link: "templates", icon: <RiArchive2Line /> },
  { name: "Leads", link: "leads", icon: <RiNumbersLine /> },
  { name: "Manage Cards", link: "manage-cards", icon: <RiBankCardLine /> },
  { name: "Settings", link: "settings", icon: <RiSettings2Line /> },
];

const MenuItems = ({ pathCount, tab }: { pathCount: number; tab?: string }) => {
  const [selectedTab, setSelectedTab] = useState(tab || "dashboard");
  return (
    <div className="space-y-5">
      {buttons.map((button) => (
        <Link
          key={button.name}
          aria-label={button.name}
          className={classNames({
            "bg-iSecondary text-white": selectedTab === button.link,
            "cursor-pointer whitespace-nowrap flex items-center space-x-3 px-4 py-3 rounded-lg text-tSecondary hover:text-white transition duration-100 ease-linear":
              true,
          })}
          href={`/${button.link}`}
          onClick={() => setSelectedTab(button.link)}
        >
          <span className="text-2xl">{button.icon}</span>
          {pathCount < 3 && <h1 className="text-md">{button.name}</h1>}
        </Link>
      ))}
    </div>
  );
};

export default MenuItems;
