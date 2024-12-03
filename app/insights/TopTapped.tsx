import { random } from "lodash";
import Image from "next/image";
import SocialMediaItems from "../utils/socialMediaItems";

const TopTapped = () => {
  return (
    <div className="bg-sPrimary p-4 w-full overflow-y-scroll h-[420px] border border-dSecondary rounded-lg">
      <p className="text-md mb-3">Top Tapped Links</p>
      <div className="space-y-5">
        {SocialMediaItems["Link in Bio"].map((link) => (
          <div
            key={link.title}
            className="flex justify-between items-center pb-5 border-b border-dSecondary"
          >
            <div className="w-full h-full flex space-x-3 items-center">
              <div className="avatar">
                <div className="mask mask-squircle w-[50px] h-[50px] relative">
                  <Image src={link.icon} alt="recent_activity_profile" />
                </div>
              </div>

              <p className="text-md">
                {link.title.toLocaleLowerCase().replace("-", " ")}
              </p>
            </div>
            <p>{random(1, 100)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopTapped;
