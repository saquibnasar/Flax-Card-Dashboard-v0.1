import { useState } from "react";
import { RiImageLine } from "react-icons/ri";
import CroppedImage from "../CroppedImage";
import ToggleButton from "../ToggleButton";
import useUserAdditionalContent from "@/app/stores/useUserAdditionalContent";

interface Props {
  onSubmit: (image: File) => void;
}

const AdditionalImages = ({ onSubmit }: Props) => {
  const [selectedRatio, setSelectedRatio] = useState(1 / 1);
  const {
    additionalImages,
    imageSlideshow,
    setImageSlideShow,
    carouselSize,
    setCarouselSize,
  } = useUserAdditionalContent();

  return (
    <div className="w-full h-full">
      <CroppedImage
        name="additionalImages"
        aspectRatio={selectedRatio}
        setAspectRatio={(ratio) => {
          setSelectedRatio(ratio);
          setCarouselSize(ratio);
        }}
        // multiRatio={!imageSlideshow ? true : false}
        multiRatio={additionalImages.length > 0 ? false : true}
        setFile={(file) => {
          onSubmit(file);

          if (additionalImages.length < 1) {
            setCarouselSize(null);
          }
        }}
      >
        <div className="group bg-sPrimary space-y-2 text-tSecondary flex flex-col items-center justify-center px-10 py-14 rounded-lg relative">
          <div
            // data-tip="Multi-Image will not support in slideshow"
            className="tooltip tooltip-right tooltip-primary flex flex-col items-end group-hover:opacity-100 opacity-0 absolute top-0 right-0 p-2 transition-all duration-200 ease-in"
          >
            <p className="text-tSecondary text-xs">slideshow</p>
            <ToggleButton
              isChecked={imageSlideshow}
              onChange={() => {}}
              setIsChecked={setImageSlideShow}
            />
          </div>
          <span className="text-3xl">
            <RiImageLine />
          </span>
          <p className="text-center whitespace-nowrap">Add Images</p>
        </div>
      </CroppedImage>
    </div>
  );
};

export default AdditionalImages;
