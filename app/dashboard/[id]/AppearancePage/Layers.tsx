import { ReactNode } from "react";

interface ParentProps {
  children: ReactNode;
  title: string;
}

export const ParentLayer = ({ title, children }: ParentProps) => {
  return (
    <div className="space-y-5">
      <h2 className="text-xl">{title}</h2>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-5 gap-5 border-[2px] border-sSecondary rounded-lg">
        {children}
      </div>
    </div>
  );
};
