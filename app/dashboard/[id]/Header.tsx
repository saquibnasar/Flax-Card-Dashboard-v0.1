"use client";

import CroppedImage from "@/app/components/CroppedImage";
import { FileType } from "@/app/utils/entities/UserCardDetails";
import useUpdateUser from "@/app/utils/hooks/useUpdateUser";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { useState } from "react";
import {
  RiAddLine,
  RiArrowLeftLine,
  RiCloseLine,
  RiDeleteBin2Line,
  RiDeleteBinLine,
  RiImage2Line,
  RiPencilLine,
  RiUpload2Line,
  RiUserForbidLine,
} from "react-icons/ri";
import EditCoverProfile from "./EditCoverProfile";
import Button from "@/app/components/Button";
import Dialog from "@/app/components/Dialog";
import ModalForm from "@/app/components/ModalForm";
import { divide } from "lodash";
import Spinner from "@/app/components/Spinner";
import ToggleButton from "@/app/components/ToggleButton";
import placeholder from "@/public/no-cards.svg";

interface Props {
  name: string;
  profileImage?: string | StaticImport | File;
  coverImages?: FileType[];
  employeeId: string;
  slideshow?: boolean;
}

const Header = ({
  name,
  employeeId,
  profileImage,
  coverImages,
  slideshow,
}: Props) => {
  const { mutate, isLoading } = useUpdateUser(employeeId);
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(slideshow || false);
  // const blurDataUrl = getBase64()

  const getFormData = (image: FileType, toDelete: boolean = false) => {
    const formData = new FormData();
    formData.append(`bannerImages[0][id]`, image.id!);
    formData.append(`bannerImages[0][memberId]`, image.memberId!);
    formData.append(`bannerImages[0][type]`, image.type!);
    formData.append(`bannerImages[0][imageUrl]`, image.imageUrl);
    formData.append(`bannerImages[0][shouldDelete]`, JSON.stringify(toDelete));
    formData.append("employeeId", employeeId);

    return formData;
  };

  const addCoverImage = (file: File) => {
    const formData = new FormData();
    formData.append(`bannerImages[0][newImage]`, file);
    formData.append(`bannerImages[0][memberId]`, employeeId);
    formData.append(`bannerImages[0][type]`, "bannerImages");
    formData.append(`bannerImages[0][shouldDelete]`, JSON.stringify(false));
    formData.append("employeeId", employeeId);
    mutate(formData);
  };

  const handleProfileImage = (file: File) => {
    const formData = new FormData();
    formData.append("profileImage", file);
    formData.append("employeeId", employeeId);
    mutate(formData);
  };
  return (
    <>
      <div className="py-2">
        {!coverImages?.length ? (
          <div className="border p-2 border-dSecondary rounded-md relative">
            <p className="text-sm mb-2">Cover Images</p>

            <div className="flex w-full md:max-w-[600px] items-center space-x-2 mb-2">
              <CroppedImage
                name="add-banner-image"
                setFile={addCoverImage}
                aspectRatio={16 / 9}
              >
                <div className="group flex justify-center items-center bg-dPrimary overflow-hidden rounded-md w-[160px] h-[160px]">
                  <span className="text-tSecondary text-2xl">
                    <RiAddLine />
                  </span>
                </div>
              </CroppedImage>
            </div>
          </div>
        ) : (
          // <div className="ml-auto">
          //   {isLoading ? (
          //     <span className="loading loading-spinner loading-xs" />
          //   ) : (
          //     <div className="flex justify-end">
          //       <CroppedImage
          //         name="add-banner-image"
          //         setFile={addCoverImage}
          //         aspectRatio={16 / 9}
          //       >
          //         <div className="ml-2 flex items-center space-x-2 hover:scale-[0.98] transition-all duration-150 active:scale-[0.96] px-8 py-2 bg-black rounded-lg text-center text-white">
          //           <span className="text-xl">
          //             <RiAddLine />
          //           </span>{" "}
          //           Cover Image
          //         </div>
          //       </CroppedImage>
          //     </div>
          //   )}
          // </div>
          <>
            <div className="border p-2 border-dSecondary rounded-md relative">
              <p className="text-sm mb-2">Cover Images</p>

              <div className="flex w-full md:max-w-[600px] items-center space-x-2 my-2 py-2">
                {coverImages?.map((image, index) => (
                  <div
                    key={image.id}
                    className="group overflow-hidden rounded-md w-[160px] h-[160px] relative"
                  >
                    <span
                      className="z-20 cursor-pointer transition-all duration-150 ease-in opacity-0 group-hover:opacity-100 bg-white absolute top-1 right-1 text-lg text-aRed p-2 border-1 border-dSecondary rounded-full"
                      onClick={() => {
                        const formData = getFormData(
                          {
                            id: image.id,
                            memberId: employeeId,
                            imageUrl: image.imageUrl,
                            type: "bannerImages",
                          },
                          true
                        );
                        mutate(formData);
                      }}
                    >
                      {isLoading ? (
                        <span className="loading loading-spinner loading-xs" />
                      ) : (
                        <RiDeleteBinLine />
                      )}
                    </span>
                    <Image
                      className="z-10 bg-tSecondary object-cover hover:scale-[1.1] transition-all duration-150 ease-in"
                      fill
                      src={image.imageUrl}
                      alt={"cover-images"}
                    />
                  </div>
                ))}
              </div>

              <div className="w-full flex p-2 justify-end items-center rounded-md">
                <div className="flex gap-4 items-end">
                  <div className="mb-2 md:hidden">
                    <CroppedImage
                      name="add-banner-image"
                      setFile={addCoverImage}
                      aspectRatio={16 / 9}
                    >
                      <div className="w-fit max-w-fit px-4 text-xs flex items-center space-x-2 hover:scale-[0.98] transition-all duration-150 active:scale-[0.96] py-2 bg-black rounded-lg text-center text-white">
                        <span className="text-sm">
                          <RiAddLine />
                        </span>{" "}
                      </div>
                    </CroppedImage>
                  </div>
                  <div>
                    <p className="text-sm">Auto slide</p>
                    <ToggleButton
                      isChecked={isChecked}
                      onChange={() => {}}
                      setIsChecked={(checked) => {
                        setIsChecked(checked);
                        const formData = new FormData();
                        formData.append(
                          `coverImageSlideShow`,
                          JSON.stringify(checked)
                        );
                        formData.append("employeeId", employeeId);
                        mutate(formData);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="w-full px-4">
        <p className="text-sm mb-2 px-2">Profile picture</p>
        <div className="group z-0 p-2 flex flex-col items-center shadow-3xl border-4 border-white bg-white w-[100px] h-[100px] rounded-full relative">
          <div className="transition-all duration-150 shadow z-20 cursor-pointer rounded-full -bottom-2 right-2 border border-dSecondary absolute">
            <div
              className="p-2 h-fit bg-white rounded-full text-xl"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <RiPencilLine />
            </div>
            <ModalForm
              isOpen={isProfileOpen}
              onClose={() => setIsProfileOpen(false)}
            >
              <div className="flex justify-end">
                <button
                  className="text-xl p-2 hover:bg-sSecondary rounded-full transition-all duration-150 ease-in"
                  type="button"
                  onClick={() => setIsProfileOpen(false)}
                >
                  <RiCloseLine />
                </button>
              </div>

              <div className="space-y-5">
                <div className="group min-w-[400px] w-[300px] h-[300px] max-h-[400px] relative rounded-lg overflow-hidden">
                  {profileImage &&
                  typeof profileImage === "string" &&
                  profileImage !== "undefined" ? (
                    <>
                      <Image
                        className="group bg-tSecondary object-cover hover:scale-[1.1] transition-all duration-150 ease-in"
                        src={profileImage}
                        alt="Profile Image"
                        fill
                      />
                      <button
                        className="absolute opacity-0 group-hover:opacity-100 hover:scale-[1.1] transition-all duration-150 ease-in text-xl right-2 top-2 bg-white text-aRed p-2 rounded-full"
                        type="button"
                        onClick={() => {
                          const formData = new FormData();
                          formData.append(
                            "deleteProfilePic",
                            JSON.stringify(true)
                          );
                          formData.append("employeeId", employeeId);
                          mutate(formData);
                        }}
                      >
                        <RiDeleteBinLine />
                      </button>
                    </>
                  ) : (
                    <div className="w-full text-4xl flex justify-center items-center h-full rounded-lg overflow-hidden bg-tSecondary">
                      <RiUserForbidLine />
                    </div>
                  )}
                </div>
                <div>
                  <div className="flex flex-col">
                    <CroppedImage
                      name="profileImage"
                      aspectRatio={1}
                      setFile={(file) => handleProfileImage(file)}
                    >
                      <div className="px-8 py-3 flex justify-center text-tSecondary border border-dSecondary rounded-md items-center space-x-2 hover:text-black transition-all ease-linear duration-150">
                        {isLoading ? (
                          <Spinner />
                        ) : (
                          <>
                            <span className="mr-2">
                              <RiUpload2Line />
                            </span>
                            <p>Upload Image</p>
                          </>
                        )}
                      </div>
                    </CroppedImage>
                  </div>
                </div>
              </div>
            </ModalForm>
          </div>

          {profileImage &&
          typeof profileImage === "string" &&
          profileImage !== "undefined" ? (
            <div className="overflow-hidden w-[100px] h-[100px] rounded-full">
              {" "}
              <Image
                className="rounded-full"
                src={profileImage}
                alt="profile"
                fill
              />
            </div>
          ) : (
            <div className="h-full flex justify-center items-center text-xl relative rounded-full">
              <RiUserForbidLine />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
