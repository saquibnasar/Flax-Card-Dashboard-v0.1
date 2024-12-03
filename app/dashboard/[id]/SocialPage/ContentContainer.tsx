import Button from "@/app/components/Button";
import ModalForm from "@/app/components/ModalForm";
import useDeleteAdditionalLinks from "@/app/utils/hooks/useDeleteAdditionalLinks";
import useUpdateUser from "@/app/utils/hooks/useUpdateUser";
import { EmbedMediaSchema } from "@/app/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { getCookie } from "cookies-next";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { RiDeleteBinLine, RiDraggable } from "react-icons/ri";

import { z } from "zod";

interface DataType {
  title?: string;
  value?: string;
  defaultTitle: string;
  type?: string;
}

interface Props {
  data: DataType;
  name: string;
  subtitle?: string;
  isTitle?: boolean;
  fieldName: string;
  employeeId: string;
  removeTitle?: () => void;
}

const contents = ["google-form", "location", "pdf"];
const logo: { [key: string]: string } = {};

for (const content of contents) {
  logo[
    content
  ] = require(`@/public/additionalTypes.tsx/${content.toLowerCase()}.svg`);
}

const ContentContainer = ({
  data,
  name,
  subtitle,
  isTitle,
  fieldName,
  employeeId,
  removeTitle = () => {},
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const title = data.title || "";
  // const title =
  //   data.title && data.title !== "undefined"
  //     ? data.title.length > 40
  //       ? data.title?.slice(0, 45) + "..."
  //       : data.title
  //     : data.defaultTitle;

  type schemaType = z.infer<typeof EmbedMediaSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<schemaType>({
    resolver: zodResolver(EmbedMediaSchema),
  });
  const closeModal = () => setIsOpen(false);
  const { mutate, isLoading } = useUpdateUser(employeeId);
  const { mutate: deleteLink } = useDeleteAdditionalLinks(employeeId);
  const router = useRouter();

  const handleOnSubmit = handleSubmit((data) => {
    const formData = new FormData();
    formData.append(`employeeId`, employeeId);
    formData.append(`${fieldName}[title]`, data.title);
    formData.append(`${fieldName}[value]`, data.value);
    formData.append(`${fieldName}[type]`, fieldName);
    mutate(formData);
    router.refresh();
    closeModal();
  });
  return (
    <div className="group relative flex justify-between items-center border-[0.5px] border-dSecondary rounded-lg p-2">
      <div className="flex items-center space-x-2">
        <span className="cursor-grab">
          <RiDraggable />
        </span>
        {data.type ? (
          <Image
            className="cursor-pointer"
            onClick={() => setIsOpen(true)}
            width={44}
            height={44}
            src={logo[data.type]}
            alt={data.title || data.defaultTitle}
          />
        ) : (
          <div
            className="avatar placeholder cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            <div className="text-neutral-content rounded-lg w-[44px] h-[44px] bg-black">
              <span className="text-2xl text-white line-clamp-1">
                {title.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
        )}

        <h3 className="text-md">{title}</h3>
      </div>

      <span
        onClick={() => {
          if (isTitle) {
            removeTitle();
          } else {
            deleteLink({ employeeId, type: fieldName });
          }
        }}
        className="cursor-pointer opacity-0 absolute group-hover:opacity-100 p-2 text-aRed text-lg bg-white border border-dSecondary rounded-full -top-2 -right-2 transition-all duration-250 ease-linear"
      >
        <RiDeleteBinLine />
      </span>

      {!isTitle && (
        <ModalForm isOpen={isOpen} onClose={closeModal}>
          <div className="flex items-center space-x-2">
            <div>
              <h3 className="font-bold text-[#111] text-lg">{name}</h3>
              <h5 className="text-xs">{subtitle}</h5>
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
                defaultValue={data.value}
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
              <Button type="button" onClick={handleOnSubmit} width="160px">
                {isLoading ? (
                  <span className="loading loading-spinner loading-xs" />
                ) : (
                  "Save"
                )}
              </Button>
            </div>
          </form>
        </ModalForm>
      )}
    </div>
  );
};

export default ContentContainer;
