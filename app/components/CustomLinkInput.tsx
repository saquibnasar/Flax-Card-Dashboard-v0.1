import classNames from "classnames";
import { useState } from "react";
import { FieldError, useForm } from "react-hook-form";
import { FaRegSquare } from "react-icons/fa";
import { LuRectangleHorizontal } from "react-icons/lu";
import { RiCloseLine } from "react-icons/ri";
import styled from "styled-components";
import { LinkWidget } from "tesx-xi";
import { CustomLinksProps } from "../stores/useUserAdditionalContent";
import Button from "./Button";
import Spinner from "./Spinner";

const InputButton = styled.button<{ background: string }>`
  padding: 6px 12px;
  background: ${(props) => props.background};
  border-radius: 12px;
  transition: all;
  transition-duration: 150ms;

  transition: ease-in;

  &:hover {
    scale: 0.98;
  }
  &:active {
    scale: 0.96;
  }
`;

export const isValidUrl = (url: string) => {
  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
  return urlRegex.test(url);
};

interface Props {
  onSubmit: (link: CustomLinksProps) => void;
  onClose: () => void;
  link?: CustomLinksProps;
}

const CustomLinkInput = ({ onSubmit, link, onClose }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState(link?.url || "");
  const [isPasted, setIsPasted] = useState(false);
  const [widgetStyle, setWidgetStyle] = useState<"Pill" | "Large">(
    link?.widgetStyle || "Pill"
  );
  const [buttonText, setButtonText] = useState(link?.buttonText || "Follow");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  return (
    <>
      <label className="text-sm text-tSecondary">
        {errors.link && typeof errors.link === "object" ? (
          <span className="text-aRed">
            {(errors.link as FieldError).message}
          </span>
        ) : (
          "Custom Link"
        )}
      </label>
      <div className="flex space-x-5">
        <div
          className={
            "bg-sSecondary flex group space-x-2 w-full h-[56px] px-3 rounded-lg"
          }
        >
          <div className="w-full h-full flex items-center justify-between space-x-1 transition-all duration-150">
            <input
              {...register("link", {
                required: "Enter Valid Url",
                validate: (value) => isValidUrl(value) || "Enter a valid URL",
              })}
              className={`w-full h-full bg-sSecondary border-none outline-none`}
              placeholder="https://www.anylink.com"
              value={input}
              onChange={(event) => {
                setInput(event.currentTarget.value);
              }}
            />

            {input && isPasted ? (
              <span
                className="shadow text-2xl p-2 transition-all duration-200 hover:bg-sSecondary rounded-lg cursor-pointer"
                onClick={() => {
                  setIsPasted(false);
                  setInput("");
                }}
              >
                <RiCloseLine />
              </span>
            ) : input.length > 0 ? (
              <InputButton
                background="#60ff7b"
                type="submit"
                className="hidden text-white bg-opacity-70 shadow h-fit rounded-lg group-hover:block"
                onClick={handleSubmit((data) => {
                  // updateLink({
                  //   isActive: true,
                  //   value: data[social.type!],
                  //   title: social.title,
                  //   type: social.type!,
                  // });
                })}
              >
                Add
              </InputButton>
            ) : (
              <InputButton
                background="#F7F7F7"
                type="button"
                className="hidden bg-opacity-70 shadow h-fit rounded-lg group-hover:block"
                onClick={async () => {
                  const text = await navigator.clipboard.readText();
                  setIsPasted(true);
                  // updateLink({
                  //   isActive: true,
                  //   value: text,
                  //   title: social.title,
                  //   type: social.type!,
                  // });
                  setInput(text);
                  // setInputValue(text);
                }}
              >
                Paste
              </InputButton>
            )}
          </div>
        </div>
      </div>
      {isValidUrl(input) && (
        <div className="flex space-x-5 justify-end items-end">
          <div>
            <label className="mb-2 text-xs text-tSecondary">
              Change button text
            </label>
            <br />
            <input
              className="input input-bordered rounded-lg border border-dSecondary"
              type="text"
              defaultValue={"Follow"}
              onChange={(event) => {
                setButtonText(event.currentTarget.value);
              }}
            />
          </div>

          <div className="flex space-x-4 mt-auto w-fit h-fit text-2xl font-bold border border-dSecondary rounded-xl px-3 py-2">
            <span
              className={classNames({
                "p-2 rounded-lg cursor-pointer": true,
                "bg-black text-white ": widgetStyle === "Pill",
              })}
              onClick={() => setWidgetStyle("Pill")}
            >
              <FaRegSquare />
            </span>
            <span
              className={classNames({
                "p-2 rounded-lg cursor-pointer": true,
                "bg-black text-white": widgetStyle === "Large",
              })}
              onClick={() => setWidgetStyle("Large")}
            >
              <LuRectangleHorizontal />
            </span>
          </div>
        </div>
      )}
      {input && (
        <>
          {isValidUrl(input) && (
            <div className="grid grid-cols-2 md:grid-cols-3 h-[186px] max-h-[186px]">
              <LinkWidget
                key={input}
                url={input}
                widgetStyle={widgetStyle}
                buttonText={buttonText}
              />
            </div>
          )}

          <div className="flex justify-end space-x-5 mt-5">
            <Button
              className="border border-dSecondary"
              width="160px"
              accent={true}
              type="button"
              onClick={onClose}
            >
              Close
            </Button>
            {isValidUrl(input) && (
              <Button
                type="submit"
                onClick={() => {
                  onSubmit({ url: input, buttonText, widgetStyle });
                  onClose();
                }}
                width="160px"
              >
                {isLoading ? <Spinner /> : "Save"}
              </Button>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default CustomLinkInput;
