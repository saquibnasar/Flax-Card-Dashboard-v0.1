"use client";
import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  isOpen: boolean;
  children: ReactNode;
  onClose?: () => void;
  size?: string;
  gradient?: boolean;
}

const ModalForm = ({
  children,
  isOpen,
  onClose = () => {},
  gradient = false,
  size = "md",
}: Props) => {
  const bg = gradient ? "gradient" : "";
  return (
    <Modal size={size} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent className={`${bg} overflow-hidden`}>
        <ModalBody className={`py-5 space-y-3 ${gradient && "gradient"}`}>
          {children}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalForm;
