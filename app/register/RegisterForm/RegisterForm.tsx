"use client";

import ErrorMessage from "@/app/components/ErrorMessage";
import http from "@/app/services/api-client";
import { UserSchema } from "@/app/validation";
import google from "@/public/Icons/google.svg";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { RiArrowLeftLine } from "react-icons/ri";
import z from "zod";
import OtpForm from "./OtpForm";
import { setCookie } from "cookies-next";

type UserType = z.infer<typeof UserSchema>;

interface Props {
  profileUrl: string;
  handleNext: (tab: number) => void;
}

const RegisterForm = ({ profileUrl, handleNext }: Props) => {
  const { register, handleSubmit } = useForm<UserType>({
    resolver: zodResolver(UserSchema),
  });
  const [tab, setTab] = useState<"register" | "otp">("register");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsLoading(true);
      const result = await http.post("/auth/signup", {
        username: profileUrl,
        email: data.email,
        password: data.password,
      });
      setCookie("accessToken", result.data.accessToken);

      window.localStorage.setItem("accessToken", result.data.accessToken);
      window.localStorage.setItem("refreshToken", result.data.refreshToken);
      window.localStorage.setItem("email", data.email);
      window.localStorage.setItem("username", profileUrl);
      setTab("otp");

      setIsLoading(false);
    } catch (error: any) {
      setError("User already Exist");
      setIsLoading(false);
    }
  });

  const RegisterFormTab = () => (
    <form
      className="w-full duration-200 ease-linear space-y-5 flex flex-col justify-between"
      onSubmit={onSubmit}
    >
      <span
        className="cursor-pointer text-3xl duration-200 ease-linear"
        onClick={() => handleNext(0)}
      >
        <RiArrowLeftLine />
      </span>
      <h1 className="text-4xl">{`flax.bio/${profileUrl} is yours!`}</h1>
      <p>Now, create your account.</p>

      <div className="custom-scrollbar w-full md:pt-10  space-y-5">
        <div className="form-control">
          <label className="label-text mb-1">Email</label>
          <input
            {...register("email")}
            type="text"
            className="input input-bordered"
          />
          <ErrorMessage>{error}</ErrorMessage>
        </div>

        <div className="form-control">
          <label className="label-text mb-1">Password</label>
          <input
            {...register("password")}
            type="password"
            className="input input-bordered"
          />
        </div>

        <div className="w-full">
          <button
            type="submit"
            className="transition-all duration-150 ease-linear hover:opacity-90 hover:scale-[0.98] active:scale-[0.95] w-full bg-blue px-10 py-2 text-white rounded-lg"
          >
            {isLoading ? (
              <span className="loading loading-dots loading-sm" />
            ) : (
              "Sign Up"
            )}
          </button>
          {/* <button
          type="submit"
          className="px-6 py-2 bg-blue rounded-lg text-white"
        >
          Sign Up
        </button> */}
        </div>

        <div className="w-full flex items-center mt-20">
          <div className="w-full h-[0.5px] bg-tSecondary" />
          <p className="font-bold mx-5">or</p>
          <div className="w-full h-[0.5px] bg-tSecondary" />
        </div>

        <button className="mx-auto w-full md:w-fit justify-center flex items-center space-x-3 px-5 py-3 border-[0.5px] border-dPrimary rounded-full hover:scale-[0.99] duration-150 ease-linear">
          <Image width={30} height={30} src={google} alt="google" />
          <span className="whitespace-nowrap">Continue With Google</span>
        </button>
      </div>
    </form>
  );
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "linear" }}
      className="w-full p-5 md:p-10"
      key={tab}
    >
      {tab === "register" ? <RegisterFormTab /> : <OtpForm />}
    </motion.div>
  );
};

export default RegisterForm;
