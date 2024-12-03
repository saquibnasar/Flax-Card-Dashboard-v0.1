"use client";

import { socialMediaData } from "@/app/utils/moreSocials";
import SocialLinkButton from "./SocialLinkButton";
import { useState } from "react";

const AddMoreLinks = () => {
  const [category, setCategory] = useState("Recommended");
  const categories = [
    "Recommended",
    "Social",
    "Communication",
    "Business",
    "Payment",
    "Music",
    "More",
  ];

  const filteredSocialData = socialMediaData.filter(
    (social) => social.category === category
  );

  return (
    <>
      <div className="dropdown dropdown-bottom flex justify-end z-10">
        <div tabIndex={0} role="button" className="button-secondary m-1">
          {`Filtered By : ${category}`}
        </div>
        <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
          {categories.map((category) => (
            <li key={category}>
              <button type="button" onClick={() => setCategory(category)}>
                {category}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="grid grid-cols-5 gap-5 my-5">
        {filteredSocialData.map(({ type, title, icon }) => (
          <SocialLinkButton key={type} title={title} type={type} icon={icon} />
        ))}
      </div>
    </>
  );
};

export default AddMoreLinks;
