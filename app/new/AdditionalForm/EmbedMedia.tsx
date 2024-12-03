import ErrorMessage from "@/app/components/ErrorMessage";
import useUserStore from "@/app/stores/store";
import { EmbedMediaSchema } from "@/app/validation";
import embed from "@/public/Icons/embed.svg";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import Modal from "../Modal";

export type embedMediaType = z.infer<typeof EmbedMediaSchema>;

const EmbedMedia = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<embedMediaType>({
    resolver: zodResolver(EmbedMediaSchema),
  });
  const { setEmbedMedia } = useUserStore();
  return (
    <Modal
      title="Embed Media"
      subtitle="Share from video, youtube and more"
      label="Embed Media"
      icon={embed}
    >
      <div className="space-y-3">
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
          <label className="label-text p-1">Paste your link</label>
          <input
            {...register("value")}
            type="text"
            className="input input-bordered"
          />
          <ErrorMessage>{errors.value?.message}</ErrorMessage>
        </div>
        <div className="flex justify-end">
          <button
            className="btn bg-black text-white hover:bg-iPrimary"
            type="submit"
            onClick={handleSubmit((data) => {
              setEmbedMedia(data.title, data.value);
            })}
          >
            save
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EmbedMedia;
