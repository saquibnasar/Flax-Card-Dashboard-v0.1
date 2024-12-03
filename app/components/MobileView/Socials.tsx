"use client";

import { LinkDTO } from "@/app/stores/useUserLinks";
import { ReactNode } from "react";
import List from "./Links/List";
import Drawer from "./Links/Drawer";
import Tiles from "./Links/Tiles";
import { Appearance } from "@/app/utils/entities/UserCardDetails";

export const container = (children: ReactNode, type: string) => (
  <div className="flex justify-center flex-col space-y-2">
    <div className="w-[52px] h-[52px] mx-auto relative flex justify-center">
      {children}
    </div>
    <p className="text-[10px] text-center text-tSecondary">{type}</p>
  </div>
);

export interface SocialProps {
  theme?: "light" | "dark";
  links: LinkDTO[];
}

const Socials = ({
  links,
  theme,
  appearance,
}: SocialProps & {
  appearance: Appearance;
}) => {
  return (
    <div>
      {appearance.linkStyle === "tiles" && (
        <Tiles links={links} theme={theme} />
      )}
      {appearance.linkStyle === "drawer" && (
        <Drawer links={links} theme={theme} />
      )}
      {appearance.linkStyle === "list" && (
        <List
          buttonColor={appearance.buttonColor}
          buttonFill={appearance.buttonFill}
          buttonFontColor={appearance.buttonFontColor}
          links={links}
          theme={theme}
        />
      )}
    </div>
  );
};

export default Socials;
