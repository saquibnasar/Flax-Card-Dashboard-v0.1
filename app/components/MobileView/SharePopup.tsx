import { motion } from "framer-motion";
import { RiCloseLine, RiFileCopyLine } from "react-icons/ri";
import instagram from "@/public/socials/instagram.svg";
import facebook from "@/public/socials/facebook.svg";
import snapchat from "@/public/socials/snapchat.svg";
import telegram from "@/public/socials/telegram.svg";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const SharePopup = ({ isOpen, setIsOpen }: Props) => {
  const [isCopied, setIsCopied] = useState(false);
  const profileUrl = "flax.bio/meta";
  const directProfileUrl = "https://www." + profileUrl;
  const setCopied = () => {
    setIsCopied(true);
    navigator.clipboard.writeText(directProfileUrl).then(() => (
      <div className="alert alert-success">
        <span>copied</span>
      </div>
    ));
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const socials = [
    { icon: instagram, type: "Instagram" },
    { icon: facebook, type: "Facebook" },
    { icon: snapchat, type: "Snapchat" },
    { icon: telegram, type: "Telegram" },
  ];
  if (isOpen)
    return (
      <div className="z-50 -mx-2 relative top-0 left-0 right-0 bottom-0 flex items-end">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="w-full px-2 space-y-7 pb-10 rounded-2xl border border-accent bg-primary text-secondary absolute bottom-0"
        >
          <div className="flex py-5 justify-between items-center">
            <div />
            <p className="text-lg">Share your flax card</p>
            <span
              className="text-xl p-2 rounded-full hover:bg-tSecondary hover:bg-opacity-20 transition-all duration-150 ease-linear cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              <RiCloseLine />
            </span>
          </div>
          <div className="flex justify-between">
            {socials.map((social) => (
              <div
                key={social.type}
                className="flex flex-col justify-center items-center"
              >
                <Image
                  width={50}
                  height={50}
                  className="object-cover"
                  src={social.icon}
                  alt={social.type}
                />
                <p className="text-xs text-tSecondary">{social.type}</p>
              </div>
            ))}
          </div>

          <div className="w-full flex justify-between items-center py-3 px-2 border border-dSecondary rounded-lg">
            <p>{profileUrl}</p>
            {!isCopied ? (
              <span
                className="text-tSecondary cursor-pointer hover:bg-sSecondary rounded-lg px-1"
                onClick={setCopied}
              >
                copy
              </span>
            ) : (
              <span className="text-aGreen">
                <RiFileCopyLine />
              </span>
            )}
          </div>

          <div className="w-full">
            <div className="mb-5">
              <p className="text-lg font-semibold leading-3">{`Doesn't have a flax`}</p>
              <p className="text-tSecondary text-sm">create one for free</p>
            </div>
            <Link className="my-3" href={"/register"}>
              <button className=" hover:scale-[0.98] active:scale-[0.95] transition-all duration-150 py-2 w-full text-center bg-blue text-white rounded-lg">
                Sign Up
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
};

export default SharePopup;
