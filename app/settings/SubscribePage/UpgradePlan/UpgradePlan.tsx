import { useState } from "react";
import { RiDeleteBin7Line } from "react-icons/ri";
import CartDetails from "../CartDetails";
import { ModalViewProps } from "../PlanCard";
import { addOnData, AddOnProps } from "./addOnData";
import OrganizationCardsCal from "./OrganizationCardsCal";
import {
  MONTHLY_PLAN,
  PLAN_DURATION,
  PlanType,
  YEARLY_PLAN,
} from "@/app/utils/plans";

const UpgradePlan = ({ handleButton, planFor }: ModalViewProps) => {
  const [selectedPlan, setSelectedPlan] = useState<PlanType>(planFor);
  const [cardsCount, setCardsCount] = useState(1);
  const [mode, setMode] = useState(
    planFor === "individual" ? "monthly" : "yearly"
  );
  const [selectedAddon, setSelectedAddon] = useState<AddOnProps[]>([
    {
      id: 0,
      title: "Premium Plan",
      subtitle: "1+1 free profile",
      description: "",
      price:
        mode === "yearly"
          ? YEARLY_PLAN * cardsCount
          : MONTHLY_PLAN * cardsCount,
      priceDetails: "₹49 /- per month",
      isDefault: true,
    },
  ]);

  const addCards = (item: AddOnProps) => {
    const isAdded = selectedAddon.findIndex(
      (addedOn) => addedOn.id === item.id
    );

    if (isAdded === -1) {
      setSelectedAddon([...selectedAddon, { ...item, isSelected: true }]);
    }
  };

  if (selectedPlan === "organization")
    return (
      <OrganizationCardsCal
        mode={mode}
        cardsCount={cardsCount}
        handleCardsCount={(count) => setCardsCount(count)}
        handlePlanMode={(mode) => setMode(mode)}
        handleNext={() => setSelectedPlan("individual")}
      />
    );
  return (
    <div className="px-2 py-4 md:px-6">
      <h1 className="text-4xl font-bold mb-5">Upgrade your plan!</h1>
      <div className="flex flex-col md:flex-row gap-4">
        <div>
          <p className="text-xl font-semibold mb-3">Addons</p>
          <div className="space-y-5">
            {addOnData.map((item, index) => (
              <Card
                key={selectedAddon[index]?.id || item.id}
                addOn={item}
                selectedAddon={selectedAddon}
                handleDeleteCard={() =>
                  setSelectedAddon((addon) =>
                    addon.filter((filterAddon) => filterAddon.id !== item.id)
                  )
                }
                handleAddCard={() => addCards(item)}
              />
            ))}
          </div>
        </div>
        <div className="space-y-3 w-full h-full">
          <p className="text-lg">Cart Details</p>
          <CartDetails
            handlePayment={handleButton}
            cartDetails={selectedAddon}
            mode={mode}
            cardsCount={cardsCount}
          />
        </div>
      </div>
    </div>
  );
};

interface CardProps {
  addOn: AddOnProps;
  selectedAddon: AddOnProps[];
  handleDeleteCard: () => void;
  handleAddCard: () => void;
}

const Card = ({
  addOn,
  handleAddCard,
  handleDeleteCard,
  selectedAddon,
}: CardProps) => {
  const isAdded = selectedAddon.find((addedOn) => addedOn.id === addOn.id);
  return (
    <div className="bg-white rounded-2xl px-6 py-4 relative">
      <span className="absolute flex justify-center items-center p-1 h-[34px] w-[34px] bg-black text-xs text-white top-2 rounded-full right-2">
        <p>Pro</p>
      </span>

      <div className="mb-8">
        <h1 className="text-lg font-semibold mb-2">{addOn.title}</h1>
        <p className="text-xs">{addOn.description}</p>
      </div>

      <div className="flex justify-between items-center">
        <p>{addOn.priceDetails}</p>
        {!isAdded?.id ? (
          <button
            className="bg-blue w-fit text-white flex items-center px-5 h-8 rounded-lg hover:opacity-95 hover:scale-[0.98] active:scale-[0.95] transition-all duration-150 ease-linear"
            onClick={handleAddCard}
          >
            Add
          </button>
        ) : (
          <button
            className="w-fit text-aRed flex items-center rounded-full p-2 bg-aRed bg-opacity-20 hover:opacity-95 hover:scale-[0.98] active:scale-[0.95] transition-all duration-150 ease-linear"
            onClick={handleDeleteCard}
          >
            <RiDeleteBin7Line />
          </button>
        )}
      </div>
    </div>
  );
};

export default UpgradePlan;
