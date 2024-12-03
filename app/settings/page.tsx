import classNames from "classnames";
import AccountPage from "./AccountPage";
import SettingsNavbar from "./SettingsNavbar";
import SubscribePage from "./SubscribePage/SubscribePage";
import SupportPage from "./SupportPage";
import MobileSettingsDrawer from "./MobileSettingsDrawer";

interface Props {
  searchParams: { tab: "account" | "subscribe" | "support" };
}

const SettingsPages = {
  account: AccountPage,
  subscribe: SubscribePage,
  support: SupportPage,
};

const SettingsPage = ({ searchParams: { tab } }: Props) => {
  const CurrentPage = SettingsPages[tab] ?? AccountPage;
  return (
    <main className="flex">
      <div
        className={classNames({
          "h-screen": true,
          "invisible w-0": tab === "subscribe",
        })}
      >
        <MobileSettingsDrawer tab={tab} />

        <div className="hidden md:flex h-full">
          <SettingsNavbar tab={tab} />
        </div>
      </div>
      <div className="w-full no-bar min-h-screen h-full overflow-y-scroll">
        <CurrentPage />
      </div>
    </main>
  );
};

export default SettingsPage;
