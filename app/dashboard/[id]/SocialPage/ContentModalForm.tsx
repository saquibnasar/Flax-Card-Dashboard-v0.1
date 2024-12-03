import Button from "@/app/components/Button";
import HookForm from "@/app/components/HookForm";
import ModalForm from "@/app/components/ModalForm";
import useUpdateUser from "@/app/utils/hooks/useUpdateUser";
import { EmbedMediaSchema } from "@/app/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface Props {
  name: string;
  subTitle?: string;
  handleOnSubmit: (title: string, value: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  title?: string;
  value?: string;
}

const ContentModalForm = ({
  isOpen,
  setIsOpen,
  name,
  subTitle,
  handleOnSubmit,
  title,
  value,
}: Props) => {
  type schemaType = z.infer<typeof EmbedMediaSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<schemaType>({
    resolver: zodResolver(EmbedMediaSchema),
    // defaultValues: {{title, value}},
  });
  const closeModal = () => setIsOpen(false);
  return (
    <ModalForm isOpen={isOpen} onClose={closeModal}>
      <div className="flex items-center space-x-2">
        <div>
          <h3 className="font-bold text-[#111] text-lg">{name}</h3>
          <h5 className="text-xs">{subTitle}</h5>
        </div>
      </div>

      <form className="space-y-5">
        <div className="form-control w-full">
          <label className="label-text p-1">Title</label>
          <input
            {...register("title")}
            defaultValue={title}
            className="input input-bordered"
          />
        </div>
        <div className="form-control w-full">
          <label className="label-text p-1">Paste your link here</label>
          <input
            {...register("value")}
            defaultValue={value}
            className="input input-bordered"
          />
        </div>

        <div className="flex justify-end space-x-3">
          <Button
            className="border border-dSecondary"
            width="160px"
            accent={true}
            type="button"
            onClick={closeModal}
          >
            Close
          </Button>
          <Button
            onClick={handleSubmit((data) => {
              handleOnSubmit(data.title, data.value);
              closeModal();
            })}
            width="160px"
          >
            Save
          </Button>
        </div>
      </form>
      {/* <HookForm
        closeModal={() => setIsOpen(false)}
        schema={EmbedMediaSchema}
        defaultValues={{ title, link: value }}
        onSubmit={async (data) => {
          handleOnSubmit(data.title, data.link);
          setIsOpen(false);
        }}
        labelMapping={["Title", "Your Link"]}
      /> */}
    </ModalForm>
  );
};

export default ContentModalForm;
