import useUpdateUser from "@/app/utils/hooks/useUpdateUser";
import classNames from "classnames";
import { useState } from "react";
import ColorPicker from "./ColorPicker";

interface Props {
  buttonStyle: string;
  setStyle: (style: string) => void;
  employeeId: string;
}

const Buttons = ({ buttonStyle, setStyle, employeeId }: Props) => {
  const [openColor, setOpenColor] = useState(false);
  const [openFontColor, setOpenFontColor] = useState(false);
  const { mutate } = useUpdateUser(employeeId);

  return (
    <>
      <div className="grid w-full my-5 grid-cols-1 md:flex gap-5">
        {["none", "lg", "full"].map((item) => (
          <div
            key={item}
            className={
              `h-10 w-full bg-dPrimary rounded-${item} transition-all duration-75 ease-in cursor-pointer ` +
              classNames({ "border-4 border-aPurple": item === buttonStyle })
            }
            onClick={() => {
              setStyle(item);
              const formData = new FormData();
              formData.append("employeeId", employeeId);
              formData.append("appearance[buttonFill]", item);
              mutate(formData);
            }}
          />
        ))}
      </div>
      <ColorPicker
        addColors={[
          "#FFF",
          "#000000",
          "#ACD3D9",
          "#FFEEE2",
          "#FADDF2",
          "#FCEEBD",
        ]}
        mutateColor={(color) => {
          const formData = new FormData();
          formData.append("employeeId", employeeId);
          formData.append("appearance[buttonColor]", color);
          mutate(formData);
        }}
        title="Button Color"
        isOpen={openColor}
        openPicker={() => setOpenColor(!openColor)}
      />
      <ColorPicker
        mutateColor={(color) => {
          const formData = new FormData();
          formData.append("employeeId", employeeId);
          formData.append("appearance[buttonFontColor]", color);
          mutate(formData);
        }}
        addColors={[
          "#FFF",
          "#000000",
          "#ACD3D9",
          "#FFEEE2",
          "#FADDF2",
          "#FCEEBD",
        ]}
        title="Button Font Color"
        isOpen={openFontColor}
        openPicker={() => setOpenFontColor(!openFontColor)}
      />
    </>
  );
};

export default Buttons;
