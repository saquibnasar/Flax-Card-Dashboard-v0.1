import { RiCheckboxCircleLine } from "react-icons/ri";

interface Props {
  plan: string;
  pricing: string;
  listTitle: string;
  features: string[];
  currentPlan?: boolean;
}

const PricingCard = ({
  plan,
  pricing,
  listTitle,
  features,
  currentPlan = false,
}: Props) => {
  return (
    <div className="w-full hover:-translate-y-10 hover:bg-black hover:text-white min-h-[80vh] flex flex-col items-center p-5 border border-dSecondary shadow-sm rounded-lg relative transition-all duration-200 ease-linear">
      {currentPlan && (
        <span className="absolute top-5 left-5 p-1 bg-aGreen text-aGreen bg-opacity-10 rounded-lg">
          Current Plan
        </span>
      )}
      <div className="w-full text-center py-5 border-b border-dSecondary">
        <p className="text-tSecondary">{plan}</p>
        <h1 className="text-3xl">{pricing}</h1>
      </div>

      <div className="p-5 flex flex-col items-start w-full">
        <p className="my-6">{listTitle}</p>
        <ul className="space-y-5">
          {features.map((feature) => (
            <li key={feature} className="flex items-center">
              <span className="text-aGreen mr-2">
                <RiCheckboxCircleLine />
              </span>{" "}
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PricingCard;
