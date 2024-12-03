import MobileView from "@/app/components/MobileView/MobileView";
import AppearancePage from "@/app/dashboard/[id]/AppearancePage/AppearancePage";
import CurrentPageContainer from "@/app/dashboard/[id]/CurrentPageContainer";
import Header from "@/app/dashboard/[id]/Header";
import LeadFormPage from "@/app/dashboard/[id]/LeadFormPage";
import profilePlaceHolder from "@/public/placeholders/profilePlaceHolder.svg";
import { Grid, GridItem, Show } from "@chakra-ui/react";
import SocialLink from "./SocialLink";
import TemplateForm from "./TemplateForm";
import { Appearance } from "@/app/utils/entities/UserCardDetails";

interface TabTypes {
  tab: "socials" | "appearance" | "form";
}
interface Props {
  searchParams: TabTypes;
}

const TemplateEditPage = async ({ searchParams: { tab } }: Props) => {
  const TemplateEditTab = {
    about: (
      <TemplateForm
        companyName={"Meta"}
        location={"India"}
        about=""
        profileUrl={"meta"}
      />
    ),
    socials: <SocialLink />,
    appearance: (
      <AppearancePage appearance={{} as Appearance} employeeId="klsdf" />
    ),
    form: <></>,
  };

  // <LeadFormPage />

  const CurrentPage = TemplateEditTab[tab] ?? (
    <TemplateForm
      companyName={"Meta"}
      location={"India"}
      about=""
      profileUrl={"meta"}
    />
  );
  return (
    <div className="w-full h-screen">
      <Grid
        templateAreas={`"header footer"
                  "main footer"
                  `}
        gridTemplateRows={"200px 1fr"}
        py={2}
        gridTemplateColumns={"1fr 0.8fr"}
        gap="3"
        className="h-full"
      >
        <GridItem pl="2" area={"header"}>
          <Header
            employeeId=""
            name={"Template 1"}
            profileImage={profilePlaceHolder}
            coverImages={[]}
          />
        </GridItem>

        <GridItem
          pl="2"
          area={"main"}
          className="custom-scrollbar w-full overflow-y-scroll"
        >
          <CurrentPageContainer key={tab}>{CurrentPage}</CurrentPageContainer>
        </GridItem>
        <Show above="md">
          <GridItem
            className="border-l border-dSecondary flex justify-center items-center overflow-y-scroll"
            area={"footer"}
          >
            {/* <MobileView /> */}
          </GridItem>
        </Show>
      </Grid>
    </div>
  );
};

export default TemplateEditPage;
