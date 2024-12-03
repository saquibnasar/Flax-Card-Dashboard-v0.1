import arrowLeft from "@/public/ArrowLeft.svg";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import Spinner from "../components/Spinner";

interface Props {
  previous: string;
  next: string;
  disable?: boolean;
  loader?: ReactNode | boolean;
  label?: string;
}

const Submit = ({ previous, next, disable = false, loader, label }: Props) => {
  return (
    <div className="align-bottom mt-5 h-fit">
      <div className="flex justify-between items-center">
        {next === "linkForm" ? (
          <div />
        ) : (
          <Link
            className="text-tSecondary flex justify-between"
            href={`/new?tab=${previous}`}
          >
            <Image className="mr-5" src={arrowLeft} alt="arrow-left" /> Back
          </Link>
        )}
        <div>
          {next !== "linkForm" && previous !== "addForm" && (
            <Link
              href="/new?tab=theme"
              className="text-tSecondary transition-all duration-150 py-2 px-10 rounded-md hover:scale-[0.98] active:scale-[0.94]"
            >
              Skip
            </Link>
          )}
          <button
            className="bg-blue hover:bg-lightblue transition-all duration-150 text-white py-2 px-10 rounded-md hover:scale-[0.98] active:scale-[0.94] disabled:bg-opacity-40"
            type="submit"
            disabled={disable}
          >
            {previous === "theme" ? (
              loader ? (
                loader
              ) : (
                "Continue"
              )
            ) : previous === "addForm" ? (
              disable ? (
                <Spinner />
              ) : (
                "Create"
              )
            ) : (
              label || "Next"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Submit;
