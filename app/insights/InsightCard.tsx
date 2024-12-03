import { stat } from "fs";
import React from "react";

interface Props {
  title: string;
  count: number;
  stats: string;
}

const InsightCard = ({ title, count, stats }: Props) => {
  return (
    <div className="flex flex-col justify-between bg-sPrimary h-[110px] md:h-[134px] border py-4 px-3 md:px-7 border-dSecondary rounded-lg">
      <p className="text-md text-tSecondary">{title}</p>
      <h1 className="text-4xl">{count}</h1>
      <p className="text-md">
        {" "}
        <span className="text-aGreen">{stats}</span> from last month
      </p>
    </div>
  );
};

export default InsightCard;
