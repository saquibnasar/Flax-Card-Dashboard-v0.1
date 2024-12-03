"use client";

import { EmbedMediaSchema } from "@/app/validation";
import classNames from "classnames";
import { useState } from "react";

import { getYtVideoTitle } from "@/app/services/youtube-api";
import {
  RiArrowLeftLine,
  RiCodeSSlashLine,
  RiEarthFill,
  RiFileCopy2Line,
} from "react-icons/ri";
import HookForm from "../HookForm";
import ModalForm from "../ModalForm";

const FormTypeContent = () => {
  const initialMediaType = [
    {
      type: "location",
      label: "Location",
      icon: <RiEarthFill />,
      defaultValue: "",
      subtitle: "Share your location",
    },
  ];

  const [mediaType, setMediaType] = useState(initialMediaType);

  const [isContentOpened, setIsContentOpened] = useState<{
    [key: string]: boolean;
  }>({
    embedMedia: false,
    location: false,
    googleForm: false,
  });

  const openContent = (type: string) => {
    setIsContentOpened({ ...isContentOpened, [type]: true });
  };

  const closeContent = (type: string) => {
    setIsContentOpened({ ...isContentOpened, [type]: false });
  };

  return (
    <>
      {mediaType.map((media, index) => (
        <div
          key={media.type}
          className={classNames({
            "cursor-pointer bg-sSecondary space-y-2 text-tSecondary flex flex-col items-center justify-center px-10 py-14 rounded-lg":
              true,
            "col-span-2": index % 2 !== 0,
          })}
          onClick={() => openContent(media.type)}
        >
          <div>
            <span className="text-3xl">{media.icon}</span>
          </div>
          <p className="text-center">{media.label}</p>
          {isContentOpened[media.type] && (
            <ModalForm
              isOpen={isContentOpened[media.type]}
              onClose={() => closeContent(media.type)}
            >
              <div className="flex items-center space-x-2">
                <div>
                  <h3 className="font-bold text-[#111] text-lg">
                    {media.label}
                  </h3>
                  <h5 className="text-xs">
                    Share from video, youtube and more
                  </h5>
                </div>
              </div>
              <HookForm
                closeModal={() => closeContent(media.type)}
                schema={EmbedMediaSchema}
                onSubmit={async (data) => {
                  console.log(data);
                }}
                labelMapping={["Title", "Paste Your Link"]}
              />
            </ModalForm>
          )}
        </div>
      ))}
    </>
  );
};

export default FormTypeContent;
