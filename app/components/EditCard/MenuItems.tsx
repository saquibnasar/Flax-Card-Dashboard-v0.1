"use client";
import { TabTypes } from "@/app/dashboard/[id]/page";
import classNames from "classnames";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import {
  RiDashboardLine,
  RiIeLine,
  RiLineChartLine,
  RiPaletteLine,
} from "react-icons/ri";

interface Props {
  page: string | TabTypes;
  tab?: string;
}

const MenuItems = ({ page, tab }: Props) => {
  const params = useParams();
  const [selectedTab, setSelectedTab] = useState(tab || "about");

  const dashboardLists = [
    { icon: <RiDashboardLine />, label: "About", tab: "about" },
    { icon: <RiIeLine />, label: "Content", tab: "content" },
    { icon: <RiPaletteLine />, label: "Appearance", tab: "appearance" },
    { icon: <RiLineChartLine />, label: "Lead Form", tab: "form" },
  ];

  const templateList = [
    { icon: <RiDashboardLine />, label: "About", tab: "about" },
    { icon: <RiIeLine />, label: "Socials", tab: "socials" },
    { icon: <RiPaletteLine />, label: "Appearance", tab: "appearance" },
  ];

  const list =
    page === "dashboard"
      ? [...dashboardLists.map((list) => list)]
      : [...templateList.map((list) => list)];

  return (
    <>
      {list.map((list) => (
        <Link
          key={list.tab}
          href={`/${page}/${params.id}?tab=${list.tab}`}
          onClick={() => setSelectedTab(list.tab)}
          className={classNames({
            "bg-blue text-white": selectedTab === list.tab,
            "cursor-pointer flex items-center space-x-5 text-md p-2 rounded-md transition duration-100 ease-linear":
              true,
          })}
        >
          <span className="text-xl mr-3">{list.icon}</span>
          {list.label}
        </Link>
      ))}
    </>
  );
};

export default MenuItems;
