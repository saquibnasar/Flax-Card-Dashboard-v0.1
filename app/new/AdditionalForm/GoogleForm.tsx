import FormButton from "@/app/components/FormButton";
import gform from "@/public/Icons/gform.svg";
import Modal from "../Modal";
import { useForm } from "react-hook-form";
import z from "zod";
import { EmbedMediaSchema } from "@/app/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import useUserStore from "@/app/stores/store";

type GoogleFormType = z.infer<typeof EmbedMediaSchema>;

const GoogleForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GoogleFormType>({
    resolver: zodResolver(EmbedMediaSchema),
  });

  const setGoogleForm = useUserStore((s) => s.setGoogleForm);
  return (
    <Modal
      title="Google Form"
      label="Google Form"
      subtitle="Share your Google form"
      icon={gform}
    >
      <div className="form-control w-full">
        <label className="label-text p-1">Title</label>
        <input
          {...register("title")}
          type="text"
          className="input input-bordered"
        />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
      </div>

      <div className="form-control w-full">
        <label className="label-text p-1">Paste your google form link</label>
        <input
          {...register("value")}
          type="text"
          className="input input-bordered"
        />
        <ErrorMessage>{errors.value?.message}</ErrorMessage>
      </div>
      <div className="flex justify-end">
        <button
          onClick={handleSubmit(({ title, value }) =>
            setGoogleForm(title, value)
          )}
          type="submit"
          className="btn bg-black text-white hover:bg-iPrimary"
        >
          save
        </button>
      </div>
    </Modal>
  );
};

export default GoogleForm;
