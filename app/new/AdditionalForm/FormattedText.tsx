import message from "@/public/Icons/message-line.svg";
import { Options } from "easymde";
import { useRouter } from "next/navigation";
import SimpleMDE from "react-simplemde-editor";
import Modal from "../Modal";
import useUserStore from "@/app/stores/store";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import useUserAdditionalContent from "@/app/stores/useUserAdditionalContent";

const FormattedText = () => {
  const options: Options = {
    toolbar: ["bold", "italic", "heading"],
  };
  const [isSaved, setIsSaved] = useState(false);
  const { control, handleSubmit } = useForm<{ text: string }>();
  const { titles, setTitles } = useUserAdditionalContent();
  return (
    <Modal
      title="Add text"
      subtitle="Share your thoughts with the world"
      label="Text"
      icon={message}
    >
      <Controller
        name="text"
        control={control}
        render={({ field }) => <SimpleMDE {...field} options={options} />}
      />

      <button
        onClick={handleSubmit((data) => {
          setTitles(data.text);
          setIsSaved(true);
        })}
        className={`btn bg-black text-white hover:bg-iPrimary`}
      >
        {isSaved && titles ? "Saved" : "Save"}
      </button>
    </Modal>
  );
};

export default FormattedText;
