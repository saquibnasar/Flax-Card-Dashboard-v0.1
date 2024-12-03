import {
  MONTHLY_PLAN,
  PLAN_DURATION_LIST,
  YEARLY_PLAN,
} from "@/app/utils/plans";

interface Props {
  cardsCount: number;
  mode: string;
  handleCardsCount: (count: number) => void;
  handlePlanMode: (mode: string) => void;
  handleNext: () => void;
}

const OrganizationCardsCal = ({
  cardsCount,
  mode,
  handleCardsCount,
  handlePlanMode,
  handleNext,
}: Props) => {
  const planDuration = mode === "monthly" ? MONTHLY_PLAN : YEARLY_PLAN;
  const GST = calculateGST(cardsCount * planDuration);
  const total = cardsCount * planDuration;

  const lists = [
    { plan: "Plan Request", price: "Enterprise plan" },
    { plan: "Member request", price: `${cardsCount || 1} user ` },
    { plan: "Mode", price: `${mode}` },
    { plan: "Selected Plan", price: `light plan ${mode}` },
    { plan: "Price Tare", price: "ID-Light 100" },
    { plan: "Price per user", price: `₹${planDuration}X${cardsCount || 1}` },
    { plan: "Total", price: `₹${total}` },
    { plan: "GST 18%", price: `₹${GST}` },
    { plan: "Grand Total", price: `₹${total + GST}` },
  ];
  return (
    <div className="p-4 w-full">
      <h1 className="text-4xl font-bold mb-5">Upgrade your plan!</h1>
      <div className="flex space-x-4 w-full justify-between">
        <table className=" w-[65%]">
          <thead className="w-full">
            <tr className="text-black border-b-0">
              <th className="text-xl text-start">How many members?</th>
              <th className="font-medium items-center text-lg text-start flex">
                <p className="w-full"> Enter no. of members</p>
                <input
                  className="ml-2 input bg-white w-[76px]"
                  type="number"
                  onChange={(event) => {
                    if (parseInt(event.currentTarget.value) < 10000)
                      handleCardsCount(parseInt(event.currentTarget.value));
                  }}
                  maxLength={4}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {lists.map((list) => (
              <tr key={list.plan} className="py-2 font-bold">
                <td>{list.plan}</td>
                <td>{list.price}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="w-[35%] h-full">
          <select
            className="select h-8 w-full max-w-xs"
            onChange={(event) => {
              handlePlanMode(event.currentTarget.value);
            }}
          >
            {PLAN_DURATION_LIST.map((list) => (
              <option key={list}>{list}</option>
            ))}
          </select>
        </div>
      </div>
      <button
        className="my-6 bg-blue px-16 text-white flex items-center h-12 rounded-2xl hover:opacity-95 hover:scale-[0.98] active:scale-[0.95] transition-all duration-150 ease-linear"
        onClick={handleNext}
      >
        Continue
      </button>
    </div>
  );
};

export default OrganizationCardsCal;

export const calculateGST = (amount: number): number => {
  const gstAmount = (amount * 18) / 100;
  return gstAmount;
};
