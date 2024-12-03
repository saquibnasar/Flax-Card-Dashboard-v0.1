import Drawer from "@/app/components/Drawer";
import MenuItems from "@/app/components/EditCard/MenuItems";
import Link from "next/link";
import { RiArrowLeftLine } from "react-icons/ri";

const MobileDrawer = ({ tab }: { tab: string }) => {
  return (
    <Drawer>
      <Link
        href={`/dashboard`}
        className="absolute flex items-center top-2 left-2 text-xl space-x-3 py-2"
      >
        <span className="text-2xl mr-3">
          <RiArrowLeftLine />
        </span>
        Edit Card
      </Link>

      <ul className="space-y-5 my-8">
        <MenuItems tab={tab} page={"dashboard"} />
      </ul>
    </Drawer>
  );
};

export default MobileDrawer;
