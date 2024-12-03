import React from "react";
import { FaUserAstronaut } from "react-icons/fa";
import { AddOnProps } from "./UpgradePlan/addOnData";

interface Props {
  cartDetails: AddOnProps[];
  handlePayment: () => void;
  mode: string;
  cardsCount: number;
}

const CartDetails = ({
  mode,
  cardsCount,
  cartDetails,
  handlePayment,
}: Props) => {
  return (
    <div className="p-4 space-y-4 bg-white rounded-2xl ">
      {cartDetails.map((cartItem) => (
        <div
          key={cartItem.id}
          className="flex border-b pb-4 border-b-dSecondary space-x-2 justify-between items-center relative"
        >
          <div className="flex space-x-2 items-center">
            <div>
              {cartItem.isDefault ? (
                <span className="flex justify-center items-center p-1 h-[34px] w-[34px] bg-black text-xs text-white top-2 rounded-full right-2">
                  <p>Pro</p>
                </span>
              ) : (
                <span className="flex text-xl justify-center items-center p-1 h-[34px] w-[34px] bg-black text-white top-2 rounded-full right-2">
                  <FaUserAstronaut />
                </span>
              )}
            </div>

            <div>
              <h1 className="font-semibold line-clamp-1">{cartItem.title}</h1>
              <p className="text-xs">{cartItem?.subtitle}</p>
            </div>
          </div>

          <p className="text-nowrap">
            {"₹" + cartItem.price * cardsCount + " for " + cardsCount}
          </p>
        </div>
      ))}

      <div className="py-4 w-full flex justify-between border-b border-b-dSecondary">
        <p>Total</p>
        <p className="font-bold">
          {/* {"₹" + cartDetails[0].price * cardsCount} */}
          {"₹" + cartDetails.reduce((a, b) => a + b.price * cardsCount, 0)}
        </p>
      </div>

      <button
        className="bg-blue text-center w-full text-white flex items-center px-5 h-12 rounded-lg hover:opacity-95 hover:scale-[0.98] active:scale-[0.95] transition-all duration-150 ease-linear"
        onClick={handlePayment}
      >
        <p className="text-center mx-auto">Continue</p>
      </button>
    </div>
  );
};

export default CartDetails;
