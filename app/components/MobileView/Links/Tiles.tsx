import { LinkDTO } from "@/app/stores/useUserLinks";
import classNames from "classnames";
import Image from "next/image";
import { allSocialMediaItems } from "@/app/utils/socialMediaItems";
import { SocialProps, container } from "../Socials";
const Tiles = ({ links, theme }: SocialProps) => {
  return (
    <div
      className={classNames({
        "p-2 rounded-lg items-center": true,
        // "bg-gradient-to-b from-[#333333] to-[#212121] border-none":
        //   theme === "dark",
      })}
    >
      <div
        className={classNames({
          "w-fit mx-auto h-fit overflow-x-hidden flex flex-wrap justify-center gap-3 overflow-y-hidden":
            true,
        })}
      >
        {links?.map(
          (link) =>
            link.value.length > 0 &&
            link.isActive && (
              <div key={link.type}>
                <Image
                  width={42}
                  height={42}
                  className="rounded-full"
                  src={allSocialMediaItems[link.type!].icon}
                  alt={link.type}
                />
                {/* <p className="text-tSecondary text-xs">
                  {link.type.charAt(0).toUpperCase() + link.type.slice(1)}
                </p> */}
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default Tiles;
