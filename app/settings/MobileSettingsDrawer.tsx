import Drawer from "@/app/components/Drawer";
import MenuItems from "@/app/components/EditCard/MenuItems";
import Link from "next/link";
import { RiArrowLeftLine } from "react-icons/ri";
import SettingsNavbar from "./SettingsNavbar";

const MobileSettingsDrawer = ({ tab }: { tab: string }) => {
  return (
    <Drawer>
      <Link
        href={`/dashboard`}
        className="absolute flex items-center top-4 left-4 text-xl space-x-3 py-2"
      >
        <span className="text-2xl mr-3">
          <RiArrowLeftLine />
        </span>
        Settings
      </Link>

      <ul className="space-y-5 my-8">
        <SettingsNavbar tab={tab} />
      </ul>
    </Drawer>
  );
};

export default MobileSettingsDrawer;
