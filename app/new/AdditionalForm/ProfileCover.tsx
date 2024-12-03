import useUserStore from "@/app/stores/store";
import add from "@/public/Icons/add.svg";
import Image from "next/image";
import { ChangeEvent } from "react";

const ProfileCover = () => {
  const { coverImages, setCoverImage } = useUserStore();
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      setCoverImage(selectedFile);
    }
  };

  return (
    <div className="flex space-x-5 overflow-x-scroll">
      <div>
        <label
          htmlFor="fileInput"
          className={`cursor-pointer w-[100px] min-w-[160px] h-[160px] bg-sSecondary rounded-2xl flex flex-col justify-center items-center`}
        >
          <Image src={add} alt="add" />
        </label>
        <input
          className="hidden"
          id="fileInput"
          type="file"
          onChange={handleFileChange}
        />
      </div>
      {coverImages.images.length > 0 &&
        coverImages.images.map((cover) => (
          <div
            key={URL.createObjectURL(cover)}
            className="w-[100px] min-w-[160px] h-[160px] rounded-2xl relative"
          >
            <Image
              className="object-cover border-4 border-white rounded-3xl"
              fill
              src={URL.createObjectURL(cover)}
              alt="profile"
            />
          </div>
        ))}
    </div>
  );
};

export default ProfileCover;
