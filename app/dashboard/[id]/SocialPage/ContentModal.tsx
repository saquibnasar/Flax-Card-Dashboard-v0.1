import AdditionalContents from "@/app/components/AdditionalContent/AdditionalContents";
import MoreLinks from "@/app/components/MoreLinks/MoreLinks";
import SearchInput from "@/app/components/SearchInput";
import { LinkDTO } from "@/app/stores/useUserLinks";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { RiArrowLeftLine } from "react-icons/ri";
import { FileData } from "../../CardGrid";
import EmbedYoutubeVideo from "@/app/components/AdditionalContent/EmbedYoutubeVideo";
import Pdf from "@/app/components/AdditionalContent/Pdf";
import EmbedForm from "@/app/components/AdditionalContent/EmbedForm";
import { embedMediaType } from "@/app/utils/entities/UserCardDetails";
import { getCookie } from "cookies-next";
import useUpdateUser from "@/app/utils/hooks/useUpdateUser";

interface Props {
  additionalImages?: string[];
  links?: LinkDTO[];
  isOpen: boolean;
  employeeId: string;
  embedMedia?: embedMediaType;
  googleForm?: embedMediaType;
  pdf?: FileData;
  onClose: () => void;
}

const ContentModal = ({
  isOpen,
  onClose,
  employeeId,
  embedMedia,
  googleForm,
  additionalImages,
  links,
  pdf,
}: Props) => {
  const { mutate, isLoading } = useUpdateUser(employeeId);
  if (isOpen)
    return (
      <Modal
        size={{ sm: "md", md: "md", lg: "2xl" }}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="font-medium">
            <div className="text-xl flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <span className="cursor-pointer text-2xl" onClick={onClose}>
                  <RiArrowLeftLine />
                </span>
                <p className="">Additional content</p>
              </div>
              {/* <SearchInput /> */}
            </div>
          </ModalHeader>
          <ModalBody>
            <div className="flex justify-center flex-col">
              {/* <MoreLinks /> */}
            </div>
            <div className="flex py-10 items-center justify-center space-x-5">
              <div>
                <EmbedYoutubeVideo
                  background="sSecondary"
                  isLoading={isLoading}
                  onSubmit={(title, value) => {
                    const formData = new FormData();
                    formData.append(`embedMedia[title]`, title);
                    formData.append(`embedMedia[value]`, value);
                    formData.append(`embedMedia[type]`, "embedMedia");

                    formData.append("employeeId", employeeId);
                    mutate(formData);
                  }}
                />
              </div>
              <div>
                <Pdf
                  background="sSecondary"
                  pdf={pdf}
                  isLoading={isLoading}
                  onSubmit={(title, file) => {
                    const formData = new FormData();
                    formData.append(`pdfTitle`, title);
                    formData.append(`pdfFile`, file);
                    formData.append("employeeId", employeeId);
                    mutate(formData);
                  }}
                />
              </div>
              {/* <div className={`col-span-${colSpans[5]}`}>
          <EmbedMap />
        </div> */}
              <div>
                <EmbedForm
                  background="sSecondary"
                  isLoading={isLoading}
                  onSubmit={(title, value) => {
                    const formData = new FormData();
                    formData.append(`googleForm[title]`, title);
                    formData.append(`googleForm[value]`, value);
                    formData.append(`googleForm[type]`, "googleForm");

                    formData.append("employeeId", employeeId);
                    mutate(formData);
                  }}
                />
              </div>
            </div>
            {/* <AdditionalContents pdf={pdf} images={additionalImages} /> */}
          </ModalBody>
        </ModalContent>
      </Modal>
    );
};

export default ContentModal;
