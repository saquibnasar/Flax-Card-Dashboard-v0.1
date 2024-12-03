"use client";

import { useState } from "react";
import EmailForm from "./EmailForm";
import ResetPasswordForm from "./ResetPasswordForm";

export type ForgotPasswordTabType = "email" | "reset";

const ForgotPasswordTab = {
  email: EmailForm,
  reset: ResetPasswordForm,
};

const ForgotPassword = () => {
  const [selectedTab, setSelectedTab] =
    useState<ForgotPasswordTabType>("email");
  const [email, setEmail] = useState("");
  const CurrentView =
    ForgotPasswordTab[selectedTab] ?? ForgotPasswordTab["email"];
  return (
    <CurrentView
      handleSelectedTabChange={(tab) => {
        setSelectedTab(tab);
      }}
      mail={email}
      changeEmail={(email) => setEmail(email)}
    />
  );
};

export default ForgotPassword;
