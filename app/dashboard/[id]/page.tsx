"use client";

import MobileView from "@/app/components/MobileView/MobileView";
import UserCardDetails from "@/app/utils/entities/UserCardDetails";
import useCard from "@/app/utils/hooks/useCard";
import { allSocialMediaItems } from "@/app/utils/socialMediaItems";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import AboutPage from "./AboutPage";
import AppearancePage from "./AppearancePage/AppearancePage";
import CurrentPageContainer from "./CurrentPageContainer";
import LeadFormPage from "./LeadFormPage";
import MobileDrawer from "./MobileDrawer";
import SocialsPage from "./SocialPage/SocialsPage";
import CardDetailsLoading from "./loading";

export interface TabTypes {
  tab: "content" | "appearance" | "form" | "";
}
interface Props {
  params: { id: string };
  searchParams: TabTypes;
}

const CardDetails = ({ params: { id }, searchParams: { tab } }: Props) => {
  const { data: card, status, error, isLoading } = useCard(id);

  const [currentCard, setCurrentCard] = useState({} as UserCardDetails);

  useEffect(() => {
    setCurrentCard(card);
  }, [card]);

  if (status === "error") notFound();

  const flaxBioUrl = process.env.NEXT_PUBLIC_FLAX_BIO_URL;
  const bioUrl = card?.isPrimaryCard
    ? flaxBioUrl + "/" + card?.profileUrl
    : flaxBioUrl +
      "/" +
      localStorage.getItem("username") +
      "/" +
      card?.profileUrl;

  const directModeLink = card?.links.find((link) => link.isActive);
  if (isLoading) return <CardDetailsLoading />;
  const CardDetailsTab = {
    about: (
      <AboutPage
        name={card.name}
        designation={card.designation}
        employeeId={card.employeeId}
        about={card.employeeBio}
        profileUrl={card.profileUrl}
        companyName={card.companyName}
        enableContact={card.enableContact || false}
        isPrimaryCard={card.isPrimaryCard}
        additionalImageSlideShow={card.additionalImageSlideShow}
        bannerImages={card.bannerImages}
        profileImage={card.profileImage}
      />
    ),
    content: (
      <SocialsPage
        pdf={card.pdf}
        directModeOn={card.directModeOn}
        employeeId={card.employeeId}
        googleForm={card.googleForm}
        location={card.location}
        embedYoutube={card.embedMedia}
        titles={card.titles}
        additionalImages={card.additionalImages}
        carouselSize={card.carouselSize}
        // whatsapp={currentCard.whatsappNumber!}
        // mobileNumber={currentCard.mobileNumber!}
        links={currentCard?.links}
        customLinks={card.customLinks}
      />
    ),
    appearance: (
      <AppearancePage
        employeeId={card.employeeId}
        appearance={card.appearance}
      />
    ),
    form: <LeadFormPage leadForm={card?.leadForm} id={card.employeeId} />,
    "": (
      <AboutPage
        name={card.name}
        designation={card?.designation}
        employeeId={card.employeeId}
        about={card?.employeeBio}
        companyName={card.companyName}
        profileUrl={card.profileUrl}
        enableContact={card.enableContact || false}
        isPrimaryCard={card.isPrimaryCard}
        additionalImageSlideShow={card.additionalImageSlideShow}
        bannerImages={card.bannerImages}
        profileImage={card.profileImage}
      />
    ),
  };

  const CurrentPage = CardDetailsTab[tab] ?? (
    <AboutPage
      name={card.name}
      companyName={card?.companyName}
      designation={card?.designation}
      employeeId={card.employeeId}
      about={card?.employeeBio}
      profileUrl={card.profileUrl}
      enableContact={card.enableContact || false}
      isPrimaryCard={card.isPrimaryCard}
      additionalImageSlideShow={card.additionalImageSlideShow}
      bannerImages={card.bannerImages}
      profileImage={card.profileImage}
    />
  );
  const findDirectLink = card.links?.find((link) => link.isActive);
  let prefixDirectLink = "";
  if (findDirectLink?.value && card.directModeOn) {
    prefixDirectLink = allSocialMediaItems[findDirectLink.type].prefix
      ? allSocialMediaItems[findDirectLink.type].prefix + findDirectLink.value
      : findDirectLink.value;
  }
  return (
    <div className="h-full px-3 flex">
      <MobileDrawer tab={tab} />
      <div className="h-full w-full md:w-[60%] overflow-y-scroll">
        <CurrentPageContainer key={tab}>{CurrentPage}</CurrentPageContainer>
      </div>

      <div className="border-l hidden md:flex w-full md:w-[40%] space-y-3 border-dSecondary flex-col justify-center items-center overflow-y-scroll">
        <Link
          className="text-lg text-tSecondary"
          href={
            card.directModeOn
              ? prefixDirectLink || "https://" + bioUrl
              : "https://" + bioUrl
          }
          target="_blank"
        >
          Preview
        </Link>
        <MobileView cardDetails={card} />
      </div>
    </div>
  );
};

export default CardDetails;
