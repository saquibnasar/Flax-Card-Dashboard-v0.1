"use client";
import celebrate from "@/public/celebrate.svg";
import { motion } from "framer-motion";
import Image from "next/image";
import Button from "../components/Button";
import useUserCardDetails from "../utils/hooks/useUserCardDetails";
import useUserDetailsStore from "../stores/useUserDetailsStore";
const CelebratePage = () => {
  const { profileUrl, employeeId } = useUserDetailsStore();

  const url = employeeId
    ? window.localStorage.getItem("username") + "/" + profileUrl
    : profileUrl;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      whileInView={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-2 text-tSecondary text-center flex flex-col items-center"
    >
      <Image src={celebrate} alt="celebrate" />

      <p className="text-xs">
        flax.bio/<span className="text-semibold">{url}</span> domain Allocated
      </p>
      <h1 className="text-2xl md:text-4xl  text-black">Congratulations!</h1>
      <p className="text-md md:text-xl w-80">
        Your Flax Card has been created successfully{" "}
      </p>

      <Button
        onClick={() => {
          window.location.href = "/dashboard";
        }}
        primary
        width="190px"
      >
        Go to Homepage
      </Button>
    </motion.div>
  );
};

export default CelebratePage;
