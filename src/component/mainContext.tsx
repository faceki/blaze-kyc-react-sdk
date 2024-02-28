import React, { createContext, useContext } from "react";

interface theme {
  mainColor?: string;
  secondaryColor?: string;
  backgroundColor?: string;
  cardBackgroundColor?: string;
  headingTextColor?: string;
  secondaryTextColor?: string;
  secondaryBorderColor?: string;
  iconFillColor?: string;
  iconBorderColor?: string;
  iconTextColor?: string;
  logo?: string;
  disableGuidance?: boolean;
  failedText?: string;
  successText?: string;
  buttonbg?: string;
  textBg?: string;
  verificationProcessingText?: string;
  externalTermsUrl?: string;
  nextJSImages?:boolean
}

export interface clientContext {
  link: string;
  theme?: theme;
  onSuccess?: (data: any) => void;
  onFail?: (data: any) => void;
}

interface clientProvider {
  link: string;
  theme?: theme;
  children: any;
  onSuccess?: (data: any) => void;
  onFail?: (data: any) => void;
}

export const ClientContext = createContext<clientContext>({
  link: ""
});

export const useClientContext = () => useContext(ClientContext);

export const ClientProvider = ({
  children,
  link,
  theme,
  onSuccess = () => {},
  onFail = () => {},
}: clientProvider) => {
  const contextValue = {
    link,
    theme,
    onSuccess,
    onFail,
  };

  return (
    <ClientContext.Provider value={contextValue}>
      {children}
    </ClientContext.Provider>
  );
};
