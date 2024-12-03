"use client";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import "cropperjs/dist/cropper.css";
import React, { ReactNode, createRef, useEffect, useState } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import { RiRectangleLine, RiSquareLine } from "react-icons/ri";
import { PiFrameCorners } from "react-icons/pi";
import { LuRectangleVertical } from "react-icons/lu";
import classNames from "classnames";
import Button from "./Button";

interface Props {
  children: ReactNode;
  aspectRatio: number;
  multiRatio?: boolean;
  setAspectRatio?: (ratio: number) => void;
  setFile: (file: File) => void;
  name: string;
}

export const CroppedImage = ({
  children,
  name,
  aspectRatio = 1,
  multiRatio,
  setAspectRatio,
  setFile,
}: Props) => {
  const [image, setImage] = useState("");
  const cropperRef = createRef<ReactCropperElement>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    let files = e.target.files;
    if (files && files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(files[0]);
      onOpen();
    }
  };

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      const croppedCanvas = cropperRef.current?.cropper.getCroppedCanvas();
      if (croppedCanvas) {
        croppedCanvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], "cropped-image.png", {
              type: "image/png",
            });
            setFile(file);
          }
        }, "image/png");
      }

      onClose();
    }
  };

  const ratioIcons = [
    { label: "1:1", value: 1, ratio: 1 / 1, icon: <RiSquareLine /> },
    {
      label: "16:9",
      value: 1.7777777777777777,
      ratio: 16 / 9,
      icon: <RiRectangleLine />,
    },
    {
      label: "2:3",
      value: 0.6666666666666666,
      ratio: 2 / 3,
      icon: <PiFrameCorners />,
    },
    {
      label: "9:16",
      value: 0.5625,
      ratio: 9 / 16,
      icon: <LuRectangleVertical />,
    },
  ];

  return (
    <div key={name}>
      <div className="w-full h-full">
        <label className="cursor-pointer" htmlFor={name}>
          {children}
        </label>
        <input
          className="hidden"
          id={name}
          type="file"
          accept="image/*"
          onChange={onChange}
        />
      </div>

      <div style={{ width: "100%" }}>
        {image && (
          <Modal size={"xl"} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Crop you picture</ModalHeader>
              <ModalCloseButton />
              <ModalBody className="flex flex-col justify-center space-y-5">
                {multiRatio && (
                  <div className="flex justify-center space-x-4">
                    {ratioIcons.map((ratio) => (
                      <span
                        key={ratio.ratio}
                        className={classNames({
                          "cursor-pointer text-4xl flex flex-col items-center hover:bg-dPrimary rounded-lg transition-all p-2":
                            true,
                          "bg-dPrimary": aspectRatio == ratio.ratio,
                        })}
                        onClick={() => {
                          setAspectRatio && setAspectRatio(ratio.ratio);
                        }}
                      >
                        {ratio.icon}
                        <p className="text-sm">{ratio.label}</p>
                      </span>
                    ))}
                  </div>
                )}
                <Cropper
                  ref={cropperRef}
                  key={aspectRatio}
                  style={{ height: 400, width: "100%" }}
                  initialAspectRatio={aspectRatio}
                  preview=".img-preview"
                  src={image}
                  aspectRatio={aspectRatio}
                  viewMode={1}
                  rotatable={true}
                  background={false}
                  responsive={true}
                  autoCropArea={1}
                  checkOrientation={false}
                  guides={true}
                />
                <Button onClick={getCropData}>Upload</Button>
              </ModalBody>
            </ModalContent>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default CroppedImage;
