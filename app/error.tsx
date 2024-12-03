"use client";
import bg from "@/public/not-found-bg.jpg";
import Image from "next/image";
import Footer from "./Footer";
import CheckUrl from "./components/CheckUrl";

interface Props {
  error: Error;
}

const ErrorPage = ({ error }: Props) => {
  console.log(error);
  return (
    <div className="p-3 z-0 w-full min-h-screen h-screen flex items-center justify-center relative">
      <div className="absolute top-0 left-0 w-full h-screen z-0">
        <Image layout="fill" objectFit="cover" src={bg} alt="earth-bg" />
      </div>
      <div className="z-10 w-full md:w-[70%] py-6 text-center flex flex-col items-center">
        <h1 className={`text-3xl text-white md:text-5xl pb-7 md:pb-14`}>
          UnExpected Error Occurred
        </h1>
        <div className="w-full flex flex-col items-center">
          <p className="text-md md:text-lg text-tSecondary pb-7">
            Please refresh or login again
          </p>
        </div>
        {/* <CheckUrl /> */}
      </div>
    </div>
  );
};

export default ErrorPage;
