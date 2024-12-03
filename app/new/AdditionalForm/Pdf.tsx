"use client";

import aleft from "@/public/Icons/aleft.svg";
import aright from "@/public/Icons/aright.svg";
import pdf from "@/public/Icons/pdf.svg";
import { useResizeObserver } from "@wojtekmaj/react-hooks";
import { useCallback, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import Image from "next/image";
import type { PDFDocumentProxy } from "pdfjs-dist";
import Input from "../../components/input/Input";
import Modal from "../Modal";
import useUserStore from "@/app/stores/store";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
};

const resizeObserverOptions = {};

type PDFFile = string | File | null;

export default function Sample() {
  const [file, setFile] = useState<PDFFile>("./FLAX_SAMPLE_PDF.pdf");
  const [numPages, setNumPages] = useState<number>();
  const [page, setPage] = useState<number>(1);
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>();
  const { setPdf } = useUserStore();

  const onResize = useCallback<ResizeObserverCallback>((entries) => {
    const [entry] = entries;

    if (entry) {
      setContainerWidth(entry.contentRect.width);
    }
  }, []);

  useResizeObserver(containerRef, resizeObserverOptions, onResize);

  function onFileChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { files } = event.target;

    if (files && files[0]) {
      setFile(files[0] || null);
      setPdf(files[0]);
    }
    setPage(1);
  }

  function onDocumentLoadSuccess({
    numPages: nextNumPages,
  }: PDFDocumentProxy): void {
    setNumPages(nextNumPages);
  }

  return (
    <Modal
      title="Add PDF"
      subtitle="You can add your pdf here"
      label="PDF File"
      icon={pdf}
    >
      <div className="flex flex-col w-full h-fit mt-2 items-center justify-center">
        <div className="mb-5 w-full">
          <Input name="title" label="Title" />
        </div>
        <div ref={setContainerRef} className="-z-20">
          <div className="shadow-lg w-fit">
            <Document
              file={file}
              // onLoadSuccess={onDocumentLoadSuccess}
              options={options}
            >
              <Page pageNumber={page} width={150} />
            </Document>
          </div>
        </div>
        <div className="z-40 shadow-2xl mb-10">
          <div className="w-100 shadow-2xl bg-sSecondary rounded-lg flex  justify-center -mt-[20%]">
            <div className="w-fit flex items-center px-4 py-3 rounded-lg space-x-2">
              <Image
                src={aleft}
                width={40}
                alt="aLeft"
                className="cursor-pointer px-2"
                onClick={() => {
                  setPage(page > 1 ? page - 1 : 1);
                }}
              />

              <div className="page flex items-center">{`${page}  of  ${numPages}`}</div>
              <Image
                width={40}
                src={aright}
                alt="aRight"
                className="cursor-pointer px-2"
                onClick={() => {
                  setPage(page < numPages! ? page + 1 : numPages!);
                }}
              />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="pdf" className="btn btn-primary text-white">
            Upload Your PDF
          </label>
          <input
            id="pdf"
            type="file"
            onChange={onFileChange}
            className="hidden"
          />
        </div>
      </div>
    </Modal>
  );
}
