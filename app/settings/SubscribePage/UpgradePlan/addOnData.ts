export type AddOnProps = {
  id: number;
  title: string;
  description: string;
  price: number;
  priceDetails: string;
  subtitle?: string;
  isDefault?: boolean;
  isSelected?: boolean;
};

export const addOnData: AddOnProps[] = [
  {
    id: 1,
    title: "Profile setup by Professionals",
    description:
      "Help in setting up portfolio, Google Search Listing, product imports and setting up personalized banner based on business and 6 category images.",
    price: 499,
    priceDetails: "₹499 /- one time",
    isSelected: false,
  },

  {
    id: 2,
    title: "Logo Design",
    description: "Get logo designed from expert designer.",
    price: 299,
    priceDetails: "₹299 /- one time",
    isSelected: false,
  },
];
