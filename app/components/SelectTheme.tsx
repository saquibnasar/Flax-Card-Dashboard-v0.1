import classNames from "classnames";
import React, { useState } from "react";

type ThemeType = "light" | "dark";

const themes: { theme: ThemeType; bgColor: string; primaryColor: string }[] = [
  { theme: "light", bgColor: "sSecondary", primaryColor: "sPrimary" },
  { theme: "dark", bgColor: "iSecondary", primaryColor: "iPrimary" },
];

interface Props {
  theme: ThemeType;
  onChange: (theme: ThemeType) => void;
}

const SelectTheme = ({ theme, onChange }: Props) => {
  const [selectedTheme, setSelectedTheme] = useState<ThemeType>(theme);

  type ThemeType = "light" | "dark";

  const handleThemeClick = (theme: ThemeType) => {
    setSelectedTheme(theme);
    onChange(theme);
  };

  return (
    <div className="w-full col-span-3 flex space-x-5 h-[200px]">
      {themes.map(({ theme, bgColor, primaryColor }) => (
        <div
          key={theme}
          className={classNames(
            "cursor-pointer w-full md:w-[40%] rounded-lg overflow-hidden",
            {
              [`bg-${bgColor}`]: true,
              "border-4 border-aPurple": selectedTheme === theme,
            }
          )}
          onClick={() => handleThemeClick(theme)}
        >
          <div
            className={`z-10 w-full h-full mt-[3rem] ml-[3rem] bg-${primaryColor} rounded-lg`}
          />
        </div>
      ))}
    </div>
  );
};

export default SelectTheme;
