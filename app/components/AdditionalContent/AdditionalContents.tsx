import { FileData } from "@/app/dashboard/CardGrid";
import AddedImages from "./AddedImages";
import AdditionalImages from "./AdditionalImages";
import EmbedForm from "./EmbedForm";
import EmbedMap from "./EmbedMap";
import EmbedYoutubeVideo from "./EmbedYoutubeVideo";
import FormattedText from "./FormattedText";
import Pdf from "./Pdf";

interface Props {
  images?: string[];
  pdf?: FileData;
}

const AdditionalContents = ({ pdf, images }: Props) => {
  const colSpans = [1, 1, 2, 1, 2, 2, 1];

  return (
    <div className="my-5">
      {/* <p className="text-tSecondary">Addition Content</p> */}
      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {/* <div>
          <AdditionalImages onSubmit={(file) => {}} />
        </div>
        <AddedImages images={images} /> */}

        <div className="col-span-1">
          <FormattedText onSubmit={() => {}} />
        </div>
        <div className={`col-span-1`}>
          <Pdf pdf={pdf} onSubmit={() => {}} />
        </div>
        <div>
          <EmbedYoutubeVideo onSubmit={() => {}} />
        </div>
        {/* <div className={`col-span-${colSpans[5]}`}>
          <EmbedMap />
        </div> */}
        <div>
          <EmbedForm onSubmit={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default AdditionalContents;
