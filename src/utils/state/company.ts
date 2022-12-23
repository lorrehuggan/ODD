import create from "zustand";

interface CompanyState {
  companyName: string;
  setCompanyName: (companyName: string) => void;
  companyID: string;
  setCompanyID: (companyID: string) => void;
}

const useCompany = create<CompanyState>((set) => ({
  companyName: "",
  setCompanyName: (companyName: string) => set(() => ({ companyName })),
  companyID: "",
  setCompanyID: (companyID: string) => set(() => ({ companyID })),
}));

export default useCompany;
