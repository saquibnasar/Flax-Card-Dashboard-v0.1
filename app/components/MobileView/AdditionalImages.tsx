import { useMemo } from "react";

import Carousel from "../Carousel";
import SectionContainer from "./SectionContainer";

interface Props {
  additionalImages?: File[] | string[];
  imageSlideshow?: boolean;
}

const AdditionalImages = ({ additionalImages, imageSlideshow }: Props) => {
  const additionalImagesUrl = useMemo(
    () =>
      additionalImages
        ? (additionalImages
            .map((image) =>
              image instanceof File
                ? URL.createObjectURL(image)
                : typeof image === "string"
                ? image
                : null
            )
            .filter(Boolean) as string[]) // Type assertion
        : [],
    [additionalImages]
  );

  if (additionalImages?.length)
    return (
      <SectionContainer>
        {additionalImagesUrl.length > 0 && (
          <Carousel slides={additionalImagesUrl} slideshow={imageSlideshow} />
        )}
      </SectionContainer>
    );
};

export default AdditionalImages;
