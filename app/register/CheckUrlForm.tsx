"use client";

import classNames from "classnames";
import { motion } from "framer-motion";
import { delay } from "lodash";
import { useEffect, useRef, useState } from "react";
import { RiCheckLine, RiCloseLine } from "react-icons/ri";
import { isUrlUnique } from "../services/api-client";
import { useDebounce } from "../utils/hooks/useDebounce";

interface Props {
  handleNext: (tab: number) => void;
  setProfileUrl: (url: string) => void;
}

const CheckUrlForm = ({ handleNext, setProfileUrl }: Props) => {
  const [checkUrl, setCheckUrl] = useState<"EMPTY" | "INVALID" | "VALID">(
    "EMPTY"
  );
  const profileUrlRef = useRef<HTMLInputElement>(null);
  const [unmounted, setUnmounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-3%" },
  };
  const [inputValue, setInputValue] = useState(
    typeof window !== "undefined"
      ? window.localStorage.getItem("profileUrl") || ""
      : ""
  );
  const debouncedValue = useDebounce<string>(inputValue)
    .replace(" ", ".")
    .toLocaleLowerCase();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const { data } = await isUrlUnique(debouncedValue);
      if (debouncedValue.length > 3) {
        if (!data.memberExist) {
          setCheckUrl("VALID");
        } else {
          setCheckUrl("INVALID");
        }
      }
      setIsLoading(false);
    };
    if (debouncedValue) {
      fetchData();
    }
  }, [debouncedValue]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={!unmounted ? "open" : "closed"}
      variants={variants}
      className={`p-5 h-full my-auto md:p-10 space-y-10 flex flex-col justify-center`}
    >
      <h1 className="text-3xl">First, claim your unique link</h1>
      <form
        className="space-y-5"
        onSubmit={(event) => {
          event.preventDefault();
          setProfileUrl(profileUrlRef.current?.value!);
          setUnmounted(true);
          delay(() => {
            handleNext(1);
          }, 300);
        }}
      >
        <div className="form-control">
          <label className="label-text text-tSecondary p-1 mb-2">
            {checkUrl === "EMPTY"
              ? "Get your flax.bio URL"
              : "The good ones are still available!"}
          </label>

          <div
            className={classNames({
              "flex space-x-2 bg-sSecondary w-full py-4 px-3 rounded-lg": true,
              "border border-sSecondary": checkUrl === "EMPTY",
              "border border-aRed":
                checkUrl === "INVALID" && debouncedValue.length > 3,
              "border border-aGreen":
                checkUrl === "VALID" && debouncedValue.length > 3,
            })}
          >
            <div className="w-full flex items-center space-x-1">
              <p>flax.bio/</p>
              <input
                className="w-full bg-sSecondary border-none outline-none"
                ref={profileUrlRef}
                defaultValue={profileUrlRef.current?.value}
                value={inputValue.replace(" ", ".").toLocaleLowerCase()}
                onChange={(event) => setInputValue(event.currentTarget.value)}
                placeholder="your_name"
              />
            </div>

            {checkUrl === "VALID" &&
              debouncedValue.length > 3 &&
              !isLoading && (
                <span className="flex justify-center text-white rounded-full items-center w-[20px] h-[20px] bg-aGreen">
                  <RiCheckLine />
                </span>
              )}
            {checkUrl === "INVALID" &&
              debouncedValue.length > 3 &&
              !isLoading && (
                <span className="flex justify-center text-white rounded-full items-center w-[20px] h-[20px] bg-aRed">
                  <RiCloseLine />
                </span>
              )}

            {isLoading && (
              <span className="loading loading-spinner loading-xs text-tSecondary" />
            )}
          </div>
        </div>
        <div className="w-full h-[40px]">
          {profileUrlRef.current?.value.length! > 3 &&
            profileUrlRef.current?.value.length! < 30 && (
              <button
                className="w-full h-full bg-blue text-white rounded-lg hover:opacity-80 duration-150 ease-linear disabled:opacity-50 focus:scale-[0.95]"
                disabled={checkUrl === "INVALID" || isLoading}
              >
                Claim my link
              </button>
            )}
        </div>
      </form>
    </motion.div>
  );
};

export default CheckUrlForm;
