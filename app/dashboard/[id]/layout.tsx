import { PropsWithChildren } from "react";
import EditCardNav from "../../components/EditCard/EditCardNav";

const CardDetailsLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="max-h-screen relative max-w-full p-2 h-screen flex md:space-x-3">
      <div className="hidden md:block w-0 md:w-[230px] h-full">
        <EditCardNav />
      </div>
      <div className="w-full overflow-x-hidden border border-dSecondary h-full max-h-screen bg-sPrimary rounded-lg">
        {children}
      </div>
    </div>
  );
};

export default CardDetailsLayout;
