import ManageCardsTable from "./ManageCardsTable";
import ManageCardsNavbar from "./Navbar";

const CardManagementPage = () => {
  return (
    <main className="p-8 h-screen overflow-y-scroll">
      <nav className="flex justify-between mb-5 md:mb-12 lg:mb-16">
        <ManageCardsNavbar />
      </nav>
      <article className="bg-white">
        <ManageCardsTable />
      </article>
    </main>
  );
};

export default CardManagementPage;
