import React from "react";
import LeadsPageHeader from "./LeadsPageHeader";
import LeadsTable from "./LeadsTable";
import Info from "../insights/Info";

const LeadsPage = () => {
  return (
    <main className="flex flex-col max-h-screen">
      <Info />
      <div className="p-8 max-h-full overflow-y-scroll">
        <nav className="mb-5 md:mb-12 lg:mb-16">
          <LeadsPageHeader />
        </nav>
        <LeadsTable />
      </div>
    </main>
  );
};

export default LeadsPage;
