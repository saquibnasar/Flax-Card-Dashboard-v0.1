"use client";

import bg from "@/public/hero-bg.svg";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { RiArrowLeftLine } from "react-icons/ri";
import { plans } from "../../utils/plans";
import PlanCard from "./PlanCard";

const SubscribePage = () => {
  const [isClicked, setIsClicked] = useState(true);
  return (
    <div className="z-10 px-2 md:px-0 flex pb-8 flex-col min-h-screen h-full items-center relative">
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <Image layout="fill" objectFit="cover" src={bg} alt="earth-bg" />
      </div>
      <Link
        className="text-2xl absolute left-5 top-5"
        href={`/settings?tab=account`}
      >
        <RiArrowLeftLine />
      </Link>

      <div className="text-center mt-16">
        <h1 className="text-2xl md:text-4xl">
          Choose the plan that&apos;s right for your business
        </h1>

        <p className="text-sm md:text-md mt-2">
          Our transparent pricing makes easy to find a plan that suits your
          needs.
        </p>
      </div>

      <div className="w-[90%] md:w-[50%] mt-9 h-[40px] rounded-lg overflow-hidden bg-white">
        <button
          className={classNames({
            "w-[50%] h-full border-r border-dSecondary transition-all duration-150 ease-linear":
              true,
            "bg-black text-white": isClicked,
          })}
          onClick={() => setIsClicked(true)}
        >
          For individuals
        </button>
        <button
          className={classNames({
            "w-[50%] h-full whitespace-nowrap transition-all duration-150 ease-linear":
              true,
            "bg-black text-white": !isClicked,
          })}
          onClick={() => setIsClicked(false)}
        >
          For Organizations
        </button>
      </div>

      <div className="mt-16 flex-wrap justify-center flex flex-col gap-5 md:gap-8 md:flex-row">
        {isClicked ? (
          <>
            <PlanCard plan={plans.freePlanIndividual} />
            <PlanCard plan={plans.proPlanIndividual} />
          </>
        ) : (
          <>
            <PlanCard plan={plans.freePlanOrg} />
            <PlanCard plan={plans.proPlanOrg} />
          </>
        )}
      </div>
    </div>
  );
};

export default SubscribePage;
