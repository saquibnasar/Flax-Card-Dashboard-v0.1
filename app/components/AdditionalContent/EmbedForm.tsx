import { EmbedMediaSchema } from "@/app/validation";
import classNames from "classnames";
import { ReactNode, useState } from "react";
import { RiFileCopy2Line } from "react-icons/ri";
import HookForm from "../HookForm";
import ModalForm from "../ModalForm";
import useUserAdditionalContent from "@/app/stores/useUserAdditionalContent";
import DeleteButton from "../DeleteButton";

interface Props {
  children?: ReactNode;
  onSubmit: (title: string, link: string) => void;
  background?: string;
  isLoading?: boolean;
}

const EmbedForm = ({
  children,
  onSubmit,
  background = "sPrimary",
  isLoading = false,
}: Props) => {
  const [isOpened, setIsOpened] = useState(false);

  const { googleForm, removeGoogleForm } = useUserAdditionalContent();
  return (
    <>
      {children ? (
        <div onClick={() => setIsOpened(true)}>{children}</div>
      ) : (
        <div
          className={
            `bg-${background} ` +
            classNames({
              "cursor-pointer relative group space-y-2 text-tSecondary flex flex-col items-center justify-center px-10 py-14 rounded-lg":
                true,
            })
          }
          onClick={() => setIsOpened(true)}
        >
          {googleForm && <DeleteButton handleOnClick={removeGoogleForm} />}
          <div>
            <span className="text-3xl">
              <RiFileCopy2Line />
            </span>
          </div>
          <p className="text-center whitespace-nowrap">Google Form</p>
        </div>
      )}
      {isOpened && (
        <ModalForm isOpen={isOpened} onClose={() => setIsOpened(false)}>
          <div className="flex items-center space-x-2">
            <div>
              <h3 className="font-bold text-[#111] text-lg">Google Form</h3>
              <h5 className="text-xs">Share your google form here</h5>
            </div>
          </div>
          <HookForm
            isLoading={isLoading}
            closeModal={() => setIsOpened(false)}
            schema={EmbedMediaSchema}
            onSubmit={async (data) => {
              onSubmit(data.title, data.value);
              setIsOpened(false);
            }}
            labelMapping={["Title", "Paste Your Link"]}
          />
        </ModalForm>
      )}
    </>
  );
};

export default EmbedForm;
