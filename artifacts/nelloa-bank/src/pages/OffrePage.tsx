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
import { useLang } from "@/lib/i18n";
import type { ComponentType, SVGProps } from "react";
import {
  CreditCardIcon, BuildingOffice2Icon, HomeIcon, HomeModernIcon,
  BanknotesIcon, TruckIcon, ShieldCheckIcon, SparklesIcon,
  GiftIcon, ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";

type HeroIcon = ComponentType<SVGProps<SVGSVGElement>>;

const OFFRE_META: Record<string, { couleur: string; Icon: HeroIcon; registerType?: string; imageUrl: string }> = {
  "compte-personnel": { couleur: "from-[#1E3A8A] to-[#3B82F6]", Icon: CreditCardIcon, registerType: "personnel", imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80&fit=crop" },
  "compte-business": { couleur: "from-[#1E3A8A] to-[#0EA5E9]", Icon: BuildingOffice2Icon, registerType: "courant", imageUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80&fit=crop" },
  "carte-bancaire": { couleur: "from-[#1E3A8A] to-[#7C3AED]", Icon: SparklesIcon, registerType: "premium", imageUrl: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=800&q=80&fit=crop" },
  "epargne": { couleur: "from-[#0F766E] to-[#2DD4BF]", Icon: ArrowTrendingUpIcon, registerType: "epargne", imageUrl: "https://images.unsplash.com/photo-1579621970795-87facc2f976d?w=800&q=80&fit=crop" },
  "pret-immobilier": { couleur: "from-[#065F46] to-[#059669]", Icon: HomeIcon, registerType: "personnel", imageUrl: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80&fit=crop" },
  "pret-personnel": { couleur: "from-[#1E3A8A] to-[#3B82F6]", Icon: BanknotesIcon, registerType: "personnel", imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80&fit=crop" },
  "pret-auto": { couleur: "from-[#7C2D12] to-[#EA580C]", Icon: TruckIcon, registerType: "personnel", imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80&fit=crop" },
  "assurance-vie": { couleur: "from-[#1E3A8A] to-[#6D28D9]", Icon: ShieldCheckIcon, registerType: "premium", imageUrl: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800&q=80&fit=crop" },
  "assurance-habitat": { couleur: "from-[#0F766E] to-[#14B8A6]", Icon: HomeModernIcon, registerType: "personnel", imageUrl: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80&fit=crop" },
};

const ABOUT_IMAGE = "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80&fit=crop&crop=center";

const ADVANTAGE_ICONS = [Gift, Headphones, Lock, Star, Smartphone];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-5 text-left bg-card hover:bg-muted/50 transition-colors">
        <span className="font-semibold text-foreground pr-4">{question}</span>
        {open ? <ChevronUp className="h-5 w-5 text-primary shrink-0" /> : <ChevronDown className="h-5 w-5 text-muted-foreground shrink-0" />}
      </button>
      {open && (
        <div className="px-5 pb-5 bg-card border-t border-border">
          <p className="pt-4 text-muted-foreground text-sm leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

export function OffrePage({ slug }: { slug: string }) {
  const { t } = useLang();
  const o = t.offre;
  const offre = t.offresData[slug];
  const meta = OFFRE_META[slug];

  if (!offre || !meta) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-bold mb-4">{o.offerNotFound}</p>
          <Link href="/"><Button>{o.backToHome}</Button></Link>
        </div>
      </div>
    );
  }

  const { Icon, couleur } = meta;
  const registerHref = `/register${meta.registerType ? `?type=${meta.registerType}` : ""}`;

  return (
    <div className="min-h-screen bg-background flex flex-col">

      <Header />

      {/* ── HERO ── */}
      <section className={`bg-gradient-to-br ${couleur}`}>
        <div className="container max-w-6xl mx-auto px-4 py-20">
          <Link href="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-10 transition-colors">
            <ArrowLeft className="h-4 w-4" />{o.backHome}
          </Link>
          <div className="flex flex-col lg:flex-row items-center gap-12">
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
            <div className="flex-1 hidden lg:block">
              <img src={meta.imageUrl} alt={offre.titre} className="w-full max-w-[460px] h-[320px] object-cover rounded-2xl shadow-2xl mx-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* ── À PROPOS ── */}
      <section className="py-20 bg-white">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <img src={ABOUT_IMAGE} alt={o.manageTitle} className="w-full h-[380px] object-cover rounded-2xl shadow-lg" />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
              <p className="text-sm font-semibold text-secondary uppercase tracking-widest mb-3">{o.yourBank}</p>
              <h2 className="text-3xl font-bold text-foreground mb-6">{o.manageTitle}</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">{o.manageDesc1}</p>
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
            <p className="text-sm font-semibold text-secondary uppercase tracking-widest mb-3">{o.simpleAndFast}</p>
            <h2 className="text-3xl font-bold text-foreground">{o.howToOpen}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {o.openSteps.map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white rounded-2xl border border-border p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mb-3 text-white shadow-md bg-gradient-to-br ${couleur}`}>
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
            <p className="text-sm font-semibold text-secondary uppercase tracking-widest mb-3">{o.totalTransparency}</p>
            <h2 className="text-3xl font-bold text-foreground">{o.ourPricing}</h2>
          </div>
          <div className="overflow-hidden rounded-2xl border border-border shadow-sm">
            <div className="grid grid-cols-2 bg-slate-900 text-white px-6 py-4">
              <span className="font-semibold text-sm">{o.serviceHeader}</span>
              <span className="font-semibold text-sm text-right">{o.priceHeader}</span>
            </div>
            {o.pricing.map((row, i) => (
              <div key={i} className={`grid grid-cols-2 px-6 py-4 items-center border-b border-border last:border-0 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
                <span className="text-sm text-foreground pr-4">{row.service}</span>
                <span className={`text-sm font-bold text-right ${row.free ? 'text-green-600' : 'text-foreground'}`}>{row.tarif}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-4 text-center">{o.pricingNote}</p>
        </div>
      </section>

      {/* ── LES AVANTAGES ── */}
      <section className="py-20 bg-slate-50">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="mb-12">
            <p className="text-sm font-semibold text-secondary uppercase tracking-widest mb-3">{o.ourCommitments}</p>
            <h2 className="text-3xl font-bold text-foreground mb-3">{o.advantagesTitle}</h2>
            <p className="text-muted-foreground max-w-xl">{o.advantagesDesc}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {o.advantages.map(({ title, desc }, i) => {
              const AdvIcon = ADVANTAGE_ICONS[i];
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="bg-white rounded-2xl border border-border p-6 hover:shadow-md hover:border-primary/30 transition-all duration-200">
                  <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <AdvIcon className="h-5 w-5 text-primary" />
                  </div>
                  <h4 className="font-bold text-base mb-2">{title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CONDITIONS D'ÉLIGIBILITÉ ── */}
      <section className="py-20 bg-white">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-sm font-semibold text-secondary uppercase tracking-widest mb-3">{o.whoCanOpen}</p>
              <h2 className="text-3xl font-bold text-foreground mb-8">{o.eligibilityTitle}</h2>
              <ul className="space-y-4 mb-6">
                {o.eligibility.map((c, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{c}</span>
                  </li>
                ))}
              </ul>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800 leading-relaxed">
                {o.eligibilityTip}
              </div>
            </div>
            <div className="bg-slate-50 rounded-2xl border border-border p-8">
              <h3 className="font-bold text-xl mb-6">{o.includedTitle}</h3>
              <ul className="space-y-3 mb-6">
                {offre.avantages.map((av, i) => (
                  <li key={i} className="flex items-start gap-3">
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
            <p className="text-sm font-semibold text-secondary uppercase tracking-widest mb-3">{o.faqTag}</p>
            <h2 className="text-3xl font-bold text-foreground">{o.faqTitle}</h2>
          </div>
          <div className="flex flex-col gap-3">
            {o.faq.map((faq, i) => <FAQItem key={i} question={faq.question} answer={faq.answer} />)}
          </div>
          <div className="text-center mt-10">
            <p className="text-muted-foreground text-sm mb-4">{o.noAnswer}</p>
            <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">{o.contactSupport}</Button>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className={`py-20 px-4 bg-gradient-to-br ${couleur}`}>
        <div className="container max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <div className="flex justify-center mb-6">
              <div className="h-16 w-16 rounded-2xl bg-white/15 flex items-center justify-center">
                <Icon className="h-9 w-9 text-white" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{o.readyTitle}</h2>
            <p className="text-white/85 text-lg mb-10 max-w-xl mx-auto">
              {o.readyDescPrefix} {offre.titre} en moins de 3 minutes.
              {offre.prime && ` ${offre.prime}.`}
            </p>
            <Link href={registerHref}>
              <Button size="lg" className="bg-white text-[#1E3A8A] hover:bg-white/90 font-semibold h-14 px-10 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-base">
                {offre.cta}<ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <p className="text-white/60 text-sm mt-5">{o.noCommitment}</p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
