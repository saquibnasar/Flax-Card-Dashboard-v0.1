"use client";
import classNames from "classnames";
import React from "react";

interface Props {
  isChecked: boolean;
  onChange: (checked: boolean) => void;
  setIsChecked?: (isChecked: boolean) => void;
}

const ToggleButton = ({
  isChecked,
  setIsChecked = () => {},
  onChange,
}: Props) => {
  return (
    <input
      type="checkbox"
      className={classNames({
        "toggle toggle-md": true,
        "bg-aGreen border-aGreen": isChecked,
      })}
      onChange={() => {
        onChange(!isChecked);
        setIsChecked(!isChecked);
      }}
      checked={isChecked}
    />
  );
};

export default ToggleButton;
