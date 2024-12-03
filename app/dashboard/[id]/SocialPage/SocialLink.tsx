import ModalForm from "@/app/components/ModalForm";
import TextInput from "@/app/components/TextInput";
import { LinkDTO } from "@/app/stores/useUserLinks";
import useUpdateUser from "@/app/utils/hooks/useUpdateUser";
import { allSocialMediaItems } from "@/app/utils/socialMediaItems";
import classNames from "classnames";
import { getCookie } from "cookies-next";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { RiArrowLeftLine, RiDeleteBinLine, RiDraggable } from "react-icons/ri";
import placeholder from "@/public/socials/placeholder.svg";
import Spinner from "@/app/components/Spinner";
import { linkSync } from "fs";
import MobileNumberInput from "@/app/components/MobileNumberInput";
import { PhoneInput } from "react-international-phone";

interface Props {
  links?: LinkDTO[];
  link: LinkDTO;
  index: number;
  employeeId: string;
  isSocial: boolean;
  icon?: StaticImport;
  isDirectEnable?: boolean;
  isActive?: boolean;
  isNumber?: boolean;
}

const SocialLink = ({
  isSocial,
  isNumber,
  icon = placeholder,
  isDirectEnable = false,
  isActive,
  links,
  employeeId,
  link,
  index,
}: Props) => {
  const [isChecked, setIsChecked] = useState(link.isActive);
  const [isOpened, setIsOpened] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(link.value);

  const { control, handleSubmit } = useForm();
  const { mutate, isLoading } = useUpdateUser(employeeId);

  const handleOnSubmit = handleSubmit(async (data) => {
    const formData = new FormData();
    formData.append(`employeeId`, employeeId);

    link.id && formData.append(`links[${index}][id]`, link.id);
    formData.append(`links[${index}][title]`, data.title);
    formData.append(
      `links[${index}][value]`,
      isNumber ? phoneNumber : data.link
    );
    formData.append(`links[${index}][isActive]`, link.isActive.toString());
    formData.append(`links[${index}][type]`, link.type);

    mutate(formData);
    setIsOpened(false);
  });
  return (
    <div className="group relative flex justify-between items-center border-[0.5px] border-dSecondary rounded-lg p-2">
      <div key={link.id} className="flex items-center space-x-2">
        <span className="cursor-grab">
          <RiDraggable />
        </span>

        {isSocial ? (
          <div
            className="cursor-pointer flex items-center space-x-2"
            onClick={() => setIsOpened(true)}
          >
            <Image
              className="cursor-pointer"
              width={44}
              height={44}
              src={allSocialMediaItems[link.type!].icon}
              alt={link.type}
            />
            <h3 className="text-lg">{link.title}</h3>
          </div>
        ) : (
          <>
            <Image src={icon} alt="" />
            <h3 className="text-lg">{link.title}</h3>
          </>
        )}
      </div>

      <input
        type="checkbox"
        className={classNames({
          "toggle toggle-md": true,
          "bg-aGreen border-aGreen": link.isActive,
        })}
        onChange={() => {
          const formData = new FormData();
          formData.append(`employeeId`, employeeId);

          if (!isDirectEnable) {
            link.id && formData.append(`links[${index}][id]`, link.id);
            formData.append(`links[${index}][title]`, link.title);
            formData.append(`links[${index}][value]`, link.value);
            formData.append(`links[${index}][type]`, link.type);
            formData.append(
              `links[${index}][isActive]`,
              JSON.stringify(!isChecked)
            );
            formData.append(
              `links[${index}][shouldDelete]`,
              JSON.stringify(false)
            );
          } else {
            links?.forEach((socialLink, index) => {
              if (socialLink.id === link.id) {
                socialLink.id &&
                  formData.append(`links[${index}][id]`, socialLink.id);
                formData.append(`links[${index}][title]`, socialLink.title);
                formData.append(`links[${index}][value]`, socialLink.value);
                formData.append(`links[${index}][type]`, socialLink.type);

                formData.append(
                  `links[${index}][shouldDelete]`,
                  JSON.stringify(false)
                );
                formData.append(
                  `links[${index}][isActive]`,
                  JSON.stringify(true)
                );
              } else {
                socialLink.id &&
                  formData.append(`links[${index}][id]`, socialLink.id!);
                formData.append(`links[${index}][title]`, socialLink.title);
                formData.append(`links[${index}][value]`, socialLink.value);
                formData.append(`links[${index}][type]`, socialLink.type);
                formData.append(
                  `links[${index}][shouldDelete]`,
                  JSON.stringify(false)
                );
                formData.append(
                  `links[${index}][isActive]`,
                  JSON.stringify(false)
                );
              }
            });
          }
          mutate(formData);
          setIsChecked(!isChecked);
        }}
        checked={link.isActive}
      />
      {/* {isDirectEnable ? (
        <p
          className={classNames({
            "text-aGreen": isActive,
            "text-aRed": !isActive,
          })}
        >
          {isActive ? "Active" : "Deactivated"}
        </p>
      ) : (
       
      )} */}
      <span
        onClick={() => {
          const formData = new FormData();

          formData.append(`employeeId`, employeeId);
          link.id && formData.append(`links[${index}][id]`, link.id);
          formData.append(`links[${index}][title]`, link.title);
          formData.append(`links[${index}][value]`, link.value);
          formData.append(`links[${index}][isActive]`, JSON.stringify(true));
          formData.append(`links[${index}][type]`, link.type);
          formData.append(
            `links[${index}][shouldDelete]`,
            JSON.stringify(true)
          );

          // Check if the length of the links array is 1
          if (links?.length === 1) {
            formData.append(
              `links[${index}][directModeOn]`,
              JSON.stringify(false)
            );
          }

          mutate(formData);
        }}
        className="cursor-pointer opacity-0 absolute group group-hover:opacity-100 p-2 text-aRed text-lg bg-white border border-dSecondary rounded-full -top-4 -right-2 transition-all duration-250 ease-linear"
      >
        <RiDeleteBinLine />
      </span>

      <ModalForm isOpen={isOpened} onClose={() => setIsOpened(false)}>
        <form onSubmit={handleOnSubmit} className="space-y-3">
          <div className="flex items-center space-x-2">
            <span
              className="text-xl cursor-pointer"
              onClick={() => setIsOpened(false)}
            >
              {isLoading ? <Spinner /> : <RiArrowLeftLine />}
            </span>
            <h4>{link.title}</h4>
          </div>
          <TextInput
            label="Title"
            defaultValue={link.title || ""}
            name="title"
            control={control}
            isTitle
          />
          {isNumber ? (
            <div className="w-full bg-sSecondary py-2 border border-dSecondary rounded-lg">
              <PhoneInput
                style={{ width: "full" }}
                inputStyle={{
                  background: "#F7F7F7",
                  fontSize: "16px",
                  minWidth: "full",
                  width: "full",
                  paddingTop: "8px",
                  paddingBottom: "8px",
                  border: "none",
                  height: "full",
                }}
                countrySelectorStyleProps={{
                  buttonStyle: { background: "#F7F7F7", border: "none" },
                  style: { background: "#F7F7F7", border: "none" },
                }}
                value={phoneNumber}
                defaultCountry="in"
                onChange={setPhoneNumber}
              />
            </div>
          ) : (
            <TextInput
              label="Link"
              defaultValue={link.value}
              name="link"
              control={control}
            />
          )}
          <div className="flex justify-end space-x-3">
            <button className="button-primary" type="submit">
              Save
            </button>
          </div>
        </form>
      </ModalForm>
    </div>
  );
};

export default SocialLink;
