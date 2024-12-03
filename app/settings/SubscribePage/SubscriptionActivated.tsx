import { motion } from "framer-motion";
import { ModalViewProps } from "./PlanCard";

const SubscriptionActivated = ({ handleButton }: ModalViewProps) => {
  return (
    <div
      className="w-full h-[360px] flex flex-col justify-center items-center"
      onClick={handleButton}
    >
      <motion.div
        className="w-[130px] h-[130px] rounded-full bg-white flex justify-center items-center"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="74"
          height="74"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2 }}
        >
          <motion.path
            d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
            fill="green"
            variants={{
              checked: { opacity: 1 },
              unchecked: { opacity: 0 },
            }}
            initial="unchecked"
            animate="checked"
          />
        </motion.svg>
      </motion.div>

      <h1 className="text-3xl font-bold py-4">Nice! premium plan activated</h1>
      <p className="text-sm w-full text-center md:w-[70%] mb-4">
        Please Check your register mail{" "}
        <span className="font-bold text-md">
          {" "}
          {window.localStorage.getItem("email")}
        </span>{" "}
        now you access all feature. You will not be billed until after your free
        trial ends. Enjoy!
      </p>

      <button
        className="bg-blue text-center px-16 text-white flex items-center h-12 rounded-lg hover:opacity-95 hover:scale-[0.98] active:scale-[0.95] transition-all duration-150 ease-linear"
        onClick={handleButton}
      >
        <p className="text-center mx-auto">Confirm & Finish</p>
      </button>
    </div>
  );
};

export default SubscriptionActivated;
