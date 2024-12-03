import { Appearance } from "@/app/utils/entities/UserCardDetails";
import classNames from "classnames";
import Image from "next/image";
import { useMemo } from "react";
import Carousel from "../Carousel";

interface Props {
  bannerImages?: File[] | string[];
  name: string;
  designation?: string;
  employeeBio?: string;
  companyName: string;
  profileImage?: File | string;
  coverImageSlideShow?: boolean;
  appearance: Appearance;
}

const ProfileHeader = ({
  name,
  designation,
  employeeBio,
  companyName,
  profileImage,
  coverImageSlideShow,
  bannerImages,
  appearance,
}: Props) => {
  const coverImageUrl = useMemo(
    () =>
      bannerImages
        ? (bannerImages
            .map((image) =>
              image instanceof File
                ? URL.createObjectURL(image)
                : typeof image === "string"
                ? image
                : null
            )
            .filter(Boolean) as string[])
        : [],
    [bannerImages]
  );
  const imageUrl = useMemo(
    () =>
      profileImage instanceof File
        ? URL.createObjectURL(profileImage)
        : typeof profileImage === "string"
        ? profileImage
        : null,
    [profileImage]
  );

  return (
    <div className="w-full space-y-6">
      <div>
        <div className={`${bannerImages?.length ? "h-[210px]" : "h-fit"}`}>
          {coverImageUrl.length > 0 && (
            <Carousel slides={coverImageUrl!} slideshow={coverImageSlideShow} />
          )}

          <div
            className={
              `text-${appearance.profileAlignment} items-${appearance.profileAlignment} w-full space-y-6 z-20 py-2 flex-col flex px-2 relative ` +
              classNames({
                "-mt-12 md:-mt-16 lg:-mt-18 2xl:-mt-20": bannerImages?.length,
              })
            }
          >
            {imageUrl !== "undefined" && imageUrl ? (
              <Image
                className="rounded-full border-4 border-dSecondary  w-[84px] h-[84px]"
                width={84}
                height={84}
                src={imageUrl}
                alt="profile"
              />
            ) : (
              !bannerImages?.length &&
              name && (
                <div className="rounded-full text-primary flex justify-center items-center bg-secondary w-[84px] h-[84px]">
                  <h1 className="font-bold text-3xl">{name[0]}</h1>
                </div>
              )
            )}
          </div>
        </div>
        <div className={`flex flex-col px-4 text-center`}>
          {name && (
            <h1
              className={`text-[20px] font-bold text-${appearance.profileAlignment}`}
            >
              {name}
            </h1>
          )}
          {designation && (
            <p
              className={`text-sm text-tSecondary text-${appearance.profileAlignment}`}
            >{`${designation} ${companyName && `at ${companyName}`}`}</p>
          )}
          {employeeBio && (
            <p
              className={`py-6 text-xs text-${appearance.profileAlignment} text-tSecondary`}
            >
              {employeeBio}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
