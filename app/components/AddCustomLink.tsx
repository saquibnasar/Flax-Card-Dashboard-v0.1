import { ReactNode, useState } from "react";
import { CustomLinksProps } from "../stores/useUserAdditionalContent";
import CustomLinkInput from "./CustomLinkInput";
import ModalForm from "./ModalForm";

interface Props {
  children: ReactNode;
  onSubmit: (link: CustomLinksProps) => void;
  link?: CustomLinksProps;
}

const AddCustomLink = ({ children, onSubmit, link }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOnClose = () => setIsOpen(false);
  const handleOnOpen = () => setIsOpen(true);

  return (
    <>
      <div className="cursor-pointer" onClick={handleOnOpen}>
        {children}
      </div>
      <ModalForm size="4xl" isOpen={isOpen} onClose={handleOnClose}>
        <div className="px-4 md:px-10 py-3 space-y-5">
          <div className="mb-10">
            <h1 className="text-lg">Add Content</h1>
            <p className="text-sm text-tSecondary">
              Showcase any link into display content{" "}
            </p>
          </div>
          <CustomLinkInput
            onClose={() => setIsOpen(false)}
            onSubmit={(link) => {
              onSubmit(link);
            }}
            link={link}
          />
        </div>
      </ModalForm>
    </>
  );
};

export default AddCustomLink;
