import Image from "next/image";
import { PropsWithChildren } from "react";
import mockup from "@/public/mockup.svg";

const RegisterFormLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="w-full flex lg:space-x-5">
      <div className="w-full my-auto md:w-[50%] lg:w-[50%] h-full min-h-screen">
        {children}
      </div>
      <div className="hidden md:p-10 md:block md:w-[35%] lg:w-[50%] h-screen bg-sPrimary">
        <div className="h-full flex justify-center items-center">
          <Image
            className="md:w-[320px] lg:w-[280px] my-auto"
            src={mockup}
            alt="mockup"
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterFormLayout;
