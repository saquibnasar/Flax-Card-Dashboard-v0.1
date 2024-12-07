"use client";
import CardDetails from "@/app/utils/entities/UserCardDetails";
import reorder from "@/app/utils/reorder";
import {
  DragDropContext,
  Draggable,
  Droppable,
  OnDragEndResponder,
} from "@hello-pangea/dnd";
import classNames from "classnames";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Gabriela, Kalam, Lobster, Poppins, Roboto } from "next/font/google";
import { PropsWithChildren, useEffect, useMemo, useRef, useState } from "react";
import { RiCloseLine, RiDraggable } from "react-icons/ri";
import AdditionalImages from "./AdditionalImages";
import EmbedGoogleForm from "./EmbedGoogleForm";
import EmbedMap from "./EmbedMap";
import EmbedMedia from "./EmbedMedia";
import EmbedPdf from "./EmbedPdf";
import MockupPreview from "./MockupPreview";
import ProfileHeader from "./ProfileHeader";
import ScrollNavbar from "./ScrollNavbar";
import SharePopup from "./SharePopup";
import Socials from "./Socials";
import ShowPdf from "./ShowPdf";
import Image from "next/image";
import smLight from "@/public/sm-logo.svg";
import smDark from "@/public/sm-logo-dark.svg";
import PdfViewer from "./PdfViewer";
import { Pdf } from "../AdditionalContent";
import ExpandableText from "../ExpandableText";
import useUserAdditionalContent from "@/app/stores/useUserAdditionalContent";
import { LinkWidgetData } from "@/app/api/metaData/route";
import { LinkWidget } from "tesx-xi";
const lobster = Lobster({
  subsets: ["latin"],
  weight: ["400"],
});

const kalam = Kalam({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700"],
});

const gabriela = Gabriela({
  subsets: ["latin"],
  weight: ["400"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "500", "600", "700", "900"],
});
const DraggableContainer = ({ children }: PropsWithChildren) => {
  return (
    <div className="z-10 group relative h-full">
      <span className="p-1 text-2xl group-hover:opacity-100 opacity-0 bg-primary bg-opacity-30 rounded-lg cursor-grab absolute h-fit transition-all duration-150 ease-linear flex items-center top-[2px] right-[2px]">
        <RiDraggable />
      </span>
      {children}
    </div>
  );
};

interface Props {
  cardDetails: CardDetails;
}

const MobileView = ({
  cardDetails: {
    name,
    designation,
    companyName,
    profileImage,
    employeeBio,
    links,
    additionalImages,
    additionalImageSlideShow,
    bannerImages,
    coverImageSlideShow,
    embedMedia,
    location,
    googleForm,
    pdf,
    pdfTitle,
    titles,
    enableContact,
    theme,
    appearance,
    customLinks,
  },
}: Props) => {
  const embedComponents = [
    {
      id: "additionalImages",
      name: "Additional Images",
      component: (
        <AdditionalImages
          additionalImages={additionalImages?.map((image) => image.imageUrl)}
          imageSlideshow={additionalImageSlideShow}
        />
      ),
    },
    {
      id: "embedMap",
      name: "Embed Map",
      component: <EmbedMap embedMap={location} theme={theme} />,
    },
    {
      id: "embedMedia",
      name: "Embed Media",
      component: <EmbedMedia embedMedia={embedMedia} theme={theme} />,
    },
    {
      id: "embedPdf",
      name: "Embed pdf",
      component: (
        <EmbedPdf pdf={pdf?.value} pdfTitle={pdf?.title} theme={theme} />
      ),
    },
    {
      id: "embedGoogleForm",
      name: "Embed Google form",
      component: <EmbedGoogleForm theme={theme} googleForm={googleForm} />,
    },
  ];

  const [embedTitles, setEmbedTitles] = useState<any[]>([]);
  const [components, setComponents] = useState([
    ...embedTitles,
    ...embedComponents,
  ]);
  useEffect(() => {
    if (titles) {
      const newEmbedTitles = titles.map((title, index) => ({
        id: `EmbedText${title}-${index}`,
        name: "EmbedTitles",
        component: <ExpandableText theme={theme || "light"} text={title} />,
      }));
      setComponents([...embedTitles, ...embedComponents]);
      setEmbedTitles(newEmbedTitles);
    }
  }, [titles]);

  useEffect(() => {
    setComponents([...embedTitles, ...embedComponents]);
  }, [
    embedTitles,
    additionalImages,
    additionalImageSlideShow,
    embedMedia,
    googleForm,
    location,
    pdf,
    pdfTitle,
    location,
    theme,
    embedTitles,
  ]);

  const onListDragEnd: OnDragEndResponder = (result) => {
    if (!result.destination) return;
    const updatedItems = reorder(
      components,
      result.source.index,
      result.destination.index
    );

    setComponents(updatedItems);
  };

  const ref = useRef(null);

  const [scrollPosition, setScrollPosition] = useState(0);
  const [isShareClicked, setIsShareClicked] = useState(false);
  const [isFormOpened, setIsFormOpened] = useState(false);
  const { scrollY } = useScroll({ container: ref });
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrollPosition(latest);
  });

  let selectedFont = appearance.font || "poppins";
  let font = poppins.className;

  switch (selectedFont) {
    case "kalam":
      font = kalam.className;
      break;
    case "lobster":
      font = lobster.className;
      break;
    case "roboto":
      font = roboto.className;
      break;
    case "gabriela":
      font = gabriela.className;
      break;
    // case "poppins":
    //   font = poppins.className;
    //   break;
  }

  const imageUrl = useMemo(() => {
    if (typeof profileImage !== "string") {
      return profileImage ? URL.createObjectURL(profileImage) : null;
    } else {
      return profileImage;
    }
  }, [profileImage]);

  return (
    <MockupPreview>
      <div
        ref={ref}
        data-theme={theme === "dark" ? "flax-dark" : "flax-light"}
        style={{
          // fontFamily: appearance.font,
          background: appearance.backgroundColor,
        }}
        className={
          font +
          classNames({
            " bg-primary no-bar text-secondary space-y-5 px-2 py-2 relative w-[320px] flex flex-col border border-dSecondary rounded-3xl h-[620px] shadow-2xl z-10 overflow-y-scroll transition-all duration-200":
              true,
          })
        }
      >
        <div className="sticky top-0 z-40">
          {scrollPosition > 140 && (
            <ScrollNavbar
              name={name}
              profileImage={imageUrl}
              setIsSharing={setIsShareClicked}
            />
          )}
        </div>
        {/* <iframe src="https://prod-dashboard-pdf-files.s3.amazonaws.com/1707077262029BCS_PACKAGES_AND_FILTERS981673.pdf" /> */}
        {/* <PdfViewer pdfFile={}/> */}
        <ProfileHeader
          appearance={appearance}
          bannerImages={bannerImages?.map((image) => image.imageUrl)}
          profileImage={profileImage}
          name={name}
          coverImageSlideShow={coverImageSlideShow}
          designation={designation}
          employeeBio={employeeBio}
          companyName={companyName}
        />

        {enableContact && (
          <button
            className={classNames({
              "bg-blue text-xs font-semibold text-white rounded-xl w-full py-3":
                true,
              hidden: scrollPosition > 100,
            })}
          >
            Save Contact
          </button>
        )}
        {links.length > 0 && (
          <Socials links={links} theme={theme} appearance={appearance} />
        )}
        <div className="grid grid-cols-2 gap-1">
          {customLinks &&
            customLinks?.map(
              (item) =>
                item.isActive && (
                  <LinkWidget
                    key={item.url}
                    widgetStyle={item.widgetStyle}
                    url={item.url}
                    buttonText={item.buttonText}
                    bgColor={appearance.buttonColor}
                    textColor={appearance.buttonFontColor}
                  />
                )
            )}
        </div>

        <div className="z-20 mb-5">
          <div className="space-y-5">
            <DragDropContext onDragEnd={onListDragEnd}>
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <div
                    className="space-y-5"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {components.map((component, index) => (
                      <Draggable
                        draggableId={component.id}
                        key={component.id}
                        index={components.indexOf(component)}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <DraggableContainer>
                              {component.component}
                            </DraggableContainer>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>
        {enableContact && scrollPosition > 100 && (
          <motion.button
            initial={{ y: -550, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            whileInView={{ y: 0, opacity: 1 }}
            exit={{ y: -550, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={classNames({
              "z-30 py-3 bg-blue text-xs sticky bottom-5 font-semibold text-white rounded-xl w-full":
                true,
              "opacity-0": scrollPosition <= 100,
            })}
          >
            Save Contact
          </motion.button>
        )}

        {scrollPosition > 100 && (
          <div className="flex justify-self-end justify-items-center">
            <button
              className="mx-auto flex items-center text-lg font-light my-7 text-center space-x-2"
              onClick={() => setIsShareClicked(!isShareClicked)}
            >
              <span className="font-semibold">{`Flax `}</span>
              {` Card`}{" "}
              <Image
                className="mx-2"
                src={theme === "light" ? smLight : smDark}
                alt="logo"
              />
              <span className="font-semibold">{name.split(" ")?.[0]}</span>
            </button>
          </div>
        )}

        {isFormOpened && false && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 100 }}
            className="sticky inset-0 z-50 bottom-32 flex items-center justify-center"
          >
            <div className="mx-auto space-y-3 w-[90%] p-3 h-fit overflow-y-scroll rounded-lg bg-accent shadow-md border border-dSecondary">
              <div className="flex border-b-2 pb-2 border-dSecondary justify-between items-center">
                <p className="text-md">Tell About yourself</p>
                <span
                  className="p-1 cursor-pointer text-xl rounded-full"
                  onClick={() => {
                    setIsFormOpened(false);
                  }}
                >
                  <RiCloseLine />
                </span>
              </div>

              <form
                action=""
                className="space-y-3"
                onSubmit={(event) => {
                  event.preventDefault();
                }}
              >
                <input
                  type="text"
                  placeholder="Name"
                  className="input input-bordered w-full max-w-xs"
                />
                <input
                  type="text"
                  placeholder="Email"
                  className="input input-bordered w-full max-w-xs"
                />
                <input
                  placeholder="Phone Number"
                  className="input input-bordered w-full max-w-xs"
                />
                <textarea
                  className="textarea textarea-bordered w-full"
                  placeholder="Message"
                />
                <button className="w-full transition-all duration-150 hover:scale-[0.98] active:[0.96] text-white py-2 bg-blue rounded-lg">
                  Connect
                </button>
              </form>
              <p className="text-xs text-center text-tSecondary">
                We do not share your information with anyone
              </p>
            </div>
          </motion.div>
        )}

        <SharePopup
          isOpen={isShareClicked}
          setIsOpen={() => setIsShareClicked(false)}
        />
      </div>
    </MockupPreview>
  );
};

export default MobileView;
