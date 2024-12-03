"use client";

import ModalForm from "@/app/components/ModalForm";
import React, { useEffect, useState } from "react";
import ActiveCard from "./ActiveCard";
import Image from "next/image";
import { RiCloseLine } from "react-icons/ri";
import SearchInput from "@/app/components/SearchInput";
import profile from "@/public/profile/pro_three.jpeg";
import useCards from "@/app/utils/hooks/useCards";
import classNames from "classnames";
import { CardDetails } from "@/app/dashboard/CardGrid";

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const ActivateCardModal = ({ isOpen, setIsOpen }: Props) => {
  const { data: cards, isLoading } = useCards();
  const [selectedCard, setSelectedCard] = useState({
    index: 0,
    data: {} as CardDetails,
  });

  useEffect(() => {
    if (!isLoading && cards.length > 0) {
      setSelectedCard({
        index: 0,
        data: cards[0],
      });
    }
  }, [isLoading, cards]);

  return (
    <ModalForm size="5xl" isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <span
        className="cursor-pointer p-2 hover:bg-sSecondary rounded-full absolute top-2 right-2 text-2xl text-tSecondary"
        onClick={() => setIsOpen(false)}
      >
        <RiCloseLine />
      </span>
      <div className="flex flex-col md:flex-row min-h-[70%] space-x-0 md:space-x-5 p-1 md:p-5">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg md:text-2xl">{`All Cards (${
              cards?.length || 0
            })`}</h3>
            <p className="text-tSecondary text-md">
              Choose a card to activate it.
            </p>
          </div>
          {/* <div>
            <SearchInput />
          </div> */}

          <div className="md:hidden flex w-full space-x-4 overflow-x-scroll">
            {cards?.map((card, index) => (
              <div
                key={card.profileUrl}
                className={classNames({
                  "cursor-pointer space-x-5 rounded-lg transition duration-150 ease-linear":
                    true,
                  // "bg-[#E9E9E9] bg-opacity-30": selectedCard.index !== index,
                  // "bg-black text-white": selectedCard.index === index,
                })}
                onClick={() => setSelectedCard({ index, data: card })}
              >
                <div className="w-[50px] h-[50px] border border-dSecondary md:border-0 rounded-full relative">
                  {card.profileImage ? (
                    <Image
                      className="bg-aPurple w-full h-full rounded-full"
                      width={40}
                      height={40}
                      src={card.profileImage || profile}
                      alt="profile"
                    />
                  ) : (
                    <div className=" w-full h-full flex justify-center items-center">
                      <span className="text-3xl">{card.name?.charAt(0)}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="hidden md:inline-block w-full space-y-3 max-h-[240px] overflow-y-scroll">
            {cards?.map((card, index) => (
              <div
                key={card.profileUrl}
                className={classNames({
                  "cursor-pointer space-x-5 min-w-[130px] rounded-lg flex justify-start items-center p-2 transition duration-150 ease-linear":
                    true,
                  "bg-[#E9E9E9] bg-opacity-30": selectedCard.index !== index,
                  "bg-black text-white": selectedCard.index === index,
                })}
                onClick={() => setSelectedCard({ index, data: card })}
              >
                <div className="avatar w-full">
                  <div className="mask mask-squircle">
                    {card.profileImage ? (
                      <Image
                        className=""
                        width={38}
                        height={38}
                        src={card.profileImage || profile}
                        alt="profile"
                      />
                    ) : (
                      <div className="flex justify-center items-center w-[38px] h-[38px]">
                        <span className="text-3xl">{card.name?.charAt(0)}</span>
                      </div>
                    )}
                  </div>
                </div>
                <h1 className="text-md text-start whitespace-nowrap">
                  {card.name}
                </h1>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full space-y-8 bg-full px-0 md:px-6 md:border-l md:border-dSecondary">
          <div>
            <p className="text-sm">Activate ID Card</p>
            <p className="text-xs text-tSecondary">
              To activate Bruce card, Start by entering the card serial number.
            </p>
          </div>
          <ActiveCard
            name={selectedCard.data.name}
            designation={selectedCard.data.designation}
            profileImage={selectedCard.data.profileImage}
            employeeId={selectedCard.data.employeeId}
          />
        </div>
      </div>
    </ModalForm>
  );
};

export default ActivateCardModal;
