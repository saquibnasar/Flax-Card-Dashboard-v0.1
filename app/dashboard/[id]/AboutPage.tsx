"use client";

import Button from "@/app/components/Button";
import ErrorMessage from "@/app/components/ErrorMessage";
import http from "@/app/services/api-client";
import useUpdateUser from "@/app/utils/hooks/useUpdateUser";
import { zodResolver } from "@hookform/resolvers/zod";
import classNames from "classnames";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { RiFileCopyLine } from "react-icons/ri";
import { z } from "zod";
import ModalBox from "./ModalBox";
import Header from "./Header";
import { FileType } from "@/app/utils/entities/UserCardDetails";

const UserFormSchema = z.object({
  name: z
    .string()
    .min(3, "Minimum 3 character required")
    .max(30, "Maximum 30 characters"),
  designation: z
    .string()
    .min(3, "Minimum 3 character required")
    .max(36, "Maximum 36 characters"),
  employeeBio: z
    .string()
    .max(160, "Bio Should not be more than 160 characters"),
  // profileUrl: z.string(),
});

type userFormSchema = z.infer<typeof UserFormSchema>;

interface Props {
  name: string;
  designation?: string;
  companyName?: string;
  employeeId: string;
  about?: string;
  profileUrl: string;
  enableContact: boolean;
  profileImage?: string | File;
  additionalImageSlideShow?: boolean;
  bannerImages?: FileType[];
  isPrimaryCard?: boolean;
}

const AboutPage = ({
  enableContact,
  name,
  companyName,
  isPrimaryCard,
  designation = "",
  profileImage,
  bannerImages,
  additionalImageSlideShow,
  employeeId,
  profileUrl,
  about = "",
}: Props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<userFormSchema>({
    resolver: zodResolver(UserFormSchema),
  });
  const { mutate, isLoading: isPending } = useUpdateUser(employeeId);
  const [isCopied, setIsCopied] = useState(false);
  const conditionalUrl = `${process.env.NEXT_PUBLIC_FLAX_BIO_URL}/${
    isPrimaryCard
      ? profileUrl
      : localStorage.getItem("username") + "/" + profileUrl
  }`;
  const directProfileUrl = "https://" + conditionalUrl;

  const setCopied = () => {
    setIsCopied(true);
    navigator.clipboard.writeText(directProfileUrl).then(() => (
      <div className="alert alert-success">
        <span>copied</span>
      </div>
    ));
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const openDeleteModal = () => setIsDeleteOpen(true);
  const closeDeleteModal = () => setIsDeleteOpen(false);

  const [isDiscardOpen, setIsDiscardOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const openDiscardModal = () => setIsDiscardOpen(true);
  const closeDiscardModal = () => setIsDiscardOpen(false);
  const [updatedCompanyName, setUpdatedCompanyName] = useState(
    companyName || ""
  );

  const router = useRouter();
  const handleOnSubmit = handleSubmit(async (data) => {
    if (isPrimaryCard) {
      const companyData = new FormData();
      companyData.append("companyName", updatedCompanyName);
      companyData.append("employeeId", employeeId);
      await http.post("/settings/updateCompanyDetails", companyData);
    }
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("designation", data.designation);

    // isPrimaryCard && formData.append("companyName", updatedCompanyName);

    formData.append("employeeId", employeeId);
    // formData.append("location", data.location);
    formData.append("employeeBio", data.employeeBio);
    formData.append("profileUrl", profileUrl);

    mutate(formData);
  });

  return (
    <div>
      <Header
        slideshow={additionalImageSlideShow}
        name={name}
        employeeId={employeeId}
        profileImage={(typeof profileImage === "string" && profileImage) || ""}
        coverImages={bannerImages && bannerImages.map((image) => image)}
      />
      <form
        className="px-2 md:px-5 space-y-3 h-full flex flex-col justify-between"
        onSubmit={handleOnSubmit}
      >
        <div className="form-control flex flex-col items-end">
          <p className="text-xs text-tSecondary">Enable Save contact</p>
          <label className="cursor-pointer label">
            <input
              type="checkbox"
              onChange={() => {
                const formData = new FormData();
                formData.append("employeeId", employeeId);
                formData.append(
                  "enableContact",
                  JSON.stringify(!enableContact)
                );
                mutate(formData);
              }}
              className="toggle toggle-primary"
              checked={enableContact}
            />
          </label>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="form-control col-span-2">
            <label className="label-text p-1">Your Profile URL</label>
            <div className="flex space-x-3">
              <input
                // {...register("profileUrl")}
                type="text"
                disabled
                className="input input-bordered w-full"
                defaultValue={conditionalUrl}
              />

              <div
                className={classNames({
                  "text-xl cursor-pointer active:scale-[0.96] hover:scale-[0.98] duration-150 flex justify-center items-center px-4 rounded-lg":
                    true,
                  "bg-[#EDEDED]": !isCopied,
                  "bg-aGreen text-white": isCopied,
                })}
                onClick={setCopied}
              >
                <RiFileCopyLine />
              </div>
            </div>
          </div>
          <div className="form-control col-span-2 md:col-span-1">
            <label className="label-text p-1">Name</label>
            <input
              {...register("name")}
              type="text"
              className="input input-bordered"
              defaultValue={name}
            />
            <ErrorMessage>{errors.name?.message}</ErrorMessage>
          </div>
          {isPrimaryCard ? (
            <div className="form-control col-span-2 md:col-span-1">
              <label className="label-text p-1">Company Name</label>
              <input
                type="text"
                className="input input-bordered"
                onChange={(event) =>
                  setUpdatedCompanyName(event.currentTarget.value)
                }
                defaultValue={companyName}
              />
            </div>
          ) : (
            <div className="form-control col-span-2 md:col-span-1">
              <label className="label-text p-1">Employee Id</label>

              <input
                type="text"
                className="input input-bordered"
                defaultValue={employeeId}
                disabled
              />
            </div>
          )}

          <div className="form-control col-span-2 md:col-span-1">
            <label className="label-text p-1">Job Title</label>
            <input
              {...register("designation")}
              type="text"
              className="input input-bordered"
              defaultValue={designation}
            />
            <ErrorMessage>{errors.designation?.message}</ErrorMessage>
          </div>

          <div className="form-control col-span-2">
            <label className="label-text p-1">About yourself</label>
            <textarea
              {...register("employeeBio")}
              className="textarea textarea-bordered w-full"
              defaultValue={about}
            />
            <ErrorMessage>{errors.employeeBio?.message}</ErrorMessage>
          </div>
        </div>

        {/* <div className="h-[45px] w-[300px] bg-sSecondary rounded-full"></div> */}

        {/* <button
        type="button"
        className="flex space-x-5 items-center text-aRed px-6 py-1 rounded-full text-lg border-2 border-aRed"
        onClick={openDeleteModal}
      >
        <RiDeleteBinLine />
        Delete
      </button> */}
        <ModalBox
          title={`Are you sure you want to delete ${name}'s profile?`}
          label={
            isLoading ? (
              <span className="loading loading-dots loading-xs" />
            ) : (
              "Delete"
            )
          }
          disable={isLoading}
          isOpen={isDeleteOpen}
          onClose={closeDeleteModal}
          onSubmit={async () => {
            setIsLoading(true);
            await http
              .delete(`/members/deleteMember`, {
                data: {
                  employeeId,
                },
                headers: {
                  Authorization: `Bearer ${getCookie("accessToken")}`,
                },
              })
              .then(() => {
                router.push("/dashboard");
              });
            setIsLoading(false);
          }}
        />

        <div className="flex space-x-5 justify-end">
          {/* <button
          type="button"
          className="border border-dSecondary rounded-lg px-12 py-2"
          onClick={openDiscardModal}
        >
          Cancel
        </button>
        <ModalBox
          title="Are you sure you want to discard all the changes?"
          label="Discard"
          isOpen={isDiscardOpen}
          onClose={closeDiscardModal}
          onSubmit={() => {}}
        /> */}
        </div>
        <Button
          className="disabled:bg-opacity-25 ml-auto my-5"
          width="180px"
          disabled={isPending}
          type="submit"
        >
          {isPending ? (
            <span className="loading loading-spinner loading-xs" />
          ) : (
            "Save"
          )}
        </Button>
      </form>
    </div>
  );
};

export default AboutPage;
