import CroppedImage from "@/app/components/CroppedImage";
import useUserStore from "@/app/stores/store";
import { useEffect, useState } from "react";
import { RiImage2Line } from "react-icons/ri";

const Images = () => {
  const { setImages } = useUserStore();
  const [selectedRatio, setSelectedRatio] = useState(1 / 1);

  useEffect(() => {
    console.log("Selected Ratio State:", selectedRatio);
  }, [selectedRatio]);

  return (
    <div className="w-full h-full">
      <CroppedImage
        name="additionalImages"
        aspectRatio={selectedRatio}
        setAspectRatio={(ratio) => setSelectedRatio(ratio)}
        multiRatio={true}
        setFile={setImages}
      >
        <div className="w-full h-[160px] space-y-2 bg-sSecondary rounded-2xl flex flex-col justify-center items-center">
          <span className="text-3xl text-tSecondary">
            <RiImage2Line />
          </span>
          <p>Images Here</p>
        </div>
      </CroppedImage>
    </div>
  );
};

export default Images;
