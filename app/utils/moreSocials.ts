import { StaticImport } from "next/dist/shared/lib/get-img-props";

const socialMediaPlatforms: string[] = [
  "airbnb",
  "applemusic",
  "applestore",
  // "behance",
  "cashapp",
  "clubhouse",
  "coffeecup",
  "discord",
  "etsy",
  "facebook",
  "facetime",
  "github",
  "gnomecontacts",
  "google",
  "googleplay",
  "kaggle",
  "instagram",
  // "x",
  "linkedin",
  "messages",
  "outlook",
  "paypal",
  "pinterest",
  "quora",
  "reddit",
  "safariios",
  "signal",
  "snapchat",
  "soundcloud",
  "spotify",
  "telegram",
  "tinder",
  "tumblr",
  "twitch",
  "wechat",
  "whatsapp",
  "yelp",
];

const socialMediaIcons: Record<string, any> = {};

socialMediaPlatforms.forEach((platform) => {
  socialMediaIcons[
    platform
  ] = require(`@/public/social_media_icons/${platform}.svg`);
});

const categoryMap: Record<string, string[]> = {
  //behance
  // "x"
  Recommended: ["linkedin", "instagram", "pinterest"],
  Social: [
    "clubhouse",
    "coffecup",
    "discord",
    "etsy",
    "facebook",
    "facetime",
    "github",
    "gnomecontacts",
    "kaggle",
    "pinterest",
    "quora",
    "reddit",
    "safariios",
    "tinder",
    "tumblr",
    "twitch",
  ],
  Communication: [
    "messages",
    "whatsapp",
    "telegram",
    "snapchat",
    "outlook",
    "wechat",
  ],
  Business: ["google", "applestore", "yelp", "googleplay", "airbnb"],
  Payment: ["cashapp", "paypal"],
  Music: ["applemusic", "soundcloud", "spotify"],
  More: ["coffeecup", "more"],
};

const getCategory = (type: string): string => {
  const lowercaseType = type.toLowerCase();
  for (const category in categoryMap) {
    if (categoryMap[category].includes(lowercaseType)) {
      return category;
    }
  }
  return "unCategorized";
};

export const socialMediaData: {
  title: string;
  type: string;
  icon: StaticImport;
  category: string;
}[] = socialMediaPlatforms.map((platform, index) => ({
  title: platform.charAt(0).toUpperCase() + platform.slice(1),
  type: socialMediaPlatforms[index],
  icon: socialMediaIcons[platform],
  category: getCategory(platform),
}));

export default socialMediaIcons;
