import { create } from "zustand";

export type PhoneNumber = { code: string; phoneNumber: string };
export type LinkDTO = {
  id?: string;
  memberId?: string;
  title: string;
  value: string;
  isActive: boolean;
  type: string;
};

interface UserSocialsLinks {
  links: LinkDTO[];
  mobileNumber: PhoneNumber;
  whatsappNumber: PhoneNumber;
  officialEmailId: string;
  setLinks: (link: LinkDTO) => void;
  deleteLink: (link: string) => void;
  setMobileNumber: (mobileNumber: PhoneNumber) => void;
  setWhatsappNumber: (whatsappNumber: PhoneNumber) => void;
  setOfficialEmailId: (officialEmailId: string) => void;
}

const useUserLinksStore = create<UserSocialsLinks>((set) => ({
  links: [] as LinkDTO[],
  mobileNumber: {} as PhoneNumber,
  whatsappNumber: {} as PhoneNumber,
  officialEmailId: "",
  setLinks: (link) =>
    set((store) => {
      const existingLink = store.links.find((l) => l.title === link.title);
      if (existingLink) {
        existingLink.value = link.value;
      } else {
        store.links = [link, ...store.links];
      }
      return { links: store.links };
    }),
  deleteLink: (link) =>
    set((store) => ({
      links: store.links.filter((storedLink) => storedLink.type !== link),
    })),
  setMobileNumber: (mobileNumber) => set(() => ({ mobileNumber })),
  setWhatsappNumber: (whatsappNumber) => set(() => ({ whatsappNumber })),
  setOfficialEmailId: (officialEmailId) => set(() => ({ officialEmailId })),
}));

export default useUserLinksStore;
