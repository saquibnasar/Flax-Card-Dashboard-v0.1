"use client";
import Info from "./Info";
import InsightCard from "./InsightCard";
import LineChart from "./LineChart";
import RecentActivity from "./RecentActivity";
import TopTapped from "./TopTapped";

const InsightsPage = () => {
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];
  const chartData = {
    labels,
    datasets: [
      {
        label: "Example Dataset",
        data: [10, 25, 15, 30, 20, 35],
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
        fill: false,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
      },
    },
  };

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Views",
        data: [10, 2, 34, 5, 23, 45],
        borderColor: "rgb(255, 99, 132)",
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  return (
    <main className="flex flex-col max-h-screen">
      <Info />
      <main className="p-8 max-h-full overflow-y-scroll">
        <nav className="mb-5 md:mb-12 lg:mb-16">
          <h1 className="text-2xl mb-2">Insights</h1>
          <p className="text-lg text-tSecondary">
            Know how your brand is performing
          </p>
        </nav>
        <article className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <InsightCard title="Leads generated" count={500} stats="+25%" />
          <div className="w-full place-self-end">
            <InsightCard title="Leads generated" count={500} stats="+25%" />
          </div>
          <InsightCard title="Leads generated" count={500} stats="+25%" />

          <div className="bg-sPrimary col-span-1 md:col-span-2 flex flex-col items-center border border-dSecondary rounded-lg w-full h-[420px] relative">
            <LineChart borderColor="rgba(144, 190, 109, 1)" />
          </div>
          <RecentActivity />

          <div className="bg-sPrimary col-span-1 md:col-span-2 flex flex-col items-center border border-dSecondary rounded-lg w-full h-[420px] relative">
            <LineChart borderColor="rgba(255, 90, 154, 1)" />
          </div>
          <TopTapped />
        </article>
      </main>
    </main>
  );
};

export default InsightsPage;
