import { getYtVideoTitle } from "@/app/services/youtube-api";
import classNames from "classnames";
import { ReactNode, useState } from "react";
import { RiCodeSSlashLine } from "react-icons/ri";
import ModalForm from "../ModalForm";
import Button from "../Button";
import DeleteButton from "../DeleteButton";
import useUserAdditionalContent from "@/app/stores/useUserAdditionalContent";
import Spinner from "../Spinner";
interface Props {
  onSubmit: (title: string, link: string) => void;
  background?: string;
  children?: ReactNode;
  isLoading?: boolean;
  type?: "bar" | "content";
}
const EmbedYoutubeVideo = ({
  children,
  onSubmit,
  background = "sPrimary",
  isLoading = false,
  type,
}: Props) => {
  const [videoTitle, setVideoTitle] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const media = {
    type: "embedVideo",
    title: videoTitle,
    icon: <RiCodeSSlashLine />,
    label: "EmbedVideo",
  };
  const [isOpened, setIsOpened] = useState(false);

  const openModal = () => setIsOpened(true);
  const closeModal = () => setIsOpened(false);

  const [embedMedia, deleteEmbedMedia] = useUserAdditionalContent((s) => [
    s.embedMedia,
    s.removeEmbedMedia,
  ]);

  return (
    <>
      {children ? (
        <div onClick={() => openModal()}>{children}</div>
      ) : (
        <div
          key={media.type}
          className={
            `bg-${background} ` +
            classNames({
              "cursor-pointer relative group space-y-2 text-tSecondary flex flex-col items-center justify-center px-10 py-14 rounded-lg":
                true,
            })
          }
          onClick={() => openModal()}
        >
          {embedMedia && <DeleteButton handleOnClick={deleteEmbedMedia} />}

          <div>
            <span className="text-3xl">{media.icon}</span>
          </div>
          <p className="text-center">{media.label}</p>
        </div>
      )}
      {isOpened && (
        <ModalForm isOpen={isOpened} onClose={() => closeModal()}>
          <div className="flex items-center space-x-2">
            <div>
              <h3 className="font-bold text-[#111] text-lg">Embed Media</h3>
              <h5 className="text-xs">Share from video, youtube and more</h5>
            </div>
          </div>

          <div className="form-control duration-75">
            <label className="label mb-2">
              <span className="label-text">Enter Title</span>
            </label>

            <input
              type="text"
              className="input input-bordered w-full bg-sSecondary border-none"
              value={videoTitle}
              onChange={(event) => setVideoTitle(event.currentTarget.value)}
            />
          </div>

          <div className="form-control duration-75">
            <label className="label mb-2">
              <span className="label-text">Paste your youtube video link</span>
            </label>

            <input
              type="text"
              className="input input-bordered w-full bg-sSecondary border-none"
              onChange={async (event) => {
                const value = event.currentTarget.value;
                const ytTitle = await getYtVideoTitle(value).catch(() => (
                  <div role="alert" className="alert">
                    <span>Enter valid Video link</span>
                  </div>
                ));
                setVideoLink(value);
                setVideoTitle(ytTitle);
              }}
            />
          </div>

          <div className="flex justify-end space-x-5 mt-5">
            <Button
              className="border border-dSecondary"
              width="160px"
              accent={true}
              type="button"
              onClick={closeModal}
            >
              Close
            </Button>
            <Button
              type="submit"
              onClick={() => {
                onSubmit(videoTitle, videoLink);
                setIsOpened(false);
              }}
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

export default EmbedYoutubeVideo;
