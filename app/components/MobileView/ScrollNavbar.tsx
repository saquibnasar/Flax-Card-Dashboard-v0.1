import useUserDetailsStore from "@/app/stores/useUserDetailsStore";
import { motion } from "framer-motion";
import Image from "next/image";
import { useMemo } from "react";
import { RiShareLine, RiUserLine } from "react-icons/ri";

interface Props {
  name: string;
  profileImage: string | null;
  setIsSharing: (isSharing: boolean) => void;
}

const ScrollNavbar = ({ name, profileImage, setIsSharing }: Props) => {
  if (name)
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        whileInView={{ opacity: 1 }}
        className="flex text-white justify-between items-center px-5 py-3 w-full sticky top-0 rounded-full bg-black bg-opacity-70"
      >
        <div className="flex space-x-1 items-center text-center">
          <div className="w-[30px] rounded-full p-1 border-2 border-white overflow-hidden h-[30px] relative">
            {profileImage ? (
              <Image
                fill
                className="object-cover"
                src={profileImage}
                alt="navbar-user-profile"
              />
            ) : (
              <span className="text-tSecondary flex justify-center items-center text-lg p-2rounded-full">
                <RiUserLine />
              </span>
            )}
          </div>
        </div>
        <p>{name}</p>

        <span
          className="hover:bg-secondary transition-all duration-150 ease-linear rounded-full hover:bg-opacity-10 p-2 cursor-pointer"
          onClick={() => setIsSharing(true)}
        >
          <RiShareLine />
        </span>
      </motion.div>
    );
};

export default ScrollNavbar;
