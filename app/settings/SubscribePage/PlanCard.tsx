import classNames from "classnames";
import Link from "next/link";
import { RiCheckboxCircleLine } from "react-icons/ri";
import { Plan, PlanType } from "../../utils/plans";
import Badge from "../Badge";
import ModalForm from "@/app/components/ModalForm";
import { useState } from "react";
import UpgradePlan from "./UpgradePlan/UpgradePlan";
import Payment from "./Payment";
import SubscriptionActivated from "./SubscriptionActivated";

export interface ModalViewProps {
  handleButton: () => void;
  planFor: PlanType;
}

const ModalView = {
  upgrade: UpgradePlan,
  payment: Payment,
  subscriptionActive: SubscriptionActivated,
};

type modalType = "upgrade" | "payment" | "subscriptionActive";
const PlanCard = ({ plan }: { plan: Plan }) => {
  const [currentView, setCurrentView] = useState<modalType>("upgrade");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCurrentView = () => {
    switch (currentView) {
      case "upgrade":
        setCurrentView("payment");
        break;
      case "payment":
        setCurrentView("subscriptionActive");
        break;
      case "subscriptionActive":
        setCurrentView("upgrade");
        setIsModalOpen(false);
        break;
    }
  };

  const CurrentModalView = ModalView[currentView] ?? ModalView["upgrade"];

  return (
    <div className="relative p-8 border h-fit border-dSecondary w-full text-center md:w-[400px] rounded-2xl bg-white hover:scale-[0.98] ease-linear transition-all duration-300">
      <Badge variant={plan.badge} label={plan.badgeName} />
      <p>{plan.title}</p>
      <h1 className="text-3xl font-semibold">
        {plan.price ? "₹" + plan.price + ".00" : "Free"}
      </h1>
      <hr className="bg-dSecondary mt-5 text-dSecondary" />
      <div className="text-start">
        <p className="my-4">Features</p>
        <ul className="space-y-5">
          {plan.features.map((feature) => (
            <li key={feature.text} className="space-x-2 flex items-center">
              <span
                className={classNames({
                  "text-lg mr-3": true,
                  "text-tSecondary": !feature.available,
                  "text-aGreen": feature.available,
                })}
              >
                <RiCheckboxCircleLine />
              </span>
              {feature.text}
            </li>
          ))}
        </ul>
      </div>
      {plan.buttonText && (
        <button
          className="bg-blue w-full rounded-2xl mt-9 text-center text-white flex justify-center items-center px-5 h-10 hover:opacity-95 hover:scale-[0.98] active:scale-[0.95] transition-all duration-150 ease-linear"
          onClick={() => setIsModalOpen(true)}
        >
          <p>{plan.buttonText}</p>
        </button>
      )}

      <ModalForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        size="4xl"
        gradient
      >
        <div className="w-full flex justify-center items-center">
          <CurrentModalView
            handleButton={handleCurrentView}
            planFor={plan.planFor}
          />
        </div>
      </ModalForm>
    </div>
  );
};

export default PlanCard;
