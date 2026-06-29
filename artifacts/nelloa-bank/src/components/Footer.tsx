import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-[#0F172A] text-white py-14">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-10 mb-10">
          <div>
            <Link href="/" className="block mb-3">
              <img src="/nelloa-logo.jpg" alt="Nelloa Bank" className="h-10 w-auto" />
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-3">
              La banque digitale qui vous fait confiance. Ouvrez votre compte en 3 minutes, 100 % en ligne.
            </p>
            <p className="text-white/40 text-xs leading-relaxed">
              LIBRE REPONSE 8975975443<br />
              PARIS CEDEX 09
            </p>
          </div>

          <div>
            <p className="font-semibold text-xs mb-4 text-white/60 uppercase tracking-widest">Liens rapides</p>
            <ul className="space-y-2.5">
              <li><Link href="/" className="text-white/50 text-sm hover:text-white transition-colors">Accueil</Link></li>
              <li><a href="/#offres" className="text-white/50 text-sm hover:text-white transition-colors">Nos offres</a></li>
              <li><a href="/#faq" className="text-white/50 text-sm hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="text-white/50 text-sm hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-xs mb-4 text-white/60 uppercase tracking-widest">Nos comptes</p>
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
            <p className="font-semibold text-xs mb-4 text-white/60 uppercase tracking-widest">Légal</p>
            <ul className="space-y-2.5">
              <li><a href="#" className="text-white/50 text-sm hover:text-white transition-colors">Mentions légales</a></li>
              <li><a href="#" className="text-white/50 text-sm hover:text-white transition-colors">Politique de confidentialité</a></li>
              <li><a href="#" className="text-white/50 text-sm hover:text-white transition-colors">Conditions générales</a></li>
              <li><a href="#" className="text-white/50 text-sm hover:text-white transition-colors">Tarifs</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-sm">© 2026 NELLOA BANK. Tous droits réservés.</p>
          <div className="flex gap-6">
            <a href="#" className="text-white/30 text-sm hover:text-white/70 transition-colors">Mentions légales</a>
            <a href="#" className="text-white/30 text-sm hover:text-white/70 transition-colors">Politique de confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
