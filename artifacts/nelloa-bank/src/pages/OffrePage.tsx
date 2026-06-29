import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import type { ComponentType, SVGProps } from "react";

import {
  CreditCardIcon,
  BuildingOffice2Icon,
  HomeIcon,
  HomeModernIcon,
  BanknotesIcon,
  TruckIcon,
  ShieldCheckIcon,
  SparklesIcon,
  GiftIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";

type HeroIcon = ComponentType<SVGProps<SVGSVGElement>>;
type Step = { titre: string; desc: string };

type OffreData = {
  slug: string;
  categorie: string;
  titre: string;
  sousTitre: string;
  description: string;
  avantages: string[];
  conditions: string[];
  steps: Step[];
  prime?: string;
  cta: string;
  couleur: string;
  Icon: HeroIcon;
  registerType?: string;
};

const offres: Record<string, OffreData> = {
  "compte-personnel": {
    slug: "compte-personnel",
    categorie: "Compte Bancaire",
    titre: "Compte Personnel",
    sousTitre: "L'essentiel pour vos dépenses quotidiennes",
    description: "Le Compte Personnel NELLOA BANK est conçu pour vous offrir une gestion simple et efficace de vos finances du quotidien. Profitez d'un IBAN personnel, d'une carte virtuelle sécurisée et d'un suivi détaillé de vos dépenses — le tout depuis votre espace en ligne.",
    avantages: ["IBAN personnel dédié", "Carte virtuelle Visa incluse", "Suivi des dépenses en temps réel", "Virements SEPA gratuits", "Application mobile intuitive", "Notifications instantanées"],
    conditions: ["Être majeur et résident", "Pièce d'identité valide", "Pas de revenus minimum requis"],
    steps: [
      { titre: "Je remplis le formulaire", desc: "Indiquez vos informations personnelles en 2 minutes depuis n'importe quel appareil." },
      { titre: "Je vérifie mon identité", desc: "Déposez une photo de votre pièce d'identité valide. Notre équipe valide votre dossier sous 24h." },
      { titre: "J'accède à mon compte", desc: "Votre compte est activé, votre prime de 3 200 € est créditée et votre carte virtuelle est disponible immédiatement." },
    ],
    prime: "3 200 € offerts à l'ouverture",
    cta: "Ouvrir un Compte Personnel",
    couleur: "from-[#1E3A8A] to-[#3B82F6]",
    Icon: CreditCardIcon,
    registerType: "personnel",
  },
  "compte-business": {
    slug: "compte-business",
    categorie: "Compte Bancaire",
    titre: "Compte Business",
    sousTitre: "La solution bancaire pour les professionnels et entrepreneurs",
    description: "Le Compte Business NELLOA BANK est taillé pour les indépendants, auto-entrepreneurs et PME qui souhaitent séparer leurs finances professionnelles et bénéficier d'outils dédiés à la gestion d'entreprise.",
    avantages: ["IBAN professionnel séparé", "Carte Business Mastercard", "Virements illimités nationaux & internationaux", "Domiciliation bancaire reconnue", "Tableau de bord comptable intégré", "Accès multi-utilisateurs"],
    conditions: ["Être dirigeant ou auto-entrepreneur", "Extrait Kbis ou statuts de société", "Pièce d'identité du gérant"],
    steps: [
      { titre: "Je crée mon dossier", desc: "Renseignez les informations de votre entreprise et vos coordonnées professionnelles en quelques minutes." },
      { titre: "Je fournis mes justificatifs", desc: "Déposez votre Kbis ou statuts et une pièce d'identité. Traitement prioritaire pour les professionnels." },
      { titre: "Je commence à gérer", desc: "Votre IBAN professionnel est actif, votre carte Business est expédiée et la prime est créditée sur votre solde." },
    ],
    prime: "3 200 € offerts à l'ouverture",
    cta: "Ouvrir un Compte Business",
    couleur: "from-[#1E3A8A] to-[#0EA5E9]",
    Icon: BuildingOffice2Icon,
    registerType: "courant",
  },
  "carte-bancaire": {
    slug: "carte-bancaire",
    categorie: "Compte Bancaire",
    titre: "Carte Bancaire",
    sousTitre: "Une carte pour payer partout, en toute sécurité",
    description: "La carte NELLOA BANK vous accompagne dans toutes vos transactions, en ligne comme en magasin. Choisissez entre notre carte virtuelle gratuite ou notre carte physique Gold internationale, acceptée dans plus de 150 pays.",
    avantages: ["Carte virtuelle disponible immédiatement", "Carte physique Gold internationale", "Paiements sans contact", "Cashback sur vos achats", "Blocage/déblocage instantané", "Assurance voyage incluse"],
    conditions: ["Être titulaire d'un compte NELLOA BANK", "Vérification d'identité complétée"],
    steps: [
      { titre: "J'ouvre mon compte", desc: "La carte est incluse à l'ouverture de tout compte NELLOA BANK. Remplissez le formulaire en ligne." },
      { titre: "Je choisis ma carte", desc: "Sélectionnez la carte virtuelle (disponible immédiatement) ou la carte Gold physique (livrée sous 3 jours ouvrés)." },
      { titre: "Je paye partout", desc: "Votre carte est active. Utilisez-la en ligne, en magasin et dans le monde entier dès réception." },
    ],
    prime: "Carte offerte à l'ouverture",
    cta: "Obtenir ma carte",
    couleur: "from-[#1E3A8A] to-[#7C3AED]",
    Icon: SparklesIcon,
    registerType: "premium",
  },
  "epargne": {
    slug: "epargne",
    categorie: "Compte Bancaire",
    titre: "Compte Épargne",
    sousTitre: "Faites fructifier votre argent automatiquement",
    description: "Le Compte Épargne NELLOA BANK vous permet de constituer une épargne solide grâce à un taux d'intérêt compétitif de 3,5 % par an. Définissez des objectifs personnalisés, programmez des virements automatiques et suivez la croissance de votre épargne mois après mois, sans effort.",
    avantages: ["Taux d'intérêt 3,5 % / an", "Épargne automatique programmable", "Intérêts crédités chaque mois", "Objectifs d'épargne personnalisés", "Aucun frais de tenue de compte", "Retrait à tout moment sans pénalité"],
    conditions: ["Être majeur et résident", "Versement initial minimum : 100 €", "Pas de revenus minimum requis"],
    steps: [
      { titre: "Je définis mon objectif", desc: "Choisissez un objectif d'épargne (voyage, immobilier, retraite) et le montant cible que vous souhaitez atteindre." },
      { titre: "Je programme mes versements", desc: "Définissez un montant et une fréquence (hebdomadaire, mensuel). Les virements s'effectuent automatiquement depuis votre compte courant." },
      { titre: "Je regarde mes intérêts croître", desc: "Chaque mois, vos intérêts sont crédités sur votre compte épargne. Suivez l'évolution en temps réel depuis votre espace client." },
    ],
    prime: "Taux préférentiel garanti 1 an",
    cta: "Ouvrir un Compte Épargne",
    couleur: "from-[#0F766E] to-[#2DD4BF]",
    Icon: ArrowTrendingUpIcon,
    registerType: "epargne",
  },
  "pret-immobilier": {
    slug: "pret-immobilier",
    categorie: "Crédit Bancaire",
    titre: "Prêt Immobilier",
    sousTitre: "Financez votre projet immobilier aux meilleures conditions",
    description: "NELLOA BANK vous accompagne dans l'acquisition de votre résidence principale, secondaire ou d'un bien locatif. Nos conseillers analysent votre dossier et vous proposent un taux compétitif adapté à votre profil.",
    avantages: ["Taux fixe dès 2,8 % annuel", "Durée jusqu'à 25 ans", "Jusqu'à 500 000 € financés", "Réponse de principe sous 48h", "Assurance emprunteur intégrée", "Modulation des mensualités possible"],
    conditions: ["Revenus stables justifiés", "Apport personnel recommandé (10 %)", "Taux d'endettement inférieur à 35 %", "Pièces d'identité et justificatifs de revenus"],
    steps: [
      { titre: "Je simule mon prêt", desc: "Indiquez le montant, la durée souhaitée et vos revenus. Obtenez une estimation de vos mensualités en temps réel." },
      { titre: "Je dépose mon dossier", desc: "Transmettez vos justificatifs (revenus, identité, compromis de vente). Un conseiller analyse votre demande sous 48h." },
      { titre: "Je signe et je finance", desc: "Offre de prêt validée, signature électronique, déblocage des fonds directement chez le notaire ou le vendeur." },
    ],
    cta: "Simuler mon prêt immobilier",
    couleur: "from-[#065F46] to-[#059669]",
    Icon: HomeIcon,
    registerType: "personnel",
  },
  "pret-personnel": {
    slug: "pret-personnel",
    categorie: "Crédit Bancaire",
    titre: "Prêt Personnel",
    sousTitre: "Un financement flexible pour tous vos projets",
    description: "Voyages, travaux, mariage, électroménager... Le prêt personnel NELLOA BANK vous donne accès aux fonds dont vous avez besoin rapidement, sans justificatif d'utilisation, avec des mensualités fixes et prévisibles.",
    avantages: ["De 500 € à 75 000 €", "Durée de 12 à 84 mois", "Taux fixe sans surprise", "Fonds disponibles sous 24h", "Pas de frais de dossier", "Remboursement anticipé gratuit"],
    conditions: ["Être majeur et résident", "Justificatif de revenus réguliers", "Taux d'endettement inférieur à 33 %"],
    steps: [
      { titre: "Je simule en ligne", desc: "Choisissez le montant et la durée. Le simulateur affiche vos mensualités et le coût total instantanément." },
      { titre: "Je soumets ma demande", desc: "Remplissez le formulaire et joignez vos justificatifs de revenus. Réponse de principe immédiate en ligne." },
      { titre: "Je reçois les fonds", desc: "Après validation, les fonds sont virés sur votre compte NELLOA BANK sous 24h. Utilisez-les librement." },
    ],
    cta: "Demander mon prêt personnel",
    couleur: "from-[#1E3A8A] to-[#3B82F6]",
    Icon: BanknotesIcon,
    registerType: "personnel",
  },
  "pret-auto": {
    slug: "pret-auto",
    categorie: "Crédit Bancaire",
    titre: "Prêt Auto",
    sousTitre: "Roulez maintenant, payez sereinement",
    description: "Que ce soit pour l'achat d'un véhicule neuf, d'occasion ou d'un deux-roues, le prêt auto NELLOA BANK vous offre un financement rapide avec des conditions avantageuses. Notre simulateur en ligne vous donne une réponse immédiate.",
    avantages: ["Financement jusqu'à 80 000 €", "Durée de 12 à 72 mois", "Taux préférentiel pour véhicule électrique", "Assurance auto intégrée en option", "Réponse immédiate en ligne", "Achat chez n'importe quel concessionnaire"],
    conditions: ["Être majeur et titulaire du permis B", "Justificatif de revenus", "Facture ou bon de commande du véhicule"],
    steps: [
      { titre: "Je simule mon financement", desc: "Renseignez le prix du véhicule, votre apport et la durée souhaitée. Résultat immédiat en ligne." },
      { titre: "Je transmets mon dossier", desc: "Joignez la facture ou le bon de commande du véhicule, votre permis et vos justificatifs de revenus." },
      { titre: "Je prends le volant", desc: "Accord validé, les fonds sont débloqués directement auprès du vendeur ou du concessionnaire. Bonne route !" },
    ],
    cta: "Financer mon véhicule",
    couleur: "from-[#7C2D12] to-[#EA580C]",
    Icon: TruckIcon,
    registerType: "personnel",
  },
  "assurance-vie": {
    slug: "assurance-vie",
    categorie: "Assurance Partenaire",
    titre: "Assurance Vie",
    sousTitre: "Préparez l'avenir et protégez vos proches",
    description: "L'assurance vie NELLOA BANK est un placement à long terme qui combine protection de vos bénéficiaires et valorisation de votre épargne. Bénéficiez d'une fiscalité avantageuse et d'un capital garanti.",
    avantages: ["Capital garanti fonds euros", "Fiscalité avantageuse après 8 ans", "Versements libres ou programmés", "Transmission hors succession", "Désignation libre des bénéficiaires", "Rachat partiel à tout moment"],
    conditions: ["Être majeur", "Versement initial minimum : 500 €", "Questionnaire de santé simplifié"],
    steps: [
      { titre: "Je choisis mon contrat", desc: "Sélectionnez votre profil d'investisseur (prudent, équilibré, dynamique) et le montant de votre premier versement." },
      { titre: "Je complète mon dossier", desc: "Renseignez vos bénéficiaires et répondez au questionnaire de santé simplifié. Signature électronique en 5 minutes." },
      { titre: "Mon épargne fructifie", desc: "Votre contrat est ouvert. Effectuez des versements à tout moment et suivez la performance depuis votre espace." },
    ],
    cta: "Souscrire une assurance vie",
    couleur: "from-[#1E3A8A] to-[#6D28D9]",
    Icon: ShieldCheckIcon,
    registerType: "premium",
  },
  "assurance-habitat": {
    slug: "assurance-habitat",
    categorie: "Assurance Partenaire",
    titre: "Assurance Habitat",
    sousTitre: "Votre domicile protégé à 360°",
    description: "L'assurance habitation NELLOA BANK couvre votre logement et son contenu contre tous les risques du quotidien : incendie, dégât des eaux, vol, catastrophes naturelles et responsabilité civile. Simple à souscrire, immédiate et sans paperasse.",
    avantages: ["Couverture dégâts des eaux", "Protection incendie & explosion", "Vol et vandalisme couverts", "Responsabilité civile incluse", "Garantie catastrophes naturelles", "Assistance 24h/24 incluse"],
    conditions: ["Être locataire ou propriétaire", "Renseignements sur le logement", "Attestation disponible immédiatement"],
    steps: [
      { titre: "Je décris mon logement", desc: "Surface, type de bien (appartement/maison), localisation. Le tarif est calculé en temps réel, sans surprises." },
      { titre: "Je personnalise mes garanties", desc: "Choisissez les options complémentaires (objets de valeur, jardin, piscine) selon vos besoins spécifiques." },
      { titre: "Je suis assuré immédiatement", desc: "Signature électronique, paiement sécurisé, attestation d'assurance téléchargeable dans la minute." },
    ],
    cta: "Assurer mon logement",
    couleur: "from-[#0F766E] to-[#14B8A6]",
    Icon: HomeModernIcon,
    registerType: "personnel",
  },
};

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

      {/* HEADER */}
      <header className="sticky top-0 z-50 w-full bg-white shadow-sm border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-xl text-primary">NELLOA BANK</Link>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">Connexion</Button>
            </Link>
            <Link href={registerHref}>
              <Button className="bg-primary text-white hover:bg-primary/90">{offre.cta}</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className={`bg-gradient-to-br ${offre.couleur} py-20 px-4`}>
        <div className="container mx-auto max-w-4xl">
          <Link href="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4" />Retour à l'accueil
          </Link>
          <p className="text-white/70 text-sm font-semibold uppercase tracking-widest mb-3">{offre.categorie}</p>
          <div className="flex items-center gap-4 mb-4">
            <div className="h-14 w-14 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center shrink-0">
              <Icon className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white">{offre.titre}</h1>
          </div>
          <p className="text-xl text-white/90 max-w-2xl">{offre.sousTitre}</p>
          {offre.prime && (
            <div className="mt-6 inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white font-semibold px-4 py-2 rounded-full text-sm">
              <GiftIcon className="h-4 w-4" />{offre.prime}
            </div>
          )}
        </div>
      </section>

      {/* CONTENT */}
      <div className="container mx-auto max-w-5xl px-4 py-16 flex-1">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <h2 className="text-2xl font-bold text-foreground mb-4">À propos de ce produit</h2>
              <p className="text-muted-foreground leading-relaxed text-base">{offre.description}</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
              <h2 className="text-2xl font-bold text-foreground mb-6">Ce qui est inclus</h2>
              <ul className="grid sm:grid-cols-2 gap-4">
                {offre.avantages.map((av) => (
                  <li key={av} className="flex items-start gap-3 p-4 bg-card border border-border rounded-xl">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{av}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
              <h2 className="text-2xl font-bold text-foreground mb-4">Conditions d'éligibilité</h2>
              <ul className="space-y-3">
                {offre.conditions.map((c) => (
                  <li key={c} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />{c}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Sticky CTA */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-card border border-border rounded-2xl p-6 shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground">{offre.titre}</h3>
              </div>
              {offre.prime && (
                <div className="flex items-center justify-center gap-2 bg-green-50 text-green-700 rounded-lg p-3 text-sm font-medium mb-6">
                  <GiftIcon className="h-4 w-4 shrink-0" />{offre.prime}
                </div>
              )}
              <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                Ouvrez votre compte en moins de 3 minutes. Entièrement en ligne, sans rendez-vous.
              </p>
              <Link href={registerHref}>
                <Button className="w-full bg-primary hover:bg-primary/90 text-white h-12 flex items-center justify-center gap-2">
                  {offre.cta}<ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <p className="text-xs text-muted-foreground text-center mt-4">Sans engagement — ouverture gratuite</p>
              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-xs font-semibold text-muted-foreground mb-3">Vous avez des questions ?</p>
                <a href="#" className="text-sm text-primary hover:underline">Contacter un conseiller →</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* COMMENT ÇA MARCHE */}
      <section className="py-20 bg-slate-50 border-t border-border">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-secondary uppercase tracking-widest mb-3">Simple et rapide</p>
            <h2 className="text-3xl font-bold text-foreground">Comment ça marche ?</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-8 left-[calc(16.66%+1rem)] right-[calc(16.66%+1rem)] h-0.5 bg-border z-0" />
            {offre.steps.map((step, i) => (
              <motion.div
                key={step.titre}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.12 }}
                className="flex flex-col items-center text-center relative z-10"
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mb-5 shadow-md bg-gradient-to-br ${offre.couleur} text-white`}>
                  {i + 1}
                </div>
                <h4 className="text-lg font-bold text-foreground mb-2">{step.titre}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className={`py-20 px-4 bg-gradient-to-br ${offre.couleur}`}>
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <div className="flex justify-center mb-6">
              <div className="h-16 w-16 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
                <Icon className="h-9 w-9 text-white" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Prêt à commencer ?</h2>
            <p className="text-white/85 text-lg mb-10 max-w-xl mx-auto">
              Ouvrez votre {offre.titre} en moins de 3 minutes.{offre.prime && ` Profitez de ${offre.prime}.`}
            </p>
            <Link href={registerHref}>
              <Button size="lg" className="bg-white text-[#1E3A8A] hover:bg-white/90 font-semibold h-14 px-10 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-base">
                {offre.cta}<ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
            <p className="text-white/60 text-sm mt-5">Sans engagement · Gratuit · 100 % en ligne</p>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1E3A8A] border-t border-white/10 py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <Link href="/" className="font-bold text-xl text-white">NELLOA BANK</Link>
            <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2">
              <Link href="/offres/compte-personnel" className="text-white/60 text-sm hover:text-white transition-colors">Compte Personnel</Link>
              <Link href="/offres/compte-business" className="text-white/60 text-sm hover:text-white transition-colors">Compte Business</Link>
              <Link href="/offres/epargne" className="text-white/60 text-sm hover:text-white transition-colors">Compte Épargne</Link>
              <Link href="/credits/pret-immobilier" className="text-white/60 text-sm hover:text-white transition-colors">Prêt Immobilier</Link>
              <Link href="/credits/pret-personnel" className="text-white/60 text-sm hover:text-white transition-colors">Prêt Personnel</Link>
              <Link href="/assurances/assurance-vie" className="text-white/60 text-sm hover:text-white transition-colors">Assurance Vie</Link>
            </nav>
            <div className="flex gap-5 text-sm text-white/50">
              <a href="#" className="hover:text-white transition-colors">Mentions légales</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
          <p className="text-center text-white/40 text-xs mt-6">© 2025 NELLOA BANK. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}
