import { createContext, useContext, useState, ReactNode } from "react";

export type Lang = "fr" | "en" | "de" | "es" | "pt";

export const LANGUAGES: { code: Lang; label: string; flag: string }[] = [
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "pt", label: "Português", flag: "🇵🇹" },
];

type LandingCard = { titre: string; desc: string; avantages: string[] };
type LandingCreditCard = { titre: string; desc: string; tag: string };
type LandingAssuranceCard = { titre: string; desc: string; tag: string };

type Translations = {
  nav: { compte: string; credit: string; assurance: string; pourquoi: string; faq: string };
  header: { login: string; open: string };
  comptes: {
    personnel: string; personnelDesc: string;
    business: string; businessDesc: string;
    carte: string; carteDesc: string;
    epargne: string; epargneDesc: string;
  };
  credits: { immo: string; immoDesc: string; perso: string; persoDesc: string; auto: string; autoDesc: string };
  assurances: { vie: string; vieDesc: string; habitat: string; habitatDesc: string };
  landing: {
    heroTitle: string; heroSubtitle: string; heroCta: string; heroOffers: string;
    statsClients: string; statsUptime: string; statsNoFees: string; statsIso: string;
    aboutTag: string; aboutTitle: string; aboutP1: string; aboutP2: string;
    aboutStatClients: string; aboutStatUptime: string; aboutStatSupport: string;
    aboutF1Title: string; aboutF1Desc: string;
    aboutF2Title: string; aboutF2Desc: string;
    aboutF3Title: string; aboutF3Desc: string;
    aboutF4Title: string; aboutF4Desc: string;
    offresTitle: string; offresSubtitle: string;
    offresCompte: string; offresCredit: string; offresAssurance: string;
    discover: string; learnMore: string; popular: string; isNew: string;
    compteCards: [LandingCard, LandingCard, LandingCard, LandingCard];
    creditCards: [LandingCreditCard, LandingCreditCard, LandingCreditCard];
    assuranceCards: [LandingAssuranceCard, LandingAssuranceCard];
    howTitle: string;
    how1Title: string; how1Desc: string;
    how2Title: string; how2Desc: string;
    how3Title: string; how3Desc: string;
    whyTag: string; whyTitle: string; whySubtitle: string;
    why1Title: string; why1Desc: string;
    why2Title: string; why2Desc: string;
    why3Title: string; why3Desc: string;
    why4Title: string; why4Desc: string;
    whyBannerTitle: string; whyBannerDesc: string; whyBannerBtn: string;
    testimonialsTag: string; testimonialsTitle: string;
    testimonials: Array<{ name: string; role: string; text: string; initials: string }>;
    faqTag: string; faqTitle: string;
    faqs: Array<{ question: string; answer: string }>;
    faqNoAnswer: string; faqContact: string;
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
    credits: { immo: "Prêt Immobilier", immoDesc: "Financez votre bien", perso: "Prêt Personnel", persoDesc: "Tous vos projets", auto: "Prêt Auto", autoDesc: "Roulez sereinement" },
    assurances: { vie: "Assurance Vie", vieDesc: "Protégez vos proches", habitat: "Assurance Habitat", habitatDesc: "Votre logement à 360°" },
    landing: {
      heroTitle: "La banque qui vous fait confiance",
      heroSubtitle: "Ouvrez votre compte en 3 minutes et bénéficiez d'un accès immédiat à tous nos services bancaires, 100 % en ligne.",
      heroCta: "Commencer maintenant",
      heroOffers: "Voir nos offres",
      statsClients: "Clients actifs",
      statsUptime: "Disponibilité garantie",
      statsNoFees: "Frais cachés",
      statsIso: "Certifié ISO 27001",
      aboutTag: "À propos de nous",
      aboutTitle: "Une banque digitale pensée pour vous",
      aboutP1: "NELLOA BANK est née d'une conviction simple : la banque doit s'adapter à votre vie, pas l'inverse. Fini les agences fermées le week-end, les formulaires papier et les frais opaques. Avec nous, tout se fait en ligne, en toute transparence.",
      aboutP2: "Fondée par des experts de la finance et de la technologie, NELLOA BANK accompagne des milliers de clients dans la gestion de leurs comptes, crédits et assurances — avec une équipe support disponible 7 jours sur 7.",
      aboutStatClients: "Clients actifs",
      aboutStatUptime: "Disponibilité",
      aboutStatSupport: "Support client",
      aboutF1Title: "Sécurité maximale", aboutF1Desc: "Chiffrement SSL 256 bits et authentification à deux facteurs pour protéger vos données.",
      aboutF2Title: "Ouverture en 3 min", aboutF2Desc: "Aucun rendez-vous nécessaire. Ouvrez votre compte 100 % en ligne, à toute heure.",
      aboutF3Title: "Support 7j/7", aboutF3Desc: "Une équipe dédiée disponible chaque jour pour répondre à toutes vos questions.",
      aboutF4Title: "Partout dans le monde", aboutF4Desc: "Virements internationaux et carte acceptée dans plus de 150 pays.",
      offresTitle: "Nos Produits & Services",
      offresSubtitle: "Des solutions bancaires complètes adaptées à chaque besoin.",
      offresCompte: "Compte Bancaire",
      offresCredit: "Crédit Bancaire",
      offresAssurance: "Assurance Partenaire",
      discover: "Découvrir l'offre",
      learnMore: "En savoir plus →",
      popular: "Populaire",
      isNew: "Nouveau",
      compteCards: [
        { titre: "Compte Personnel", desc: "L'essentiel pour vos dépenses quotidiennes.", avantages: ["IBAN personnel", "Carte virtuelle", "Suivi des dépenses"] },
        { titre: "Compte Business", desc: "Pour les entrepreneurs et professionnels.", avantages: ["Virements illimités", "Domiciliation bancaire", "Tableau de bord"] },
        { titre: "Carte Bancaire", desc: "Visa classique ou Gold internationale.", avantages: ["Paiement sans contact", "Cashback 2 %", "Assurance voyage"] },
        { titre: "Compte Épargne", desc: "Faites fructifier votre argent à 3,5 % / an.", avantages: ["Taux 3,5 % / an", "Intérêts mensuels", "Objectifs auto"] },
      ],
      creditCards: [
        { titre: "Prêt Immobilier", desc: "Financez l'acquisition de votre bien immobilier.", tag: "Dès 2,8 % annuel" },
        { titre: "Prêt Personnel", desc: "Tous vos projets financés rapidement, sans justificatif.", tag: "Réponse sous 24h" },
        { titre: "Prêt Auto", desc: "Roulez maintenant, payez sereinement en mensualités fixes.", tag: "Jusqu'à 80 000 €" },
      ],
      assuranceCards: [
        { titre: "Assurance Vie", desc: "Préparez l'avenir et protégez vos proches avec un placement à long terme avantageux.", tag: "Capital garanti" },
        { titre: "Assurance Habitat", desc: "Couvrez votre logement contre tous les risques : incendie, dégât des eaux, vol.", tag: "Attestation immédiate" },
      ],
      howTitle: "Comment ça marche ?",
      how1Title: "Je crée mon compte", how1Desc: "Remplissez le formulaire en 2 minutes depuis n'importe quel appareil.",
      how2Title: "Je vérifie mon identité", how2Desc: "Déposez votre pièce d'identité en toute sécurité. Validation sous 24 à 48h.",
      how3Title: "J'active mon compte", how3Desc: "Notre équipe valide votre dossier et active votre compte sous 24 à 48h.",
      whyTag: "Notre différence",
      whyTitle: "Pourquoi choisir NELLOA BANK ?",
      whySubtitle: "Une banque 100 % digitale, pensée pour vous simplifier la vie.",
      why1Title: "Sécurité bancaire", why1Desc: "Chiffrement SSL 256 bits, authentification à deux facteurs et surveillance 24h/24.",
      why2Title: "Ouverture en 3 min", why2Desc: "Fini les rendez-vous en agence. Ouvrez votre compte entièrement en ligne, à toute heure.",
      why3Title: "Support 7j/7", why3Desc: "Notre équipe est disponible tous les jours pour répondre à vos questions.",
      why4Title: "Utilisable partout", why4Desc: "Virements internationaux, carte acceptée dans le monde entier.",
      whyBannerTitle: "Rejoignez des milliers de clients satisfaits",
      whyBannerDesc: "Ouvrez votre compte aujourd'hui et accédez immédiatement à tous nos services bancaires en ligne.",
      whyBannerBtn: "Ouvrir mon compte gratuitement",
      testimonialsTag: "Ils nous font confiance",
      testimonialsTitle: "Ce que disent nos clients",
      testimonials: [
        { name: "Amara Diallo", role: "Entrepreneur", text: "NELLOA BANK a transformé ma façon de gérer mes finances. L'ouverture de compte a été ultra rapide et le service client est excellent. Je recommande !", initials: "AD" },
        { name: "Sophie Martin", role: "Freelance Designer", text: "Le tableau de bord est clair et intuitif. Fini les frais cachés, fini les longues attentes. Mon compte courant NELLOA m'a simplifié la vie au quotidien.", initials: "SM" },
        { name: "Kouassi Bamba", role: "Responsable commercial", text: "Le compte Premium vaut vraiment son nom. Mon conseiller dédié répond en moins d'une heure et le cashback 2 % m'a fait économiser plusieurs centaines d'euros.", initials: "KB" },
      ],
      faqTag: "Questions fréquentes",
      faqTitle: "Tout ce que vous devez savoir",
      faqs: [
        { question: "Combien de temps faut-il pour ouvrir un compte ?", answer: "L'ouverture de votre compte prend moins de 3 minutes. Remplissez le formulaire en ligne, déposez votre pièce d'identité, et notre équipe active votre compte sous 24 à 48h." },
        { question: "Combien de temps pour activer mon compte ?", answer: "Votre compte est activé sous 24 à 48h après vérification de votre dossier par notre équipe." },
        { question: "Quels documents sont nécessaires pour la vérification d'identité ?", answer: "Nous acceptons les cartes nationales d'identité, passeports et titres de séjour en cours de validité. Les fichiers acceptés sont JPG, PNG et PDF (max 10 Mo)." },
        { question: "Mon argent est-il en sécurité chez NELLOA BANK ?", answer: "Oui, absolument. NELLOA BANK utilise un chiffrement bancaire de niveau militaire (SSL 256 bits) et une authentification à deux facteurs pour protéger votre compte." },
        { question: "Puis-je changer de type de compte après l'ouverture ?", answer: "Oui. Vous pouvez faire une demande de changement de formule depuis votre espace client ou en contactant notre service client. La transition se fait sans interruption de service." },
        { question: "Comment fonctionne le Compte Épargne ?", answer: "Le Compte Épargne NELLOA BANK rapporte 3,5 % d'intérêts par an, crédités chaque mois. Vous pouvez programmer des virements automatiques et définir des objectifs personnalisés. Le taux préférentiel est garanti 1 an." },
      ],
      faqNoAnswer: "Vous n'avez pas trouvé votre réponse ?",
      faqContact: "Contacter le support",
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
    credits: { immo: "Home Loan", immoDesc: "Finance your property", perso: "Personal Loan", persoDesc: "All your projects", auto: "Auto Loan", autoDesc: "Drive with peace of mind" },
    assurances: { vie: "Life Insurance", vieDesc: "Protect your loved ones", habitat: "Home Insurance", habitatDesc: "Your home covered 360°" },
    landing: {
      heroTitle: "The bank that trusts you",
      heroSubtitle: "Open your account in 3 minutes and get immediate access to all our banking services, 100% online.",
      heroCta: "Get started",
      heroOffers: "See our offers",
      statsClients: "Active clients",
      statsUptime: "Guaranteed uptime",
      statsNoFees: "Hidden fees",
      statsIso: "ISO 27001 certified",
      aboutTag: "About us",
      aboutTitle: "A digital bank designed for you",
      aboutP1: "NELLOA BANK was born from a simple belief: banking should adapt to your life, not the other way around. No more weekend closures, paper forms, or hidden fees. With us, everything is done online, with full transparency.",
      aboutP2: "Founded by finance and technology experts, NELLOA BANK supports thousands of clients in managing their accounts, loans, and insurance — with a support team available 7 days a week.",
      aboutStatClients: "Active clients",
      aboutStatUptime: "Uptime",
      aboutStatSupport: "Customer support",
      aboutF1Title: "Maximum security", aboutF1Desc: "256-bit SSL encryption and two-factor authentication to protect your data.",
      aboutF2Title: "Open in 3 min", aboutF2Desc: "No appointment needed. Open your account 100% online, anytime.",
      aboutF3Title: "Support 7 days/7", aboutF3Desc: "A dedicated team available every day to answer all your questions.",
      aboutF4Title: "Anywhere in the world", aboutF4Desc: "International transfers and card accepted in over 150 countries.",
      offresTitle: "Our Products & Services",
      offresSubtitle: "Complete banking solutions tailored to every need.",
      offresCompte: "Bank Account",
      offresCredit: "Bank Credit",
      offresAssurance: "Partner Insurance",
      discover: "Discover the offer",
      learnMore: "Learn more →",
      popular: "Popular",
      isNew: "New",
      compteCards: [
        { titre: "Personal Account", desc: "The essentials for your daily expenses.", avantages: ["Personal IBAN", "Virtual card", "Expense tracking"] },
        { titre: "Business Account", desc: "For entrepreneurs and professionals.", avantages: ["Unlimited transfers", "Bank domiciliation", "Dashboard"] },
        { titre: "Bank Card", desc: "Classic Visa or international Gold.", avantages: ["Contactless payment", "2% cashback", "Travel insurance"] },
        { titre: "Savings Account", desc: "Grow your money at 3.5% / year.", avantages: ["3.5% / year rate", "Monthly interest", "Auto goals"] },
      ],
      creditCards: [
        { titre: "Home Loan", desc: "Finance the acquisition of your property.", tag: "From 2.8% annual" },
        { titre: "Personal Loan", desc: "All your projects funded quickly, no paperwork.", tag: "Response within 24h" },
        { titre: "Auto Loan", desc: "Drive now, pay calmly with fixed monthly payments.", tag: "Up to €80,000" },
      ],
      assuranceCards: [
        { titre: "Life Insurance", desc: "Prepare the future and protect your loved ones with an advantageous long-term investment.", tag: "Guaranteed capital" },
        { titre: "Home Insurance", desc: "Cover your home against all risks: fire, water damage, theft.", tag: "Immediate certificate" },
      ],
      howTitle: "How does it work?",
      how1Title: "I create my account", how1Desc: "Fill out the form in 2 minutes from any device.",
      how2Title: "I verify my identity", how2Desc: "Submit your ID securely. Validated within 24 to 48 hours.",
      how3Title: "I activate my account", how3Desc: "Our team validates your application and activates your account within 24 to 48 hours.",
      whyTag: "Our difference",
      whyTitle: "Why choose NELLOA BANK?",
      whySubtitle: "A 100% digital bank designed to simplify your life.",
      why1Title: "Banking security", why1Desc: "256-bit SSL encryption, two-factor authentication and 24/7 monitoring.",
      why2Title: "Open in 3 min", why2Desc: "No more branch appointments. Open your account entirely online, anytime.",
      why3Title: "Support 7 days/7", why3Desc: "Our team is available every day to answer your questions.",
      why4Title: "Usable everywhere", why4Desc: "International transfers, card accepted worldwide.",
      whyBannerTitle: "Join thousands of satisfied customers",
      whyBannerDesc: "Open your account today and immediately access all our online banking services.",
      whyBannerBtn: "Open my account for free",
      testimonialsTag: "They trust us",
      testimonialsTitle: "What our clients say",
      testimonials: [
        { name: "Amara Diallo", role: "Entrepreneur", text: "NELLOA BANK transformed the way I manage my finances. Account opening was lightning fast and customer service is excellent. Highly recommend!", initials: "AD" },
        { name: "Sophie Martin", role: "Freelance Designer", text: "The dashboard is clear and intuitive. No more hidden fees, no more long waits. My NELLOA current account has simplified my daily life.", initials: "SM" },
        { name: "Kouassi Bamba", role: "Sales Manager", text: "The Premium account truly lives up to its name. My dedicated advisor responds in under an hour and the 2% cashback has saved me hundreds of euros.", initials: "KB" },
      ],
      faqTag: "Frequently asked questions",
      faqTitle: "Everything you need to know",
      faqs: [
        { question: "How long does it take to open an account?", answer: "Opening your account takes less than 3 minutes. Fill out the online form, submit your ID, and our team activates your account within 24 to 48 hours." },
        { question: "How long to activate my account?", answer: "Your account is activated within 24 to 48 hours after verification of your file by our team." },
        { question: "What documents are needed for identity verification?", answer: "We accept national identity cards, passports and valid residence permits. Accepted files are JPG, PNG and PDF (max 10 MB)." },
        { question: "Is my money safe at NELLOA BANK?", answer: "Yes, absolutely. NELLOA BANK uses military-grade banking encryption (256-bit SSL) and two-factor authentication to protect your account." },
        { question: "Can I change account type after opening?", answer: "Yes. You can request a plan change from your client area or by contacting our customer service. The transition is made without service interruption." },
        { question: "How does the Savings Account work?", answer: "The NELLOA BANK Savings Account earns 3.5% interest per year, credited each month. You can schedule automatic transfers and set personalized goals. The preferential rate is guaranteed for 1 year." },
      ],
      faqNoAnswer: "Didn't find your answer?",
      faqContact: "Contact support",
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
    credits: { immo: "Immobilienkredit", immoDesc: "Ihr Eigentum finanzieren", perso: "Privatkredit", persoDesc: "Alle Ihre Projekte", auto: "Autokredit", autoDesc: "Sorgenfrei fahren" },
    assurances: { vie: "Lebensversicherung", vieDesc: "Schützen Sie Ihre Lieben", habitat: "Wohnversicherung", habitatDesc: "Ihr Zuhause rundum" },
    landing: {
      heroTitle: "Die Bank, die Ihnen vertraut",
      heroSubtitle: "Eröffnen Sie Ihr Konto in 3 Minuten und erhalten Sie sofortigen Zugang zu allen unseren Bankdienstleistungen, 100 % online.",
      heroCta: "Jetzt starten",
      heroOffers: "Unsere Angebote",
      statsClients: "Aktive Kunden",
      statsUptime: "Garantierte Verfügbarkeit",
      statsNoFees: "Versteckte Gebühren",
      statsIso: "ISO 27001 zertifiziert",
      aboutTag: "Über uns",
      aboutTitle: "Eine digitale Bank für Sie entwickelt",
      aboutP1: "NELLOA BANK entstand aus einer einfachen Überzeugung: Banking soll sich Ihrem Leben anpassen, nicht umgekehrt. Keine geschlossenen Filialen am Wochenende, keine Papierformulare, keine versteckten Gebühren. Bei uns läuft alles online – transparent und einfach.",
      aboutP2: "Gegründet von Finanz- und Technologieexperten begleitet NELLOA BANK Tausende von Kunden bei der Verwaltung ihrer Konten, Kredite und Versicherungen — mit einem Support-Team, das 7 Tage die Woche verfügbar ist.",
      aboutStatClients: "Aktive Kunden",
      aboutStatUptime: "Verfügbarkeit",
      aboutStatSupport: "Kundensupport",
      aboutF1Title: "Maximale Sicherheit", aboutF1Desc: "256-Bit-SSL-Verschlüsselung und Zwei-Faktor-Authentifizierung zum Schutz Ihrer Daten.",
      aboutF2Title: "Eröffnung in 3 Min.", aboutF2Desc: "Kein Termin nötig. Eröffnen Sie Ihr Konto 100 % online, jederzeit.",
      aboutF3Title: "Support 7 Tage/Woche", aboutF3Desc: "Ein engagiertes Team steht Ihnen jeden Tag für alle Ihre Fragen zur Verfügung.",
      aboutF4Title: "Überall auf der Welt", aboutF4Desc: "Internationale Überweisungen und Karte in über 150 Ländern akzeptiert.",
      offresTitle: "Unsere Produkte & Dienstleistungen",
      offresSubtitle: "Vollständige Banklösungen für jeden Bedarf.",
      offresCompte: "Bankkonto",
      offresCredit: "Bankkredit",
      offresAssurance: "Partnerversicherung",
      discover: "Angebot entdecken",
      learnMore: "Mehr erfahren →",
      popular: "Beliebt",
      isNew: "Neu",
      compteCards: [
        { titre: "Privatkonto", desc: "Das Wesentliche für Ihre täglichen Ausgaben.", avantages: ["Persönliche IBAN", "Virtuelle Karte", "Ausgabenübersicht"] },
        { titre: "Geschäftskonto", desc: "Für Unternehmer und Freiberufler.", avantages: ["Unbegrenzte Überweisungen", "Bankdomizilierung", "Dashboard"] },
        { titre: "Bankkarte", desc: "Klassische Visa oder internationale Gold-Karte.", avantages: ["Kontaktloses Bezahlen", "2 % Cashback", "Reiseversicherung"] },
        { titre: "Sparkonto", desc: "Lassen Sie Ihr Geld mit 3,5 % / Jahr wachsen.", avantages: ["Zinssatz 3,5 % / Jahr", "Monatliche Zinsen", "Auto-Sparziele"] },
      ],
      creditCards: [
        { titre: "Immobilienkredit", desc: "Finanzieren Sie den Kauf Ihrer Immobilie.", tag: "Ab 2,8 % p.a." },
        { titre: "Privatkredit", desc: "Alle Ihre Projekte schnell finanziert, ohne Nachweise.", tag: "Antwort in 24 Std." },
        { titre: "Autokredit", desc: "Jetzt fahren, sorgenfrei in festen Raten zahlen.", tag: "Bis zu 80.000 €" },
      ],
      assuranceCards: [
        { titre: "Lebensversicherung", desc: "Bereiten Sie die Zukunft vor und schützen Sie Ihre Liebsten mit einer langfristigen Anlage.", tag: "Garantiertes Kapital" },
        { titre: "Wohnversicherung", desc: "Schützen Sie Ihr Zuhause gegen alle Risiken: Brand, Wasserschaden, Diebstahl.", tag: "Sofortige Bescheinigung" },
      ],
      howTitle: "Wie funktioniert es?",
      how1Title: "Ich erstelle mein Konto", how1Desc: "Füllen Sie das Formular in 2 Minuten von jedem Gerät aus aus.",
      how2Title: "Ich verifiziere meine Identität", how2Desc: "Laden Sie Ihren Ausweis sicher hoch. Validierung innerhalb von 24 bis 48 Stunden.",
      how3Title: "Ich aktiviere mein Konto", how3Desc: "Unser Team prüft Ihren Antrag und aktiviert Ihr Konto innerhalb von 24 bis 48 Stunden.",
      whyTag: "Unser Unterschied",
      whyTitle: "Warum NELLOA BANK wählen?",
      whySubtitle: "Eine 100 % digitale Bank, die Ihr Leben vereinfacht.",
      why1Title: "Bankensicherheit", why1Desc: "256-Bit-SSL, Zwei-Faktor-Authentifizierung und 24/7-Überwachung.",
      why2Title: "Eröffnung in 3 Min.", why2Desc: "Keine Filialtermine mehr. Eröffnen Sie Ihr Konto vollständig online, jederzeit.",
      why3Title: "Support 7 Tage/Woche", why3Desc: "Unser Team ist jeden Tag erreichbar.",
      why4Title: "Überall nutzbar", why4Desc: "Internationale Überweisungen, Karte weltweit akzeptiert.",
      whyBannerTitle: "Schließen Sie sich Tausenden zufriedener Kunden an",
      whyBannerDesc: "Eröffnen Sie heute Ihr Konto und erhalten Sie sofortigen Zugang zu all unseren Online-Bankdiensten.",
      whyBannerBtn: "Mein Konto kostenlos eröffnen",
      testimonialsTag: "Sie vertrauen uns",
      testimonialsTitle: "Was unsere Kunden sagen",
      testimonials: [
        { name: "Amara Diallo", role: "Unternehmer", text: "NELLOA BANK hat mein Finanzmanagement grundlegend verändert. Die Kontoeröffnung war blitzschnell und der Kundenservice ist ausgezeichnet. Sehr empfehlenswert!", initials: "AD" },
        { name: "Sophie Martin", role: "Freelance Designerin", text: "Das Dashboard ist übersichtlich und intuitiv. Keine versteckten Gebühren mehr, keine langen Wartezeiten. Mein NELLOA-Konto hat meinen Alltag vereinfacht.", initials: "SM" },
        { name: "Kouassi Bamba", role: "Vertriebsleiter", text: "Das Premium-Konto hält wirklich, was es verspricht. Mein persönlicher Berater antwortet in unter einer Stunde und der 2 % Cashback hat mir bereits hunderte Euro gespart.", initials: "KB" },
      ],
      faqTag: "Häufige Fragen",
      faqTitle: "Alles, was Sie wissen müssen",
      faqs: [
        { question: "Wie lange dauert die Kontoeröffnung?", answer: "Die Eröffnung Ihres Kontos dauert weniger als 3 Minuten. Füllen Sie das Online-Formular aus, laden Sie Ihren Ausweis hoch, und unser Team aktiviert Ihr Konto innerhalb von 24 bis 48 Stunden." },
        { question: "Wie lange bis zur Aktivierung meines Kontos?", answer: "Ihr Konto wird innerhalb von 24 bis 48 Stunden nach Prüfung Ihrer Unterlagen aktiviert." },
        { question: "Welche Dokumente werden für die Identitätsprüfung benötigt?", answer: "Wir akzeptieren nationale Personalausweise, Reisepässe und gültige Aufenthaltstitel. Akzeptierte Formate: JPG, PNG und PDF (max. 10 MB)." },
        { question: "Ist mein Geld bei NELLOA BANK sicher?", answer: "Ja, absolut. NELLOA BANK verwendet militärgrade Verschlüsselung (SSL 256 Bit) und Zwei-Faktor-Authentifizierung zum Schutz Ihres Kontos." },
        { question: "Kann ich den Kontotyp nach der Eröffnung wechseln?", answer: "Ja. Sie können eine Änderung des Tarifs in Ihrem Kundenbereich oder über unseren Kundenservice beantragen. Der Wechsel erfolgt ohne Dienstunterbrechung." },
        { question: "Wie funktioniert das Sparkonto?", answer: "Das NELLOA BANK Sparkonto bringt 3,5 % Zinsen pro Jahr, die monatlich gutgeschrieben werden. Sie können automatische Überweisungen einrichten und persönliche Sparziele festlegen. Der Vorzugszins ist 1 Jahr garantiert." },
      ],
      faqNoAnswer: "Haben Sie Ihre Antwort nicht gefunden?",
      faqContact: "Support kontaktieren",
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
    credits: { immo: "Préstamo Hipotecario", immoDesc: "Financie su propiedad", perso: "Préstamo Personal", persoDesc: "Todos sus proyectos", auto: "Préstamo Auto", autoDesc: "Conduzca tranquilo" },
    assurances: { vie: "Seguro de Vida", vieDesc: "Proteja a sus seres queridos", habitat: "Seguro de Hogar", habitatDesc: "Su hogar cubierto 360°" },
    landing: {
      heroTitle: "El banco que confía en usted",
      heroSubtitle: "Abra su cuenta en 3 minutos y acceda de forma inmediata a todos nuestros servicios bancarios, 100 % en línea.",
      heroCta: "Empezar ahora",
      heroOffers: "Ver nuestras ofertas",
      statsClients: "Clientes activos",
      statsUptime: "Disponibilidad garantizada",
      statsNoFees: "Comisiones ocultas",
      statsIso: "Certificado ISO 27001",
      aboutTag: "Sobre nosotros",
      aboutTitle: "Un banco digital pensado para usted",
      aboutP1: "NELLOA BANK nació de una convicción sencilla: el banco debe adaptarse a su vida, no al revés. Sin sucursales cerradas los fines de semana, sin formularios en papel ni comisiones opacas. Con nosotros, todo se hace en línea, con total transparencia.",
      aboutP2: "Fundado por expertos en finanzas y tecnología, NELLOA BANK acompaña a miles de clientes en la gestión de sus cuentas, créditos y seguros — con un equipo de soporte disponible los 7 días de la semana.",
      aboutStatClients: "Clientes activos",
      aboutStatUptime: "Disponibilidad",
      aboutStatSupport: "Atención al cliente",
      aboutF1Title: "Seguridad máxima", aboutF1Desc: "Cifrado SSL de 256 bits y autenticación de dos factores para proteger sus datos.",
      aboutF2Title: "Apertura en 3 min", aboutF2Desc: "Sin cita previa. Abra su cuenta 100 % en línea, a cualquier hora.",
      aboutF3Title: "Soporte 7 días/7", aboutF3Desc: "Un equipo dedicado disponible cada día para responder todas sus preguntas.",
      aboutF4Title: "En todo el mundo", aboutF4Desc: "Transferencias internacionales y tarjeta aceptada en más de 150 países.",
      offresTitle: "Nuestros Productos y Servicios",
      offresSubtitle: "Soluciones bancarias completas adaptadas a cada necesidad.",
      offresCompte: "Cuenta Bancaria",
      offresCredit: "Crédito Bancario",
      offresAssurance: "Seguro Asociado",
      discover: "Descubrir la oferta",
      learnMore: "Saber más →",
      popular: "Popular",
      isNew: "Nuevo",
      compteCards: [
        { titre: "Cuenta Personal", desc: "Lo esencial para sus gastos diarios.", avantages: ["IBAN personal", "Tarjeta virtual", "Seguimiento de gastos"] },
        { titre: "Cuenta Business", desc: "Para emprendedores y profesionales.", avantages: ["Transferencias ilimitadas", "Domiciliación bancaria", "Panel de control"] },
        { titre: "Tarjeta Bancaria", desc: "Visa clásica o Gold internacional.", avantages: ["Pago sin contacto", "Cashback 2 %", "Seguro de viaje"] },
        { titre: "Cuenta de Ahorro", desc: "Haga crecer su dinero al 3,5 % / año.", avantages: ["Tasa 3,5 % / año", "Intereses mensuales", "Objetivos automáticos"] },
      ],
      creditCards: [
        { titre: "Préstamo Hipotecario", desc: "Financie la adquisición de su propiedad.", tag: "Desde 2,8 % anual" },
        { titre: "Préstamo Personal", desc: "Todos sus proyectos financiados rápidamente, sin justificante.", tag: "Respuesta en 24h" },
        { titre: "Préstamo Auto", desc: "Conduzca ahora, pague tranquilo con cuotas fijas.", tag: "Hasta 80 000 €" },
      ],
      assuranceCards: [
        { titre: "Seguro de Vida", desc: "Prepare el futuro y proteja a sus seres queridos con una inversión a largo plazo ventajosa.", tag: "Capital garantizado" },
        { titre: "Seguro de Hogar", desc: "Cubra su vivienda contra todos los riesgos: incendio, daños por agua, robo.", tag: "Certificado inmediato" },
      ],
      howTitle: "¿Cómo funciona?",
      how1Title: "Creo mi cuenta", how1Desc: "Complete el formulario en 2 minutos desde cualquier dispositivo.",
      how2Title: "Verifico mi identidad", how2Desc: "Suba su documento de identidad de forma segura. Validación en 24 a 48 horas.",
      how3Title: "Activo mi cuenta", how3Desc: "Nuestro equipo valida su solicitud y activa su cuenta en 24 a 48 horas.",
      whyTag: "Nuestra diferencia",
      whyTitle: "¿Por qué elegir NELLOA BANK?",
      whySubtitle: "Un banco 100 % digital pensado para simplificar su vida.",
      why1Title: "Seguridad bancaria", why1Desc: "Cifrado SSL 256 bits, autenticación de dos factores y vigilancia 24/7.",
      why2Title: "Apertura en 3 min", why2Desc: "Sin más citas en sucursal. Abra su cuenta completamente en línea, a cualquier hora.",
      why3Title: "Soporte 7 días/7", why3Desc: "Nuestro equipo está disponible todos los días para responder sus preguntas.",
      why4Title: "Usable en cualquier lugar", why4Desc: "Transferencias internacionales, tarjeta aceptada en todo el mundo.",
      whyBannerTitle: "Únase a miles de clientes satisfechos",
      whyBannerDesc: "Abra su cuenta hoy y acceda de inmediato a todos nuestros servicios bancarios en línea.",
      whyBannerBtn: "Abrir mi cuenta gratis",
      testimonialsTag: "Confían en nosotros",
      testimonialsTitle: "Lo que dicen nuestros clientes",
      testimonials: [
        { name: "Amara Diallo", role: "Emprendedor", text: "NELLOA BANK transformó mi forma de gestionar mis finanzas. La apertura de la cuenta fue ultrarrápida y el servicio al cliente es excelente. ¡Lo recomiendo!", initials: "AD" },
        { name: "Sophie Martin", role: "Diseñadora Freelance", text: "El panel de control es claro e intuitivo. Sin más comisiones ocultas ni largas esperas. Mi cuenta NELLOA ha simplificado mi vida cotidiana.", initials: "SM" },
        { name: "Kouassi Bamba", role: "Responsable Comercial", text: "La cuenta Premium realmente merece su nombre. Mi asesor dedicado responde en menos de una hora y el cashback del 2 % me ha hecho ahorrar varios cientos de euros.", initials: "KB" },
      ],
      faqTag: "Preguntas frecuentes",
      faqTitle: "Todo lo que necesita saber",
      faqs: [
        { question: "¿Cuánto tiempo se tarda en abrir una cuenta?", answer: "Abrir su cuenta tarda menos de 3 minutos. Rellene el formulario en línea, envíe su documento de identidad y nuestro equipo activará su cuenta en 24 a 48 horas." },
        { question: "¿Cuánto tiempo para activar mi cuenta?", answer: "Su cuenta se activa en 24 a 48 horas tras la verificación de su expediente por nuestro equipo." },
        { question: "¿Qué documentos se necesitan para la verificación de identidad?", answer: "Aceptamos DNI, pasaportes y permisos de residencia en vigor. Los formatos aceptados son JPG, PNG y PDF (máx. 10 MB)." },
        { question: "¿Está mi dinero seguro en NELLOA BANK?", answer: "Sí, absolutamente. NELLOA BANK utiliza cifrado bancario de nivel militar (SSL 256 bits) y autenticación de dos factores para proteger su cuenta." },
        { question: "¿Puedo cambiar el tipo de cuenta después de abrirla?", answer: "Sí. Puede solicitar un cambio de plan desde su área de cliente o contactando con nuestro servicio de atención al cliente. La transición se realiza sin interrupción del servicio." },
        { question: "¿Cómo funciona la Cuenta de Ahorro?", answer: "La Cuenta de Ahorro NELLOA BANK genera un 3,5 % de interés anual, acreditado cada mes. Puede programar transferencias automáticas y establecer objetivos personalizados. La tasa preferencial está garantizada 1 año." },
      ],
      faqNoAnswer: "¿No encontró su respuesta?",
      faqContact: "Contactar soporte",
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
    credits: { immo: "Empréstimo Imobiliário", immoDesc: "Financie o seu imóvel", perso: "Empréstimo Pessoal", persoDesc: "Todos os seus projetos", auto: "Empréstimo Auto", autoDesc: "Dirija com tranquilidade" },
    assurances: { vie: "Seguro de Vida", vieDesc: "Proteja os seus entes queridos", habitat: "Seguro Habitação", habitatDesc: "A sua casa coberta 360°" },
    landing: {
      heroTitle: "O banco que confia em você",
      heroSubtitle: "Abra sua conta em 3 minutos e tenha acesso imediato a todos os nossos serviços bancários, 100 % online.",
      heroCta: "Começar agora",
      heroOffers: "Ver nossas ofertas",
      statsClients: "Clientes ativos",
      statsUptime: "Disponibilidade garantida",
      statsNoFees: "Taxas ocultas",
      statsIso: "Certificado ISO 27001",
      aboutTag: "Sobre nós",
      aboutTitle: "Um banco digital pensado para você",
      aboutP1: "O NELLOA BANK nasceu de uma convicção simples: o banco deve se adaptar à sua vida, não o contrário. Chega de agências fechadas no fim de semana, formulários em papel e taxas opacas. Conosco, tudo é feito online, com total transparência.",
      aboutP2: "Fundado por especialistas em finanças e tecnologia, o NELLOA BANK acompanha milhares de clientes na gestão de suas contas, créditos e seguros — com uma equipa de suporte disponível 7 dias por semana.",
      aboutStatClients: "Clientes ativos",
      aboutStatUptime: "Disponibilidade",
      aboutStatSupport: "Suporte ao cliente",
      aboutF1Title: "Segurança máxima", aboutF1Desc: "Criptografia SSL de 256 bits e autenticação de dois fatores para proteger os seus dados.",
      aboutF2Title: "Abertura em 3 min", aboutF2Desc: "Sem necessidade de marcação. Abra a sua conta 100 % online, a qualquer hora.",
      aboutF3Title: "Suporte 7 dias/7", aboutF3Desc: "Uma equipa dedicada disponível todos os dias para responder a todas as suas perguntas.",
      aboutF4Title: "Em todo o mundo", aboutF4Desc: "Transferências internacionais e cartão aceite em mais de 150 países.",
      offresTitle: "Os Nossos Produtos e Serviços",
      offresSubtitle: "Soluções bancárias completas adaptadas a cada necessidade.",
      offresCompte: "Conta Bancária",
      offresCredit: "Crédito Bancário",
      offresAssurance: "Seguro Parceiro",
      discover: "Descobrir a oferta",
      learnMore: "Saber mais →",
      popular: "Popular",
      isNew: "Novo",
      compteCards: [
        { titre: "Conta Pessoal", desc: "O essencial para as suas despesas diárias.", avantages: ["IBAN pessoal", "Cartão virtual", "Controlo de despesas"] },
        { titre: "Conta Business", desc: "Para empreendedores e profissionais.", avantages: ["Transferências ilimitadas", "Domiciliação bancária", "Painel de controlo"] },
        { titre: "Cartão Bancário", desc: "Visa clássico ou Gold internacional.", avantages: ["Pagamento sem contacto", "Cashback 2 %", "Seguro de viagem"] },
        { titre: "Conta Poupança", desc: "Faça crescer o seu dinheiro a 3,5 % / ano.", avantages: ["Taxa 3,5 % / ano", "Juros mensais", "Objetivos automáticos"] },
      ],
      creditCards: [
        { titre: "Empréstimo Imobiliário", desc: "Financie a aquisição do seu imóvel.", tag: "A partir de 2,8 % ao ano" },
        { titre: "Empréstimo Pessoal", desc: "Todos os seus projetos financiados rapidamente, sem justificativo.", tag: "Resposta em 24h" },
        { titre: "Empréstimo Auto", desc: "Dirija agora, pague tranquilamente em prestações fixas.", tag: "Até 80 000 €" },
      ],
      assuranceCards: [
        { titre: "Seguro de Vida", desc: "Prepare o futuro e proteja os seus entes queridos com um investimento de longo prazo vantajoso.", tag: "Capital garantido" },
        { titre: "Seguro Habitação", desc: "Cubra a sua habitação contra todos os riscos: incêndio, danos por água, roubo.", tag: "Certificado imediato" },
      ],
      howTitle: "Como funciona?",
      how1Title: "Crio a minha conta", how1Desc: "Preencha o formulário em 2 minutos a partir de qualquer dispositivo.",
      how2Title: "Verifico a minha identidade", how2Desc: "Envie o seu documento de identidade de forma segura. Validação em 24 a 48 horas.",
      how3Title: "Ativo a minha conta", how3Desc: "A nossa equipa valida o seu processo e ativa a sua conta em 24 a 48 horas.",
      whyTag: "A nossa diferença",
      whyTitle: "Por que escolher o NELLOA BANK?",
      whySubtitle: "Um banco 100 % digital pensado para simplificar a sua vida.",
      why1Title: "Segurança bancária", why1Desc: "SSL 256 bits, autenticação de dois fatores e monitorização 24/7.",
      why2Title: "Abertura em 3 min", why2Desc: "Sem mais deslocações à agência. Abra a sua conta totalmente online, a qualquer hora.",
      why3Title: "Suporte 7 dias/7", why3Desc: "A nossa equipa está disponível todos os dias para responder às suas perguntas.",
      why4Title: "Utilizável em qualquer lugar", why4Desc: "Transferências internacionais, cartão aceite em todo o mundo.",
      whyBannerTitle: "Junte-se a milhares de clientes satisfeitos",
      whyBannerDesc: "Abra a sua conta hoje e aceda imediatamente a todos os nossos serviços bancários online.",
      whyBannerBtn: "Abrir a minha conta gratuitamente",
      testimonialsTag: "Eles confiam em nós",
      testimonialsTitle: "O que dizem os nossos clientes",
      testimonials: [
        { name: "Amara Diallo", role: "Empreendedor", text: "O NELLOA BANK transformou a minha forma de gerir as minhas finanças. A abertura da conta foi ultrarrápida e o serviço ao cliente é excelente. Recomendo!", initials: "AD" },
        { name: "Sophie Martin", role: "Designer Freelance", text: "O painel de controlo é claro e intuitivo. Chega de taxas ocultas, chega de longas esperas. A minha conta NELLOA simplificou o meu dia a dia.", initials: "SM" },
        { name: "Kouassi Bamba", role: "Responsável Comercial", text: "A conta Premium realmente merece o seu nome. O meu consultor dedicado responde em menos de uma hora e o cashback de 2 % já me fez economizar várias centenas de euros.", initials: "KB" },
      ],
      faqTag: "Perguntas frequentes",
      faqTitle: "Tudo o que precisa de saber",
      faqs: [
        { question: "Quanto tempo demora a abrir uma conta?", answer: "Abrir a sua conta demora menos de 3 minutos. Preencha o formulário online, envie o seu documento de identidade e a nossa equipa ativa a sua conta em 24 a 48 horas." },
        { question: "Quanto tempo para ativar a minha conta?", answer: "A sua conta é ativada em 24 a 48 horas após a verificação do seu processo pela nossa equipa." },
        { question: "Que documentos são necessários para a verificação de identidade?", answer: "Aceitamos bilhetes de identidade, passaportes e títulos de residência válidos. Os formatos aceites são JPG, PNG e PDF (máx. 10 MB)." },
        { question: "O meu dinheiro está seguro no NELLOA BANK?", answer: "Sim, absolutamente. O NELLOA BANK utiliza encriptação bancária de nível militar (SSL 256 bits) e autenticação de dois fatores para proteger a sua conta." },
        { question: "Posso mudar o tipo de conta após a abertura?", answer: "Sim. Pode solicitar uma alteração de plano a partir da sua área de cliente ou contactando o nosso serviço de apoio ao cliente. A transição é feita sem interrupção do serviço." },
        { question: "Como funciona a Conta Poupança?", answer: "A Conta Poupança NELLOA BANK rende 3,5 % de juros por ano, creditados mensalmente. Pode programar transferências automáticas e definir objetivos personalizados. A taxa preferencial é garantida por 1 ano." },
      ],
      faqNoAnswer: "Não encontrou a sua resposta?",
      faqContact: "Contactar o suporte",
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
