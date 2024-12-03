import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import Link from "next/link";
import { RiCloseLine } from "react-icons/ri";
import ModalForm from "../components/ModalForm";
import { getMemberCredits } from "../services/api-client";
import AdditionalForm from "./AdditionalForm/AdditionalForm";
import CelebratePage from "./CelebratePage";
import LinkForm from "./LinkForm";
import ThemeSelector from "./ThemeSelector";
import UserForm from "./UserForm";

interface TabTypes {
  tab: "linkForm" | "addForm" | "theme";
}

interface Props {
  searchParams: TabTypes;
}

const SignUpTabView = {
  home: UserForm,
  linkForm: LinkForm,
  addForm: AdditionalForm,
  theme: ThemeSelector,
  congrats: CelebratePage,
};

const SignUpForm = async ({ searchParams: { tab } }: Props) => {
  const token = getCookie("accessToken", { cookies });
  const credits = await getMemberCredits(token!);

  const CurrentView = SignUpTabView[tab] ?? UserForm;
  return (
    <>
      {/* <ModalForm size="2xl" isOpen={credits < 1} gradient={true}>
        <div>
          <Link
            href={"/dashboard"}
            className="p-2 absolute right-5 top-5 rounded-full"
          >
            <span className="text-2xl font-bold">
              <RiCloseLine />
            </span>
          </Link>
          <div className="flex pt-20 pb-10 flex-col justify-center px-5">
            <h1 className="text-4xl font-bold mb-2">Upgrade your plan!</h1>
            <p className="w-[90%] text-lg">
              To access this feature, you will need to upgrade your subscription
              plan.
            </p>

            <div className="mt-10 mb-5">
              <p className="w-[90%] text-xs mb-2">
                Truly Unlimited content without limits. Try 12 months of Premium
                for ₹99.
              </p>
              <p className="w-[90%] text-lg">
                Only ₹31/month after. Cancel anytime.
              </p>
            </div>

            <Link
              className="bg-blue w-fit text-white flex items-center px-5 h-10 rounded-lg hover:opacity-95 hover:scale-[0.98] active:scale-[0.95] transition-all duration-150 ease-linear"
              href={"/settings?tab=subscribe"}
            >
              Explore Subscription Plans
            </Link>
          </div>
        </div>
      </ModalForm> */}
      <CurrentView key={tab} />
    </>
  );
};

export default SignUpForm;
