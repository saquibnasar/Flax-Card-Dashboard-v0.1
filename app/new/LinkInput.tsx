import React, { useState } from "react";
import useUserLinksStore, { LinkDTO } from "../stores/useUserLinks";
import Image from "next/image";
import styled from "styled-components";
import classNames from "classnames";
import { SocialMediaItem } from "../utils/socialMediaItems";
import { useForm } from "react-hook-form";
import { RiCloseLine } from "react-icons/ri";
import MobileNumberInput from "../components/MobileNumberInput";
import { isValidUrl } from "../components/CustomLinkInput";

const InputButton = styled.button<{ background: string }>`
  padding: 6px 12px;
  background: ${(props) => props.background};
  border-radius: 12px;
  transition: all;
  transition-duration: 150ms;

  transition: ease-in;

  &:hover {
    scale: 0.98;
  }
  &:active {
    scale: 0.96;
  }
`;

interface CustomLinkProps {
  url: string;
}

interface Props {
  social: SocialMediaItem;
  updateLink: (links: LinkDTO) => void;
  bgColor?: string;
  phoneInputBg?: string;
  directModeOn?: boolean;
}

const LinkInput = ({
  social,
  phoneInputBg,
  directModeOn,
  bgColor = "sPrimary",
  updateLink,
}: Props) => {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();
  const { links, deleteLink } = useUserLinksStore();
  const [inputValue, setInputValue] = useState(
    links.find((link) => link.title === social.title)?.value || ""
  );

  return (
    <div
      key={social.title}
      className="flex items-center space-x-2 md:space-x-5"
    >
      <Image
        className="w-[46px] h-[46px] md:h-[56px] md:w-[56px]"
        width={56}
        height={56}
        src={social.icon}
        alt={social.title}
      />
      <div
        className={
          `bg-${bgColor} ` +
          classNames({
            "flex group space-x-2 w-full h-[56px] px-3 rounded-lg": true,
          })
        }
      >
        <div className="w-full h-full flex items-center justify-between space-x-1 transition-all duration-150">
          {social.isNumber ? (
            <div className="w-fit">
              <MobileNumberInput
                bg={phoneInputBg}
                onChange={(phoneNumber) => {
                  setInputValue(phoneNumber);
                  // updateLink({
                  //   isActive: true,
                  //   value: phoneNumber,
                  //   title: social.title,
                  //   type: social.type!,
                  // });
                }}
              />
            </div>
          ) : (
            <>
              <p>@</p>
              <input
                {...register(social.type!)}
                className={`w-full h-4 md:h-full bg-${bgColor} border-none outline-none`}
                placeholder={social.placeholder}
                value={inputValue}
                defaultValue={
                  links.find((link) => link.title === social.title)?.value || ""
                }
                onChange={(event) => {
                  setInputValue(event.currentTarget.value);
                }}
              />
            </>
          )}

          {links.find((link) => link.title === social.title)?.value ? (
            <span
              className="shadow text-2xl p-2 transition-all duration-200 hover:bg-sSecondary rounded-lg cursor-pointer"
              onClick={() => {
                deleteLink(social.type!);
                setInputValue("");
              }}
            >
              <RiCloseLine />
            </span>
          ) : inputValue?.length > 0 ? (
            <InputButton
              background="#60ff7b"
              type="submit"
              className="hidden text-white bg-opacity-70 shadow h-fit rounded-lg group-hover:block"
              onClick={handleSubmit((data) => {
                updateLink({
                  isActive: directModeOn ? false : true,
                  value: inputValue,
                  title: social.title,
                  type: social.type!,
                });
              })}
            >
              Add
            </InputButton>
          ) : (
            <InputButton
              background="#F7F7F7"
              type="button"
              className="hidden bg-opacity-70 shadow h-fit rounded-lg group-hover:block"
              onClick={async () => {
                const text = await navigator.clipboard.readText();

                updateLink({
                  isActive: directModeOn ? false : true,
                  value: text,
                  title: social.title,
                  type: social.type!,
                });
                // setLinks({
                //   isActive: true,
                //   value: text,
                //   title: social.title,
                //   type: social.type!,
                // });
                setInputValue(text);
              }}
            >
              Paste
            </InputButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default LinkInput;
