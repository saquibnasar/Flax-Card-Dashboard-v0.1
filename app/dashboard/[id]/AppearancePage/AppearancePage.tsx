"use client";
import classNames from "classnames";
import { useState } from "react";
import { RiArrowDownSLine, RiImage2Line } from "react-icons/ri";
import Buttons from "./Buttons";
import ColorPicker from "./ColorPicker";
import { ParentLayer } from "./Layers";
import useUpdateUser from "@/app/utils/hooks/useUpdateUser";
import { Appearance } from "@/app/utils/entities/UserCardDetails";
import SelectTheme from "@/app/components/SelectTheme";

interface Props {
  employeeId: string;
  appearance: Appearance;
}

const AppearancePage = ({ employeeId, appearance }: Props) => {
  const [socialStyle, setSocialStyle] = useState(appearance.linkStyle); // Corrected property name

  const [alignmentStyle, setAlignmentStyle] = useState(
    appearance.profileAlignment
  );
  const [backgroundStyle, setBackgroundStyle] = useState(
    appearance.background || ""
  );
  const [colorPicker, setColorPicker] = useState(false);
  const [buttonStyle, setButtonStyle] = useState(appearance.buttonFill || "");
  const [selectedFont, setSelectedFont] = useState({
    value: "",
    label: "Poppins",
  });
  const { mutate } = useUpdateUser(employeeId);
  const fontOptions = [
    { value: "gabriela", label: "Gabriela" },
    { value: "lobster", label: "Lobster" },
    { value: "roboto", label: "Roboto" },
    { value: "kalam", label: "Kalam" },
    { value: "poppins", label: "Poppins" },
  ];
  const childClassNames = (selector: string, label: string) =>
    classNames(
      "flex justify-center bg-sSecondary rounded-lg p-3 h-32 transition-all duration-75 ease-in",
      { "border-4 border-aPurple rounded-lg": selector === label }
    );

  const renderSocialElements = () =>
    socialElements.map((item) => (
      <div
        key={item.value}
        className="cursor-pointer"
        onClick={() => {
          setSocialStyle(item.value);
          const formData = new FormData();
          formData.append("employeeId", employeeId);
          formData.append("appearance[linkStyle]", item.value);
          mutate(formData);
        }}
      >
        <div className={childClassNames(socialStyle, item.value)}>
          {item.element}
        </div>
        <h3 className="text-center mt-2">{item.label}</h3>
      </div>
    ));

  const renderAlignmentOptions = () =>
    ["start", "center", "end"].map((item) => (
      <div
        key={item}
        className="cursor-pointer"
        onClick={() => {
          setAlignmentStyle(item);
          const formData = new FormData();
          formData.append("employeeId", employeeId);
          formData.append("appearance[profileAlignment]", item);
          mutate(formData);
        }}
      >
        <div className={childClassNames(alignmentStyle, item)}>
          <div className={`flex justify-${item} w-full h-full`}>
            <div className="w-20 items-start h-20 rounded-full my-auto bg-dPrimary" />
          </div>
        </div>
        <h3 className="text-center mt-2">
          {item.charAt(0).toUpperCase() + item.slice(1)}
        </h3>
      </div>
    ));

  const socialElements = [
    {
      element: (
        <span className="w-full text-tSecondary flex justify-center items-end h-full text-3xl">
          <RiArrowDownSLine />
        </span>
      ),
      value: "drawer",
      label: "Drawer",
    },
    {
      element: (
        <div className="w-full h-full grid grid-cols-3 items-center gap-1">
          {[1, 2, 3, 4, 5, 6].map((tile) => (
            <div
              key={tile}
              className="bg-dPrimary rounded-full
               h-[40px] w-[40px]"
            />
          ))}
        </div>
      ),
      value: "tiles",
      label: "Tiles",
    },
    {
      element: (
        <div className="w-full space-y-3">
          {[1, 2, 3].map((list) => (
            <div key={list} className="w-full h-[25px] bg-dPrimary" />
          ))}
        </div>
      ),
      value: "list",
      label: "List",
    },
  ];

  return (
    <div>
      <div className="p-2 max-w-full overflow-x-hidden space-y-5 h-fit overflow-y-scroll">
        <ParentLayer title="Choose theme">
          <SelectTheme
            theme="light"
            onChange={(theme) => {
              const formData = new FormData();
              formData.append("employeeId", employeeId);
              formData.append("theme", theme);
              mutate(formData);
            }}
          />
        </ParentLayer>
        <ParentLayer title="Social Links">{renderSocialElements()}</ParentLayer>
        <ParentLayer title="Profile Alignment">
          {renderAlignmentOptions()}
        </ParentLayer>
        <ParentLayer title="Background">
          {[
            { value: "flat", label: "Flat Color" },
            // { value: "image", label: "Image" },
          ].map((item) => (
            <div key={item.value}>
              <div
                className={
                  childClassNames(backgroundStyle, item.value) +
                  " cursor-pointer"
                }
                onClick={() => {
                  setBackgroundStyle(item.value);
                  const formData = new FormData();
                  formData.append("employeeId", employeeId);
                  formData.append("appearance[background]", item.value);
                  mutate(formData);
                }}
              >
                {item.value === "image" && (
                  <span className="w-full h-full flex justify-center items-center text-3xl text-tSecondary">
                    <RiImage2Line />
                  </span>
                )}
              </div>
              <h3 className="text-center mt-2">{item.label}</h3>
            </div>
          ))}
          <ColorPicker
            title="Color"
            mutateColor={(color) => {
              const formData = new FormData();
              formData.append("employeeId", employeeId);
              formData.append("appearance[backgroundColor]", color);
              mutate(formData);
            }}
            isOpen={colorPicker}
            openPicker={() => setColorPicker(!colorPicker)}
          />
        </ParentLayer>

        <div className="space-y-5">
          <h2 className="text-xl">Buttons</h2>
          <div className="w-full grid grid-cols-1 p-5 gap-5 border-[2px] border-sSecondary rounded-lg">
            <Buttons
              employeeId={employeeId}
              buttonStyle={buttonStyle}
              setStyle={(style) => setButtonStyle(style)}
            />
          </div>
        </div>

        <ParentLayer title="Fonts">
          <div className="flex justify-center items-center space-x-5">
            <div className="dropdown dropdown-top dropdown-end">
              <label
                style={{ fontFamily: selectedFont.value }}
                tabIndex={0}
                className="btn m-1"
              >
                {selectedFont.label}
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                {fontOptions.map((font) => (
                  <li
                    style={{ fontFamily: font.value }}
                    key={font.label}
                    onClick={() => {
                      setSelectedFont(font);
                      const formData = new FormData();
                      formData.append("employeeId", employeeId);
                      formData.append("appearance[font]", font.value);
                      mutate(formData);
                    }}
                  >
                    <span>{font.label}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="h-[85%] flex justify-center items-center rounded-lg w-[100px] px-2 bg-dPrimary">
              <h1 style={{ fontFamily: selectedFont.value }}>Aa</h1>
            </div>
          </div>
          {/* <ColorPicker
            mutateColor={() => {}}
            title="Font Color"
            isOpen={false}
            openPicker={() => {}}
          /> */}
        </ParentLayer>
      </div>
      {/* <div className="flex justify-end bg-blue">
        <button className="button-primary">Save</button>
      </div> */}
    </div>
  );
};

export default AppearancePage;
