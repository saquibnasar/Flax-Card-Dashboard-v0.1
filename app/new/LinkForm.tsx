"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "react-phone-number-input/style.css";
import SocialMediaItems, { socialCategories } from "../utils/socialMediaItems";
import CategorySelector from "./CategorySelector";
import FormContainer from "./FormContainer";
import LinkInput from "./LinkInput";
import Submit from "./Submit";
import useUserLinksStore from "../stores/useUserLinks";

const LinkForm = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState(socialCategories[0]);
  const { setLinks } = useUserLinksStore();
  return (
    <FormContainer
      title="Connect With Peoples"
      subtitle="Add information to connect easily"
    >
      <form
        className="w-full h-[75vh] flex flex-col justify-between"
        onSubmit={(event) => {
          event.preventDefault();
          router.push("/new?tab=addForm");
        }}
      >
        <div className="custom-scrollbar space-y-4 pt-2 pl-2 pr-5 max-h-[60vh] overflow-y-scroll">
          <CategorySelector
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            categories={socialCategories}
          />

          {SocialMediaItems[selectedCategory].map((social) => (
            <LinkInput
              key={social.type}
              social={social}
              updateLink={(link) => setLinks(link)}
              phoneInputBg="#FFF"
            />
          ))}
        </div>

        <div className="h-[10vh] align-bottom">
          <Submit label="Next" previous="home" next="addForm" />
        </div>
      </form>
    </FormContainer>
  );
};

export default LinkForm;
