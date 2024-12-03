"use client";

import classNames from "classnames";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { RiCheckLine, RiCloseLine } from "react-icons/ri";
import { isUrlUnique } from "../services/api-client";
import { useDebounce } from "../utils/hooks/useDebounce";

const CheckUrl = () => {
  const [checkUrl, setCheckUrl] = useState<"EMPTY" | "INVALID" | "VALID">(
    "EMPTY"
  );
  const profileUrlRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [inputValue, setInputValue] = useState("");
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
    <div className="space-y-2 md:space-y-0 md:flex gap-1">
      <div className="form-control">
        <div
          className={classNames({
            "flex space-x-2 bg-sSecondary w-fit p-3 rounded-lg": true,
          })}
        >
          <div className="w-fit flex items-center space-x-1">
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

          {checkUrl === "VALID" && debouncedValue.length > 3 && !isLoading && (
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

      <button
        onClick={() =>
          window.localStorage.setItem(
            "profileUrl",
            inputValue.replace(" ", ".").toLocaleLowerCase()
          )
        }
        className="w-fit px-4 py-3 md:py-0 bg-blue text-white rounded-lg hover:opacity-80 duration-150 ease-linear disabled:opacity-50 focus:scale-[0.95]"
        disabled={
          checkUrl === "INVALID" ||
          inputValue.replace(" ", ".").toLocaleLowerCase().length < 3 ||
          isLoading
        }
      >
        <Link href="/register">Claim my link</Link>
      </button>
    </div>
  );
};

export default CheckUrl;
