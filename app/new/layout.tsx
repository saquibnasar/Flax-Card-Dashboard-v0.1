"use client";

import { PropsWithChildren, useMemo } from "react";
import MobileView from "../components/MobileView/MobileView";
import useUserDetailsStore from "../stores/useUserDetailsStore";
import UserCardDetails from "../utils/entities/UserCardDetails";
import useUserAdditionalContent from "../stores/useUserAdditionalContent";
import useUserLinksStore from "../stores/useUserLinks";

const NewCardPageLayout = ({ children }: PropsWithChildren) => {
  const {
    name,
    designation,
    employeeId,
    employeeBio,
    companyName,
    profileImage,
    profileUrl,
  } = useUserDetailsStore();

  const { links } = useUserLinksStore();
  const {
    theme,
    titles,
    enableContact,
    additionalImages,
    bannerImages: { images, slideshow },
    pdf,
    customLinks,
    imageSlideshow,
    embedMap,
    embedMedia,
    googleForm,
  } = useUserAdditionalContent();

  const additionalImagesUrl = useMemo(
    () =>
      additionalImages
        ? additionalImages.map((image) => URL.createObjectURL(image))
        : [],
    [additionalImages]
  );

  const bannerImageUrl = useMemo(
    () => (images ? images.map((image) => URL.createObjectURL(image)) : []),
    [images]
  );
  const cardDetails: UserCardDetails = {
    name,
    companyName,
    designation,
    employeeId,
    employeeBio,
    profileImage,
    profileUrl,
    links,
    titles,
    bannerImages: bannerImageUrl.map((image) => {
      return { imageUrl: image };
    }),
    customLinks,
    coverImageSlideShow: slideshow,
    additionalImageSlideShow: imageSlideshow,
    embedMedia,
    googleForm,
    location: embedMap,
    // pdf: { title: pdf.title, value: pdf.pdfFile},
    theme,
    enableContact,
    additionalImages: additionalImagesUrl.map((image) => {
      return { imageUrl: image };
    }),
    appearance: {
      background: "image",
      backgroundColor: "",
      buttonColor: "",
      buttonFontColor: "",
      buttonFill: "lg",
      font: "",
      fontColor: "",
      profileAlignment: "center",
      linkStyle: "drawer",
    },
  };

  return (
    <div className="flex flex-col w-full lg:flex-row lg:space-x-5">
      <div className="w-full lg:w-[50%] h-full md:h-screen shadow-base-300">
        {children}
      </div>

      <div className="w-full bg-sPrimary lg:w-[50%] flex items-center justify-center h-screen">
        <MobileView cardDetails={cardDetails} />
      </div>
    </div>
  );
};

export default NewCardPageLayout;
