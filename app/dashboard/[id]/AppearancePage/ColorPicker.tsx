import { useDebounce } from "@/app/utils/hooks/useDebounce";
import { Modal, ModalBody, ModalContent } from "@chakra-ui/react";
import { useState } from "react";
import { ChromePicker, CirclePicker } from "react-color";
import { RiSipLine } from "react-icons/ri";

interface Props {
  title: string;
  addColors?: string[];
  isOpen: boolean;
  openPicker: () => void;
  mutateColor: (color: string) => void;
}

const colors = [
  "#F0DBC9",
  "#ACD3D9",
  "#000000",
  "#FFEEE2",
  "#FADDF2",
  "#FCEEBD",
];

const ColorPicker = ({
  title,
  addColors = colors,
  isOpen,
  openPicker,
  mutateColor,
}: Props) => {
  const [color, setColor] = useState("#111");

  const handleColorChange = (updatedColor: any) => {
    const newColor = updatedColor.hex;

    setColor(newColor);
    mutateColor(newColor);
  };

  return (
    <div className="w-full col-span-3 space-y-5 relative">
      <p className="text-xl">{title}</p>
      <div className="flex space-x-5 relative">
        <CirclePicker
          className="w-full h-fit"
          onChange={handleColorChange}
          colors={addColors}
        />
        <span
          onClick={openPicker}
          className="cursor-pointer h-fit flex items-center p-2 border-dPrimary border-[1px] rounded-full"
        >
          <RiSipLine />
        </span>
        {isOpen && (
          <div className="absolute -top-52 left-0">
            <ChromePicker
              color={color}
              onChange={handleColorChange} // Use the handleColorChange function
              disableAlpha
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ColorPicker;
