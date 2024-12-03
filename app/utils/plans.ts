type PlanFeature = {
  text: string;
  available: boolean;
};

export type PlanType = "individual" | "organization";

export type Plan = {
  title: string;
  price: number;
  planFor: PlanType;
  subtitle: string;
  features: PlanFeature[];
  buttonText: string;
  badge: "primary" | "secondary";
  badgeName: string;
};

export const MONTHLY_PLAN = 49;
export const YEARLY_PLAN = 349;
export type PLAN_DURATION = "yearly" | "monthly";
export const PLAN_DURATION_LIST = ["yearly", "monthly"];

type Plans = Record<
  "proPlanIndividual" | "freePlanIndividual" | "freePlanOrg" | "proPlanOrg",
  Plan
>;

export const plans: Plans = {
  freePlanIndividual: {
    title: "Starter",
    price: 0,
    subtitle: "",
    planFor: "individual",
    features: [
      { text: "1 Digital Card/page", available: true },
      { text: "50+ Different Link Types", available: true },
      { text: "Only the 5 Most Recent Connections", available: true },
      { text: "Only the 30 Most Recent leads", available: true },
      { text: "lead auto sync Integrations", available: false },
      { text: "Basic profile insights", available: false },
      { text: "Basic insights", available: false },
    ],
    buttonText: "",
    badgeName: "Current Plan",
    badge: "primary",
  },
  proPlanIndividual: {
    title: "Pro",
    price: MONTHLY_PLAN,
    subtitle: "Per month, billed yearly",
    planFor: "individual",
    features: [
      { text: "2 Digital Card/page", available: true },
      { text: "Supports All Different Link Types", available: true },
      { text: "Unlimited Most Recent Connections", available: true },
      { text: "Unlimited Most Recent leads", available: true },
      { text: "Auto lead sync Integrations", available: true },
      { text: "Advance profile insights", available: true },
      { text: "Unlimited Embed/videos", available: true },
    ],
    buttonText: "Start 14 Day Free Trial ->",
    badge: "secondary",
    badgeName: "Most Popular",
  },

  freePlanOrg: {
    title: "Starter",
    price: 0,
    subtitle: "",
    planFor: "organization",
    features: [
      { text: "1 Digital Card/page", available: true },
      { text: "50+ Different Link Types", available: true },
      { text: "Only the 5 Most Recent Connections", available: true },
      { text: "Only the 30 Most Recent leads", available: true },
      { text: "lead auto sync Integrations", available: false },
      { text: "Basic profile insights", available: false },
      { text: "2 profile themes", available: false },
      { text: "Basic insights", available: false },
    ],
    buttonText: "",
    badge: "primary",
    badgeName: "Current Plan",
  },
  proPlanOrg: {
    title: "Pro",
    price: YEARLY_PLAN,
    subtitle: "Per user, billed yearly",
    planFor: "organization",
    features: [
      { text: "Unlimited Business Card/page", available: true },
      { text: "Supports All Different Link Types", available: true },
      { text: "Unlimited Most Recent Connections", available: true },
      { text: "Unlimited Most Recent leads", available: true },
      { text: "Auto lead sync Integrations", available: true },
      { text: "Advance profile insights", available: true },
      { text: "Multiple profile themes", available: true },
      { text: "Unlimited Content/videos", available: true },
    ],
    buttonText: "Start 14 Day Free Trial ->",
    badge: "secondary",
    badgeName: "Enterprise",
  },
};
