import CroppedImage from "@/app/components/CroppedImage";
import ModalForm from "@/app/components/ModalForm";
import ToggleButton from "@/app/components/ToggleButton";
import { FileType } from "@/app/utils/entities/UserCardDetails";
import useUpdateUser from "@/app/utils/hooks/useUpdateUser";
import placeholder from "@/public/no-cards.svg";
import Image from "next/image";
import { useState } from "react";
import { RiAddLine, RiArrowLeftLine, RiDeleteBinLine } from "react-icons/ri";
interface Props {
  images?: FileType[];
  employeeId: string;
  isOpen: boolean;
  slideShow?: boolean;
  onClose: () => void;
}

const EditCoverProfile = ({
  employeeId,
  images,
  isOpen,
  onClose,
  slideShow,
}: Props) => {
  const [isChecked, setIsChecked] = useState(slideShow || false);
  const { mutate, isLoading } = useUpdateUser(employeeId);
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

  return (
    <ModalForm isOpen={isOpen} onClose={onClose} size="2xl">
      <div className="space-y-10">
        <div className="flex items-center space-x-3">
          <span className="cursor-pointer text-xl" onClick={onClose}>
            <RiArrowLeftLine />
          </span>
          <h3 className="text-[#111]">Cover picture</h3>
        </div>
        {!images?.length ? (
          <div>
            {isLoading ? (
              <span className="loading loading-spinner loading-xs" />
            ) : (
              <div className="w-full flex flex-col items-center justify-center">
                <Image
                  width={360}
                  height={200}
                  src={placeholder}
                  alt="cover-image-placeholder"
                />
                <CroppedImage
                  name="add-banner-image"
                  setFile={addCoverImage}
                  aspectRatio={16 / 9}
                >
                  <p className="hover:scale-[0.98] transition-all duration-150 active:scale-[0.96] px-8 py-2 bg-black rounded-lg text-center text-white">
                    Add Image
                  </p>
                </CroppedImage>
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="w-full flex items-center justify-between">
              <h1>Auto slide</h1>
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
            <div className="flex justify-between items-center w-full text-sm">
              <p className="text-tSecondary">Cover images</p>
              <CroppedImage
                name="add-banner-image"
                setFile={addCoverImage}
                aspectRatio={16 / 9}
              >
                <div className="text-sm">
                  <span className="text-center py-2 px-3 w-[45px] bg-black text-white rounded-lg flex justify-center">
                    {isLoading ? (
                      <span className="loading loading-spinner loading-xs" />
                    ) : (
                      <RiAddLine />
                    )}
                  </span>
                </div>
              </CroppedImage>
            </div>
            <div className="flex items-center space-x-5">
              {images?.map((image, index) => (
                <div
                  key={image.id}
                  className="group overflow-hidden rounded-lg w-[184px] h-[184px] relative"
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
          </>
        )}
      </div>
    </ModalForm>
  );
};

export default EditCoverProfile;
