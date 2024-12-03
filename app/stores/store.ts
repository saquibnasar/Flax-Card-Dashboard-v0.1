import { create } from "zustand";
import { embedMediaType } from "../new/AdditionalForm/EmbedMedia";

type PhoneNumber = { code: string; phoneNumber: string };

interface UserAdditionalInfo {
  employeeBio: string;
}

export interface CoverImagesProps {
  slideshow: boolean;
  images: File[];
}

interface UserSignupData {
  profilePicture: string;
  name: string;
  jobTitle: string;
  employeeId: string;
  companyName: string;
  profileUrl: string;
  email: string;
  contact: PhoneNumber;
  twitter: string;
  behance: string;
  pinterest: string;
  linkedIn: string;
  instagram: string;
  coverImages: CoverImagesProps;
  images: File[];
  formattedText: string;
  embedMedia: embedMediaType | undefined;
  googleForm: embedMediaType | undefined;
  pdf: File | null;
  theme: "dark" | "light";
  enableContact: boolean;
  setProfilePicture: (profilePicture: string) => void;
  setName: (name: string) => void;
  setJobTitle: (jobTitle: string) => void;
  setEmployeeId: (employeeId: string) => void;
  setCompanyName: (companyName: string) => void;
  setProfileUrl: (profileUrl: string) => void;
  setEmail: (email: string) => void;
  setContact: (contact: PhoneNumber) => void;
  setTwitter: (twitter: string) => void;
  setBehance: (behance: string) => void;
  setPinterest: (pinterest: string) => void;
  setLinkedIn: (linkedIn: string) => void;
  setInstagram: (instagram: string) => void;
  setCoverImage: (image: File) => void;
  setCoverSlideShow: (slideshow: boolean) => void;
  setImages: (images: File) => void;
  setFormattedText: (formattedText: string) => void;
  setEmbedMedia: (title: string, link: string) => void;
  setGoogleForm: (title: string, link: string) => void;
  setPdf: (pdf: File) => void;
  setTheme: (theme: "dark" | "light") => void;
  setEnableContact: (enableContact: boolean) => void;
}

const useUserStore = create<UserSignupData>((set) => ({
  profilePicture: "",
  name: "",
  jobTitle: "",
  employeeId: "",
  companyName: "",
  profileUrl: "",
  email: "",
  contact: { code: "", phoneNumber: "" },
  twitter: "",
  behance: "",
  pinterest: "",
  linkedIn: "",
  instagram: "",
  coverImages: { slideshow: false, images: [] },
  images: [],
  formattedText: "",
  embedMedia: undefined,
  googleForm: undefined,
  pdf: null,
  theme: "light",
  enableContact: false,
  setProfilePicture: (profilePicture) => set(() => ({ profilePicture })),
  setName: (name) => set(() => ({ name })),
  setJobTitle: (jobTitle) => set(() => ({ jobTitle })),
  setEmployeeId: (employeeId) => set(() => ({ employeeId })),
  setCompanyName: (companyName) => set(() => ({ companyName })),
  setProfileUrl: (profileUrl) => set(() => ({ profileUrl })),
  setEmail: (email) => set(() => ({ email })),
  setContact: (contact) => set(() => ({ contact })),
  setTwitter: (twitter) => set(() => ({ twitter })),
  setBehance: (behance) => set(() => ({ behance })),
  setPinterest: (pinterest) => set(() => ({ pinterest })),
  setLinkedIn: (linkedIn) => set(() => ({ linkedIn })),
  setInstagram: (instagram) => set(() => ({ instagram })),
  setCoverImage: (image) =>
    set((store) => ({
      coverImages: {
        images: [image, ...store.coverImages.images],
        slideshow: store.coverImages.slideshow,
      },
    })),
  setCoverSlideShow: (slideshow) =>
    set((store) => ({
      coverImages: { slideshow, images: store.coverImages.images },
    })),

  setImages: (images) =>
    set((store) => ({ images: [images, ...store.images] })),
  setFormattedText: (formattedText) => set(() => ({ formattedText })),
  setEmbedMedia: (title, value) =>
    set(() => ({ embedMedia: { title, value } })),
  setGoogleForm: (title, value) =>
    set(() => ({ googleForm: { title, value } })),
  setPdf: (pdf) => set(() => ({ pdf })),
  setTheme: (theme) => set(() => ({ theme })),
  setEnableContact: (enableContact) => set(() => ({ enableContact })),
}));

export default useUserStore;
