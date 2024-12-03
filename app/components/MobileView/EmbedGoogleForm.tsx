import Popup from "@/app/components/MobileView/Popup";
import useUserAdditionalContent from "@/app/stores/useUserAdditionalContent";
import gForm from "@/public/Icons/colored_g_form.svg";
import Image from "next/image";
import { useState } from "react";
import Popover from "./Popover";
import classNames from "classnames";
import { embedMediaType } from "@/app/utils/entities/UserCardDetails";
interface Props {
  googleForm?: embedMediaType;
  theme?: "light" | "dark";
}

const EmbedGoogleForm = ({ googleForm, theme }: Props) => {
  const [isClicked, setIsClicked] = useState(false);
  if (googleForm)
    return (
      <>
        <div>
          <div
            className={classNames({
              "cursor-pointer transition-all duration-150 ease-linear p-3 flex items-center space-x-1 rounded-lg":
                true,
              "bg-gradient-to-b from-[#333333] to-[#212121] border-none":
                theme === "dark",
              "bg-white shadow-lg border border-dSecondary": theme === "light",
            })}
            onClick={() => setIsClicked(true)}
          >
            <Image src={gForm} alt="gform" />
            <p className="text-sm">
              {googleForm.title ? googleForm.title : "Take a look at it!"}
            </p>
          </div>
        </div>

        <Popover isOpen={isClicked} setIsOpen={setIsClicked}>
          <iframe
            src={googleForm?.value}
            className="overflow-y-scroll min-h-[500px] no-scrollbar rounded-lg"
            height="500"
            width="290"
            style={{ border: "none", overflow: "hidden" }}
            allowFullScreen
          >
            loading...
          </iframe>
        </Popover>
        {/* {googleForm.link && (
          <Popup isOpen={isClicked} setIsOpen={setIsClicked}>
            <iframe
              src={googleForm.link}
              className="w-full h-full"
              style={{ overflow: "hidden", border: "none" }}
            />
          </Popup>
        )} */}
      </>
    );
};

export default EmbedGoogleForm;
