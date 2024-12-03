"use client";
import React, { useState } from "react";
import TemplatePlaceHolder from "./TemplatePlaceHolder";
import Card from "../components/Card";
import { CardDetails } from "../dashboard/CardGrid";
import profilePlaceHolder from "@/public/placeholders/profilePlaceHolder.svg";
import Info from "../insights/Info";

const TemplatePage = () => {
  const [count, setCount] = useState(0);
  const card: CardDetails = {
    name: "Template 1",
    designation: "Meta",
    profileImage: profilePlaceHolder,
    bannerImages: [],
    employeeId: "template-1",
    profileUrl: "",
    links: [],
    additionalImages: [],
  };
  if (count < 1)
    return (
      <main className="flex flex-col max-h-screen">
        <Info />
        <main className="p-8 h-screen overflow-y-scroll">
          <TemplatePlaceHolder setCount={setCount} />
        </main>
      </main>
    );

  return (
    <main className="flex flex-col max-h-screen">
      <Info />
      <main className="p-8 h-screen overflow-y-scroll">
        <nav className="flex justify-between mb-5 md:mb-12 lg:mb-16">
          <div>
            <h1 className="text-2xl mb-2">Templates</h1>
            <p className="text-lg text-tSecondary">
              Manage everything in one click
            </p>
          </div>
        </nav>
        <article className="">
          <div className="w-[380px]">
            <Card path="templates" card={card} />
          </div>
        </article>
      </main>
    </main>
  );
};

export default TemplatePage;
