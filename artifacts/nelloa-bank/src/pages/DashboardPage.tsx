import { useEffect, useState, useRef } from "react";
import { useLocation } from "wouter";
import { getSession, getUserById, clearSession, updateUser, User } from "@/lib/storage";
import { Lock, UploadCloud, LogOut, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DashboardPage() {
  const [, setLocation] = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const sessionId = getSession();
    if (!sessionId) {
      setLocation("/login");
      return;
    }
    
    const userData = getUserById(sessionId);
    if (!userData) {
      clearSession();
      setLocation("/login");
      return;
    }
    
    setUser(userData);
  }, [setLocation]);

  const handleLogout = () => {
    clearSession();
    setLocation("/login");
  };

  const handleUploadDocument = () => {
    if (!user) return;
    updateUser(user.id, { kycStatus: 'pending' });
    setUser({ ...user, kycStatus: 'pending' });
    setShowSuccessMsg(true);
    setTimeout(() => setShowSuccessMsg(false), 5000);
  };

  if (!user) return null;

  return (
    <div className="min-h-[100dvh] bg-slate-50 flex flex-col">
      <header className="bg-white border-b border-border h-16 flex items-center px-4 md:px-8 justify-between shrink-0">
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

      <main className="flex-1 max-w-5xl w-full mx-auto p-4 md:p-8">
        
        {user.status === 'blocked' ? (
          <div className="bg-white border border-border rounded-2xl p-8 shadow-sm text-center max-w-2xl mx-auto mt-8">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Lock className="h-8 w-8 text-amber-600" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Votre compte est bloqué</h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Pour activer votre compte et accéder à vos 3 200 €, veuillez soumettre une pièce d'identité valide.
            </p>

            {user.kycStatus === 'rejected' && (
              <div className="bg-red-50 text-red-700 p-4 rounded-xl mb-8 flex items-start text-left">
                <span className="text-xl mr-3">❌</span>
                <div>
                  <h4 className="font-bold mb-1">Votre document a été refusé</h4>
                  <p className="text-sm">Veuillez soumettre un nouveau document valide (carte d'identité, passeport).</p>
                </div>
              </div>
            )}

            {showSuccessMsg && (
              <div className="bg-green-50 text-green-700 p-4 rounded-xl mb-8 flex items-start text-left animate-in fade-in">
                <span className="text-xl mr-3">✅</span>
                <div>
                  <h4 className="font-bold mb-1">Document envoyé</h4>
                  <p className="text-sm">Notre équipe vérifie votre identité sous 24h.</p>
                </div>
              </div>
            )}

            {(user.kycStatus === 'pending' || user.kycStatus === 'rejected') && !showSuccessMsg && (
              <div 
                className="border-2 border-dashed border-primary/30 rounded-xl p-10 bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer group"
                onClick={() => fileInputRef.current?.click()}
              >
                <input type="file" className="hidden" ref={fileInputRef} accept=".jpg,.png,.pdf" onChange={handleUploadDocument} />
                <UploadCloud className="h-10 w-10 text-primary/50 mx-auto mb-4 group-hover:text-primary transition-colors" />
                <p className="font-medium text-foreground mb-2">Glissez votre pièce d'identité ici ou cliquez pour parcourir</p>
                <p className="text-sm text-muted-foreground">Formats acceptés : JPG, PNG, PDF</p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-8 animate-in fade-in duration-500 mt-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">Bienvenue, {user.firstName} 👋</h1>
                <p className="text-muted-foreground">Gérez vos finances en toute simplicité.</p>
              </div>
              <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full font-semibold text-sm">
                Compte actif ✅
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* BALANCE CARD */}
              <div className="bg-primary text-primary-foreground rounded-2xl p-6 shadow-lg lg:col-span-2 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-10">
                  <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>
                </div>
                <div className="relative z-10">
                  <p className="text-primary-foreground/80 font-medium mb-1 capitalize">Compte {user.accountType}</p>
                  <h2 className="text-4xl md:text-5xl font-bold mb-6">
                    {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: user.currency }).format(user.balance)}
                  </h2>
                  <div className="flex gap-4">
                    <Button className="bg-white text-primary hover:bg-white/90">Faire un virement</Button>
                    <Button variant="outline" className="text-white border-white/30 hover:bg-white/10 hover:text-white">Relevé d'identité</Button>
                  </div>
                </div>
              </div>

              {/* DETAILS CARD */}
              <div className="bg-white border border-border rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-lg mb-4 text-foreground">Informations</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Ouverture le</p>
                      <p className="font-medium">{new Date(user.createdAt).toLocaleDateString('fr-FR')}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Statut KYC</p>
                      <p className="font-medium text-green-600">Vérifié</p>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" className="w-full mt-6 justify-start text-primary p-0 hover:bg-transparent hover:underline">Voir les paramètres</Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
