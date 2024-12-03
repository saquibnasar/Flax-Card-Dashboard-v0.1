import { create } from "zustand";
import { embedMediaType } from "../new/AdditionalForm/EmbedMedia";
import { CoverImagesProps } from "./store";

export interface CustomLinksProps {
  id?: string;
  url: string;
  widgetStyle: "Pill" | "Large";
  buttonText: string;
  isActive?: boolean;
}

interface UserAdditionalContent {
  bannerImages: CoverImagesProps;
  additionalImages: File[];
  titles: string[];
  imageSlideshow: boolean;
  embedMedia: embedMediaType | undefined;
  googleForm: embedMediaType | undefined;
  embedMap: embedMediaType | undefined;
  pdf: { title: string; pdfFile: File | null };
  theme: "dark" | "light";
  enableContact: boolean;
  carouselSize: number | null;
  customLinks: CustomLinksProps[];
  setCustomLinks: (link: CustomLinksProps) => void;
  setImageSlideShow: (slide: boolean) => void;
  setBannerImages: (image: File) => void;
  setBannerSlideShow: (slideshow: boolean) => void;
  removeBannerImage: (image: File) => void;
  setAdditionalImages: (images: File) => void;
  removeAdditionalImages: (image: File) => void;
  setTitles: (title: string) => void;
  setEmbedMedia: (title: string, link: string) => void;
  removeEmbedMedia: () => void;
  setCarouselSize: (carouselSize: number | null) => void;
  setEmbedMap: (title: string, link: string) => void;
  removeEmbedMap: () => void;
  setGoogleForm: (title: string, link: string) => void;
  removeGoogleForm: () => void;
  setPdf: (title?: string, pdfFile?: File) => void;
  removePdf: () => void;
  setTheme: (theme: "dark" | "light") => void;
  setEnableContact: (enableContact: boolean) => void;
}

const useUserAdditionalContent = create<UserAdditionalContent>((set) => ({
  bannerImages: { slideshow: true, images: [] },
  additionalImages: [],
  titles: [],
  imageSlideshow: false,
  embedMedia: undefined,
  embedMap: undefined,
  googleForm: undefined,
  pdf: { title: "", pdfFile: null },
  theme: "light",
  enableContact: false,
  carouselSize: 1,
  customLinks: [] as CustomLinksProps[],
  setImageSlideShow: (slide) => set(() => ({ imageSlideshow: slide })),
  setCarouselSize: (carouselSize) => set(() => ({ carouselSize })),

  setBannerImages: (image) =>
    set((store) => ({
      bannerImages: {
        images: [image, ...store.bannerImages.images],
        slideshow: store.bannerImages.slideshow,
      },
    })),
  setBannerSlideShow: (slideshow) =>
    set((store) => ({
      bannerImages: { slideshow, images: store.bannerImages.images },
    })),
  removeBannerImage: (image) =>
    set((store) => ({
      bannerImages: {
        slideshow: store.bannerImages.slideshow,
        images: store.bannerImages.images.filter(
          (coverImage) => image !== coverImage
        ),
      },
    })),
  removeAdditionalImages: (image) =>
    set((store) => ({
      additionalImages: store.additionalImages.filter(
        (additionalImage) => image !== additionalImage
      ),
    })),

  setAdditionalImages: (images) =>
    set((store) => ({ additionalImages: [images, ...store.additionalImages] })),
  setTitles: (title) => set((store) => ({ titles: [title, ...store.titles] })),
  setCustomLinks: (link) =>
    set((store) => ({ customLinks: [link, ...store.customLinks] })),
  setEmbedMedia: (title, value) =>
    set(() => ({ embedMedia: { title, value } })),
  setEmbedMap: (title, value) => set(() => ({ embedMap: { title, value } })),
  removeEmbedMap: () => set(() => ({ embedMap: undefined })),
  removeGoogleForm: () => set(() => ({ googleForm: undefined })),
  removeEmbedMedia: () => set(() => ({ embedMedia: undefined })),
  setGoogleForm: (title, value) =>
    set(() => ({ googleForm: { title, value } })),
  setPdf: (title, pdfFile) =>
    set((store) => ({
      pdf: {
        title: title ? title : store.pdf.title,
        pdfFile: pdfFile ? pdfFile : store.pdf.pdfFile,
      },
    })),
  removePdf: () => set(() => ({ pdf: { title: "", pdfFile: null } })),
  setTheme: (theme) => set(() => ({ theme })),
  setEnableContact: (enableContact) => set(() => ({ enableContact })),
}));

export default useUserAdditionalContent;
