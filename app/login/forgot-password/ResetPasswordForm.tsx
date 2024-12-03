import { motion } from "framer-motion";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { RiArrowLeftLine } from "react-icons/ri";
import { ForgotPasswordTabType } from "./page";
import axios from "axios";
import { RiArrowLeftSLine } from "react-icons/ri";
import classNames from "classnames";
import CheckOtpForm from "./CheckOtpForm";
import CheckPasswordForm from "./CheckPasswordForm";
import { useRouter } from "next/navigation";

interface Props {
  mail: string;
  handleSelectedTabChange: (tab: ForgotPasswordTabType) => void;
}

type ResetPasswordFormTab = "otp" | "password";
const ResetPasswordForm = ({ mail, handleSelectedTabChange }: Props) => {
  const [selectedTab, setSelectedTab] = useState<ResetPasswordFormTab>("otp");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [statusCode, setStatusCode] = useState(200);
  const [otp, setOtp] = useState(0);
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await axios
        .post("https://dashboard.flaxcard.com/auth/change-password", {
          email: mail,
          newPassword,
          otp,
        })
        .then((response) => {
          if (response.data.message) setMessage(response.data.message);
          return response.data;
        });

      router.push("/login");
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

    setSelectedTab("otp");
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
          <button
            className="text-2xl text-start my-3 md:my-5"
            type="button"
            onClick={() => handleSelectedTabChange("email")}
          >
            <RiArrowLeftLine />
          </button>
          <div className="h-fit text-center mb-16">
            <div className="flex items-center text-2xl md:text-5xl space-x-3 mb-4">
              <h1>OTP Verification</h1>
            </div>
            <p className="text-sm text-start">
              we have sent you the otp, Please check your mail
            </p>
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

          {selectedTab === "otp" && (
            <CheckOtpForm
              handleOtp={(otp) => {
                setOtp(otp);
                setSelectedTab("password");
              }}
            />
          )}
          {selectedTab === "password" && (
            <CheckPasswordForm
              newPassword={newPassword}
              confirmPassword={confirmPassword}
              handleSubmit={handleSubmit}
              setConfirmPassword={(password) => setConfirmPassword(password)}
              setNewPassword={(password) => setNewPassword(password)}
            />
          )}
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

export default ResetPasswordForm;

{
  /* <div className="w-full h-screen">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        whileInView={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={classNames({
          "h-screen flex justify-center p-6 md:px-24 pb-8": true,
        })}
      >
        <div className="">
          <div className="h-fit text-center mb-16">
            <h1 className="text-2xl md:text-5xl text-start mb-4">
              OTP Verification{" "}
            </h1>
            <p className="text-sm text-start">
              we have sent you the otp, Please check your mail
            </p>
          </div>

          <form className="form w-full space-y-5" onSubmit={handleSubmit}>
            <div className="form-container w-full">
              <label className="form-control text-sm w-full max-w-xs mb-2">
                Enter new password
              </label>
              <input
                type="email"
                placeholder="yourmail@gmail.com"
                className="input input-bordered w-full"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <div className="form-container w-full">
              <label className="form-control text-sm w-full max-w-xs mb-2">
                Enter confirm password
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
    </div> */
}
