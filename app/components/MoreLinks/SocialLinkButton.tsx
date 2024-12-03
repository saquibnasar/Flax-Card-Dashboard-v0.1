"use client";

import ModalForm from "@/app/components/ModalForm";
import TextInput from "@/app/components/TextInput";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import useUserLinksStore from "@/app/stores/useUserLinks";
import socialMediaIcons from "@/app/utils/moreSocials";

interface Props {
  title: string;
  type: string;
  icon: StaticImport;
}

const SocialLinkButton = ({ title, type, icon }: Props) => {
  const { links, setLinks } = useUserLinksStore();
  const { control, handleSubmit } = useForm();
  const [isOpened, setIsOpened] = useState(false);
  const openModal = () => setIsOpened(true);
  const closeModal = () => setIsOpened(false);
  const defaultValue = links.find((link) => link.type === type);

  return (
    <div
      key={type}
      onClick={openModal}
      className="flex justify-around items-center rounded-lg cursor-pointer"
    >
      <Image
        className="p-3 rounded-lg bg-dSecondary hover:scale-[0.95] duration-100"
        src={icon}
        width={85}
        height={85}
        alt={type}
      />
      <ModalForm isOpen={isOpened} onClose={closeModal}>
        <div className="flex space-x-2 items-center">
          <Image
            src={socialMediaIcons[type]}
            width={30}
            height={30}
            alt={type}
          />
          <h4>{title}</h4>
        </div>
        <TextInput
          control={control}
          label={`Title`}
          defaultValue={defaultValue?.title || ""}
          name="Title"
        />
        <TextInput
          control={control}
          label={`Paste your ${title} link`}
          defaultValue={defaultValue?.value || ""}
          name="Link"
        />
        <div className="flex justify-end space-x-3">
          <button
            className="button-primary"
            type="submit"
            onClick={handleSubmit((data) =>
              setLinks({
                title: data?.Title || title,
                type,
                isActive: true,
                value: data?.Link,
              })
            )}
          >
            Save
          </button>

          <button
            type="button"
            className="button-secondary"
            onClick={closeModal}
          >
            Close
          </button>
        </div>
      </ModalForm>
    </div>
  );
};

export default SocialLinkButton;
