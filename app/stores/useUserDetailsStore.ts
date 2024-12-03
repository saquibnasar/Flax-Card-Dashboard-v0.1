import { create } from "zustand";

interface UserDetails {
  name: string;
  designation: string;
  employeeId: string;
  employeeBio: string;
  companyName: string;
  profileImage: File | undefined;
  profileUrl: string;
  setName: (name: string) => void;
  setDesignation: (designation: string) => void;
  setEmployeeId: (employeeId: string) => void;
  setBio: (bio: string) => void;
  setCompanyName: (companyName: string) => void;
  setProfileImage: (profileImage: File) => void;
  setProfileUrl: (profileUrl: string) => void;
}

const useUserDetailsStore = create<UserDetails>((set) => ({
  name: "",
  designation: "",
  employeeId: "",
  companyName: "",
  profileImage: undefined,
  profileUrl: "",
  employeeBio: "",
  setName: (name) => set(() => ({ name })),
  setDesignation: (designation) => set(() => ({ designation })),
  setEmployeeId: (employeeId) => set(() => ({ employeeId })),
  setBio: (employeeBio) => set(() => ({ employeeBio })),
  setCompanyName: (companyName) => set(() => ({ companyName })),
  setProfileImage: (profileImage) => set(() => ({ profileImage })),
  setProfileUrl: (profileUrl) => set(() => ({ profileUrl })),
}));

export default useUserDetailsStore;
