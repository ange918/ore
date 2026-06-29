import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2, ChevronDown, ChevronUp, ArrowRight, ArrowLeft,
  Gift, Headphones, Lock, Star, Smartphone,
} from "lucide-react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import type { ComponentType, SVGProps } from "react";
import {
  CreditCardIcon, BuildingOffice2Icon, HomeIcon, HomeModernIcon,
  BanknotesIcon, TruckIcon, ShieldCheckIcon, SparklesIcon,
  GiftIcon, ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";

type HeroIcon = ComponentType<SVGProps<SVGSVGElement>>;
type OffreData = {
  slug: string;
  categorie: string;
  titre: string;
  sousTitre: string;
  description: string;
  avantages: string[];
  prime?: string;
  cta: string;
  couleur: string;
  Icon: HeroIcon;
  registerType?: string;
  imageUrl: string;
};

/* ── SHARED CONSTANTS ───────────────────────────────────── */

const ABOUT_IMAGE =
  "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80&fit=crop&crop=center";

const OPEN_STEPS = [
  { emoji: "📝", title: "Remplissez le formulaire", desc: "Complétez votre dossier en ligne en quelques minutes, depuis n'importe quel appareil." },
  { emoji: "📁", title: "Transmettez votre dossier", desc: "Envoyez vos justificatifs d'identité depuis votre espace client sécurisé." },
  { emoji: "✍️", title: "Signez votre demande", desc: "Signature électronique sécurisée, sans imprimante ni déplacement en agence." },
  { emoji: "🔐", title: "Activez votre code", desc: "Recevez et activez votre code d'accès personnel. Compte actif sous 24 à 48h." },
];

const PRICING = [
  { service: "Abonnement (gestion du compte en ligne + application)", tarif: "Gratuit", free: true },
  { service: "Virement en ligne (depuis votre espace client)", tarif: "Gratuit", free: true },
  { service: "Virement par intermédiaire d'un conseiller", tarif: "3,90 €", free: false },
  { service: "Assurance perte/vol de carte", tarif: "26,50 €/an", free: false },
  { service: "Retrait DAB réseau partenaire", tarif: "Gratuit", free: true },
  { service: "Retrait DAB hors réseau", tarif: "1,50 € par retrait", free: false },
];

const ADVANTAGES = [
  { Icon: Gift, title: "Offre de bienvenue", desc: "Prime de 3 200 € créditée automatiquement après activation de votre compte." },
  { Icon: Headphones, title: "Assistance clientèle", desc: "Disponible 7j/7 par chat, email et téléphone." },
  { Icon: Lock, title: "Sécurité maximale", desc: "Authentification 2FA, chiffrement SSL 256 bits, surveillance 24h/24." },
  { Icon: Star, title: "Engagement de qualité", desc: "Réponse garantie sous 24h à toutes vos demandes." },
  { Icon: Smartphone, title: "Banque 100 % digitale", desc: "Gérez tout depuis notre application mobile et web, partout dans le monde." },
];

const ELIGIBILITY = [
  "Toute personne physique majeure, résidente en France ou non-résidente",
  "Aucune condition de revenus minimum requise pour l'ouverture",
  "Dépôt initial minimum : 1 € (par virement ou en agence partenaire)",
  "Pièce d'identité valide obligatoire (CNI, passeport)",
  "Procédure 100 % en ligne, sans rendez-vous",
];

const OFFRE_FAQ = [
  { question: "Combien de temps prend l'ouverture d'un compte ?", answer: "En général 24 à 48h après réception de votre dossier complet. Notre équipe traite les demandes dans les meilleurs délais." },
  { question: "Puis-je ouvrir un compte depuis l'étranger ?", answer: "Oui, NELLOA BANK accepte les résidents étrangers. La procédure est entièrement en ligne et accessible depuis n'importe quel pays." },
  { question: "Quand est créditée la prime de bienvenue ?", answer: "La prime de 3 200 € est créditée dès l'activation de votre compte par notre équipe de conformité, soit sous 24 à 48h après réception de votre dossier complet." },
  { question: "Y a-t-il des frais cachés ?", answer: "Non, tous nos tarifs sont affichés transparemment dans la section Nos Tarifs. Aucune surprise, aucun frais masqué." },
  { question: "Comment contacter le support ?", answer: "Via le chat en ligne (disponible 24h/24), par email à contact@nelloabank.com, ou par téléphone au +33 6 70 85 89 30 du lundi au samedi de 8h à 20h." },
];

/* ── OFFRES DATA ────────────────────────────────────────── */

const offres: Record<string, OffreData> = {
  "compte-personnel": {
    slug: "compte-personnel",
    categorie: "Compte Bancaire",
    titre: "Compte Personnel",
    sousTitre: "L'essentiel pour vos dépenses quotidiennes",
    description: "Le Compte Personnel NELLOA BANK est conçu pour vous offrir une gestion simple et efficace de vos finances du quotidien. Profitez d'un IBAN personnel, d'une carte virtuelle sécurisée et d'un suivi détaillé de vos dépenses — le tout depuis votre espace en ligne.",
    avantages: ["IBAN personnel dédié", "Carte virtuelle Visa incluse", "Suivi des dépenses en temps réel", "Virements SEPA gratuits", "Application mobile intuitive", "Notifications instantanées"],
    prime: "Prime de bienvenue de 3 200 € après activation",
    cta: "Ouvrir un Compte Personnel",
    couleur: "from-[#1E3A8A] to-[#3B82F6]",
    Icon: CreditCardIcon,
    registerType: "personnel",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80&fit=crop",
  },
  "compte-business": {
    slug: "compte-business",
    categorie: "Compte Bancaire",
    titre: "Compte Business",
    sousTitre: "La solution bancaire pour les professionnels et entrepreneurs",
    description: "Le Compte Business NELLOA BANK est taillé pour les indépendants, auto-entrepreneurs et PME qui souhaitent séparer leurs finances professionnelles et bénéficier d'outils dédiés à la gestion d'entreprise.",
    avantages: ["IBAN professionnel séparé", "Carte Business Mastercard", "Virements illimités nationaux & internationaux", "Domiciliation bancaire reconnue", "Tableau de bord comptable intégré", "Accès multi-utilisateurs"],
    prime: "Prime de bienvenue de 3 200 € après activation",
    cta: "Ouvrir un Compte Business",
    couleur: "from-[#1E3A8A] to-[#0EA5E9]",
    Icon: BuildingOffice2Icon,
    registerType: "courant",
    imageUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80&fit=crop",
  },
  "carte-bancaire": {
    slug: "carte-bancaire",
    categorie: "Compte Bancaire",
    titre: "Carte Bancaire",
    sousTitre: "Une carte pour payer partout, en toute sécurité",
    description: "La carte NELLOA BANK vous accompagne dans toutes vos transactions, en ligne comme en magasin. Choisissez entre notre carte virtuelle gratuite ou notre carte physique Gold internationale, acceptée dans plus de 150 pays.",
    avantages: ["Carte virtuelle disponible immédiatement", "Carte physique Gold internationale", "Paiements sans contact", "Cashback sur vos achats", "Blocage/déblocage instantané", "Assurance voyage incluse"],
    prime: "Carte offerte à l'ouverture",
    cta: "Obtenir ma carte",
    couleur: "from-[#1E3A8A] to-[#7C3AED]",
    Icon: SparklesIcon,
    registerType: "premium",
    imageUrl: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=800&q=80&fit=crop",
  },
  "epargne": {
    slug: "epargne",
    categorie: "Compte Bancaire",
    titre: "Compte Épargne",
    sousTitre: "Faites fructifier votre argent à 3,5 % / an",
    description: "Le Compte Épargne NELLOA BANK vous permet de constituer une épargne solide grâce à un taux d'intérêt compétitif de 3,5 % par an. Définissez des objectifs personnalisés, programmez des virements automatiques et suivez la croissance de votre épargne mois après mois, sans effort.",
    avantages: ["Taux d'intérêt 3,5 % / an", "Épargne automatique programmable", "Intérêts crédités chaque mois", "Objectifs d'épargne personnalisés", "Aucun frais de tenue de compte", "Retrait à tout moment"],
    prime: "Taux préférentiel garanti 1 an",
    cta: "Ouvrir un Compte Épargne",
    couleur: "from-[#0F766E] to-[#2DD4BF]",
    Icon: ArrowTrendingUpIcon,
    registerType: "epargne",
    imageUrl: "https://images.unsplash.com/photo-1579621970795-87facc2f976d?w=800&q=80&fit=crop",
  },
  "pret-immobilier": {
    slug: "pret-immobilier",
    categorie: "Crédit Bancaire",
    titre: "Prêt Immobilier",
    sousTitre: "Financez votre projet immobilier aux meilleures conditions",
    description: "NELLOA BANK vous accompagne dans l'acquisition de votre résidence principale, secondaire ou d'un bien locatif. Nos conseillers analysent votre dossier et vous proposent un taux compétitif adapté à votre profil.",
    avantages: ["Taux fixe dès 2,8 % annuel", "Durée jusqu'à 25 ans", "Jusqu'à 500 000 € financés", "Réponse de principe sous 48h", "Assurance emprunteur intégrée", "Modulation des mensualités possible"],
    cta: "Simuler mon prêt immobilier",
    couleur: "from-[#065F46] to-[#059669]",
    Icon: HomeIcon,
    registerType: "personnel",
    imageUrl: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80&fit=crop",
  },
  "pret-personnel": {
    slug: "pret-personnel",
    categorie: "Crédit Bancaire",
    titre: "Prêt Personnel",
    sousTitre: "Un financement flexible pour tous vos projets",
    description: "Voyages, travaux, mariage, électroménager... Le prêt personnel NELLOA BANK vous donne accès aux fonds dont vous avez besoin rapidement, sans justificatif d'utilisation, avec des mensualités fixes et prévisibles.",
    avantages: ["De 500 € à 75 000 €", "Durée de 12 à 84 mois", "Taux fixe sans surprise", "Fonds disponibles sous 24h", "Pas de frais de dossier", "Remboursement anticipé gratuit"],
    cta: "Demander mon prêt personnel",
    couleur: "from-[#1E3A8A] to-[#3B82F6]",
    Icon: BanknotesIcon,
    registerType: "personnel",
    imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80&fit=crop",
  },
  "pret-auto": {
    slug: "pret-auto",
    categorie: "Crédit Bancaire",
    titre: "Prêt Auto",
    sousTitre: "Roulez maintenant, payez sereinement",
    description: "Que ce soit pour l'achat d'un véhicule neuf, d'occasion ou d'un deux-roues, le prêt auto NELLOA BANK vous offre un financement rapide avec des conditions avantageuses.",
    avantages: ["Financement jusqu'à 80 000 €", "Durée de 12 à 72 mois", "Taux préférentiel véhicule électrique", "Assurance auto intégrée en option", "Réponse immédiate en ligne", "Achat chez tout concessionnaire"],
    cta: "Financer mon véhicule",
    couleur: "from-[#7C2D12] to-[#EA580C]",
    Icon: TruckIcon,
    registerType: "personnel",
    imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80&fit=crop",
  },
  "assurance-vie": {
    slug: "assurance-vie",
    categorie: "Assurance Partenaire",
    titre: "Assurance Vie",
    sousTitre: "Préparez l'avenir et protégez vos proches",
    description: "L'assurance vie NELLOA BANK est un placement à long terme qui combine protection de vos bénéficiaires et valorisation de votre épargne. Bénéficiez d'une fiscalité avantageuse et d'un capital garanti.",
    avantages: ["Capital garanti fonds euros", "Fiscalité avantageuse après 8 ans", "Versements libres ou programmés", "Transmission hors succession", "Désignation libre des bénéficiaires", "Rachat partiel à tout moment"],
    cta: "Souscrire une assurance vie",
    couleur: "from-[#1E3A8A] to-[#6D28D9]",
    Icon: ShieldCheckIcon,
    registerType: "premium",
    imageUrl: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800&q=80&fit=crop",
  },
  "assurance-habitat": {
    slug: "assurance-habitat",
    categorie: "Assurance Partenaire",
    titre: "Assurance Habitat",
    sousTitre: "Votre domicile protégé à 360°",
    description: "L'assurance habitation NELLOA BANK couvre votre logement et son contenu contre tous les risques du quotidien : incendie, dégât des eaux, vol, catastrophes naturelles et responsabilité civile.",
    avantages: ["Couverture dégâts des eaux", "Protection incendie & explosion", "Vol et vandalisme couverts", "Responsabilité civile incluse", "Garantie catastrophes naturelles", "Assistance 24h/24 incluse"],
    cta: "Assurer mon logement",
    couleur: "from-[#0F766E] to-[#14B8A6]",
    Icon: HomeModernIcon,
    registerType: "personnel",
    imageUrl: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80&fit=crop",
  },
};

/* ── SUB-COMPONENTS ─────────────────────────────────────── */

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left bg-card hover:bg-muted/50 transition-colors"
      >
        <span className="font-semibold text-foreground pr-4">{question}</span>
        {open
          ? <ChevronUp className="h-5 w-5 text-primary shrink-0" />
          : <ChevronDown className="h-5 w-5 text-muted-foreground shrink-0" />}
      </button>
      {open && (
        <div className="px-5 pb-5 bg-card border-t border-border">
          <p className="pt-4 text-muted-foreground text-sm leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

/* ── PAGE ───────────────────────────────────────────────── */

export function OffrePage({ slug }: { slug: string }) {
  const offre = offres[slug];

  if (!offre) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-bold mb-4">Offre introuvable</p>
          <Link href="/"><Button>Retour à l'accueil</Button></Link>
        </div>
      </div>
    );
  }

  const { Icon } = offre;
  const registerHref = `/register${offre.registerType ? `?type=${offre.registerType}` : ""}`;

  return (
    <div className="min-h-screen bg-background flex flex-col">

      <Header />

      {/* ── HERO ── */}
      <section className={`bg-gradient-to-br ${offre.couleur}`}>
        <div className="container max-w-6xl mx-auto px-4 py-20">
          <Link href="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-10 transition-colors">
            <ArrowLeft className="h-4 w-4" />Retour à l'accueil
          </Link>
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left text */}
            <div className="flex-1 text-white">
              <p className="text-white/70 text-sm font-semibold uppercase tracking-widest mb-3">{offre.categorie}</p>
              <div className="flex items-center gap-4 mb-5">
                <div className="h-14 w-14 rounded-2xl bg-white/15 flex items-center justify-center shrink-0">
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold">{offre.titre}</h1>
              </div>
              <p className="text-xl text-white/90 mb-8 max-w-lg">{offre.sousTitre}</p>
              {offre.prime && (
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white font-semibold px-4 py-2 rounded-full text-sm mb-8">
                  <GiftIcon className="h-4 w-4" />{offre.prime}
                </div>
              )}
              <Link href={registerHref}>
                <Button size="lg" className="bg-white text-[#1E3A8A] hover:bg-white/90 font-semibold h-12 px-8 rounded-full">
                  {offre.cta}<ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            {/* Right image */}
            <div className="flex-1 hidden lg:block">
              <img
                src={offre.imageUrl}
                alt={offre.titre}
                className="w-full max-w-[460px] h-[320px] object-cover rounded-2xl shadow-2xl mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── À PROPOS ── */}
      <section className="py-20 bg-white">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <img
                src={ABOUT_IMAGE}
                alt="Banque digitale accessible partout"
                className="w-full h-[380px] object-cover rounded-2xl shadow-lg"
              />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
              <p className="text-sm font-semibold text-secondary uppercase tracking-widest mb-3">Votre banque, partout</p>
              <h2 className="text-3xl font-bold text-foreground mb-6">Gérez votre compte où que vous soyez</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Depuis chez vous, depuis l'extérieur, depuis votre smartphone, tablette ou ordinateur — votre banque est toujours prête. Gérez votre budget, suivez vos dépenses en temps réel et effectuez vos opérations en toute sécurité, 24h/24 et 7j/7.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">{offre.description}</p>
              <Link href={registerHref}>
                <Button size="lg" className="h-12 px-8 rounded-full font-semibold">{offre.cta}</Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── COMMENT OUVRIR UN COMPTE ── */}
      <section className="py-20 bg-slate-50">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-secondary uppercase tracking-widest mb-3">Simple et rapide</p>
            <h2 className="text-3xl font-bold text-foreground">Comment ouvrir un compte ?</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {OPEN_STEPS.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white rounded-2xl border border-border p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow"
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mb-3 text-white shadow-md bg-gradient-to-br ${offre.couleur}`}>
                  {i + 1}
                </div>
                <span className="text-2xl mb-2">{step.emoji}</span>
                <h4 className="font-bold text-sm mb-2">{step.title}</h4>
                <p className="text-muted-foreground text-xs leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NOS TARIFS ── */}
      <section id="tarifs" className="py-20 bg-white">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-secondary uppercase tracking-widest mb-3">Transparence totale</p>
            <h2 className="text-3xl font-bold text-foreground">Nos Tarifs</h2>
          </div>
          <div className="overflow-hidden rounded-2xl border border-border shadow-sm">
            <div className="grid grid-cols-2 bg-slate-900 text-white px-6 py-4">
              <span className="font-semibold text-sm">Service</span>
              <span className="font-semibold text-sm text-right">Tarif</span>
            </div>
            {PRICING.map((row, i) => (
              <div key={row.service} className={`grid grid-cols-2 px-6 py-4 items-center border-b border-border last:border-0 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
                <span className="text-sm text-foreground pr-4">{row.service}</span>
                <span className={`text-sm font-bold text-right ${row.free ? 'text-green-600' : 'text-foreground'}`}>
                  {row.tarif}
                </span>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-4 text-center">
            Tarifs en vigueur au 1er janvier 2026. Sous réserve de modifications.
          </p>
        </div>
      </section>

      {/* ── LES AVANTAGES ── */}
      <section className="py-20 bg-slate-50">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="mb-12">
            <p className="text-sm font-semibold text-secondary uppercase tracking-widest mb-3">Nos engagements</p>
            <h2 className="text-3xl font-bold text-foreground mb-3">Les avantages de votre compte</h2>
            <p className="text-muted-foreground max-w-xl">NELLOA BANK offre plusieurs avantages aux titulaires de compte bancaire.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ADVANTAGES.map(({ Icon: AdvIcon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-white rounded-2xl border border-border p-6 hover:shadow-md hover:border-primary/30 transition-all duration-200"
              >
                <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <AdvIcon className="h-5 w-5 text-primary" />
                </div>
                <h4 className="font-bold text-base mb-2">{title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONDITIONS D'ÉLIGIBILITÉ ── */}
      <section className="py-20 bg-white">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-sm font-semibold text-secondary uppercase tracking-widest mb-3">Qui peut ouvrir un compte ?</p>
              <h2 className="text-3xl font-bold text-foreground mb-8">Conditions d'éligibilité</h2>
              <ul className="space-y-4 mb-6">
                {ELIGIBILITY.map((c) => (
                  <li key={c} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{c}</span>
                  </li>
                ))}
              </ul>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800 leading-relaxed">
                💡 Nous recommandons un revenu mensuel de 800 € à 1 000 € pour profiter pleinement des services premium.
              </div>
            </div>
            <div className="bg-slate-50 rounded-2xl border border-border p-8">
              <h3 className="font-bold text-xl mb-6">Ce qui est inclus</h3>
              <ul className="space-y-3 mb-6">
                {offre.avantages.map((av) => (
                  <li key={av} className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{av}</span>
                  </li>
                ))}
              </ul>
              {offre.prime && (
                <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                  <GiftIcon className="h-5 w-5 text-green-600 shrink-0" />
                  <span className="text-sm text-green-700 font-medium">{offre.prime}</span>
                </div>
              )}
              <Link href={registerHref}>
                <Button className="w-full rounded-full h-11">{offre.cta}</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 bg-slate-50">
        <div className="container max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-secondary uppercase tracking-widest mb-3">Questions fréquentes</p>
            <h2 className="text-3xl font-bold text-foreground">Tout ce que vous devez savoir</h2>
          </div>
          <div className="flex flex-col gap-3">
            {OFFRE_FAQ.map((faq) => (
              <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
            ))}
          </div>
          <div className="text-center mt-10">
            <p className="text-muted-foreground text-sm mb-4">Vous n'avez pas trouvé votre réponse ?</p>
            <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">Contacter le support</Button>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className={`py-20 px-4 bg-gradient-to-br ${offre.couleur}`}>
        <div className="container max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <div className="flex justify-center mb-6">
              <div className="h-16 w-16 rounded-2xl bg-white/15 flex items-center justify-center">
                <Icon className="h-9 w-9 text-white" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Prêt à commencer ?</h2>
            <p className="text-white/85 text-lg mb-10 max-w-xl mx-auto">
              Ouvrez votre {offre.titre} en moins de 3 minutes.
              {offre.prime && ` ${offre.prime}.`}
            </p>
            <Link href={registerHref}>
              <Button size="lg" className="bg-white text-[#1E3A8A] hover:bg-white/90 font-semibold h-14 px-10 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-base">
                {offre.cta}<ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <p className="text-white/60 text-sm mt-5">Sans engagement · Gratuit · 100 % en ligne</p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
