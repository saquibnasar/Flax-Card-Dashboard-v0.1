import useUserStore from "@/app/stores/store";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { useResizeObserver } from "@wojtekmaj/react-hooks";
import _ from "lodash";
import { PDFDocumentProxy } from "pdfjs-dist";
import React, { useCallback, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import ShowPdf from "./ShowPdf";
import useUserAdditionalContent from "@/app/stores/useUserAdditionalContent";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
};

const resizeObserverOptions = {};

type PDFFile = string | File | null;

interface Props {
  pdfFile?: File | string | null;
  theme: string;
}

const PdfViewer = ({ pdfFile }: Props) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const [file, setFile] = useState<PDFFile>("./FLAX_SAMPLE_PDF.pdf");
  const [page, setPage] = useState<number>(1);
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>();
  const { setPdf } = useUserStore();
  const [numPages, setNumPages] = useState<number>(1);

  const pages = _.range(1, numPages + 1);

  const maxWidth = 260;
  const scale = containerWidth ? maxWidth / containerWidth : 1;

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
  const { pdf } = useUserAdditionalContent();

  if (typeof pdfFile === "string")
    return (
      <div>
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.js">
          <div style={{ width: "300px", maxHeight: "420px" }}>
            {typeof pdfFile === "string" ? (
              <Viewer
                fileUrl={pdfFile}
                // plugins={[defaultLayoutPluginInstance]}
              />
            ) : (
              <ShowPdf />
            )}
          </div>
        </Worker>
      </div>
    );

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

export default PdfViewer;
