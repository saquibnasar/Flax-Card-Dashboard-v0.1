import useUserAdditionalContent from "@/app/stores/useUserAdditionalContent";
import React, { useState } from "react";
import { FcFile } from "react-icons/fc";
import Popover from "./Popover";
import ShowPdf from "@/app/components/MobileView/ShowPdf";
import classNames from "classnames";
import PdfViewer from "./PdfViewer";

interface Props {
  pdf?: File | string | null;
  pdfTitle?: string;
  theme?: "light" | "dark";
}

const EmbedPdf = ({ pdf, pdfTitle, theme }: Props) => {
  const [isOpened, setIsOpened] = useState(false);
  const { pdf: localPdf } = useUserAdditionalContent();

  if (localPdf.pdfFile || typeof pdf === "string")
    return (
      <>
        <div
          className={classNames({
            "cursor-pointer shadow bg-accent transition-all duration-150 ease-linear p-3 flex items-center space-x-1 rounded-lg":
              true,
            "bg-gradient-to-b from-[#333333] to-[#212121] border-none":
              theme === "dark",
            "bg-white shadow-lg border border-dSecondary": theme === "light",
          })}
          onClick={() => setIsOpened(true)}
        >
          <span className="text-2xl">
            <FcFile />
          </span>
          <p className="text-sm">
            {pdfTitle ? pdfTitle : "Something about us"}
          </p>
        </div>
        <Popover isOpen={isOpened} setIsOpen={setIsOpened}>
          <div className="rounded-lg border border-dSecondary h-[380px] overflow-y-scroll bg-opacity-0">
            <PdfViewer theme={theme || "light"} pdfFile={pdf} />
          </div>
        </Popover>
      </>
    );
};

export default EmbedPdf;
