import placeHolder from "@/public/placeholders/templatePlaceHolder.svg";
import Image from "next/image";
import { RiAddCircleLine } from "react-icons/ri";
const TemplatePlaceHolder = ({
  setCount,
}: {
  setCount: (count: number) => void;
}) => {
  return (
    <div className="w-full text-center md:text-start space-y-5 flex flex-col items-center">
      <Image src={placeHolder} alt="template_placeholder" />
      <h1 className="text-4xl">Looks empty here!</h1>
      <p className="text-tSecondary">Add templates to ease your work.</p>
      {/* <button
        className="bg-black text-white flex items-center px-5 py-3 rounded-lg hover:opacity-95 hover:scale-[0.98] active:scale-[0.95] transition-all duration-150 ease-linear"
        onClick={() => setCount(1)}
      >
        <span className="mr">
          <RiAddCircleLine />
        </span>
        Add template
      </button> */}
    </div>
  );
};

export default TemplatePlaceHolder;
