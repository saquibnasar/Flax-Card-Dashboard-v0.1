"use client";

import useCards from "../utils/hooks/useCards";
import CardGrid from "./CardGrid";
import DashboardNav from "./DashboardNav";
import DashboardLoadingSkeleton from "./loading";

const DashboardPage = () => {
  const { data: cards, isLoading, error } = useCards();

  if (isLoading) return <DashboardLoadingSkeleton />;
  return (
    <main className="p-4 md:p-8 space-y-5 w-full h-screen overflow-y-scroll no-bar">
      <DashboardNav />
      <CardGrid cards={cards} />
    </main>
  );
};

export default DashboardPage;
