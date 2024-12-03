import classNames from "classnames";
import React from "react";

interface Props {
  variant: "primary" | "secondary";
  label: string;
}

const Badge = ({ variant, label }: Props) => {
  return (
    <span
      className={classNames({
        "absolute top-5 left-5 text-xs rounded-lg px-2 py-2": true,
        "bg-aGreen bg-opacity-10 text-aGreen": variant === "primary",
        "bg-aPurple bg-opacity-10 text-aPurple": variant === "secondary",
      })}
    >
      <p>{label}</p>
    </span>
  );
};

export default Badge;
