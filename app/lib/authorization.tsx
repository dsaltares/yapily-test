import { createContext, PropsWithChildren, useContext, useState } from "react";

type InstitutionConsent = {
  consent: string;
  applicationUserId: string;
  userUuid: string;
  institution: string;
};

type AuthorizationContextType = {
  data: Record<string, InstitutionConsent>;
  addInstitutionConsent: (institutionConsent: InstitutionConsent) => void;
};

const AuthorizationContext = createContext<AuthorizationContextType | null>(null);

type AuthorizationProviderProps = PropsWithChildren<{
  data?: Record<string, InstitutionConsent>;
}>

export const AuthorizationProvider = ({
  data: defaultData = {},
  children
}: AuthorizationProviderProps) => {
  const [data, setData] = useState<Record<string, InstitutionConsent>>(defaultData);
  const addInstitutionConsent = (institutionConsent: InstitutionConsent) => setData({
    ...data,
    [institutionConsent.institution]: institutionConsent,
  });

  return (
    <AuthorizationContext.Provider value={{ data, addInstitutionConsent }}>
      {children}
    </AuthorizationContext.Provider>
  );
}

export const useInstitutionConsent = (institutionId: string) => {
  const context = useContext(AuthorizationContext);

  if (context === null) {
    throw new Error("useInstitutionConsent must be used within an AuthorizationProvider");
  }

  return context.data[institutionId];
};

export const useAddInstitutionConsent = () => {
  const context = useContext(AuthorizationContext);

  if (context === null) {
    throw new Error("useInstitutionConsent must be used within an AuthorizationProvider");
  }

  return context.addInstitutionConsent;
};
