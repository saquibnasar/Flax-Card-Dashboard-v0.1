import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  title: string;
  label: string | ReactNode;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  disable?: boolean;
}

const ModalBox = ({
  title,
  label,
  disable,
  isOpen,
  onClose,
  onSubmit,
}: Props) => {
  if (!isOpen) return null;
  const handleSubmit = () => {
    onSubmit();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalBody my={5}>
          <h3 className="text-lg font-medium">{title}</h3>
        </ModalBody>
        <ModalFooter>
          <div className="flex gap-4">
            <button
              className="border-dSecondary border-[1px] px-10 py-2 rounded-lg"
              type="button"
              onClick={onClose}
            >
              Close
            </button>
            <button
              className="button-primary"
              type="button"
              onClick={handleSubmit}
              disabled={disable}
            >
              {label}
            </button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalBox;
