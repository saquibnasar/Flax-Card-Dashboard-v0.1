import { PropsWithChildren, ReactNode } from "react";
import EditCardNav from "../../components/EditCard/EditCardNav";

const EditTemplateLayout = async ({ children }: PropsWithChildren) => {
  return (
    <div className="h-screen overflow-y-hidden px-5 flex py-5">
      <div className="hidden bg-white md:block w-[230px] h-full mr-2">
        <EditCardNav page="templates" />
      </div>
      <div className="w-full bg-white rounded-lg">{children}</div>
    </div>
  );
};

export default EditTemplateLayout;
