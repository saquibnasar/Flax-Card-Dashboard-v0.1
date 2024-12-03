"use client";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import http, { checkPrimaryCard } from "../services/api-client";
import useUserAdditionalContent from "../stores/useUserAdditionalContent";
import useUserDetailsStore from "../stores/useUserDetailsStore";
import useUserLinksStore from "../stores/useUserLinks";
import FormContainer from "./FormContainer";
import Submit from "./Submit";
import SelectTheme from "../components/SelectTheme";

const ThemeSelector = () => {
  const router = useRouter();
  const {
    profileImage,
    name,
    designation,
    companyName,
    employeeId,
    profileUrl,
    employeeBio,
  } = useUserDetailsStore((s) => s);
  const { officialEmailId, mobileNumber, links } = useUserLinksStore((s) => s);
  const {
    bannerImages,
    additionalImages,
    pdf,
    theme,
    setTheme,
    imageSlideshow,
    enableContact,
    setEnableContact,
    titles,
    embedMap,
    embedMedia,
    googleForm,
    carouselSize,
    customLinks,
  } = useUserAdditionalContent();

  const [selectedTheme, setSelectedTheme] = useState<"dark" | "light">(theme);
  const [isLoading, setIsLoading] = useState(false);
  const [cardCreated, setCardCreated] = useState(true);

  useEffect(() => {
    const isCardCreated = async () => {
      const token = window.localStorage.getItem("accessToken");
      try {
        const isCardCreated = await checkPrimaryCard(token!);
        setCardCreated(isCardCreated);
      } catch (ex) {}
    };

    isCardCreated();
  }, []);

  if (!name || !designation) {
    router.push("/new");
    return null;
  }

  return (
    <FormContainer title="Select Theme" subtitle="What do you like?">
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          setIsLoading(true);

          if (window.localStorage.getItem("accessToken")) {
            const formData = new FormData();
            // User form details
            profileImage && formData.append("profileImage", profileImage);
            formData.append("name", name);
            formData.append("designation", designation);
            employeeId && formData.append("employeeId", employeeId);
            cardCreated
              ? formData.append("profileUrl", profileUrl)
              : formData.append(
                  "profileUrl",
                  window.localStorage.getItem("username")!
                );
            formData.append("employeeBio", employeeBio);

            // Communication and Social Links
            // formData.append("officeEmailId", officialEmailId);
            // formData.append("mobileNumber[code]", mobileNumber.code);
            // formData.append(
            //   "mobileNumber[phoneNumber]",
            //   mobileNumber.phoneNumber
            // );

            window.localStorage.getItem("username") &&
              formData.append("companyName", companyName);

            links.forEach((link, index) => {
              formData.append(`links[${index}][title]`, link.title);
              formData.append(`links[${index}][value]`, link.value);
              formData.append(
                `links[${index}][isActive]`,
                link.isActive.toString()
              );
              formData.append(`links[${index}][type]`, link.type);
            });

            customLinks?.forEach((link, index) => {
              formData.append(`customLinks[${index}][url]`, link.url);
              formData.append(
                `customLinks[${index}][buttonText]`,
                link.buttonText
              );
              formData.append(
                `customLinks[${index}][isActive]`,
                JSON.stringify(true)
              );
              formData.append(
                `customLinks[${index}][widgetStyle]`,
                link.widgetStyle
              );
            });

            formData.append(
              `coverImageSlideShow`,
              JSON.stringify(bannerImages.slideshow)
            );
            formData.append(`carouselSize`, JSON.stringify(carouselSize));
            formData.append(
              `additionalImageSlideShow`,
              JSON.stringify(imageSlideshow)
            );
            // Additional Files and Content
            bannerImages.images.forEach((cover, index) => {
              formData.append(`bannerImages`, cover);
            });
            additionalImages.forEach((cover) => {
              formData.append(`additionalImages`, cover);
            });

            formData.append("pdfFile", pdf.pdfFile!);
            pdf.pdfFile &&
              formData.append("pdfTitle", pdf.title || "Something about us");
            titles.length > 0 &&
              titles.forEach((title) => {
                formData.append("titles", title);
              });
            if (embedMedia) {
              formData.append(`embedMedia[title]`, embedMedia.title!);
              formData.append(`embedMedia[value]`, embedMedia.value!);
              formData.append(`embedMedia[type]`, "embedMedia");
            }

            if (embedMap) {
              formData.append(`location[title]`, embedMap.title!);
              formData.append(`location[value]`, embedMap.value!);
              formData.append(`location[type]`, "location");
            }

            if (googleForm) {
              formData.append(`googleForm[title]`, googleForm.title!);
              formData.append(`googleForm[value]`, googleForm.value!);
              formData.append(`googleForm[type]`, "googleForm");
            }

            // Theme Selector
            formData.append("theme", theme);
            formData.append("enableContact", JSON.stringify(enableContact));

            const accessToken = window.localStorage.getItem("accessToken");
            try {
              const companyData = new FormData();
              companyData.append("companyName", companyName);
              if (window.localStorage.getItem("username") && companyName) {
                await http.post("/settings/updateCompanyDetails", companyData, {
                  headers: {
                    Authorization: `Bearer ${accessToken}`,
                  },
                });
              }

              await http.post("/members/addMember", formData, {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              });
            } catch (ex) {
              return <h1>UnExpected Error</h1>;
            }

            router.push("/new?tab=congrats");
            setIsLoading(false);
          } else {
            setIsLoading(false);
          }
        }}
        className="h-[75vh] flex flex-col justify-between"
      >
        <div className="custom-scrollbar max-h-[60vh] overflow-y-scroll pr-5 space-y-5">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl">Enable Save contact</h1>
              <h3 className="text-sm text-tSecondary">
                By enabling it, people can save your contact information easily
              </h3>
            </div>

            <div className="form-control">
              <label className="cursor-pointer label">
                <input
                  type="checkbox"
                  onChange={() => {
                    setEnableContact(!enableContact);
                  }}
                  className="toggle toggle-primary"
                  checked={enableContact}
                />
              </label>
            </div>
          </div>
          <h1 className="text-lg">Choose Theme</h1>
          <SelectTheme theme={theme} onChange={(theme) => setTheme(theme)} />
        </div>
        <div className="h-[10vh]">
          <Submit disable={isLoading} previous="addForm" next="congrats" />
        </div>
      </form>
    </FormContainer>
  );
};

export default ThemeSelector;
