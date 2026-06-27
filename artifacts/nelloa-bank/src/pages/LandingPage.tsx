import { motion } from "framer-motion";
import { CreditCard, Building, Star, Menu } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">
      {/* HEADER */}
      <header className="sticky top-0 z-50 w-full bg-white shadow-sm border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-xl text-primary flex items-center gap-2">
            NELLOA BANK
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <a href="#offres" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Nos Offres</a>
            <Link href="/login">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">Connexion</Button>
            </Link>
            <Link href="/register">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Ouvrir un compte</Button>
            </Link>
          </nav>

          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6 text-foreground" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col gap-6 pt-12">
              <a href="#offres" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-foreground">Nos Offres</a>
              <Link href="/login" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-foreground">
                Connexion
              </Link>
              <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full bg-primary text-primary-foreground">Ouvrir un compte</Button>
              </Link>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative flex-1 flex items-center justify-center min-h-[600px] bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container relative z-10 px-4 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 max-w-4xl mx-auto tracking-tight">
              La banque qui vous fait confiance
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Ouvrez votre compte en 3 minutes et accédez à votre espace sécurisé.
            </p>
            <Link href="/register">
              <Button size="lg" className="bg-white text-[#1E3A8A] hover:bg-white/90 font-semibold text-base h-14 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                Commencer maintenant
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* OFFRES SECTION */}
      <section id="offres" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Nos Offres</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Des comptes adaptés à vos besoins, avec une prime de bienvenue exceptionnelle.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Card 1 */}
            <div className="bg-card rounded-2xl p-8 border border-border shadow-sm flex flex-col transition-all duration-200 hover:shadow-md">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Compte Personnel</h3>
              <p className="text-muted-foreground mb-6">L'essentiel pour vos dépenses quotidiennes.</p>
              <ul className="space-y-3 mb-8 flex-1">
                <li className="flex items-center gap-2 text-sm"><span className="text-primary font-bold">✓</span> IBAN personnel</li>
                <li className="flex items-center gap-2 text-sm"><span className="text-primary font-bold">✓</span> Carte virtuelle</li>
                <li className="flex items-center gap-2 text-sm"><span className="text-primary font-bold">✓</span> Suivi des dépenses</li>
              </ul>
              <div className="bg-green-50 text-green-700 p-3 rounded-lg mb-6 text-center font-medium text-sm">
                3 200 € offerts à l'ouverture
              </div>
              <Link href="/register?type=personnel">
                <Button variant="outline" className="w-full">Choisir cette offre</Button>
              </Link>
            </div>

            {/* Card 2 */}
            <div className="bg-card rounded-2xl p-8 border-2 border-primary shadow-lg flex flex-col relative transform md:-translate-y-4">
              <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl">
                Populaire
              </div>
              <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center mb-6">
                <Building className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Compte Courant</h3>
              <p className="text-muted-foreground mb-6">Pour une gestion complète de vos finances.</p>
              <ul className="space-y-3 mb-8 flex-1">
                <li className="flex items-center gap-2 text-sm"><span className="text-primary font-bold">✓</span> Virements illimités</li>
                <li className="flex items-center gap-2 text-sm"><span className="text-primary font-bold">✓</span> Domiciliation bancaire</li>
                <li className="flex items-center gap-2 text-sm"><span className="text-primary font-bold">✓</span> Chéquier</li>
              </ul>
              <div className="bg-green-50 text-green-700 p-3 rounded-lg mb-6 text-center font-medium text-sm">
                3 200 € offerts à l'ouverture
              </div>
              <Link href="/register?type=courant">
                <Button className="w-full bg-primary hover:bg-primary/90">Choisir cette offre</Button>
              </Link>
            </div>

            {/* Card 3 */}
            <div className="bg-card rounded-2xl p-8 border border-border shadow-sm flex flex-col transition-all duration-200 hover:shadow-md">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Compte Premium</h3>
              <p className="text-muted-foreground mb-6">L'excellence bancaire sans compromis.</p>
              <ul className="space-y-3 mb-8 flex-1">
                <li className="flex items-center gap-2 text-sm"><span className="text-primary font-bold">✓</span> Conseiller dédié</li>
                <li className="flex items-center gap-2 text-sm"><span className="text-primary font-bold">✓</span> Cashback 2%</li>
                <li className="flex items-center gap-2 text-sm"><span className="text-primary font-bold">✓</span> Carte Gold internationale</li>
              </ul>
              <div className="bg-green-50 text-green-700 p-3 rounded-lg mb-6 text-center font-medium text-sm">
                3 200 € offerts à l'ouverture
              </div>
              <Link href="/register?type=premium">
                <Button variant="outline" className="w-full">Choisir cette offre</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* COMMENT ÇA MARCHE */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Comment ça marche ?</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mb-6">1</div>
              <h4 className="text-xl font-bold mb-2">Je crée mon compte</h4>
              <p className="text-muted-foreground">Remplissez le formulaire en 2 minutes.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mb-6">2</div>
              <h4 className="text-xl font-bold mb-2">Je vérifie mon identité</h4>
              <p className="text-muted-foreground">Déposez votre pièce d'identité en toute sécurité.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mb-6">3</div>
              <h4 className="text-xl font-bold mb-2">J'accède à mes fonds</h4>
              <p className="text-muted-foreground">Votre compte est activé par notre équipe dans les plus brefs délais.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1E3A8A] text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-4">© 2025 NELLOA BANK. Tous droits réservés.</p>
          <div className="flex justify-center gap-6 text-sm text-white/80">
            <a href="#" className="hover:text-white transition-colors">Mentions légales</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
