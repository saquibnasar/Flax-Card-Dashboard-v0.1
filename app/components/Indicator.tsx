import React, { PropsWithChildren } from "react";
import indicator from "@/public/indicator.svg";
import Image from "next/image";

const Indicator = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <p>{children}</p>
      <Image width={200} height={30} src={indicator} alt="indicator" />
    </div>
  );
};

export default Indicator;
