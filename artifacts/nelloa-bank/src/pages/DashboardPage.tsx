import { useEffect, useState, useRef } from "react";
import { useLocation } from "wouter";
import { getSession, getUserById, clearSession, updateUser, User, BIC } from "@/lib/storage";
import { Clock, UploadCloud, LogOut, CheckCircle2, Copy, Check, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

function CopyField({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-border group hover:border-primary/30 transition-colors">
      <div>
        <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
        <p className="font-mono font-semibold text-sm text-foreground">{value}</p>
      </div>
      <button
        onClick={handleCopy}
        className="ml-3 p-2 rounded-lg hover:bg-primary/10 transition-colors text-muted-foreground hover:text-primary"
        title="Copier"
      >
        {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
      </button>
    </div>
  );
}

function BankCard({ user }: { user: User }) {
  const last4 = user.id.replace(/[^0-9]/g, '').slice(-4).padStart(4, '0');
  const accountLabels: Record<string, string> = {
    personnel: 'Compte Personnel',
    courant: 'Compte Courant',
    premium: 'Compte Premium',
    epargne: 'Compte Épargne',
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-sm h-[190px] rounded-2xl relative overflow-hidden shadow-lg select-none"
      style={{ background: 'linear-gradient(135deg, #1E3A8A 0%, #2563EB 60%, #3B82F6 100%)' }}
    >
      {/* Background circles */}
      <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/5" />
      <div className="absolute -bottom-12 -left-6 w-52 h-52 rounded-full bg-white/5" />

      <div className="relative z-10 h-full flex flex-col justify-between p-5">
        {/* Top row */}
        <div className="flex justify-between items-start">
          <span className="text-white font-bold text-sm tracking-wide">NELLOA BANK</span>
          {/* Chip */}
          <div className="w-9 h-6 bg-yellow-300/80 rounded-md flex items-center justify-center border border-yellow-500/30">
            <div className="w-6 h-3.5 border border-yellow-600/40 rounded-sm grid grid-cols-2">
              <div className="border-r border-yellow-600/40" />
            </div>
          </div>
        </div>

        {/* Card number */}
        <div>
          <p className="text-white/50 text-[10px] uppercase tracking-widest mb-1">Numéro de carte</p>
          <p className="text-white font-mono text-base tracking-widest">•••• •••• •••• {last4}</p>
        </div>

        {/* Bottom row */}
        <div className="flex justify-between items-end">
          <div>
            <p className="text-white/50 text-[10px] uppercase tracking-wider mb-0.5">Titulaire</p>
            <p className="text-white font-semibold text-sm uppercase tracking-wide">
              {user.firstName} {user.lastName}
            </p>
            <div className="flex gap-3 mt-1">
              <div>
                <p className="text-white/50 text-[10px]">Expire</p>
                <p className="text-white text-xs font-mono">12/28</p>
              </div>
              <div>
                <p className="text-white/50 text-[10px]">Type</p>
                <p className="text-white text-xs">{accountLabels[user.accountType]}</p>
              </div>
            </div>
          </div>
          <p className="text-white font-black text-xl italic tracking-tight">VISA</p>
        </div>
      </div>
    </motion.div>
  );
}

export function DashboardPage() {
  const [, setLocation] = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const sessionId = getSession();
    if (!sessionId) { setLocation("/login"); return; }
    const userData = getUserById(sessionId);
    if (!userData) { clearSession(); setLocation("/login"); return; }
    setUser(userData);
  }, [setLocation]);

  const handleLogout = () => { clearSession(); setLocation("/login"); };

  const handleUploadDocument = () => {
    if (!user) return;
    updateUser(user.id, { kycStatus: 'pending' });
    setUser({ ...user, kycStatus: 'pending' });
    setShowSuccessMsg(true);
    setTimeout(() => setShowSuccessMsg(false), 5000);
  };

  if (!user) return null;

  const balanceFmt = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: user.currency }).format(user.balance);

  return (
    <div className="min-h-[100dvh] bg-slate-50 flex flex-col">
      <header className="bg-white border-b border-border h-16 flex items-center px-4 md:px-8 justify-between shrink-0 sticky top-0 z-40">
        <div className="font-bold text-xl text-primary">NELLOA BANK</div>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-foreground hidden md:inline-block">
            {user.firstName} {user.lastName}
          </span>
          <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground hover:text-destructive">
            <LogOut className="h-4 w-4 mr-2" />
            Déconnexion
          </Button>
        </div>
      </header>

      {/* ── Blocked banner — full width ── */}
      {user.status === 'blocked' && (
        <div className="bg-amber-50 border-b-2 border-amber-300 px-4 py-3">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-3 justify-between">
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-amber-900 text-sm">Compte en cours de validation</p>
                <p className="text-amber-700 text-xs mt-0.5">
                  Votre dossier est examiné par notre équipe. La prime de bienvenue de 3 200 € sera créditée automatiquement après activation. Soumettez votre pièce d'identité ci-dessous pour accélérer la validation.
                </p>
              </div>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="border-amber-400 text-amber-800 hover:bg-amber-100 shrink-0 gap-2"
              onClick={() => window.open('mailto:support@nelloabank.com')}
            >
              <MessageCircle className="h-4 w-4" />
              Contacter le support
            </Button>
          </div>
        </div>
      )}

      <main className="flex-1 max-w-5xl w-full mx-auto p-4 md:p-8">

        {user.status === 'blocked' ? (
          <div className="mt-6 space-y-6 max-w-2xl mx-auto">

            {/* KYC rejected alert */}
            {user.kycStatus === 'rejected' && (
              <div className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-200 flex items-start gap-3">
                <span className="text-xl shrink-0">❌</span>
                <div>
                  <h4 className="font-bold mb-1">Votre document a été refusé</h4>
                  <p className="text-sm">Veuillez soumettre un nouveau document valide (carte d'identité, passeport).</p>
                </div>
              </div>
            )}

            {/* Success message */}
            {showSuccessMsg && (
              <div className="bg-green-50 text-green-700 p-4 rounded-xl border border-green-200 flex items-start gap-3 animate-in fade-in">
                <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold mb-1">Document envoyé</h4>
                  <p className="text-sm">Notre équipe vérifie votre identité sous 24h.</p>
                </div>
              </div>
            )}

            {/* Upload zone */}
            <div className="bg-white border border-border rounded-2xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <Clock className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Vérification d'identité requise</h2>
                  <p className="text-muted-foreground text-sm">Soumettez votre pièce d'identité pour activer votre compte et débloquer votre prime de bienvenue de 3 200 €.</p>
                </div>
              </div>

              {!showSuccessMsg && (
                <div
                  className="border-2 border-dashed border-primary/30 rounded-xl p-10 bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer group text-center"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input type="file" className="hidden" ref={fileInputRef} accept=".jpg,.png,.pdf" onChange={handleUploadDocument} />
                  <UploadCloud className="h-10 w-10 text-primary/50 mx-auto mb-4 group-hover:text-primary transition-colors" />
                  <p className="font-medium text-foreground mb-2">Glissez votre pièce d'identité ici ou cliquez pour parcourir</p>
                  <p className="text-sm text-muted-foreground">Formats acceptés : JPG, PNG, PDF — Max 10 Mo</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-8 animate-in fade-in duration-500 mt-4">
            {/* Welcome */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">Bienvenue, {user.firstName} 👋</h1>
                <p className="text-muted-foreground">Gérez vos finances en toute simplicité.</p>
              </div>
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full font-semibold text-sm">
                <CheckCircle2 className="h-4 w-4" />
                Compte actif
              </div>
            </div>

            {/* Main grid */}
            <div className="grid lg:grid-cols-5 gap-6">
              {/* Left: balance card + card visual */}
              <div className="lg:col-span-3 space-y-6">
                {/* Balance */}
                <div className="bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] text-white rounded-2xl p-7 shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 right-0 opacity-10">
                    <svg width="140" height="140" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>
                  </div>
                  <div className="relative z-10">
                    <p className="text-white/70 text-sm font-medium mb-1 capitalize">Solde disponible</p>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">{balanceFmt}</h2>
                    <div className="flex gap-3 flex-wrap">
                      <Button className="bg-white text-primary hover:bg-white/90 font-semibold">Faire un virement</Button>
                      <Button variant="outline" className="text-white border-white/30 hover:bg-white/10 hover:text-white">Relevé</Button>
                    </div>
                  </div>
                </div>

                {/* Bank card visual */}
                <BankCard user={user} />
              </div>

              {/* Right: IBAN + infos */}
              <div className="lg:col-span-2 space-y-4">
                <div className="bg-white border border-border rounded-2xl p-6 shadow-sm space-y-4">
                  <h3 className="font-bold text-lg text-foreground">Coordonnées bancaires</h3>
                  <CopyField label="IBAN" value={user.iban} />
                  <CopyField label="BIC / SWIFT" value={BIC} />
                </div>

                <div className="bg-white border border-border rounded-2xl p-6 shadow-sm">
                  <h3 className="font-bold text-lg text-foreground mb-4">Mon compte</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Type</span>
                      <span className="font-semibold capitalize">{user.accountType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Ouvert le</span>
                      <span className="font-semibold">{new Date(user.createdAt).toLocaleDateString('fr-FR')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">KYC</span>
                      <span className="font-semibold text-green-600">Vérifié ✓</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Devise</span>
                      <span className="font-semibold">{user.currency}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
