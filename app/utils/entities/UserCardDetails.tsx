import { FileData } from "@/app/dashboard/CardGrid";
import { CustomLinksProps } from "@/app/stores/useUserAdditionalContent";
import { LinkDTO } from "@/app/stores/useUserLinks";

export interface PhoneNumber {
  code: string;
  phoneNumber: string;
}

export interface CoverImagesProps {
  slideshow: boolean;
  images: File[] | string[];
}

export interface embedMediaType {
  title?: string;
  value: string;
}

export interface Appearance {
  profileAlignment: string;
  background?: string;
  backgroundColor?: string;
  buttonFill?: string;
  buttonFontColor?: string;
  buttonColor?: string;
  font?: string;
  fontColor?: string;
  linkStyle: string;
}

export interface FileType {
  id?: string;
  memberId?: string;
  imageUrl: string;
  type?: string;
}

export interface LeadForm {
  isActive: boolean;
  header: string;
  disclaimer: string;
}

interface UserCardDetails {
  profileImage?: string | File;
  name: string;
  designation?: string;
  employeeId: string;
  employeeBio?: string;
  companyName: string;
  profileUrl: string;
  email?: string;
  contact?: PhoneNumber;
  isPrimaryCard?: boolean;
  links: LinkDTO[];
  directModeOn?: boolean;
  bannerImages?: FileType[];
  coverImageSlideShow?: boolean;
  additionalImages?: FileType[];
  additionalImageSlideShow?: boolean;
  titles?: string[];
  embedMedia?: embedMediaType;
  googleForm?: embedMediaType;
  location?: embedMediaType;
  pdfTitle?: string;
  carouselSize?: number;
  appearance: Appearance;
  pdf?: FileData;
  theme?: "dark" | "light";
  enableContact?: boolean;
  customLinks?: CustomLinksProps[];
  qrSerialNumber?: string;
  nfcSerialNumber?: string;
  leadForm?: LeadForm;
}

export default UserCardDetails;
