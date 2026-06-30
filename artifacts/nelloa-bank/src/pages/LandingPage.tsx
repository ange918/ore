import { motion, useInView } from "framer-motion";
import { ChevronDown, ChevronUp, Quote, Star } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { useLang } from "@/lib/i18n";

import {
  CreditCardIcon,
  BuildingOffice2Icon,
  HomeIcon,
  HomeModernIcon,
  BanknotesIcon,
  TruckIcon,
  ShieldCheckIcon,
  SparklesIcon,
  ArrowTrendingUpIcon,
  LockClosedIcon,
  BoltIcon,
  PhoneArrowUpRightIcon,
  GlobeAltIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-5 text-left bg-card hover:bg-muted/50 transition-colors duration-200">
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

function AnimatedCounter({ end, suffix, label }: { end: number; suffix: string; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let startTime: number | null = null;
    const duration = 1400;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(end);
    };
    requestAnimationFrame(step);
  }, [inView, end]);

  return (
    <div ref={ref} className="text-center">
      <p className="text-4xl md:text-5xl font-bold text-primary tabular-nums">
        {end >= 1000 ? count.toLocaleString('fr-FR') : count}{suffix}
      </p>
      <p className="text-muted-foreground mt-2 text-sm">{label}</p>
    </div>
  );
}

function HeroCard() {
  return (
    <motion.div
      animate={{ y: [0, -14, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      className="hidden lg:block"
    >
      <div className="w-[340px] h-[210px] rounded-3xl relative overflow-hidden shadow-2xl"
        style={{ background: "linear-gradient(135deg, #1a3066 0%, #1e4db7 55%, #3b82f6 100%)" }}>
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/6" />
        <div className="absolute -bottom-16 -left-8 w-64 h-64 rounded-full bg-white/5" />
        <div className="relative z-10 h-full flex flex-col justify-between p-6">
          <div className="flex justify-between items-start">
            <span className="text-white font-bold text-base tracking-wide">NELLOA BANK</span>
            <div className="w-10 h-7 bg-yellow-300/80 rounded-md flex items-center justify-center border border-yellow-500/20">
              <div className="w-7 h-4 border border-yellow-600/40 rounded-sm grid grid-cols-2">
                <div className="border-r border-yellow-600/40" />
              </div>
            </div>
          </div>
          <div>
            <p className="text-white/50 text-[10px] uppercase tracking-widest mb-1">Numéro de carte</p>
            <p className="text-white font-mono text-lg tracking-[0.25em]">•••• •••• •••• 4521</p>
          </div>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-white/50 text-[10px] uppercase tracking-wider mb-0.5">Titulaire</p>
              <p className="text-white font-semibold text-sm uppercase tracking-wide">Jean Dupont</p>
              <div className="flex gap-4 mt-1.5">
                <div><p className="text-white/40 text-[9px] uppercase">Expire</p><p className="text-white/90 text-xs font-mono">12/28</p></div>
                <div><p className="text-white/40 text-[9px] uppercase">CVV</p><p className="text-white/90 text-xs font-mono">•••</p></div>
              </div>
            </div>
            <p className="text-white font-black text-2xl italic tracking-tight">VISA</p>
          </div>
        </div>
      </div>
      <div className="w-[300px] h-[190px] rounded-3xl mx-auto -mt-40 ml-8 opacity-40"
        style={{ background: "linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)" }} />
    </motion.div>
  );
}

const compteHrefs = ["/offres/compte-personnel", "/offres/compte-business", "/offres/carte-bancaire", "/offres/epargne"];
const compteIcons = [CreditCardIcon, BuildingOffice2Icon, SparklesIcon, ArrowTrendingUpIcon];
const comptePopular = [false, true, false, false];
const compteIsNew = [false, false, false, true];

const creditHrefs = ["/credits/pret-immobilier", "/credits/pret-personnel", "/credits/pret-auto"];
const creditIcons = [HomeIcon, BanknotesIcon, TruckIcon];
const creditImages = [
  "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=80&fit=crop",
  "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80&fit=crop",
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80&fit=crop",
];

const assuranceHrefs = ["/assurances/assurance-vie", "/assurances/assurance-habitat"];
const assuranceIcons = [ShieldCheckIcon, HomeModernIcon];
const assuranceImages = [
  "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=600&q=80&fit=crop",
  "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80&fit=crop",
];

const compteImages = [
  "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80&fit=crop",
  "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&q=80&fit=crop",
  "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=600&q=80&fit=crop",
  "https://images.unsplash.com/photo-1579621970795-87facc2f976d?w=600&q=80&fit=crop",
];

const aboutIcons = [LockClosedIcon, BoltIcon, PhoneArrowUpRightIcon, GlobeAltIcon];
const whyIcons = [LockClosedIcon, BoltIcon, PhoneArrowUpRightIcon, GlobeAltIcon];

export function LandingPage() {
  const { t } = useLang();
  const l = t.landing;

  const aboutFeatures = [
    { title: l.aboutF1Title, desc: l.aboutF1Desc },
    { title: l.aboutF2Title, desc: l.aboutF2Desc },
    { title: l.aboutF3Title, desc: l.aboutF3Desc },
    { title: l.aboutF4Title, desc: l.aboutF4Desc },
  ];

  const whyFeatures = [
    { title: l.why1Title, desc: l.why1Desc },
    { title: l.why2Title, desc: l.why2Desc },
    { title: l.why3Title, desc: l.why3Desc },
    { title: l.why4Title, desc: l.why4Desc },
  ];

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">

      <Header />

      {/* HERO */}
      <section className="relative min-h-[680px] overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&q=80&auto=format&fit=crop')" }} />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A8A]/92 via-[#1E3A8A]/82 to-[#3B82F6]/70" />
        <div className="container relative z-10 px-4 py-24">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 justify-between">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="flex-1 text-center lg:text-left max-w-2xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
                {l.heroTitle}
              </h1>
              <p className="text-lg md:text-xl text-white/85 mb-10 max-w-xl lg:max-w-none">
                {l.heroSubtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/register">
                  <Button size="lg" className="bg-white text-[#1E3A8A] hover:bg-white/90 font-semibold text-base h-14 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    {l.heroCta}
                  </Button>
                </Link>
                <a href="#offres">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 h-14 px-8 rounded-full transition-all duration-300">
                    {l.heroOffers}
                  </Button>
                </a>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
              <HeroCard />
            </motion.div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 bg-white border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 max-w-5xl mx-auto">
            <AnimatedCounter end={12000} suffix="+" label={l.statsClients} />
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-primary">99,9 %</p>
              <p className="text-muted-foreground mt-2 text-sm">{l.statsUptime}</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-primary">0 €</p>
              <p className="text-muted-foreground mt-2 text-sm">{l.statsNoFees}</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-primary">ISO</p>
              <p className="text-muted-foreground mt-2 text-sm">{l.statsIso}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-20 bg-white border-b border-border">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <p className="text-sm font-semibold text-secondary uppercase tracking-widest mb-3">{l.aboutTag}</p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">{l.aboutTitle}</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">{l.aboutP1}</p>
              <p className="text-muted-foreground leading-relaxed mb-8">{l.aboutP2}</p>
              <div className="grid grid-cols-3 gap-6">
                {[
                  { value: "12 000+", label: l.aboutStatClients },
                  { value: "99,9 %", label: l.aboutStatUptime },
                  { value: "7j/7", label: l.aboutStatSupport },
                ].map((stat) => (
                  <div key={stat.label} className="text-center p-4 bg-slate-50 rounded-xl border border-border">
                    <p className="text-2xl font-bold text-primary">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="grid grid-cols-2 gap-4">
              {aboutFeatures.map(({ title, desc }, i) => {
                const Icon = aboutIcons[i];
                return (
                  <div key={title} className="p-5 bg-card border border-border rounded-2xl hover:border-primary/30 hover:shadow-sm transition-all duration-200">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h4 className="font-bold text-sm text-foreground mb-1">{title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* OFFRES */}
      <section id="offres" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{l.offresTitle}</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{l.offresSubtitle}</p>
          </div>

          {/* Compte Bancaire */}
          <div className="mb-16 max-w-6xl mx-auto">
            <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <span className="h-8 w-1 rounded-full bg-primary inline-block" />{l.offresCompte}
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {l.compteCards.map((offre, i) => {
                const Icon = compteIcons[i];
                return (
                  <div key={compteHrefs[i]} className={`bg-card rounded-2xl border overflow-hidden flex flex-col transition-all duration-200 hover:shadow-md ${comptePopular[i] ? "border-2 border-primary shadow-md" : "border-border"}`}>
                    <div className="h-40 overflow-hidden relative">
                      <img src={compteImages[i]} alt={offre.titre} className="w-full h-full object-cover" />
                      {comptePopular[i] && <div className="absolute top-2.5 right-2.5 bg-primary text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">{l.popular}</div>}
                      {compteIsNew[i] && <div className="absolute top-2.5 right-2.5 bg-teal-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">{l.isNew}</div>}
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${comptePopular[i] ? 'bg-primary' : 'bg-primary/10'}`}>
                          <Icon className={`h-4 w-4 ${comptePopular[i] ? 'text-white' : 'text-primary'}`} />
                        </div>
                        <h4 className="text-base font-bold">{offre.titre}</h4>
                      </div>
                      <p className="text-muted-foreground text-sm mb-4 flex-1">{offre.desc}</p>
                      <ul className="space-y-1.5 mb-4">
                        {offre.avantages.map((a) => (
                          <li key={a} className="flex items-center gap-2 text-sm">
                            <CheckCircleIcon className="h-4 w-4 text-primary shrink-0" />{a}
                          </li>
                        ))}
                      </ul>
                      <Link href={compteHrefs[i]}>
                        <Button className="w-full text-sm" variant={comptePopular[i] ? "default" : "outline"}>
                          {l.discover}
                        </Button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Crédit Bancaire */}
          <div className="mb-16 max-w-6xl mx-auto">
            <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <span className="h-8 w-1 rounded-full bg-secondary inline-block" />{l.offresCredit}
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {l.creditCards.map((c, i) => {
                const Icon = creditIcons[i];
                return (
                  <Link key={creditHrefs[i]} href={creditHrefs[i]} className="group bg-card rounded-2xl border border-border overflow-hidden flex flex-col hover:border-primary/30 hover:shadow-md transition-all duration-200">
                    <div className="h-44 overflow-hidden">
                      <img src={creditImages[i]} alt={c.titre} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <h4 className="text-lg font-bold">{c.titre}</h4>
                      </div>
                      <p className="text-muted-foreground text-sm mb-3 flex-1">{c.desc}</p>
                      <span className="inline-block text-xs font-semibold text-secondary bg-blue-50 px-3 py-1 rounded-full mb-4 w-fit">{c.tag}</span>
                      <span className="text-sm text-primary font-semibold group-hover:underline">{l.learnMore}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Assurance */}
          <div className="max-w-6xl mx-auto">
            <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <span className="h-8 w-1 rounded-full bg-purple-500 inline-block" />{l.offresAssurance}
            </h3>
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl">
              {l.assuranceCards.map((a, i) => {
                const Icon = assuranceIcons[i];
                return (
                  <Link key={assuranceHrefs[i]} href={assuranceHrefs[i]} className="group bg-card rounded-2xl border border-border overflow-hidden flex flex-col hover:border-primary/30 hover:shadow-md transition-all duration-200">
                    <div className="h-40 overflow-hidden">
                      <img src={assuranceImages[i]} alt={a.titre} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-6 flex gap-4">
                      <div className="h-11 w-11 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors mt-0.5">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold mb-1">{a.titre}</h4>
                        <p className="text-muted-foreground text-sm mb-3 leading-relaxed">{a.desc}</p>
                        <span className="inline-block text-xs font-semibold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">{a.tag}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* COMMENT ÇA MARCHE */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{l.howTitle}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { n: "1", Icon: CreditCardIcon, title: l.how1Title, desc: l.how1Desc },
              { n: "2", Icon: LockClosedIcon, title: l.how2Title, desc: l.how2Desc },
              { n: "3", Icon: BanknotesIcon, title: l.how3Title, desc: l.how3Desc },
            ].map(({ n, Icon, title, desc }) => (
              <div key={n} className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center mb-4 text-2xl font-bold shadow-md">{n}</div>
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h4 className="text-xl font-bold mb-2">{title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POURQUOI NOUS */}
      <section id="pourquoi" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-secondary uppercase tracking-widest mb-3">{l.whyTag}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{l.whyTitle}</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{l.whySubtitle}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {whyFeatures.map(({ title, desc }, i) => {
              const Icon = whyIcons[i];
              return (
                <motion.div key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex flex-col items-center text-center p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-md transition-all duration-200">
                  <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <h4 className="text-lg font-bold mb-2">{title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
                </motion.div>
              );
            })}
          </div>
          <div className="mt-16 bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] rounded-2xl p-10 text-center max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{l.whyBannerTitle}</h3>
            <p className="text-white/80 mb-8">{l.whyBannerDesc}</p>
            <Link href="/register">
              <Button size="lg" className="bg-white text-[#1E3A8A] hover:bg-white/90 font-semibold h-12 px-8 rounded-full">
                {l.whyBannerBtn}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* TÉMOIGNAGES */}
      <section id="temoignages" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-secondary uppercase tracking-widest mb-3">{l.testimonialsTag}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{l.testimonialsTitle}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {l.testimonials.map((testimonial, i) => (
              <motion.div key={testimonial.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-card rounded-2xl p-8 border border-border shadow-sm flex flex-col gap-5 hover:shadow-md transition-all duration-200">
                <Quote className="h-8 w-8 text-primary/30" />
                <p className="text-foreground leading-relaxed flex-1">"{testimonial.text}"</p>
                <div className="flex items-center gap-4 pt-2 border-t border-border">
                  <div className="h-11 w-11 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm shrink-0">{testimonial.initials}</div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{testimonial.name}</p>
                    <p className="text-muted-foreground text-xs">{testimonial.role}</p>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {[...Array(5)].map((_, s) => <Star key={s} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-secondary uppercase tracking-widest mb-3">{l.faqTag}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{l.faqTitle}</h2>
          </div>
          <div className="max-w-3xl mx-auto flex flex-col gap-3">
            {l.faqs.map((faq) => <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />)}
          </div>
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">{l.faqNoAnswer}</p>
            <Button variant="outline" className="border-primary text-primary hover:bg-primary/5" onClick={() => window.open('mailto:contact@nelloabank.com')}>{l.faqContact}</Button>
            <p className="text-muted-foreground text-sm mt-4">+33 6 70 85 89 30 · contact@nelloabank.com</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
