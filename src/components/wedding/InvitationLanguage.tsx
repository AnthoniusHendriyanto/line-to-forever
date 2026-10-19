import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import en from "./locales/en";
import id from "./locales/id";

type Language = "en" | "id";
const InvitationLanguage = createContext({ language: "en" as Language, setLanguage: (_: Language) => {}, t: en, locale: "en-US" });

export function InvitationLanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    try { return localStorage.getItem("invitation-language") === "id" ? "id" : "en"; }
    catch { return "en"; }
  });
  useEffect(() => {
    const previous = document.documentElement.lang;
    document.documentElement.lang = language;
    try { localStorage.setItem("invitation-language", language); } catch { /* Storage is optional. */ }
    return () => { document.documentElement.lang = previous; };
  }, [language]);
  return <InvitationLanguage.Provider value={{ language, setLanguage, t: language === "id" ? id : en, locale: language === "id" ? "id-ID" : "en-US" }}>{children}</InvitationLanguage.Provider>;
}

// This context is local to the invitation; the admin interface keeps its own language.
// eslint-disable-next-line react-refresh/only-export-components
export const useInvitationLanguage = () => useContext(InvitationLanguage);

export function InvitationLanguageSwitch() {
  const { language, setLanguage, t } = useInvitationLanguage();
  return (
    <div className="invitation-language" role="group" aria-label={t.language}>
      {(["en", "id"] as const).map(value => (
        <button key={value} type="button" lang={value} aria-label={value === "en" ? "English" : "Bahasa Indonesia"} aria-pressed={language === value} onClick={() => setLanguage(value)}>{value.toUpperCase()}</button>
      ))}
    </div>
  );
}
