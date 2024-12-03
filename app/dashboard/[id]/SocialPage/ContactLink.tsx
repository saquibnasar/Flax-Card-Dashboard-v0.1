import React, { useState } from "react";
import Image from "next/image";
import { PhoneNumber } from "@/app/stores/useUserLinks";
import phone from "@/public/social_media_icons/phone.svg";
import classNames from "classnames";

interface Props {
  phoneNumber: PhoneNumber;
}

const ContactLink = ({ phoneNumber }: Props) => {
  const [isChecked, setIsChecked] = useState(true);

  return (
    <div className="flex justify-between items-center border-[0.5px] border-dSecondary rounded-lg p-2">
      <div
        key={phoneNumber.phoneNumber}
        className="flex items-center space-x-2"
      >
        <Image width={50} height={50} src={phone} alt="linkedIn" />
        <h3 className="text-lg">
          {phoneNumber.code + " " + phoneNumber.phoneNumber}
        </h3>
      </div>
      <input
        type="checkbox"
        className={classNames({
          "toggle toggle-md": true,
          "bg-aGreen border-aGreen": isChecked,
        })}
        onChange={() => setIsChecked(!isChecked)}
        checked={isChecked}
      />
    </div>
  );
};

export default ContactLink;
