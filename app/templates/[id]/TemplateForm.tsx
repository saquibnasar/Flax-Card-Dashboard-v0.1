"use client";

import CroppedImage from "@/app/components/CroppedImage";
import ModalBox from "@/app/dashboard/[id]/ModalBox";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { RiDeleteBinLine, RiUpload2Line } from "react-icons/ri";
import { z } from "zod";

type userFormSchema = z.infer<typeof TemplateFormSchema>;

const TemplateFormSchema = z.object({
  companyName: z.string(),
  location: z.string(),
  about: z.string(),
  profileUrl: z.string(),
});

interface Props {
  companyName: string;
  location: string;
  about: string;
  profileUrl: string;
}

const TemplateForm = ({ companyName, location, profileUrl, about }: Props) => {
  const { register, handleSubmit } = useForm<userFormSchema>({
    resolver: zodResolver(TemplateFormSchema),
  });

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const openDeleteModal = () => setIsDeleteOpen(true);
  const closeDeleteModal = () => setIsDeleteOpen(false);

  const [isDiscardOpen, setIsDiscardOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const openDiscardModal = () => setIsDiscardOpen(true);
  const closeDiscardModal = () => setIsDiscardOpen(false);

  const router = useRouter();

  return (
    <form className="mt-10 px-5 space-y-3" onSubmit={handleSubmit(() => {})}>
      <div className="grid grid-cols-2 gap-3">
        <div className="form-control">
          <label className="label-text p-1">Name</label>
          <input
            {...register("companyName")}
            type="text"
            className="input input-bordered"
            defaultValue={companyName}
          />
        </div>

        <div className="form-control">
          <label className="label-text p-1">Location</label>
          <input
            {...register("location")}
            type="text"
            className="input input-bordered"
            defaultValue={location}
          />
        </div>
        <div className="form-control col-span-2">
          <label className="label-text p-1">About Your Organization</label>
          <textarea
            {...register("about")}
            className="textarea textarea-bordered w-full"
            defaultValue={about}
          />
        </div>
        <div className="form-control">
          <label className="label-text p-1">Company Name</label>
          <input
            {...register("profileUrl")}
            type="text"
            className="input input-bordered"
            defaultValue={profileUrl}
            disabled
          />
        </div>
      </div>
      <div className="w-fit">
        <div className="flex flex-col mb-5">
          <label className="label-text p-1">Company Logo</label>
          <CroppedImage name="profileImage" aspectRatio={1} setFile={() => {}}>
            <div className="px-8 py-3 text-tSecondary border border-dSecondary rounded-md flex items-center space-x-2 hover:text-black transition-all ease-linear duration-150">
              <span className="mr-2">
                <RiUpload2Line />
              </span>
              Replace Image
            </div>
          </CroppedImage>
        </div>
      </div>

      <button
        type="button"
        className="flex space-x-5 items-center text-aRed px-6 py-1 rounded-full text-lg border-2 border-aRed"
        onClick={openDeleteModal}
      >
        <RiDeleteBinLine />
        Delete
      </button>
      <ModalBox
        title={`Are you sure you want to delete Peter parker’s profile?`}
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
        onSubmit={() => {}}
      />

      <div className="flex space-x-5 justify-end">
        <button
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
        />

        <button type="submit" className="button-primary">
          Save
        </button>
      </div>
    </form>
  );
};

export default TemplateForm;
