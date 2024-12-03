export interface SocialMediaItem {
  icon: string;
  placeholder: string;
  title: string;
  type?: string;
  isNumber?: boolean;
  prefix?: string;
}

const LinkInBio: SocialMediaItem[] = [
  {
    icon: "x-twitter",
    placeholder: "Enter your profile url",
    title: "X-Twitter",
    type: "xTwitter",
  },
  {
    icon: "instagram",
    placeholder: "Enter your profile url",
    title: "Instagram",
    type: "instagram",
  },
  {
    icon: "facebook",
    placeholder: "https://facebook.com/usertitle",
    title: "Facebook",
    type: "facebook",
  },
  {
    icon: "snapchat",
    placeholder: "https://www.snapchat.com/p/usertitle",
    title: "Snapchat",
    type: "snapchat",
  },
  {
    icon: "youtube",
    placeholder: "https://www.youtube.com/@usertitle",
    title: "Youtube",
    type: "youtube",
  },
  {
    icon: "twitch",
    placeholder: "https://www.twitch.tv/usertitle",
    title: "Twitch",
    type: "twitch",
  },
  {
    icon: "linkedin",
    placeholder: "https://www.linkedin.com/x/xxxx",
    title: "LinkedIn",
    type: "linkedIn",
  },
  {
    icon: "email",
    placeholder: "youremail@domain.com",
    title: "Email",
    type: "email",
    prefix: "mailto:",
  },
  {
    icon: "apple-mail",
    placeholder: "youremail@icloud.com",
    title: "Apple-Mail",
    type: "appleMail",
  },
  {
    icon: "gmail",
    placeholder: "youremail@gmail.com",
    title: "Gmail",
    type: "gmail",
    prefix: "mailto:",
  },
  {
    icon: "outlook",
    placeholder: "youremail@domain.com",
    title: "Outlook",
    type: "outlook",
    prefix: "mailto:",
  },
  {
    icon: "yahoo-mail",
    placeholder: "youremail@domain.com",
    title: "Yahoo-Mail",
    type: "yahooMail",
  },
  {
    icon: "threads",
    placeholder: "Enter your profile url",
    title: "Threads",
    type: "threads",
  },
  {
    icon: "tumblr",
    placeholder: "Enter your link here",
    title: "Tumblr",
    type: "tumblr",
  },
  {
    icon: "whatsapp",
    placeholder: "Enter your number here",
    title: "WhatsApp",
    isNumber: true,
    type: "whatsApp",
    prefix: "https://wa.me/",
  },
  {
    icon: "whatsapp-group",
    placeholder: "Enter your link here",
    title: "WhatsApp-Group",
    type: "whatsAppGroup",
  },
  {
    icon: "call",
    placeholder: "Enter your number here",
    title: "Call",
    type: "call",
    isNumber: true,
    prefix: "tel:",
  },
  {
    icon: "message",
    placeholder: "Enter your number here",
    title: "Message",
    type: "message",
    isNumber: true,
    prefix: "sms:",
  },
  {
    icon: "facetime",
    placeholder: "Enter your number here",
    title: "Facetime",
    type: "facetime",
    isNumber: true,
  },
  {
    icon: "website",
    placeholder: "Enter your link here",
    title: "Website",
    type: "website",
  },
  {
    icon: "wechat",
    placeholder: "Enter your number here",
    title: "WeChat",
    type: "weChat",
  },
  {
    icon: "github",
    placeholder: "Enter your link here",
    title: "GitHub",
    type: "gitHub",
  },
  {
    icon: "discord",
    placeholder: "Enter your link here",
    title: "Discord",
    type: "discord",
  },
  {
    icon: "telegram",
    placeholder: "Enter your link here",
    title: "Telegram",
    type: "telegram",
  },
  {
    icon: "behance",
    placeholder: "Enter your link here",
    title: "Behance",
    type: "behance",
  },
  {
    icon: "dribbble",
    placeholder: "Enter your link here",
    title: "Dribbble",
    type: "dribbble",
  },
  {
    icon: "figma",
    placeholder: "Enter your link here",
    title: "Figma",
    type: "figma",
  },
  {
    icon: "canva",
    placeholder: "Enter your link here",
    title: "Canva",
    type: "canva",
  },
  {
    icon: "notion",
    placeholder: "Enter your link here",
    title: "Notion",
    type: "notion",
  },
  {
    icon: "luma",
    placeholder: "Enter your link here",
    title: "Luma",
    type: "luma",
  },
  {
    icon: "crunchbase",
    placeholder: "Enter your link here",
    title: "Crunchbase",
    type: "crunchbase",
  },
  {
    icon: "angellist",
    placeholder: "Enter your link here",
    title: "AngelList",
    type: "angelList",
  },
  {
    icon: "google-forms",
    placeholder: "Enter your link here",
    title: "Google-Forms",
    type: "googleForms",
  },
  {
    icon: "google-sheets",
    placeholder: "Enter your link here",
    title: "Google-Sheets",
    type: "googleSheets",
  },
  {
    icon: "hackerrank",
    placeholder: "Enter your link here",
    title: "HackerRank",
    type: "hackerRank",
  },
  {
    icon: "stack-overflow",
    placeholder: "Enter your link here",
    title: "Stack-Overflow",
    type: "stackOverflow",
  },
  {
    icon: "slack",
    placeholder: "Enter your link here",
    title: "Slack",
    type: "slack",
  },
  {
    icon: "clubhouse",
    placeholder: "Enter your link here",
    title: "Clubhouse",
    type: "clubhouse",
  },
  {
    icon: "koo",
    placeholder: "Enter your link here",
    title: "Koo",
    type: "koo",
  },
  {
    icon: "etsy",
    placeholder: "Enter your link here",
    title: "Etsy",
    type: "etsy",
  },
  {
    icon: "ebay",
    placeholder: "Enter your link here",
    title: "Ebay",
    type: "ebay",
  },
  {
    icon: "yelp",
    placeholder: "Enter your link here",
    title: "Yelp",
    type: "yelp",
  },
  {
    icon: "quora",
    placeholder: "Enter your link here",
    title: "Quora",
    type: "quora",
  },
  {
    icon: "reddit",
    placeholder: "Enter your link here",
    title: "Reddit",
    type: "reddit",
  },
  {
    icon: "gumroad",
    placeholder: "Enter your link here",
    title: "Gumroad",
    type: "gumroad",
  },
  {
    icon: "pinterest",
    placeholder: "Enter your link here",
    title: "Pinterest",
    type: "pinterest",
  },
  {
    icon: "google-drive",
    placeholder: "Enter your link here",
    title: "Google-Drive",
    type: "googleDrive",
  },
  {
    icon: "dropbox",
    placeholder: "Enter your link here",
    title: "Dropbox",
    type: "dropbox",
  },
  {
    icon: "paypal",
    placeholder: "Enter your link here",
    title: "PayPal",
    type: "payPal",
  },
  {
    icon: "cash-app",
    placeholder: "Enter your link here",
    title: "Cash-App",
    type: "cashApp",
  },
  {
    icon: "venmo",
    placeholder: "Enter your link here",
    title: "Venmo",
    type: "venmo",
  },
  {
    icon: "zelle",
    placeholder: "Enter your link here",
    title: "Zelle",
    type: "zelle",
  },
  {
    icon: "google-play",
    placeholder: "Enter your link here",
    title: "Google-Play",
    type: "googlePlay",
  },
  {
    icon: "apple-app-store",
    placeholder: "Enter your link here",
    title: "Apple-App-Store",
    type: "appleAppStore",
  },
  {
    icon: "shopify",
    placeholder: "Enter your link here",
    title: "Shopify",
    type: "shopify",
  },
  {
    icon: "dukaan",
    placeholder: "Enter your link here",
    title: "Dukaan",
    type: "dukaan",
  },
  {
    icon: "linktree",
    placeholder: "Enter your link here",
    title: "Linktree",
    type: "linktree",
  },
  {
    icon: "google-meet",
    placeholder: "Enter your link here",
    title: "Google-Meet",
    type: "googleMeet",
  },
  {
    icon: "zoom",
    placeholder: "Enter your link here",
    title: "Zoom",
    type: "zoom",
  },
  {
    icon: "microsoft-teams",
    placeholder: "Enter your link here",
    title: "Microsoft-Teams",
    type: "microsoftTeams",
  },
  {
    icon: "skype",
    placeholder: "Enter your link here",
    title: "Skype",
    type: "skype",
  },
  {
    icon: "airbnb",
    placeholder: "Enter your link here",
    title: "Airbnb",
    type: "airbnb",
  },
  {
    icon: "tripadvisor",
    placeholder: "Enter your link here",
    title: "TripAdvisor",
    type: "tripAdvisor",
  },
  {
    icon: "justdial",
    placeholder: "Enter your link here",
    title: "Justdial",
    type: "justdial",
  },
  {
    icon: "indiamart",
    placeholder: "Enter your link here",
    title: "Indiamart",
    type: "indiamart",
  },
  {
    icon: "zomato",
    placeholder: "Enter your link here",
    title: "Zomato",
    type: "zomato",
  },
  {
    icon: "swiggy",
    placeholder: "Enter your link here",
    title: "Swiggy",
    type: "swiggy",
  },
  {
    icon: "doordash",
    placeholder: "Enter your link here",
    title: "Doordash",
    type: "doordash",
  },
  {
    icon: "udemy",
    placeholder: "Enter your link here",
    title: "Udemy",
    type: "udemy",
  },
  {
    icon: "amazon",
    placeholder: "Enter your link here",
    title: "Amazon",
    type: "amazon",
  },
  {
    icon: "coinbase",
    placeholder: "Enter your link here",
    title: "Coinbase",
    type: "coinbase",
  },
  {
    icon: "trello",
    placeholder: "Enter your link here",
    title: "Trello",
    type: "trello",
  },
  {
    icon: "freelancer",
    placeholder: "Enter your link here",
    title: "Freelancer",
    type: "freelancer",
  },
  {
    icon: "google",
    placeholder: "Enter your link here",
    title: "Google",
    type: "google",
  },
  {
    icon: "maps",
    placeholder: "Enter your link here",
    title: "Maps",
    type: "maps",
  },
  {
    icon: "upwork",
    placeholder: "Enter your link here",
    title: "Upwork",
    type: "upwork",
  },
  {
    icon: "spotify",
    placeholder: "Enter your link here",
    title: "Spotify",
    type: "spotify",
  },
  {
    icon: "soundcloud",
    placeholder: "Enter your link here",
    title: "SoundCloud",
    type: "soundcloud",
  },
];

const BusinessCard: SocialMediaItem[] = [
  // {
  //   icon: "",
  //   placeholder: "Enter your profile url here",
  //   title: "Save-Contact",
  //   type: "saveContact",
  // },
  {
    icon: "",
    placeholder: "Enter your number here",
    title: "WhatsApp",
    type: "whatsApp",
    isNumber: true,
    prefix: "https://wa.me/",
  },
  {
    icon: "",
    placeholder: "Enter your number here",
    title: "Call",
    type: "call",
    isNumber: true,
    prefix: "tel:",
  },
  {
    icon: "",
    placeholder: "Enter your number here",
    title: "Message",
    type: "message",
    isNumber: true,
    prefix: "sms:",
  },
  {
    icon: "",
    placeholder: "Enter your factime url",
    title: "Facetime",
    type: "facetime",
  },
  {
    icon: "",
    placeholder: "youremail@domain.com",
    title: "Email",
    type: "email",
    prefix: "mailto:",
  },
  {
    icon: "",
    placeholder: "youremail@gmail.com",
    title: "Gmail",
    type: "gmail",
    prefix: "mailto:",
  },
  {
    icon: "",
    placeholder: "Enter your link here",
    title: "Website",
    type: "website",
  },
  {
    icon: "",
    placeholder: "https://www.linkedin.com/x/xxxx",
    title: "LinkedIn",
    type: "linkedIn",
  },
  {
    icon: "",
    placeholder: "Enter your profile url here",
    title: "Instagram",
    type: "instagram",
  },
  {
    icon: "",
    placeholder: "https://facebook.com/usertitle",
    title: "Facebook",
    type: "facebook",
  },
  {
    icon: "",
    placeholder: "Enter your profile url here",
    title: "X-Twitter",
    type: "xTwitter",
  },
  {
    icon: "",
    placeholder: "https://www.youtube.com/@usertitle",
    title: "Youtube",
    type: "youtube",
  },
  {
    icon: "",
    placeholder: "https://www.snapchat.com/p/usertitle",
    title: "Snapchat",
    type: "snapchat",
  },
  {
    icon: "",
    placeholder: "Enter your usertitle here",
    title: "Threads",
    type: "threads",
  },
  {
    icon: "",
    placeholder: "Enter your usertitle here",
    title: "Telegram",
    type: "telegram",
  },
  {
    icon: "",
    placeholder: "Enter your link here",
    title: "WhatsApp-Group",
    type: "whatsAppGroup",
  },
  {
    icon: "",
    placeholder: "Enter your link here",
    title: "PayPal",
    type: "payPal",
  },
  {
    icon: "",
    placeholder: "Enter your link here",
    title: "Calandly",
    type: "calandly",
  },
  {
    icon: "",
    placeholder: "Enter your link here",
    title: "Maps",
    type: "maps",
  },
];

const Designer: SocialMediaItem[] = [
  {
    icon: "",
    placeholder: "Enter your link here",
    title: "Figma",
    type: "figma",
  },
  {
    icon: "",
    placeholder: "Enter your link here",
    title: "Behance",
    type: "behance",
  },
  {
    icon: "",
    placeholder: "Enter your link here",
    title: "Dribbble",
    type: "dribbble",
  },
  {
    icon: "",
    placeholder: "Enter your link here",
    title: "Pinterest",
    type: "pinterest",
  },
  {
    icon: "",
    placeholder: "youremail@domain.com",
    title: "Email",
    type: "email",
    prefix: "mailto:",
  },
  {
    icon: "",
    placeholder: "youremail@gmail.com",
    title: "Gmail",
    type: "gmail",
    prefix: "mailto:",
  },
  {
    icon: "",
    placeholder: "Enter your link here",
    title: "Upwork",
    type: "upwork",
  },
  {
    icon: "",
    placeholder: "Enter your link here",
    title: "Freelancer",
    type: "freelancer",
  },
  {
    icon: "",
    placeholder: "https://www.youtube.com/@usertitle",
    title: "Youtube",
    type: "youtube",
  },
  {
    icon: "",
    placeholder: "Enter your usertitle here",
    title: "Instagram",
    type: "instagram",
  },
  {
    icon: "",
    placeholder: "Enter your usertitle here",
    title: "X-Twitter",
    type: "xTwitter",
  },
  {
    icon: "",
    placeholder: "https://www.linkedin.com/x/xxxx",
    title: "LinkedIn",
    type: "linkedIn",
  },
  {
    icon: "",
    placeholder: "https://facebook.com/usertitle",
    title: "Facebook",
    type: "facebook",
  },
  {
    icon: "",
    placeholder: "Enter your link here",
    title: "Google-Meet",
    type: "googleMeet",
  },
  {
    icon: "",
    placeholder: "Enter your link here",
    title: "Zoom",
    type: "zoom",
  },
  {
    icon: "",
    placeholder: "Enter your link here",
    title: "Calandly",
    type: "calandly",
  },
  {
    icon: "",
    placeholder: "Enter your link here",
    title: "Gumroad",
    type: "gumroad",
  },
  {
    icon: "",
    placeholder: "Enter your link here",
    title: "Website",
    type: "website",
  },
  {
    icon: "",
    placeholder: "Enter your number here",
    title: "WhatsApp",
    type: "whatsApp",
    isNumber: true,
    prefix: "https://wa.me/",
  },
];

const Developer: SocialMediaItem[] = [
  {
    icon: "",
    placeholder: "Enter your link here",
    title: "Website",
    type: "website",
  },
  {
    icon: "",
    placeholder: "youremail@domain.com",
    title: "Email",
    type: "email",
    prefix: "mailto:",
  },
  {
    icon: "",
    placeholder: "youremail@gmail.com",
    title: "Gmail",
    type: "gmail",
    prefix: "mailto:",
  },
  {
    icon: "",
    placeholder: "Enter your link here",
    title: "GitHub",
    type: "gitHub",
  },
  { icon: "", placeholder: "Enter your link here", title: "NPM", type: "npm" },
  { icon: "", placeholder: "Enter your link here", title: "PIP", type: "pip" },
  {
    icon: "",
    placeholder: "Enter your link here",
    title: "CodePen",
    type: "codePen",
  },
  {
    icon: "",
    placeholder: "Enter your link here",
    title: "HackerRank",
    type: "hackerRank",
  },
  {
    icon: "",
    placeholder: "Enter your link here",
    title: "Hacker-News",
    type: "hackerNews",
  },
  {
    icon: "",
    placeholder: "Enter your link here",
    title: "Stack-Overflow",
    type: "stackOverflow",
  },
  {
    icon: "",
    placeholder: "https://www.youtube.com/@usertitle",
    title: "Youtube",
    type: "youtube",
  },
  {
    icon: "",
    placeholder: "Enter your usertitle here",
    title: "Instagram",
    type: "instagram",
  },
  {
    icon: "",
    placeholder: "Enter your usertitle here",
    title: "X-Twitter",
    type: "xTwitter",
  },
  {
    icon: "",
    placeholder: "https://facebook.com/usertitle",
    title: "Facebook",
    type: "facebook",
  },
  {
    icon: "",
    placeholder: "Enter your link here",
    title: "Calandly",
    type: "calandly",
  },
  {
    icon: "",
    placeholder: "Enter your link here",
    title: "Google-Meet",
    type: "googleMeet",
  },
  {
    icon: "",
    placeholder: "Enter your link here",
    title: "Zoom",
    type: "zoom",
  },
];

const Realtor: SocialMediaItem[] = [
  {
    icon: "",
    placeholder: "Enter your number here",
    title: "Call",
    type: "call",
    isNumber: true,
    prefix: "tel:",
  },
  {
    icon: "",
    placeholder: "Enter your number here",
    title: "Message",
    type: "message",
    isNumber: true,
    prefix: "sms:",
  },
  {
    icon: "",
    placeholder: "Enter your number here",
    title: "WhatsApp",
    type: "whatsApp",
    isNumber: true,
    prefix: "https://wa.me/",
  },
  {
    icon: "",
    placeholder: "Enter your link here",
    title: "Website",
    type: "website",
  },
  {
    icon: "",
    placeholder: "youremail@domain.com",
    title: "Email",
    type: "email",
    prefix: "mailto:",
  },
  {
    icon: "",
    placeholder: "youremail@gmail.com",
    title: "Gmail",
    type: "gmail",
    prefix: "mailto:",
  },
  {
    icon: "",
    placeholder: "https://www.youtube.com/@usertitle",
    title: "Youtube",
    type: "youtube",
  },
  {
    icon: "",
    placeholder: "Enter your usertitle here",
    title: "Instagram",
    type: "instagram",
  },
  {
    icon: "",
    placeholder: "Enter your profile url",
    title: "X-Twitter",
    type: "xTwitter",
  },
  {
    icon: "",
    placeholder: "https://facebook.com/usertitle",
    title: "Facebook",
    type: "facebook",
  },
  {
    icon: "",
    placeholder: "Enter your link here",
    title: "Calandly",
    type: "calandly",
  },
  {
    icon: "",
    placeholder: "Enter your link here",
    title: "Google-Meet",
    type: "googleMeet",
  },
  {
    icon: "",
    placeholder: "Enter your link here",
    title: "Zoom",
    type: "zoom",
  },
  // { icon: "", placeholder: "Enter your link here", title: "Google-Search" },
  // { icon: "", placeholder: "Enter your link here", title: "Maps-link" },
  {
    icon: "",
    placeholder: "Enter your link here",
    title: "Google-Forms",
    type: "googleForms",
  },
  {
    icon: "",
    placeholder: "Enter your link here",
    title: "Typeform",
    type: "typeform",
  },
  {
    icon: "",
    placeholder: "Enter your link here",
    title: "Zillow",
    type: "zillow",
  },
  {
    icon: "",
    placeholder: "Enter your link here",
    title: "99Acres",
    type: "ninetyNineAcres",
  },
  {
    icon: "",
    placeholder: "Enter your link here",
    title: "NoBroker",
    type: "noBroker",
  },
  {
    icon: "",
    placeholder: "Enter your link here",
    title: "Magicbricks",
    type: "magicbricks",
  },
  {
    icon: "",
    placeholder: "Enter your link here",
    title: "Squareyards",
    type: "squareyards",
  },
];

const Restaurant: SocialMediaItem[] = [
  // { icon: "", placeholder: "Enter your number here", title: "Phone" },
  {
    icon: "",
    placeholder: "Enter your number here",
    title: "Message",
    type: "message",
    isNumber: true,
    prefix: "sms:",
  },
  {
    icon: "",
    placeholder: "Enter your number here",
    title: "WhatsApp",
    type: "whatsApp",
    isNumber: true,
    prefix: "https://wa.me/",
  },
  {
    icon: "",
    placeholder: "Enter your link here",
    title: "Google-Reviews",
    type: "googleReviews",
  },
  {
    icon: "",
    placeholder: "Enter your link here",
    title: "Zomato",
    type: "zomato",
  },
  {
    icon: "",
    placeholder: "Enter your link here",
    title: "Zomato-Dining",
    type: "zomatoDining",
  },
  {
    icon: "",
    placeholder: "Enter your link here",
    title: "Swiggy",
    type: "swiggy",
  },
  // { icon: "", placeholder: "Enter your link here", title: "Dineout" },
  {
    icon: "",
    placeholder: "Enter your link here",
    title: "Doordash",
    type: "doordash",
  },
  {
    icon: "",
    placeholder: "https://www.youtube.com/@usertitle",
    title: "Youtube",
    type: "youtube",
  },
  {
    icon: "",
    placeholder: "Enter your usertitle here",
    title: "Instagram",
    type: "instagram",
  },
  {
    icon: "",
    placeholder: "Enter your usertitle here",
    title: "X-Twitter",
    type: "xTwitter",
  },
  {
    icon: "",
    placeholder: "https://facebook.com/usertitle",
    title: "Facebook",
    type: "facebook",
  },
  {
    icon: "",
    placeholder: "Enter your link here",
    title: "Website",
    type: "website",
  },
];

// title: Facebook -> type: facebook
// ['facebook', 'instagram', 'tinder', 'x-twitter', etc...,]

//Delete custom links
//Validate links
//Flax Bio

export const socialCategories = [
  "Link in Bio",
  "BusinessCard",
  "Designer",
  "Developer",
  "Realtor",
  "Restaurant",
];

const SocialMediaItems: { [key: string]: SocialMediaItem[] } = {
  "Link in Bio": LinkInBio.map((item) => ({
    ...item,
    icon: require(`@/public/socials/${item.title.toLowerCase()}.svg`),
  })),
  BusinessCard: BusinessCard.map((item) => ({
    ...item,
    icon: require(`@/public/socials/${item.title.toLowerCase()}.svg`),
  })),
  Designer: Designer.map((item) => ({
    ...item,
    icon: require(`@/public/socials/${item.title.toLowerCase()}.svg`),
  })),
  Developer: Developer.map((item) => ({
    ...item,
    icon: require(`@/public/socials/${item.title.toLowerCase()}.svg`),
  })),
  Realtor: Realtor.map((item) => ({
    ...item,
    icon: require(`@/public/socials/${item.title.toLowerCase()}.svg`),
  })),
  Restaurant: Restaurant.map((item) => ({
    ...item,
    icon: require(`@/public/socials/${item.title.toLowerCase()}.svg`),
  })),
};

export const allSocialMediaItems: {
  [key: string]: { icon: string; prefix?: string };
} = Object.values(SocialMediaItems).reduce((accumulator, category) => {
  category.forEach((item) => {
    accumulator[item.type!] = {
      icon: require(`@/public/socials/${item.title.toLowerCase()}.svg`),
      prefix: item.prefix,
    };
  });
  return accumulator;
}, {} as { [key: string]: { icon: string; prefix?: string } });

export default SocialMediaItems;
