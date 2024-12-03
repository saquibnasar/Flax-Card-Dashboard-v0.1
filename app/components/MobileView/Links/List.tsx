import { allSocialMediaItems } from "@/app/utils/socialMediaItems";
import Image from "next/image";
import { SocialProps } from "../Socials";

const List = ({
  links,
  theme,
  buttonColor,
  buttonFontColor,
  buttonFill,
}: SocialProps & {
  buttonColor?: string;
  buttonFontColor?: string;
  buttonFill?: string;
}) => {
  return (
    <div className={"w-full space-y-3 overflow-hidden"}>
      {links?.map(
        (link) =>
          link.isActive && (
            <div
              key={link.type}
              style={{ background: buttonColor, color: buttonFontColor }}
              className={`relative w-full flex items-center space-x-2 border border-dSecondary p-2 rounded-${buttonFill} overflow-hidden`}
            >
              <Image
                className={`rounded-${buttonFill}`}
                width={40}
                height={40}
                src={allSocialMediaItems[link.type!].icon}
                alt={link.type}
                objectFit="cover"
                objectPosition="left"
              />
              <p className="absolute left-1/2 transform -translate-x-1/2 font-medium whitespace-nowrap">
                {link.title.charAt(0).toUpperCase() + link.title.slice(1)}
              </p>
            </div>
          )
      )}
    </div>
  );
};

export default List;
