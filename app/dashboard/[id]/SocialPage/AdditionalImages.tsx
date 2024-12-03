import CroppedImage from "@/app/components/CroppedImage";
import ToggleButton from "@/app/components/ToggleButton";
import { FileType } from "@/app/utils/entities/UserCardDetails";
import useUpdateUser from "@/app/utils/hooks/useUpdateUser";
import Image from "next/image";
import { useState } from "react";
import { RiAddLine, RiDeleteBinLine } from "react-icons/ri";

interface Props {
  slideshow?: boolean;
  images?: FileType[];
  employeeId: string;
  carouselSize?: number;
}

const AdditionalImages = ({
  carouselSize,
  slideshow,
  images,
  employeeId,
}: Props) => {
  const { mutate, isLoading } = useUpdateUser(employeeId);
  // const [selectRatio, setSelectedRatio] = useState(carouselSize || 1);
  const [isChecked, setIsChecked] = useState(slideshow || false);

  if (images?.length)
    return (
      <div className="rounded-lg border border-dSecondary p-4 space-y-4">
        <div className="flex justify-between items-center">
          <p className="text-tSecondary ">Images</p>
          <div className="flex space-x-3 items-center">
            <div>
              <p className="text-tSecondary text-xs">Auto Slide</p>
              <ToggleButton
                onChange={(checked) => {
                  const formData = new FormData();
                  formData.append(
                    `additionalImageSlideShow`,
                    JSON.stringify(checked)
                  );
                  formData.append("employeeId", employeeId);
                  mutate(formData);
                }}
                isChecked={isChecked}
                setIsChecked={(checked) => {
                  setIsChecked(checked);
                }}
              />
            </div>
            <CroppedImage
              name="update-additional-image"
              aspectRatio={carouselSize || 1}
              setAspectRatio={(ratio) => {
                // setSelectedRatio(ratio);
                const formData = new FormData();
                formData.append(`employeeId`, employeeId);
                formData.append(`carouselSize`, JSON.stringify(ratio));
                mutate(formData);
              }}
              setFile={(file) => {
                const formData = new FormData();
                formData.append(`additionalImages[0][newImage]`, file);
                formData.append(`additionalImages[0][memberId]`, employeeId);
                formData.append(
                  `additionalImages[0][type]`,
                  "additionalImages"
                );
                formData.append(
                  `additionalImages[0][shouldDelete]`,
                  JSON.stringify(false)
                );

                formData.append("employeeId", employeeId);
                mutate(formData);
              }}
              multiRatio={images?.length > 0 ? false : true}
            >
              <div>
                <span className="text-center py-2 px-3 w-[45px] bg-black text-white rounded-lg flex justify-center">
                  <RiAddLine />
                </span>
              </div>
            </CroppedImage>
          </div>
        </div>

        <div className="flex items-center space-x-5">
          {images?.map((image, index) => (
            <div
              key={image.id}
              className="group overflow-hidden rounded-lg w-[164px] h-[164px] relative"
            >
              <span
                className="z-20 cursor-pointer transition-all duration-150 ease-in opacity-0 group-hover:opacity-100 bg-white absolute top-1 right-1 text-lg text-aRed p-2 border-1 border-dSecondary rounded-full"
                onClick={() => {
                  const formData = new FormData();
                  formData.append(`additionalImages[${index}][id]`, image.id!);
                  formData.append(
                    `additionalImages[${index}][memberId]`,
                    image.memberId!
                  );
                  formData.append(
                    `additionalImages[${index}][type]`,
                    image.type!
                  );
                  formData.append(
                    `additionalImages[${index}][imageUrl]`,
                    image.imageUrl
                  );
                  formData.append(
                    `additionalImages[${index}][shouldDelete]`,
                    JSON.stringify(true)
                  );
                  formData.append("employeeId", employeeId);

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
                // loader={imageLoader}

                // priority={true}
                className="z-0 object-cover bg-tSecondary hover:scale-[1.1] transition-all duration-150 ease-in"
                fill
                src={image.imageUrl}
                alt={"cover-images"}
              />
            </div>
          ))}
        </div>
      </div>
    );
};

export default AdditionalImages;
