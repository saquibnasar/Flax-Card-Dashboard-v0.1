import Link from "next/link";
import { RiAddCircleLine } from "react-icons/ri";
import SearchInput from "../components/SearchInput";

const DashboardNav = () => (
  <div className="flex flex-col md:flex-row w-full gap-5 mb-5 md:mb-12 lg:mb-16 justify-between">
    <div className="">
      <h1 className="text-2xl mb-2">My cards</h1>
      <p className="text-lg text-tSecondary">
        Get a bird&apos;s eye view of all the members
      </p>
    </div>

    <div className="flex items-center gap-1 md:gap-3">
      {/* <SearchInput /> */}

      <Link
        href="/new"
        className="bg-blue md:w-fit md:px-3 w-[60px] justify-center flex items-center space-x-2 py-3 text-white rounded-lg cursor-pointer"
      >
        <span className="text-xl">
          <RiAddCircleLine />
        </span>
        <p className="hidden md:block">Add Members</p>
      </Link>
    </div>
  </div>
);

export default DashboardNav;
