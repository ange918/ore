import { createContext, useContext, useState, ReactNode } from "react";

export type Lang = "fr" | "en" | "de" | "es" | "pt";

export const LANGUAGES: { code: Lang; label: string; flag: string }[] = [
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "pt", label: "Português", flag: "🇵🇹" },
];

type Translations = {
  nav: {
    compte: string;
    credit: string;
    assurance: string;
    pourquoi: string;
    faq: string;
  };
  header: {
    login: string;
    open: string;
  };
  comptes: {
    personnel: string; personnelDesc: string;
    business: string; businessDesc: string;
    carte: string; carteDesc: string;
    epargne: string; epargneDesc: string;
  };
  credits: {
    immo: string; immoDesc: string;
    perso: string; persoDesc: string;
    auto: string; autoDesc: string;
  };
  assurances: {
    vie: string; vieDesc: string;
    habitat: string; habitatDesc: string;
  };
};

const T: Record<Lang, Translations> = {
  fr: {
    nav: { compte: "Compte bancaire", credit: "Crédit Bancaire", assurance: "Assurance Partenaire", pourquoi: "Pourquoi nous", faq: "FAQ" },
    header: { login: "Connexion", open: "Ouvrir un compte" },
    comptes: {
      personnel: "Compte Personnel", personnelDesc: "L'essentiel au quotidien",
      business: "Compte Business", businessDesc: "Pour les professionnels",
      carte: "Carte Bancaire", carteDesc: "Visa & Gold internationale",
      epargne: "Compte Épargne", epargneDesc: "3,5 % / an garanti",
    },
    credits: {
      immo: "Prêt Immobilier", immoDesc: "Financez votre bien",
      perso: "Prêt Personnel", persoDesc: "Tous vos projets",
      auto: "Prêt Auto", autoDesc: "Roulez sereinement",
    },
    assurances: {
      vie: "Assurance Vie", vieDesc: "Protégez vos proches",
      habitat: "Assurance Habitat", habitatDesc: "Votre logement à 360°",
    },
  },
  en: {
    nav: { compte: "Bank Account", credit: "Bank Credit", assurance: "Partner Insurance", pourquoi: "Why us", faq: "FAQ" },
    header: { login: "Login", open: "Open an account" },
    comptes: {
      personnel: "Personal Account", personnelDesc: "Everyday essentials",
      business: "Business Account", businessDesc: "For professionals",
      carte: "Bank Card", carteDesc: "Visa & Gold international",
      epargne: "Savings Account", epargneDesc: "3.5% / year guaranteed",
    },
    credits: {
      immo: "Home Loan", immoDesc: "Finance your property",
      perso: "Personal Loan", persoDesc: "All your projects",
      auto: "Auto Loan", autoDesc: "Drive with peace of mind",
    },
    assurances: {
      vie: "Life Insurance", vieDesc: "Protect your loved ones",
      habitat: "Home Insurance", habitatDesc: "Your home covered 360°",
    },
  },
  de: {
    nav: { compte: "Bankkonto", credit: "Bankkredit", assurance: "Partnerversicherung", pourquoi: "Warum wir", faq: "FAQ" },
    header: { login: "Anmelden", open: "Konto eröffnen" },
    comptes: {
      personnel: "Privatkonto", personnelDesc: "Das Wesentliche täglich",
      business: "Geschäftskonto", businessDesc: "Für Profis",
      carte: "Bankkarte", carteDesc: "Visa & Gold international",
      epargne: "Sparkonto", epargneDesc: "3,5 % / Jahr garantiert",
    },
    credits: {
      immo: "Immobilienkredit", immoDesc: "Ihr Eigentum finanzieren",
      perso: "Privatkredit", persoDesc: "Alle Ihre Projekte",
      auto: "Autokredit", autoDesc: "Sorgenfrei fahren",
    },
    assurances: {
      vie: "Lebensversicherung", vieDesc: "Schützen Sie Ihre Lieben",
      habitat: "Wohnversicherung", habitatDesc: "Ihr Zuhause rundum",
    },
  },
  es: {
    nav: { compte: "Cuenta bancaria", credit: "Crédito bancario", assurance: "Seguro asociado", pourquoi: "Por qué nosotros", faq: "FAQ" },
    header: { login: "Iniciar sesión", open: "Abrir una cuenta" },
    comptes: {
      personnel: "Cuenta Personal", personnelDesc: "Lo esencial cada día",
      business: "Cuenta Business", businessDesc: "Para profesionales",
      carte: "Tarjeta Bancaria", carteDesc: "Visa & Gold internacional",
      epargne: "Cuenta de Ahorro", epargneDesc: "3,5 % / año garantizado",
    },
    credits: {
      immo: "Préstamo Hipotecario", immoDesc: "Financie su propiedad",
      perso: "Préstamo Personal", persoDesc: "Todos sus proyectos",
      auto: "Préstamo Auto", autoDesc: "Conduzca tranquilo",
    },
    assurances: {
      vie: "Seguro de Vida", vieDesc: "Proteja a sus seres queridos",
      habitat: "Seguro de Hogar", habitatDesc: "Su hogar cubierto 360°",
    },
  },
  pt: {
    nav: { compte: "Conta bancária", credit: "Crédito bancário", assurance: "Seguro parceiro", pourquoi: "Por que nós", faq: "FAQ" },
    header: { login: "Entrar", open: "Abrir uma conta" },
    comptes: {
      personnel: "Conta Pessoal", personnelDesc: "O essencial do dia a dia",
      business: "Conta Business", businessDesc: "Para profissionais",
      carte: "Cartão Bancário", carteDesc: "Visa & Gold internacional",
      epargne: "Conta Poupança", epargneDesc: "3,5 % / ano garantido",
    },
    credits: {
      immo: "Empréstimo Imobiliário", immoDesc: "Financie o seu imóvel",
      perso: "Empréstimo Pessoal", persoDesc: "Todos os seus projetos",
      auto: "Empréstimo Auto", autoDesc: "Dirija com tranquilidade",
    },
    assurances: {
      vie: "Seguro de Vida", vieDesc: "Proteja os seus entes queridos",
      habitat: "Seguro Habitação", habitatDesc: "A sua casa coberta 360°",
    },
  },
};

type LangCtx = { lang: Lang; t: Translations; setLang: (l: Lang) => void };
const LangContext = createContext<LangCtx>({ lang: "fr", t: T.fr, setLang: () => {} });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("fr");
  return <LangContext.Provider value={{ lang, t: T[lang], setLang }}>{children}</LangContext.Provider>;
}

export function useLang() { return useContext(LangContext); }
