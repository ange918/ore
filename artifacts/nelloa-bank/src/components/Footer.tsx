import { Link } from "wouter";
import { Phone, Mail } from "lucide-react";
import { useLang } from "@/lib/i18n";

export function Footer() {
  const { t } = useLang();
  const f = t.footer;

  return (
    <footer className="bg-[#0F172A] text-white py-14">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-10 mb-10">
          <div>
            <Link href="/" className="block mb-3">
              <img src="/nelloa-logo.jpg" alt="Nelloa Bank" className="h-10 w-auto" />
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-3">{f.tagline}</p>
            <p className="text-white/40 text-xs leading-relaxed mb-3">
              LIBRE REPONSE 8975975443<br />
              PARIS CEDEX 09
            </p>
            <a href="tel:+33670858930" className="flex items-center gap-2 text-white/50 text-sm hover:text-white transition-colors mb-1.5">
              <Phone className="h-3.5 w-3.5 shrink-0" />
              +33 6 70 85 89 30
            </a>
            <a href="mailto:contact@nelloabank.com" className="flex items-center gap-2 text-white/50 text-sm hover:text-white transition-colors">
              <Mail className="h-3.5 w-3.5 shrink-0" />
              contact@nelloabank.com
            </a>
          </div>

          <div>
            <p className="font-semibold text-xs mb-4 text-white/60 uppercase tracking-widest">{f.quickLinks}</p>
            <ul className="space-y-2.5">
              <li><Link href="/" className="text-white/50 text-sm hover:text-white transition-colors">{f.home}</Link></li>
              <li><a href="/#offres" className="text-white/50 text-sm hover:text-white transition-colors">{f.offers}</a></li>
              <li><a href="/#faq" className="text-white/50 text-sm hover:text-white transition-colors">{f.faq}</a></li>
              <li><a href="mailto:contact@nelloabank.com" className="text-white/50 text-sm hover:text-white transition-colors">{f.contact}</a></li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-xs mb-4 text-white/60 uppercase tracking-widest">{f.accounts}</p>
            <ul className="space-y-2.5">
              <li><Link href="/offres/compte-personnel" className="text-white/50 text-sm hover:text-white transition-colors">Compte Personnel</Link></li>
              <li><Link href="/offres/compte-business" className="text-white/50 text-sm hover:text-white transition-colors">Compte Business</Link></li>
              <li><Link href="/offres/carte-bancaire" className="text-white/50 text-sm hover:text-white transition-colors">Carte Bancaire</Link></li>
              <li><Link href="/offres/epargne" className="text-white/50 text-sm hover:text-white transition-colors">Compte Épargne</Link></li>
              <li><Link href="/credits/pret-immobilier" className="text-white/50 text-sm hover:text-white transition-colors">Prêt Immobilier</Link></li>
              <li><Link href="/credits/pret-personnel" className="text-white/50 text-sm hover:text-white transition-colors">Prêt Personnel</Link></li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-xs mb-4 text-white/60 uppercase tracking-widest">{f.legal}</p>
            <ul className="space-y-2.5">
              <li><a href="#" className="text-white/50 text-sm hover:text-white transition-colors">{f.legalNotice}</a></li>
              <li><a href="#" className="text-white/50 text-sm hover:text-white transition-colors">{f.privacy}</a></li>
              <li><a href="#" className="text-white/50 text-sm hover:text-white transition-colors">{f.terms}</a></li>
              <li><a href="#" className="text-white/50 text-sm hover:text-white transition-colors">{f.fees}</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-sm">{f.copyright}</p>
          <div className="flex gap-6">
            <a href="#" className="text-white/30 text-sm hover:text-white/70 transition-colors">{f.legalNotice}</a>
            <a href="#" className="text-white/30 text-sm hover:text-white/70 transition-colors">{f.privacy}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
