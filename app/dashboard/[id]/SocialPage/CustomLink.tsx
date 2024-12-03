import ToggleButton from "@/app/components/ToggleButton";
import { CustomLinksProps } from "@/app/stores/useUserAdditionalContent";
import useUpdateUser from "@/app/utils/hooks/useUpdateUser";
import link from "next/link";
import React, { useState } from "react";
import { RiDraggable, RiDeleteBinLine } from "react-icons/ri";
import { TbNorthStar } from "react-icons/tb";

interface Props {
  customLinksLength: number;
  link: CustomLinksProps;
  employeeId: string;
  index: number;
}

const CustomLink = ({ customLinksLength, link, employeeId, index }: Props) => {
  const { mutate, isLoading } = useUpdateUser(employeeId);
  const [isChecked, setIsChecked] = useState(link.isActive || false);

  return (
    <div className="group relative flex justify-between items-center border-[0.5px] border-dSecondary rounded-lg p-2">
      <div className="flex items-center space-x-2">
        <span className="cursor-grab">
          <RiDraggable />
        </span>
        <div className="avatar placeholder cursor-pointer">
          <div className="text-neutral-content rounded-lg w-[44px] h-[44px] bg-black">
            <span className="text-2xl text-white line-clamp-1">
              <TbNorthStar />
            </span>
          </div>
        </div>

        <h3 className="text-md">{new URL(link.url).hostname}</h3>
      </div>
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <ToggleButton
          isChecked={isChecked}
          onChange={() => {
            const formData = new FormData();
            formData.append(`customLinks[${index}][id]`, link.id!);
            formData.append(
              `customLinks[${index}][isActive]`,
              JSON.stringify(!isChecked)
            );
            formData.append(
              `customLinks[${index}][widgetStyle]`,
              link.widgetStyle
            );
            formData.append(`customLinks[${index}][url]`, link.url);
            formData.append(`employeeId`, employeeId);
            mutate(formData);
          }}
          setIsChecked={() => setIsChecked((checked) => !checked)}
        />
      </button>

      <span
        onClick={(event) => {
          event.stopPropagation();
          const index = customLinksLength;
          const formData = new FormData();
          formData.append(`customLinks[${index}][url]`, link.url);
          formData.append(`customLinks[${index}][id]`, link.id!);
          formData.append(`customLinks[${index}][buttonType]`, link.buttonText);
          formData.append(
            `customLinks[${index}][isActive]`,
            JSON.stringify(true)
          );
          formData.append(
            `customLinks[${index}][widgetStyle]`,
            link.widgetStyle
          );
          formData.append(
            `customLinks[${index}][shouldDelete]`,
            JSON.stringify(true)
          );
          formData.append(`employeeId`, employeeId);
          mutate(formData);
        }}
        className="cursor-pointer opacity-0 absolute group-hover:opacity-100 p-2 text-aRed text-lg bg-white border border-dSecondary rounded-full -top-3 -right-3 transition-all duration-250 ease-linear"
      >
        <RiDeleteBinLine />
      </span>
    </div>
  );
};

export default CustomLink;
