"use client";

import Spinner from "@/app/components/Spinner";
import http, { tokenState } from "@/app/services/api-client";
import classNames from "classnames";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { useState } from "react";
import { RiBriefcase2Line } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Props {
  name: string;
  designation: string;
  profileImage: string | StaticImport;
  employeeId: string;
}

type buttonType = "NFC" | "QR";

const ActiveCard = ({ name, designation, profileImage, employeeId }: Props) => {
  const [cardType, setCardType] = useState("NFC");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState("");
  const [statusCode, setStatusCode] = useState(404);
  const buttons = ["NFC", "QR"];

  const handleActivateButton = async () => {
    setIsLoading(true);

    try {
      let response;
      if (cardType === "NFC") {
        response = await http.post("/members/activateNfc", {
          nfcUrl: `https://flaxcard.one/nfc/${input}`,
          memberId: employeeId,
        });
      } else {
        response = await http.post("/members/activateQr", {
          qrUrl: `https://flaxcard.one/qr/${input}`,
          memberId: employeeId,
        });
      }

      await tokenState(employeeId, input, true);

      toast.success(response.data?.message, {
        position: "bottom-center",
        autoClose: 800,
      });
      setMessage(response.data?.message);
      setStatusCode(response?.data?.statusCode);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Wrong serial number", {
        position: "bottom-center",
        autoClose: 800,
      });
      setMessage(error?.response?.data?.message || "Wrong serial number");
      setStatusCode(error?.response?.data?.statusCode);
    }

    setIsLoading(false);
  };
  return (
    <>
      <ToastContainer />
      <div className="p-5 rounded-lg shadow-lg">
        <div className="flex items-center gap-5">
          <div className="mask mask-square rounded-lg w-[70px] h-[70px] relative">
            {profileImage ? (
              <Image
                className="object-cover"
                src={profileImage}
                alt="active_card_profile"
                fill
              />
            ) : (
              <div className="flex justify-center items-center w-full h-full text-neutral-content">
                <span className="text-3xl">{name?.charAt(0)}</span>
              </div>
            )}
          </div>
          <div>
            <h1 className="text-xl font-semibold">{name}</h1>
            <p className="text-tSecondary flex whitespace-nowrap space-x-2 items-center">
              <span className="mr-1">
                <RiBriefcase2Line />
              </span>
              {designation}
            </p>
          </div>
        </div>
        <div className="flex my-5 space-x-5">
          {buttons.map((button) => (
            <button
              key={button}
              className={classNames({
                "w-full py-3 border-4 rounded-lg hover:scale-[0.98] active:scale-[0.95] transition-transform duration-150 ease-linear":
                  true,
                "border-4 border-aPurple": button === cardType,
                "border-2 border-dSecondary": button !== cardType,
              })}
              onClick={() => {
                setCardType(button);
              }}
            >
              {button}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-5">
        <p className="text-tSecondary">Enter card serial number </p>
        <div className="flex flex-col md:flex-row gap-5">
          <input
            className="input border-dSecondary rounded-lg"
            onChange={(event) => setInput(event.currentTarget.value)}
          />
          <button
            className="bg-blue rounded-lg w-full py-2 md:py-0 md:max-w-[160px] text-white hover:opacity-95 hover:scale-[0.98] active:scale-[0.95] transition-all duration-150 ease-linear"
            onClick={handleActivateButton}
            disabled={input.length < 10}
          >
            {isLoading ? <Spinner /> : `Activate ${cardType}`}
          </button>
        </div>
      </div>
    </>
  );
};

export default ActiveCard;
