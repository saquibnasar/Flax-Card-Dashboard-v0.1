import React, { PropsWithChildren } from "react";

const HeaderText = ({ children }: PropsWithChildren) => {
  return <h2 className="font-bold text-lg">{children}</h2>;
};

export default HeaderText;
