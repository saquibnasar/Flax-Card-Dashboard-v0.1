import useUserAdditionalContent from "@/app/stores/useUserAdditionalContent";
import Image from "next/image";
import { RiDeleteBin6Line } from "react-icons/ri";

const AddedImages = ({ images }: { images?: string[] }) => {
  const { additionalImages, removeAdditionalImages } =
    useUserAdditionalContent();
  return (
    <div className="w-full">
      {images?.length !== 0 && (
        <div className={`flex items-center space-x-3 duration-100`}>
          {images?.map((image, index) => (
            <div
              key={image.toString()}
              className={`min-w-[120px] group h-full rounded-2xl relative col-span-1`}
            >
              <span
                onClick={() => removeAdditionalImages(additionalImages[index])}
                className="hidden group-hover:block absolute right-1 cursor-pointer top-1 z-10 p-2 bg-sSecondary shadow-md rounded-full"
              >
                <RiDeleteBin6Line />
              </span>
              <Image
                className="object-cover rounded-lg"
                fill
                src={image}
                alt="user image"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddedImages;
