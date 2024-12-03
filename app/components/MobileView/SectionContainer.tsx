import { ReactNode } from "react";

const SectionContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="rounded-2xl h-full">
      <div className="">{children}</div>
    </div>
  );
};

export default SectionContainer;
