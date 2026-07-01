import { useEffect, useState, useRef } from "react";
import { useLocation } from "wouter";
import { getSession, getUserById, clearSession, updateUser, User, BIC } from "@/lib/storage";
import { Clock, UploadCloud, LogOut, CheckCircle2, Copy, Check, MessageCircle, ShieldX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useLang } from "@/lib/i18n";

function CopyField({ label, value, copyTitle }: { label: string; value: string; copyTitle: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-border group hover:border-primary/30 transition-colors">
      <div className="min-w-0 flex-1">
        <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
        <p className="font-mono font-semibold text-sm text-foreground break-all">{value}</p>
      </div>
      <button
        onClick={handleCopy}
        className="ml-3 p-2 rounded-lg hover:bg-primary/10 transition-colors text-muted-foreground hover:text-primary shrink-0"
        title={copyTitle}
      >
        {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
      </button>
    </div>
  );
}

function BankCard({ user, d }: { user: User; d: ReturnType<typeof useLang>['t']['dashboard'] }) {
  const last4 = user.id.replace(/[^0-9]/g, '').slice(-4).padStart(4, '0');
  const acctLabels: Record<string, string> = {
    personnel: d.acctPersonnel,
    courant: d.acctCourant,
    premium: d.acctPremium,
    epargne: d.acctEpargne,
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full h-[180px] rounded-2xl relative overflow-hidden shadow-lg select-none"
      style={{ background: 'linear-gradient(135deg, #1E3A8A 0%, #2563EB 60%, #3B82F6 100%)' }}
    >
      <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/5" />
      <div className="absolute -bottom-12 -left-6 w-52 h-52 rounded-full bg-white/5" />

      <div className="relative z-10 h-full flex flex-col justify-between p-5">
        <div className="flex justify-between items-start">
          <span className="text-white font-bold text-sm tracking-wide">NELLOA BANK</span>
          <div className="w-9 h-6 bg-yellow-300/80 rounded-md flex items-center justify-center border border-yellow-500/30">
            <div className="w-6 h-3.5 border border-yellow-600/40 rounded-sm grid grid-cols-2">
              <div className="border-r border-yellow-600/40" />
            </div>
          </div>
        </div>

        <div>
          <p className="text-white/50 text-[10px] uppercase tracking-widest mb-1">{d.cardNumber}</p>
          <p className="text-white font-mono text-sm tracking-widest">•••• •••• •••• {last4}</p>
        </div>

        <div className="flex justify-between items-end">
          <div>
            <p className="text-white/50 text-[10px] uppercase tracking-wider mb-0.5">{d.holder}</p>
            <p className="text-white font-semibold text-xs uppercase tracking-wide">
              {user.firstName} {user.lastName}
            </p>
            <div className="flex gap-3 mt-1">
              <div>
                <p className="text-white/50 text-[10px]">{d.expires}</p>
                <p className="text-white text-xs font-mono">12/28</p>
              </div>
              <div>
                <p className="text-white/50 text-[10px]">{d.cardType}</p>
                <p className="text-white text-xs">{acctLabels[user.accountType] ?? user.accountType}</p>
              </div>
            </div>
          </div>
          <p className="text-white font-black text-xl italic tracking-tight">VISA</p>
        </div>
      </div>
    </motion.div>
  );
}

function BlockedOverlay({ d }: { d: ReturnType<typeof useLang>['t']['dashboard'] }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-8 text-center"
      >
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <ShieldX className="h-8 w-8 text-red-600" />
        </div>
        <h2 className="text-xl font-bold text-foreground mb-2">{d.blockedTitle}</h2>
        <p className="text-muted-foreground text-sm mb-6 leading-relaxed">{d.blockedDesc}</p>
        <Button
          className="w-full gap-2"
          onClick={() => window.open('mailto:contact@nelloabank.com')}
        >
          <MessageCircle className="h-4 w-4" />
          {d.contactSupport}
        </Button>
        <p className="text-muted-foreground text-xs mt-4">
          +33 6 70 85 89 30 · contact@nelloabank.com
        </p>
      </motion.div>
    </div>
  );
}

export function DashboardPage() {
  const [, setLocation] = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useLang();
  const d = t.dashboard;

  useEffect(() => {
    const sessionId = getSession();
    if (!sessionId) { setLocation("/login"); return; }
    getUserById(sessionId).then(userData => {
      if (!userData) { clearSession(); setLocation("/login"); return; }
      setUser(userData);
    });
  }, [setLocation]);

  const handleLogout = () => { clearSession(); setLocation("/login"); };

  const handleUploadDocument = async () => {
    if (!user) return;
    await updateUser(user.id, { kycStatus: 'pending' });
    setUser({ ...user, kycStatus: 'pending' });
    setShowSuccessMsg(true);
    setTimeout(() => setShowSuccessMsg(false), 5000);
  };

  if (!user) return null;

  const balanceFmt = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: user.currency }).format(user.balance);

  return (
    <div className="min-h-[100dvh] bg-slate-50 flex flex-col">
      {user.status === 'blocked' && <BlockedOverlay d={d} />}

      <header className="bg-white border-b border-border h-16 flex items-center px-4 md:px-8 justify-between shrink-0 sticky top-0 z-40">
        <div><img src="/nelloa-logo.jpg" alt="Nelloa Bank" className="h-9 w-auto" /></div>
        <div className="flex items-center gap-2 md:gap-4">
          <span className="text-sm font-medium text-foreground hidden md:inline-block">
            {user.firstName} {user.lastName}
          </span>
          <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground hover:text-destructive">
            <LogOut className="h-4 w-4 mr-1 md:mr-2" />
            <span className="hidden sm:inline">{d.logout}</span>
          </Button>
        </div>
      </header>

      <main className="flex-1 max-w-5xl w-full mx-auto p-3 md:p-8">

        {user.status === 'pending' ? (
          <div className="mt-6 space-y-6 max-w-2xl mx-auto">

            {user.kycStatus === 'rejected' && (
              <div className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-200 flex items-start gap-3">
                <span className="text-xl shrink-0">❌</span>
                <div>
                  <h4 className="font-bold mb-1">{d.kycRejectedTitle}</h4>
                  <p className="text-sm">{d.kycRejectedDesc}</p>
                </div>
              </div>
            )}

            <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex flex-col sm:flex-row items-start sm:items-center gap-3 justify-between">
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-amber-900 text-sm">{d.pendingTitle}</p>
                  <p className="text-amber-700 text-xs mt-0.5">{d.pendingDesc}</p>
                </div>
              </div>
              <Button size="sm" variant="outline" className="border-amber-400 text-amber-800 hover:bg-amber-100 shrink-0 gap-2" onClick={() => window.open('mailto:contact@nelloabank.com')}>
                <MessageCircle className="h-4 w-4" />
                {d.supportBtn}
              </Button>
            </div>

            {showSuccessMsg && (
              <div className="bg-green-50 text-green-700 p-4 rounded-xl border border-green-200 flex items-start gap-3 animate-in fade-in">
                <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold mb-1">{d.docSentTitle}</h4>
                  <p className="text-sm">{d.docSentDesc}</p>
                </div>
              </div>
            )}

            <div className="bg-white border border-border rounded-2xl p-6 md:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center shrink-0">
                  <Clock className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <h2 className="text-lg md:text-xl font-bold">{d.kycTitle}</h2>
                  <p className="text-muted-foreground text-sm">{d.kycDesc}</p>
                </div>
              </div>

              {!showSuccessMsg && (
                <div
                  className="border-2 border-dashed border-primary/30 rounded-xl p-8 bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer group text-center"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input type="file" className="hidden" ref={fileInputRef} accept=".jpg,.png,.pdf" onChange={handleUploadDocument} />
                  <UploadCloud className="h-10 w-10 text-primary/50 mx-auto mb-4 group-hover:text-primary transition-colors" />
                  <p className="font-medium text-foreground mb-2 text-sm md:text-base">{d.uploadLabel}</p>
                  <p className="text-sm text-muted-foreground">{d.uploadFormats}</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in duration-500 mt-4">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
              <div>
                <h1 className="text-2xl md:text-4xl font-bold mb-1">{d.welcome}, {user.firstName} 👋</h1>
                <p className="text-muted-foreground text-sm">{d.welcomeSub}</p>
              </div>
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1.5 rounded-full font-semibold text-sm self-start sm:self-auto">
                <CheckCircle2 className="h-4 w-4" />
                {d.activeTag}
              </div>
            </div>

            <div className="grid lg:grid-cols-5 gap-4 md:gap-6">
              <div className="lg:col-span-3 space-y-4">
                <div className="bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] text-white rounded-2xl p-5 md:p-7 shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 right-0 opacity-10">
                    <svg width="140" height="140" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>
                  </div>
                  <div className="relative z-10">
                    <p className="text-white/70 text-sm font-medium mb-1">{d.balance}</p>
                    <h2 className="text-3xl md:text-5xl font-bold mb-5 break-all">{balanceFmt}</h2>
                    <div className="flex gap-2 flex-wrap">
                      <Button className="bg-white text-primary hover:bg-white/90 font-semibold text-sm">{d.transfer}</Button>
                      <Button variant="outline" className="text-white border-white/30 hover:bg-white/10 hover:text-white text-sm">{d.statement}</Button>
                    </div>
                  </div>
                </div>

                <BankCard user={user} d={d} />
              </div>

              <div className="lg:col-span-2 space-y-4">
                <div className="bg-white border border-border rounded-2xl p-4 md:p-6 shadow-sm space-y-3">
                  <h3 className="font-bold text-base md:text-lg text-foreground">{d.bankCoords}</h3>
                  <CopyField label="IBAN" value={user.iban} copyTitle={d.copyTitle} />
                  <CopyField label="BIC / SWIFT" value={BIC} copyTitle={d.copyTitle} />
                </div>

                <div className="bg-white border border-border rounded-2xl p-4 md:p-6 shadow-sm">
                  <h3 className="font-bold text-base md:text-lg text-foreground mb-3">{d.myAccount}</h3>
                  <div className="space-y-2.5 text-sm">
                    <div className="flex justify-between gap-2">
                      <span className="text-muted-foreground">{d.acctType}</span>
                      <span className="font-semibold capitalize text-right">{user.accountType}</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span className="text-muted-foreground">{d.openedOn}</span>
                      <span className="font-semibold text-right">{new Date(user.createdAt).toLocaleDateString('fr-FR')}</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span className="text-muted-foreground">{d.kyc}</span>
                      <span className="font-semibold text-green-600">{d.kycVerified}</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span className="text-muted-foreground">{d.currency}</span>
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
