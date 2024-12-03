import useUserAdditionalContent from "@/app/stores/useUserAdditionalContent";
import { Options } from "easymde";
import { ReactNode, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { RiMessage2Line } from "react-icons/ri";
import SimpleMDE from "react-simplemde-editor";
import ModalForm from "../ModalForm";
import Button from "../Button";
import Spinner from "../Spinner";

interface Props {
  onSubmit: (title: string) => void;
  children?: ReactNode;
  isLoading?: boolean;
  inDashboard?: boolean;
}

const FormattedText = ({
  onSubmit,
  isLoading = false,
  children,
  inDashboard,
}: Props) => {
  const [isOpened, setIsOpened] = useState(false);
  const { control, handleSubmit } = useForm();
  const { setTitles } = useUserAdditionalContent();

  const options: Options = {
    toolbar: ["bold", "italic", "heading"],
    maxHeight: "fit",
  };

  return (
    <>
      {children ? (
        <span onClick={() => setIsOpened(true)}>{children}</span>
      ) : (
        <div
          className="cursor-pointer bg-sPrimary space-y-2 text-tSecondary flex flex-col items-center justify-center px-10 py-14 rounded-lg"
          onClick={() => setIsOpened(true)}
        >
          <span className="text-3xl">
            <RiMessage2Line />
          </span>
          <p className="text-center">Add Text</p>
        </div>
      )}

      {isOpened && (
        <ModalForm isOpen={isOpened} onClose={() => setIsOpened(false)}>
          <div className="flex items-center space-x-2">
            <div>
              <h3 className="font-bold text-[#111] text-lg">Formatted Text</h3>
              <h5 className="text-xs">Add text here</h5>
            </div>
          </div>

          <Controller
            name="formattedText"
            control={control}
            render={({ field }) => <SimpleMDE {...field} options={options} />}
          />

          <div className="flex justify-end mt-5 space-x-3">
            <Button
              className="border border-dSecondary"
              width="160px"
              accent={true}
              type="button"
              onClick={() => setIsOpened(false)}
            >
              Close
            </Button>
            <Button
              type="submit"
              onClick={handleSubmit((data) => {
                onSubmit(data.formattedText);
                !inDashboard && setTitles(data.formattedText);
                setIsOpened(false);
              })}
              width="160px"
            >
              {isLoading ? <Spinner /> : "Save"}
            </Button>
          </div>
        </ModalForm>
      )}
    </>
  );
};

export default FormattedText;
