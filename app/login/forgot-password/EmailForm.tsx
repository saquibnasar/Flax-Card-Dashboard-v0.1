import http from "@/app/services/api-client";
import axios from "axios";
import classNames from "classnames";
import { motion } from "framer-motion";
import Link from "next/link";
import React, { FormEvent, useState } from "react";
import { RiArrowLeftLine } from "react-icons/ri";
import { ForgotPasswordTabType } from "./page";

interface Props {
  handleSelectedTabChange: (tab: ForgotPasswordTabType) => void;
  changeEmail: (email: string) => void;
}
const EmailForm = ({ handleSelectedTabChange, changeEmail }: Props) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [statusCode, setStatusCode] = useState(200);
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await axios
        .post("https://dashboard.flaxcard.com/auth/forgot-password", { email })
        .then((response) => {
          if (response.data.message) setMessage(response.data.message);
          return response.data;
        });
      changeEmail(email);
      handleSelectedTabChange("reset");
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.data) {
          setMessage(
            error.response.data.message || "An unexpected error occurred."
          );
          setStatusCode(error.response.data.statusCode);
        } else {
          setMessage("No response was received.");
        }
      } else {
        setMessage("An unexpected error occurred.");
      }
    }
  };
  return (
    <div className="w-full h-screen">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        whileInView={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={classNames({
          "h-screen flex justify-center pt-32 px-6 md:px-24 pb-8": true,
        })}
      >
        <div className="">
          <div className="h-fit text-center mb-16">
            <h1 className="text-2xl md:text-5xl text-start mb-4">
              Reset your password
            </h1>
            <p className="text-sm text-start">
              If you signed up with a Email and password, reset your password
              below.
            </p>
          </div>

          <form className="form w-full" onSubmit={handleSubmit}>
            <div className="form-container w-full">
              <label className="form-control text-sm w-full max-w-xs mb-2">
                Enter you email
              </label>
              <input
                type="email"
                placeholder="yourmail@gmail.com"
                className="input input-bordered w-full"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            {message && (
              <div
                className={`${
                  statusCode === 404 ? "bg-aRed" : "bg-aGreen"
                } p-2 my-5 bg-opacity-20 rounded-md text-center`}
              >
                <p className="text-xs">{message}</p>
              </div>
            )}

            <button
              type="submit"
              className="bg-blue rounded-full w-full h-10 mt-10 text-white hover:opacity-95 hover:scale-[0.98] active:scale-[0.95] transition-all duration-150 ease-linear"
            >
              Get OTP
            </button>
          </form>
        </div>
      </motion.div>

      <Link
        className="absolute md:bottom-10 md:left-10 bottom-5 left-5 flex items-center"
        href={"/login"}
      >
        <span className="text-xl mr-2">
          <RiArrowLeftLine />
        </span>
        Back to Login
      </Link>
    </div>
  );
};

export default EmailForm;
