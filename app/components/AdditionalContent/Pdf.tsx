"use client";

import Button from "@/app/components/Button";
import { FileData } from "@/app/dashboard/CardGrid";
import { useResizeObserver } from "@wojtekmaj/react-hooks";
import classNames from "classnames";
import type { PDFDocumentProxy } from "pdfjs-dist";
import { ReactNode, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { RiFilePdf2Line } from "react-icons/ri";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import ModalForm from "../ModalForm";
import TextInput from "../TextInput";
import useUserAdditionalContent from "@/app/stores/useUserAdditionalContent";
import DeleteButton from "../DeleteButton";
import Spinner from "../Spinner";
import ToggleButton from "../ToggleButton";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
};

const resizeObserverOptions = {};

type PDFFile = string | File | null;

interface Props {
  children?: ReactNode;
  onSubmit: (title: string, pdfFile: File) => void;
  handleActive?: (active: boolean, pdfFile?: File, title?: string) => void;
  pdf?: FileData;
  background?: string;
  isLoading?: boolean;
  isContentModal?: boolean;
  title?: string;
  value?: string;
}

export default function Sample({
  title,
  value,
  children,
  handleActive = () => {},
  pdf,
  onSubmit,
  background = "sPrimary",
  isContentModal,

  isLoading = false,
}: Props) {
  const [file, setFile] = useState<PDFFile>(value || "");
  const [selectedFile, setSelectedFile] = useState<File>({} as File);
  const [page, setPage] = useState<number>(1);
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>();
  const [isDirectMode, setIsDirectMode] = useState(true);

  const [isOpened, setIsOpened] = useState(false);
  const openModal = () => setIsOpened(true);
  const closeModal = () => setIsOpened(false);
  const { control, handleSubmit } = useForm();
  const [pdfProps, removePdf] = useUserAdditionalContent((s) => [
    s.pdf,
    s.removePdf,
  ]);

  const onResize = useCallback<ResizeObserverCallback>((entries) => {
    const [entry] = entries;

    if (entry) {
      setContainerWidth(entry.contentRect.width);
    }
  }, []);

  useResizeObserver(containerRef, resizeObserverOptions, onResize);

  function onFileChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { files } = event.target;
    if (isContentModal) {
      onSubmit(title || pdf?.title || "My pdf", files?.[0]!);
      setSelectedFile(files?.[0]!);
      setFile(files?.[0]!);
    } else {
      setSelectedFile(files?.[0]!);
      setFile(files?.[0]!);
    }

    setPage(1);
  }

  return (
    <>
      {children ? (
        <div onClick={openModal}>{children}</div>
      ) : (
        pdfProps.pdfFile && (
          <div
            className={
              `bg-${background} ` +
              classNames({
                "cursor-pointer relative group space-y-2 text-tSecondary flex flex-col items-center justify-center px-10 py-14 rounded-lg":
                  true,
              })
            }
            onClick={openModal}
          >
            <DeleteButton handleOnClick={removePdf} />

            <div>
              <span className="text-3xl">
                <RiFilePdf2Line />
              </span>
            </div>
            <p className="text-center">Add pdf</p>
          </div>
        )
      )}

      {isOpened && (
        <ModalForm isOpen={isOpened} onClose={() => closeModal()}>
          <div className="flex items-center space-x-2 justify-between">
            <div>
              <h3 className="font-bold text-[#111] text-lg">Pdf</h3>
              <h5 className="text-xs">Share your pdf file here</h5>
            </div>
            <div className="flex flex-col justify-end">
              <p className="text-xs mb-2">Enable Direct Mode</p>
              <div className="ml-auto">
                <ToggleButton
                  isChecked={isDirectMode}
                  onChange={() => {
                    setIsDirectMode((directMode) => !directMode);
                    handleActive(!isDirectMode, selectedFile, title);
                  }}
                />
              </div>
            </div>
          </div>
          <form>
            <TextInput
              control={control}
              name="pdfTitle"
              label="Enter Title"
              defaultValue={title || pdf?.title || ""}
            />
            <div
              ref={setContainerRef}
              className="-z-20 flex my-3 justify-center"
            >
              <div className="shadow-lg w-fit">
                {typeof file !== "string" && (
                  <Document
                    className="rounded-lg"
                    file={value || file}
                    // onLoadSuccess={onDocumentLoadSuccess}
                    options={options}
                  >
                    <Page pageNumber={page} width={150} />
                  </Document>
                )}
              </div>
            </div>
            <div className="flex justify-center">
              <label htmlFor="pdf" className="btn btn-primary text-white">
                {title || value ? "Update Pdf" : "Upload Your PDF"}
              </label>
              <input
                id="pdf"
                type="file"
                accept=".pdf"
                onChange={onFileChange}
                className="hidden"
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
                onClick={handleSubmit((data) => {
                  onSubmit(data.pdfTitle, selectedFile);
                  closeModal();
                })}
                width="160px"
              >
                {isLoading ? <Spinner /> : "Save"}
              </Button>
            </div>
          </form>
        </ModalForm>
      )}
    </>
  );
}
