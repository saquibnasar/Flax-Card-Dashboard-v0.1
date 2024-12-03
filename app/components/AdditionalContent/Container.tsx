import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  label: string;
  icon: any;
}
const Container = ({ children, label, icon }: Props) => {
  return (
    <div className="bg-sSecondary space-y-2 text-tSecondary flex flex-col items-center justify-center px-10 py-14 rounded-lg">
      <span className="text-3xl">{icon}</span>
      <p className="text-center">{label}</p>
    </div>
  );
};

export default Container;
