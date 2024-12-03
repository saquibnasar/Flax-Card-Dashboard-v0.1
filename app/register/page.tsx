"use client";
import { useState } from "react";
import CheckUrlForm from "./CheckUrlForm";
import RegisterForm from "./RegisterForm/RegisterForm";

const SignUpForm = () => {
  const [selectedTab, setSelectTab] = useState(0);
  const handleNext = (tab: number) => setSelectTab(tab);
  const [profileUrl, setProfileUrl] = useState("");

  const SignUpTabView = [
    <CheckUrlForm
      key={0}
      setProfileUrl={(url) => setProfileUrl(url)}
      handleNext={handleNext}
    />,
    <RegisterForm key={1} profileUrl={profileUrl} handleNext={handleNext} />,
  ];

  const CurrentPage = SignUpTabView[selectedTab] ?? (
    <CheckUrlForm
      setProfileUrl={(url) => setProfileUrl(url)}
      handleNext={handleNext}
    />
  );
  return (
    <div
      key={selectedTab}
      className="flex flex-col h-screen w-full p-6 md:p-12 lg:p-16"
    >
      <div className="px-5 md:px-10 flex items-center space-x-3">
        <p className="text-[32px] font-bold">
          Flax <span className="font-light">Card</span>{" "}
        </p>
      </div>
      <div className="flex flex-col justify-center items-center md:items-start py-6 md:py-12 lg:py-16">
        {CurrentPage}
      </div>
    </div>
  );
};

export default SignUpForm;
