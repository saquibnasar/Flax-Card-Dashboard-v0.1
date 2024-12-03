"use client";
import Image from "next/image";
import { RiCalendarLine, RiH1 } from "react-icons/ri";
import Link from "next/link";
import coverPlaceHolder from "@/public/dashboard/cardCover.jpeg";
import { CardDetails } from "../dashboard/CardGrid";
import { RiCheckboxCircleFill } from "react-icons/ri";

interface Props {
  card: CardDetails;
  path?: string;
}

const Card = ({ card, path = "dashboard" }: Props) => {
  const flaxBioUrl = process.env.NEXT_PUBLIC_FLAX_BIO_URL;

  const bioUrl = card?.isPrimaryCard
    ? flaxBioUrl + "/" + card?.profileUrl
    : flaxBioUrl +
      "/" +
      localStorage.getItem("username") +
      "/" +
      card?.profileUrl;
  const directModeLink = card?.links.find((link) => link.isActive);

  return (
    <div className="h-fit p-2 space-y-5 bg-sPrimary rounded-lg shadow-2xl">
      <div className="w-full h-[104px] relative ">
        {card.isPrimaryCard && (
          <div className="z-10 text-3xl text-blue absolute top-2 right-2">
            <RiCheckboxCircleFill />
          </div>
        )}
        <Image
          className="object-cover rounded-lg -z-0"
          src={
            card.bannerImages?.[0]
              ? card.bannerImages[0].imageUrl
              : coverPlaceHolder
          }
          alt="cardImg"
          fill
        />
      </div>

      <div className="flex space-x-5 items-center">
        <div>
          {card.profileImage && typeof card.profileImage === "string" ? (
            card.profileImage.startsWith("http") ? (
              <Image
                className="object-cover rounded-lg"
                src={card.profileImage}
                alt="cardProfile"
                width={70}
                height={70}
              />
            ) : (
              <div className="avatar placeholder overflow-hidden rounded-lg object-cover w-[70px] h-[70px]">
                <div className="bg-neutral text-neutral-content">
                  <span className="text-3xl">{card.name.charAt(0)}</span>
                </div>
              </div>
            )
          ) : (
            <div className="avatar placeholder overflow-hidden rounded-lg object-cover w-[70px] h-[70px]">
              <div className="bg-neutral text-neutral-content">
                <span className="text-3xl">{card.name.charAt(0)}</span>
              </div>
            </div>
          )}
        </div>
        <div>
          <h1 className="text-2xl font-medium">{card.name}</h1>
          <div className="flex items-center space-x-2 text-tSecondary">
            <span className="text-2xl">
              <RiCalendarLine />
            </span>
            <p>{card.designation}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between space-x-5">
        <Link
          href={`/${path}/${card.employeeId}`}
          className="w-full text-center p-3 text-white bg-black rounded-lg hover:scale-[0.98] duration-150"
        >
          Edit
        </Link>
        <Link
          className="w-full p-3 text-center bg-sSecondary rounded-lg"
          href={
            card.directModeOn
              ? directModeLink?.value || "https://" + bioUrl
              : "https://" + bioUrl
          }
          target="_blank"
        >
          Preview
        </Link>
      </div>
    </div>
  );
};

export default Card;
