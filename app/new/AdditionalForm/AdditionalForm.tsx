"use client";

import {
  AddedImages,
  AdditionalImages,
  EmbedForm,
  EmbedMap,
  EmbedYoutubeVideo,
  FormattedText,
  Pdf,
} from "@/app/components/AdditionalContent";
import CroppedImage from "@/app/components/CroppedImage";
import ToggleButton from "@/app/components/ToggleButton";
import useUserAdditionalContent from "@/app/stores/useUserAdditionalContent";
import { MotionValue } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { RiAddLine, RiDeleteBin6Line, RiFilePdf2Line } from "react-icons/ri";
import FormContainer from "../FormContainer";
import Submit from "../Submit";
import classNames from "classnames";
import AddCustomLink from "@/app/components/AddCustomLink";
import { TbNorthStar } from "react-icons/tb";

const AdditionalForm = () => {
  const router = useRouter();
  const {
    setCustomLinks,
    setAdditionalImages,
    setBannerImages,
    setBannerSlideShow,
    removeAdditionalImages,
    removeBannerImage,
    bannerImages,
    customLinks,
    additionalImages,
    setTitles,
    setEmbedMedia,
    setPdf,
    setGoogleForm,
  } = useUserAdditionalContent();

  const [isChecked, setIsChecked] = useState(bannerImages.slideshow);

  const imageUrls = useMemo(
    () =>
      additionalImages
        ? additionalImages.map((image) => URL.createObjectURL(image))
        : null,
    [additionalImages]
  );

  const coverImageUrls = useMemo(
    () =>
      bannerImages.images
        ? bannerImages.images.map((image) => URL.createObjectURL(image))
        : null,
    [bannerImages.images]
  );

  return (
    <FormContainer
      title="Additional Content"
      subtitle="Show everyone what you got"
    >
      <form
        onSubmit={(event) => {
          event.preventDefault();
          router.push("/new?tab=theme");
        }}
        className="flex h-[75vh] flex-col justify-between"
      >
        <div className="custom-scrollbar max-h-[60vh] overflow-y-scroll space-y-5  pr-5">
          <div className="flex items-center justify-between">
            <h2 className="text-tSecondary">Cover Pictures</h2>
            <div className="flex space-x-2 items-center">
              <h2 className="text-tSecondary text-sm">Slideshow</h2>
              <ToggleButton
                key={"Toggle"}
                isChecked={isChecked}
                setIsChecked={setIsChecked}
                onChange={() => {
                  setBannerSlideShow(!isChecked);
                }}
              />
            </div>
          </div>
          <div className="flex space-x-5">
            <CroppedImage
              name="coverImages"
              aspectRatio={16 / 9}
              setFile={setBannerImages}
            >
              <div className="w-[160px] h-[160px] space-y-2 bg-sPrimary rounded-2xl flex flex-col justify-center items-center">
                <span className="text-3xl text-tSecondary">
                  <RiAddLine />
                </span>
              </div>
            </CroppedImage>

            {coverImageUrls?.map((cover, index) => (
              <div
                key={`coverImages ${index}`}
                className="relative rounded-2xl overflow-hidden group w-[160px] h-[160px]"
              >
                <span
                  onClick={() => removeBannerImage(bannerImages.images[index])}
                  className="hidden group-hover:block absolute right-1 cursor-pointer top-1 z-10 p-2 bg-sSecondary shadow-md rounded-full"
                >
                  <RiDeleteBin6Line />
                </span>
                <Image
                  src={cover}
                  fill
                  className="object-cover group-hover:scale-[1.10] ease-in duration-100"
                  alt={`coverImage ${index}`}
                />
              </div>
            ))}
          </div>

          <div className="text-tSecondary">
            <h2 className="mb-4">Add Content</h2>
            <div className="grid grid-cols-2 [&>*:nth-child(4n+2)]:col-span-2 lg:grid-cols-3 gap-2">
              <AddCustomLink onSubmit={(link) => setCustomLinks(link)}>
                <div className=" px-10 py-14 w-full h-full space-y-2 bg-sPrimary rounded-2xl flex flex-col justify-center items-center">
                  <span className="text-3xl text-tSecondary">
                    <TbNorthStar />
                  </span>
                  <p className="text-center">Custom Links</p>
                </div>
              </AddCustomLink>
              <div>
                <AdditionalImages
                  onSubmit={(file) => setAdditionalImages(file)}
                />
              </div>
              {additionalImages.length > 0 && imageUrls && (
                <div className="flex col-span-2 space-x-4 relative transition-all duration-150">
                  {imageUrls.map((image, index) => (
                    <div
                      key={image}
                      className="group w-full h-full relative overflow-hidden rounded-lg"
                    >
                      <span
                        onClick={() =>
                          removeAdditionalImages(additionalImages?.[index])
                        }
                        className="hidden text-black group-hover:block absolute right-1 cursor-pointer top-1 z-10 p-2 bg-sSecondary shadow-md rounded-full"
                      >
                        <RiDeleteBin6Line />
                      </span>
                      <Image
                        fill
                        className="group-hover:scale-[1.10] ease-in duration-100 object-cover rounded-lg"
                        src={image}
                        alt="user image"
                      />
                    </div>
                  ))}
                </div>
              )}

              <div>
                <FormattedText onSubmit={(title) => {}} />
              </div>
              <div>
                <Pdf onSubmit={(title, pdfFile) => setPdf(title, pdfFile)}>
                  <div
                    className={classNames({
                      "bg-white cursor-pointer relative group space-y-2 text-tSecondary flex flex-col items-center justify-center px-10 py-14 rounded-lg":
                        true,
                    })}
                  >
                    <span className="text-3xl">
                      <RiFilePdf2Line />
                    </span>

                    <p className="text-center">Pdf</p>
                  </div>
                </Pdf>
              </div>
              <div
              // className={classNames({
              //   "col-span-2": additionalImages.length === 0,
              //   "col-span-1": additionalImages.length > 0,
              // })}
              >
                <EmbedYoutubeVideo
                  onSubmit={(title, link) => setEmbedMedia(title, link)}
                />
              </div>
              <div>
                <EmbedMap />
              </div>
              <div>
                <EmbedForm onSubmit={setGoogleForm} />
              </div>
            </div>
          </div>
        </div>
        <div className="h-[10vh]">
          <Submit label="Next" previous="linkForm" next="theme" />
        </div>
      </form>
    </FormContainer>
  );
};

export default AdditionalForm;
