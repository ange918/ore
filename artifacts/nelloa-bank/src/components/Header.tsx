import { useState } from "react";
import { Link } from "wouter";
import { Menu, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  CreditCardIcon, BuildingOffice2Icon, HomeIcon, HomeModernIcon,
  BanknotesIcon, TruckIcon, ShieldCheckIcon, SparklesIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";
import { useLang, LANGUAGES } from "@/lib/i18n";

function LanguagePicker() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const current = LANGUAGES.find((l) => l.code === lang)!;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors px-2 py-1.5 rounded-lg hover:bg-primary/5"
      >
        <Globe className="h-4 w-4" />
        <span>{current.flag}</span>
        <svg className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute top-full right-0 mt-1 w-44 bg-white rounded-xl shadow-xl border border-border p-1.5 z-50">
            {LANGUAGES.map((l) => (
              <button
                key={l.code}
                onClick={() => { setLang(l.code); setOpen(false); }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${lang === l.code ? "bg-primary/10 text-primary font-semibold" : "hover:bg-slate-50 text-foreground"}`}
              >
                <span className="text-base">{l.flag}</span>
                {l.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function DropdownMenu({ label, items }: { label: string; items: { label: string; href: string; Icon: React.ElementType; desc: string }[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button className="text-sm font-medium text-foreground hover:text-primary transition-colors flex items-center gap-1 py-2">
        {label}
        <svg className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-xl border border-border p-2 z-50">
          {items.map((item) => (
            <Link key={item.href} href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-primary/5 transition-colors group">
              <item.Icon className="h-4 w-4 text-primary shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground group-hover:text-primary">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLang();

  const navMenus = [
    {
      label: t.nav.compte,
      items: [
        { label: t.comptes.personnel, href: "/offres/compte-personnel", Icon: CreditCardIcon, desc: t.comptes.personnelDesc },
        { label: t.comptes.business, href: "/offres/compte-business", Icon: BuildingOffice2Icon, desc: t.comptes.businessDesc },
        { label: t.comptes.carte, href: "/offres/carte-bancaire", Icon: SparklesIcon, desc: t.comptes.carteDesc },
        { label: t.comptes.epargne, href: "/offres/epargne", Icon: ArrowTrendingUpIcon, desc: t.comptes.epargneDesc },
      ],
    },
    {
      label: t.nav.credit,
      items: [
        { label: t.credits.immo, href: "/credits/pret-immobilier", Icon: HomeIcon, desc: t.credits.immoDesc },
        { label: t.credits.perso, href: "/credits/pret-personnel", Icon: BanknotesIcon, desc: t.credits.persoDesc },
        { label: t.credits.auto, href: "/credits/pret-auto", Icon: TruckIcon, desc: t.credits.autoDesc },
      ],
    },
    {
      label: t.nav.assurance,
      items: [
        { label: t.assurances.vie, href: "/assurances/assurance-vie", Icon: ShieldCheckIcon, desc: t.assurances.vieDesc },
        { label: t.assurances.habitat, href: "/assurances/assurance-habitat", Icon: HomeModernIcon, desc: t.assurances.habitatDesc },
      ],
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/"><img src="/nelloa-logo.jpg" alt="Nelloa Bank" className="h-9 w-auto" /></Link>

        <nav className="hidden lg:flex items-center gap-6">
          {navMenus.map((m) => <DropdownMenu key={m.label} label={m.label} items={m.items} />)}
          <a href="/#pourquoi" className="text-sm font-medium text-foreground hover:text-primary transition-colors">{t.nav.pourquoi}</a>
          <a href="/#faq" className="text-sm font-medium text-foreground hover:text-primary transition-colors">{t.nav.faq}</a>
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          <LanguagePicker />
          <Link href="/login"><Button variant="outline" className="border-primary text-primary hover:bg-primary/5">{t.header.login}</Button></Link>
          <Link href="/register"><Button className="bg-primary text-primary-foreground hover:bg-primary/90">{t.header.open}</Button></Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguagePicker />
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon"><Menu className="h-6 w-6" /></Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col gap-0 pt-10 overflow-y-auto">
              {navMenus.map((m) => (
                <div key={m.label} className="mb-4">
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground px-2 mb-2">{m.label}</p>
                  {m.items.map((item) => (
                    <Link key={item.href} href={item.href} onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-3 px-2 py-2.5 text-sm font-medium text-foreground hover:text-primary rounded-lg hover:bg-primary/5 transition-colors">
                      <item.Icon className="h-4 w-4 text-primary" />{item.label}
                    </Link>
                  ))}
                </div>
              ))}
              <div className="border-t border-border pt-4 flex flex-col gap-3 mt-2">
                <Link href="/login" onClick={() => setIsMenuOpen(false)}><Button variant="outline" className="w-full border-primary text-primary">{t.header.login}</Button></Link>
                <Link href="/register" onClick={() => setIsMenuOpen(false)}><Button className="w-full bg-primary text-white">{t.header.open}</Button></Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
