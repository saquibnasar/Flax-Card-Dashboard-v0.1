"use client";
import useUserAdditionalContent from "@/app/stores/useUserAdditionalContent";
import { useResizeObserver } from "@wojtekmaj/react-hooks";
import _ from "lodash";
import type { PDFDocumentProxy } from "pdfjs-dist";
import { useCallback, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
};

const resizeObserverOptions = {};

const ShowPdf = () => {
  const [numPages, setNumPages] = useState<number>(1);
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>();
  const { pdf } = useUserAdditionalContent();

  const onResize = useCallback<ResizeObserverCallback>((entries) => {
    const [entry] = entries;

    if (entry) {
      setContainerWidth(entry.contentRect.width);
    }
  }, []);

  useResizeObserver(containerRef, resizeObserverOptions, onResize);

  function onDocumentLoadSuccess({
    numPages: nextNumPages,
  }: PDFDocumentProxy): void {
    setNumPages(nextNumPages);
  }

  const pages = _.range(1, numPages + 1);

  const maxWidth = 260;
  const scale = containerWidth ? maxWidth / containerWidth : 1;
  return (
    <div className="flex flex-col items-center overflow-hidden rounded-lg">
      <div className="custom-scrollbar shadow-lg w-fit h-fit py-2 overflow-y-scroll">
        <Document
          // renderMode="svg"
          file={pdf.pdfFile}
          // onLoadSuccess={onDocumentLoadSuccess}
          options={options}
        >
          {pages.map((page) => (
            <Page
              key={page}
              pageNumber={page}
              // scale={scale}
              width={260}
            />
          ))}
        </Document>
      </div>
    </div>
  );
};

export default ShowPdf;
