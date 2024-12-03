"use client";
import google from "@/public/Icons/google.svg";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ErrorMessage from "../components/ErrorMessage";
import http from "../services/api-client";
import { setCookie } from "cookies-next";
import Link from "next/link";
import { motion } from "framer-motion";

const schema = z.object({
  email: z.string(),
  password: z.string(),
});

type UserLoginForm = z.infer<typeof schema>;

const LoginForm = () => {
  const { register, handleSubmit } = useForm<UserLoginForm>();

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<any>({
    email: null,
    password: null,
    unexpected: null,
  });
  const onSubmit = handleSubmit(async ({ email, password }) => {
    try {
      setIsLoading(true);
      await http
        .post("/auth/signin", {
          email,
          password,
        })
        .then((response) => {
          setCookie("accessToken", response.data.accessToken);
          window.localStorage.setItem("accessToken", response.data.accessToken);
          window.localStorage.setItem(
            "refreshToken",
            response.data.refreshToken
          );
          window.localStorage.setItem("email", response.data.email);
          window.localStorage.setItem("username", response.data.username);
        });
      setIsLoading(false);
      window.location.href = "/dashboard";
    } catch (error: any) {
      const response = error.response?.data;
      if (response?.statusCode === 404) {
        setErrors({ ...errors, email: response.message });
      } else if (response.statusCode === 401) {
        setErrors({ ...errors, password: response.message });
      } else {
        setErrors({ ...errors, unexpected: "Unexpected Error Occurred" });
      }
      setIsLoading(false);
    }
  });
  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      whileInView={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col p-2 md:p-12 lg:p-16"
      onSubmit={onSubmit}
    >
      <div className="custom-scrollbar flex flex-col justify-between mx-auto w-[100%] md:w-[70%] lg:w-[50%] space-y-3 p-5 overflow-y-scroll">
        <div className="mb-5 md:mb-10">
          <h1 className="text-4xl mb-2">Login Into your Account</h1>
          <p className="text-tSecondary font-normal">
            {" "}
            Explore the world of digital cards
          </p>
        </div>
        <div className="space-y-5">
          <ErrorMessage>{errors.unexpected}</ErrorMessage>
          <div className="form-control">
            <label className="label-text p-1">Email</label>
            <input
              {...register("email")}
              type="text"
              className="input input-bordered"
            />
            <ErrorMessage>{errors.email}</ErrorMessage>
          </div>

          <div className="form-control">
            <label className="label-text p-1">Password</label>
            <input
              {...register("password")}
              type="password"
              className="input input-bordered"
            />
            <ErrorMessage>{errors.password}</ErrorMessage>
          </div>
          <div className="ml-auto">
            <Link
              className="my-2 mx-auto text-center text-blue underline"
              href={"/login/forgot-password"}
            >
              Forgot Password?
            </Link>
          </div>
          <div className="h-[10vh] flex justify-center">
            <button
              className={`bg-blue h-fit hover:bg-lightblue transition-colors text-white py-2 px-10 rounded-md ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              type="submit"
            >
              {isLoading ? (
                <span className="loading loading-dots loading-xs" />
              ) : (
                "Continue"
              )}
            </button>
          </div>

          {/* <div className="w-full flex items-center mt-10">
            <div className="w-full h-[0.5px] bg-tSecondary" />
            <p className="font-bold mx-5">or</p>
            <div className="w-full h-[0.5px] bg-tSecondary" />
          </div>

          <button
            className="w-full py-3 justify-center flex border-[0.5px] border-tSecondary rounded-full"
            type="button"
          >
            <Image className="mr-10" src={google} alt="google" />
            Continue With Google
          </button> */}
        </div>
        <p className="text-center my-5 text-tSecondary">
          Don&apos;t have an account?
          {` `}
          <Link href="/register" className="text-blue underline">
            Sign up
          </Link>
        </p>
      </div>
    </motion.form>
  );
};

export default LoginForm;
