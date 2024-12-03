"use client";

import {
  EmbedForm,
  EmbedYoutubeVideo,
  FormattedText,
  Pdf,
} from "@/app/components/AdditionalContent";
import CroppedImage from "@/app/components/CroppedImage";
import HookForm from "@/app/components/HookForm";
import ModalForm from "@/app/components/ModalForm";
import LinkInput from "@/app/new/LinkInput";
import { LinkDTO, PhoneNumber } from "@/app/stores/useUserLinks";
import { FileType, embedMediaType } from "@/app/utils/entities/UserCardDetails";
import useUpdateUser from "@/app/utils/hooks/useUpdateUser";
import SocialMediaItems, {
  socialCategories,
} from "@/app/utils/socialMediaItems";
import { EmbedMediaSchema } from "@/app/validation";
import { motion } from "framer-motion";
import { useState } from "react";
import { BsImages } from "react-icons/bs";
import Image from "next/image";
import AddCustomLink from "@/app/components/AddCustomLink";
import ToggleButton from "@/app/components/ToggleButton";
import CategorySelector from "@/app/new/CategorySelector";
import { CustomLinksProps } from "@/app/stores/useUserAdditionalContent";
import {
  RiDeleteBinLine,
  RiDraggable,
  RiFileCopy2Line,
  RiFilePdf2Line,
  RiLink,
  RiMap2Line,
  RiText,
  RiVideoLine,
} from "react-icons/ri";
import { TbNorthStar } from "react-icons/tb";
import { FileData } from "../../CardGrid";
import AdditionalImages from "./AdditionalImages";
import ContentContainer from "./ContentContainer";
import SocialLink from "./SocialLink";
import { ToastContainer, toast } from "react-toastify";
import CustomLink from "./CustomLink";

interface SocialPageProps {
  whatsapp?: PhoneNumber;
  mobileNumber?: PhoneNumber;
  links?: LinkDTO[];
  pdf?: FileData;
  titles?: string[];
  employeeId: string;
  carouselSize?: number;
  additionalImages?: FileType[];
  googleForm?: embedMediaType;
  location?: embedMediaType;
  embedYoutube?: embedMediaType;
  customLinks?: CustomLinksProps[];
  directModeOn?: boolean;
}

const SocialsPage = ({
  titles,
  googleForm,
  location,
  embedYoutube,
  pdf,
  whatsapp,
  mobileNumber,
  additionalImages,
  carouselSize,
  employeeId,
  links,
  directModeOn = false,
  customLinks = [] as CustomLinksProps[],
}: SocialPageProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isEmbedYtOpen, setIsEmbedYtOpen] = useState(false);
  const [selectRatio, setSelectedRatio] = useState(carouselSize || 1);
  const [isDirectEnable, setIsDirectEnable] = useState(directModeOn);

  const { mutate, isLoading } = useUpdateUser(employeeId);
  const [openModal, setOpenModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(socialCategories[0]);
  const removeTitles = (selectedTitle: number) => {
    const filteredTitles = titles?.filter(
      (title, index) => index !== selectedTitle
    );
    const formData = new FormData();
    if (filteredTitles && filteredTitles?.length > 0) {
      filteredTitles.forEach((title) => {
        formData.append("titles", title);
      });
    } else {
      formData.append("titles", "");
    }
    formData.append(`employeeId`, employeeId);
    mutate(formData);
  };
  const contents = [
    {
      name: "link",
      logo: (
        <span onClick={() => setIsOpen(true)}>
          <RiLink />
        </span>
      ),
      modal: (
        <ModalForm size="xl" isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <div className="space-y-8 pt-2 pl-2 pr-5 overflow-y-scroll">
            <CategorySelector
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              categories={socialCategories}
            />

            <div className="custom-scrollbar space-y-4 overflow-y-auto max-h-[60vh]">
              {SocialMediaItems[selectedCategory].map((social) => (
                <LinkInput
                  key={social.type}
                  social={social}
                  directModeOn={directModeOn}
                  bgColor="sSecondary"
                  updateLink={(link) => {
                    const formData = new FormData();
                    const index = links?.length ? links.length : 0;
                    formData.append(`links[${index}][title]`, link.title);
                    formData.append(`links[${index}][value]`, link.value);
                    formData.append(
                      `links[${index}][isActive]`,
                      link.isActive.toString()
                    );
                    formData.append(`links[${index}][type]`, link.type);
                    formData.append(`employeeId`, employeeId);

                    mutate(formData);
                  }}
                />
              ))}
            </div>
          </div>
        </ModalForm>
      ),
    },
    {
      name: "custom-link",
      logo: (
        <AddCustomLink
          onSubmit={(link) => {
            const index = customLinks.length;
            const formData = new FormData();
            formData.append(`customLinks[${index}][url]`, link.url);
            formData.append(
              `customLinks[${index}][buttonText]`,
              link.buttonText
            );
            formData.append(
              `customLinks[${index}][isActive]`,
              JSON.stringify(true)
            );
            formData.append(
              `customLinks[${index}][widgetStyle]`,
              link.widgetStyle
            );
            formData.append(`employeeId`, employeeId);

            mutate(formData);
          }}
        >
          <span>
            <TbNorthStar />
          </span>
        </AddCustomLink>
      ),
    },
    {
      name: "images",
      logo: (
        <CroppedImage
          aspectRatio={selectRatio || 1}
          name="additional-images-bar"
          setAspectRatio={(ratio) => {
            setSelectedRatio(ratio);
            const formData = new FormData();
            formData.append(`employeeId`, employeeId);
            formData.append(`carouselSize`, JSON.stringify(ratio));
            mutate(formData);
          }}
          setFile={(file) => {
            const formData = new FormData();
            formData.append(`additionalImages[0][newImage]`, file);
            formData.append(`additionalImages[0][memberId]`, employeeId);
            formData.append(`additionalImages[0][type]`, "additionalImages");
            formData.append(
              `additionalImages[0][shouldDelete]`,
              JSON.stringify(false)
            );

            formData.append("employeeId", employeeId);
            mutate(formData);
          }}
          multiRatio={additionalImages?.length ? false : true}
        >
          <BsImages />
        </CroppedImage>
      ),
    },
    {
      name: "map",
      logo: (
        <span onClick={() => setIsLocationOpen(true)}>
          {" "}
          <RiMap2Line />
        </span>
      ),
      modal: (
        <ModalForm
          isOpen={isLocationOpen}
          onClose={() => setIsLocationOpen(false)}
        >
          <div className="flex items-center space-x-2">
            <div>
              <h3 className="font-bold text-[#111] text-lg">Location</h3>
              <h5 className="text-xs">Share your location here</h5>
            </div>
          </div>
          <HookForm
            closeModal={() => setIsLocationOpen(false)}
            schema={EmbedMediaSchema}
            isLoading={isLoading}
            defaultValues={{ title: location?.title, value: location?.value }}
            onSubmit={async (data) => {
              const formData = new FormData();
              formData.append("location[title]", data.title);
              formData.append("location[value]", data.value);
              formData.append("location[type]", "location");
              formData.append("employeeId", employeeId);

              mutate(formData);
              setIsLocationOpen(false);
            }}
            labelMapping={["Title", "Paste Your Link"]}
          />
        </ModalForm>
      ),
    },
    {
      name: "grid",
      logo: (
        <FormattedText
          isLoading={isLoading}
          onSubmit={(title) => {
            titles
              ? mutate({
                  titles: [title, ...titles],
                  employeeId,
                })
              : mutate({
                  titles: title,
                  employeeId,
                });
          }}
          inDashboard
        >
          <RiText />
        </FormattedText>
      ),
    },
    {
      name: "embedYoutube",
      logo: (
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
          type="bar"
        >
          <span>
            <RiVideoLine />
          </span>
        </EmbedYoutubeVideo>
      ),
    },
    {
      name: "pdf",
      logo: (
        <Pdf
          background="sSecondary"
          pdf={pdf}
          isLoading={isLoading}
          onSubmit={(title, file) => {
            const formData = new FormData();
            if (file) {
              formData.append("pdfTitle", title);
              formData.append("pdfFile", file);
              formData.append("employeeId", employeeId);
            }

            mutate(formData);
          }}
          handleActive={(active, pdf, title) => {
            const formData = new FormData();
            title && formData.append("pdfTitle", title);
            pdf && formData.append("pdfFile", pdf);
            formData.append("isActive", JSON.stringify(active));
            formData.append("employeeId", employeeId);
            mutate(formData);
          }}
          isContentModal
        >
          <span>
            <RiFilePdf2Line />
          </span>
        </Pdf>
      ),
    },
    {
      name: "googleForm",
      logo: (
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
        >
          <span>
            <RiFileCopy2Line />
          </span>
        </EmbedForm>
      ),
    },
    // {
    //   name: "more",
    //   logo: (
    //     <span onClick={() => setOpenModal(true)}>
    //       <RiMoreLine />
    //     </span>
    //   ),
    //   modal: (
    //     <ContentModal
    //       employeeId={employeeId}
    //       isOpen={openModal}
    //       onClose={() => setOpenModal(false)}
    //     />
    //   ),
    // },
  ];

  return (
    <>
      <ToastContainer />
      <div className="p-2 w-full h-full flex flex-col space-y-3 justify-between relative">
        <div className="space-y-3">
          <div className="flex justify-between items-center w-full mb-8">
            <div className="mt-4">
              <h1 className="text-xl">Enable direct mode</h1>
              <p className="text-sm text-tSecondary">
                Anyone who will visit your profile will be redirected to the
                active link
              </p>
            </div>
            <ToggleButton
              isChecked={isDirectEnable}
              onChange={(checked) => {
                const length = links?.length;
                if (length) {
                  setIsDirectEnable(checked);

                  const newIsDirectEnable = checked;

                  const formData = new FormData();
                  formData.append("employeeId", employeeId);
                  formData.append(
                    "directModeOn",
                    JSON.stringify(newIsDirectEnable)
                  );

                  links?.forEach((link, index) => {
                    formData.append(`links[${index}][id]`, link?.id!);
                    formData.append(`links[${index}][title]`, link.title);
                    formData.append(`links[${index}][value]`, link.value);

                    if (newIsDirectEnable) {
                      if (index === 0) {
                        formData.append(
                          `links[${index}][isActive]`,
                          JSON.stringify(true)
                        );
                      } else {
                        formData.append(
                          `links[${index}][isActive]`,
                          JSON.stringify(false)
                        );
                      }
                    } else {
                      formData.append(
                        `links[${index}][isActive]`,
                        JSON.stringify(true)
                      );
                    }

                    formData.append(`links[${index}][type]`, link.type);
                    formData.append(
                      `links[${index}][shouldDelete]`,
                      JSON.stringify(false)
                    );
                  });
                  mutate(formData);
                } else {
                  toast.error("Please add links to enable direct mode", {
                    position: "bottom-center",
                    autoClose: 2000,
                  });
                }
              }}
            />
          </div>

          <div className="space-y-5">
            {links?.map((link, index) => (
              <SocialLink
                key={link.id}
                links={links}
                isSocial={true}
                employeeId={employeeId}
                link={link}
                isDirectEnable={directModeOn}
                index={index}
                isNumber={["call", "sms", "message", "whatsApp"].includes(
                  link.type
                )}
              />
            ))}

            {customLinks.map((link, index) => (
              <AddCustomLink
                key={link.url}
                link={link}
                onSubmit={(updatedLink) => {
                  const index = customLinks.length;
                  const formData = new FormData();
                  formData.append(
                    `customLinks[${index}][url]`,
                    updatedLink.url
                  );
                  formData.append(`customLinks[${index}][id]`, link.id!);
                  formData.append(
                    `customLinks[${index}][buttonText]`,
                    updatedLink.buttonText
                  );
                  formData.append(
                    `customLinks[${index}][isActive]`,
                    JSON.stringify(true)
                  );
                  formData.append(
                    `customLinks[${index}][widgetStyle]`,
                    updatedLink.widgetStyle
                  );
                  formData.append(`employeeId`, employeeId);

                  mutate(formData);
                }}
              >
                <CustomLink
                  customLinksLength={customLinks?.length || 0}
                  employeeId={employeeId}
                  index={index}
                  link={link}
                />
              </AddCustomLink>
            ))}
            {titles?.map((title, index) => (
              <ContentContainer
                key={`${title}_${index}`}
                removeTitle={() => removeTitles(index)}
                data={{
                  title: title,
                  defaultTitle: "Title",
                }}
                fieldName="titles"
                name="Title"
                employeeId={employeeId}
                isTitle
              />
            ))}

            <AdditionalImages
              carouselSize={carouselSize}
              employeeId={employeeId}
              images={additionalImages}
            />
            {location?.value && (
              <ContentContainer
                data={{
                  title: location?.title,
                  value: location.value,
                  defaultTitle: "My Location",
                  type: "location",
                }}
                fieldName="location"
                name="Location"
                subtitle="Share your location"
                employeeId={employeeId}
              />
            )}
            {embedYoutube?.value && (
              <ContentContainer
                data={{
                  title: embedYoutube?.title,
                  value: embedYoutube.value,
                  defaultTitle: "Youtube Video",
                }}
                name="Embed Media"
                fieldName="embedMedia"
                subtitle="Share from vimeo, youtube and more"
                employeeId={employeeId}
              />
            )}

            {pdf?.value && (
              <div className="group relative flex justify-between items-center border-[0.5px] border-dSecondary rounded-lg p-2">
                <div className="flex items-center space-x-2">
                  <span className="cursor-grab">
                    <RiDraggable />
                  </span>
                  <div className="avatar placeholder cursor-pointer">
                    <div className="text-neutral-content rounded-lg w-[44px] h-[44px] bg-black">
                      <span className="text-2xl text-white line-clamp-1">
                        {pdf.title.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-md">{pdf.title}</h3>
                </div>

                <span
                  onClick={(event) => {
                    event.stopPropagation();
                    const formData = new FormData();
                    formData.append("deletePdf", JSON.stringify(true));
                    formData.append(`employeeId`, employeeId);
                    mutate(formData);
                  }}
                  className="cursor-pointer opacity-0 absolute group-hover:opacity-100 p-2 text-aRed text-lg bg-white border border-dSecondary rounded-full -top-2 -right-2 transition-all duration-250 ease-linear"
                >
                  <RiDeleteBinLine />
                </span>
              </div>
            )}

            {googleForm?.value && (
              <ContentContainer
                data={{
                  title: googleForm?.title,
                  value: googleForm.value,
                  defaultTitle: "Google Form",
                  type: "google-form",
                }}
                fieldName="googleForm"
                name="Google Form"
                subtitle="Share your google form with others"
                employeeId={employeeId}
              />
            )}
          </div>
        </div>

        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 100 }}
          whileInView={{ y: 0, opacity: 100 }}
          transition={{ duration: 0.4 }}
          className="fixed md:relative left-auto w-fit bottom-4 md:bottom-6 flex flex-nowrap gap-2 md:gap-4 md:mx-auto justify-center items-center bg-white z-20 px-2 md:px-3 md:w-auto max-w-full py-2 border border-dSecondary rounded-lg shadow-xl"
        >
          {contents.map((content, index) => (
            <div
              key={content.name}
              className="cursor-pointer text-base md:text-xl hover:bg-sSecondary transition-all duration-150 p-2 w-auto border border-dSecondary rounded-lg"
            >
              {content.logo}
              {content?.modal}
            </div>
          ))}
        </motion.div>
      </div>
    </>
  );
};

export default SocialsPage;
