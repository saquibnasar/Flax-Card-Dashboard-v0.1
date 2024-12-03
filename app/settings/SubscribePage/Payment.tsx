import { ModalViewProps } from "./PlanCard";

const Payment = ({ handleButton }: ModalViewProps) => {
  return (
    <div className="w-full h-[360px] relative">
      <button
        className="absolute bottom-4 right-4 bg-blue text-center px-16 text-white flex items-center h-12 rounded-lg hover:opacity-95 hover:scale-[0.98] active:scale-[0.95] transition-all duration-150 ease-linear"
        onClick={handleButton}
      >
        <p className="text-center mx-auto">Continue Payment</p>
      </button>
    </div>
  );
};

export default Payment;
