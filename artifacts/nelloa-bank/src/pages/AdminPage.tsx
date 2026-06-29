import { useState, useEffect } from "react";
import { getUsers, updateUser, User } from "@/lib/storage";
import { Lock, LogOut, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const accountTypeLabel: Record<string, string> = {
  personnel: "Compte Personnel",
  courant: "Compte Courant",
  premium: "Compte Premium",
  epargne: "Compte Épargne",
};

function DetailRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="flex gap-3">
      <p className="text-xs text-muted-foreground w-40 shrink-0 pt-0.5">{label}</p>
      <p className="font-semibold text-sm text-foreground break-all">{value}</p>
    </div>
  );
}

export function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const auth = sessionStorage.getItem("nelloa_admin_auth");
      if (auth === "true") {
        setIsAuthenticated(true);
        setUsers(getUsers());
      }
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "NELLOA_ADMIN_2025") {
      sessionStorage.setItem("nelloa_admin_auth", "true");
      setIsAuthenticated(true);
      setUsers(getUsers());
      setError("");
    } else {
      setError("Mot de passe incorrect");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("nelloa_admin_auth");
    window.location.reload();
  };

  const refreshData = () => setUsers(getUsers());

  const handleApprove = () => {
    if (selectedUser) {
      updateUser(selectedUser.id, { status: 'active', kycStatus: 'verified' });
      setIsModalOpen(false);
      refreshData();
    }
  };

  const handleReject = () => {
    if (selectedUser) {
      updateUser(selectedUser.id, { status: 'blocked', kycStatus: 'rejected' });
      setIsModalOpen(false);
      refreshData();
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center bg-slate-100 p-4">
        <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-lg text-center">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-xl font-bold text-primary mb-6">NELLOA BANK — Administration</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-center"
            />
            {error && <p className="text-sm text-destructive font-medium">{error}</p>}
            <Button type="submit" className="w-full">Accéder</Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-slate-50 flex flex-col">
      <header className="bg-white border-b border-border h-16 flex items-center px-6 justify-between shrink-0">
        <div className="font-bold text-xl text-primary">NELLOA BANK — Administration</div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={refreshData} className="text-muted-foreground gap-2">
            <RefreshCw className="h-4 w-4" />
            Actualiser
          </Button>
          <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground hover:text-destructive gap-2">
            <LogOut className="h-4 w-4" />
            Déconnexion
          </Button>
        </div>
      </header>

      <main className="flex-1 p-6 md:p-10 max-w-[1400px] w-full mx-auto">
        <div className="bg-white border border-border rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-border flex justify-between items-center">
            <h2 className="text-xl font-bold">Utilisateurs Inscrits</h2>
            <Badge variant="outline" className="bg-slate-100">{users.length} total</Badge>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-muted-foreground uppercase text-xs">
                <tr>
                  <th className="px-5 py-4 font-medium">Nom</th>
                  <th className="px-5 py-4 font-medium">Email</th>
                  <th className="px-5 py-4 font-medium">Type</th>
                  <th className="px-5 py-4 font-medium">KYC</th>
                  <th className="px-5 py-4 font-medium">Statut</th>
                  <th className="px-5 py-4 font-medium">Inscription</th>
                  <th className="px-5 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-muted-foreground">
                      Aucun membre inscrit pour le moment.
                    </td>
                  </tr>
                ) : (
                  users.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-5 py-4 font-medium">{u.firstName} {u.lastName}</td>
                      <td className="px-5 py-4 text-muted-foreground">{u.email}</td>
                      <td className="px-5 py-4">{accountTypeLabel[u.accountType] ?? u.accountType}</td>
                      <td className="px-5 py-4">
                        {u.kycStatus === 'pending' && <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-none">En attente</Badge>}
                        {u.kycStatus === 'verified' && <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-none">Vérifié</Badge>}
                        {u.kycStatus === 'rejected' && <Badge className="bg-red-100 text-red-800 hover:bg-red-100 border-none">Refusé</Badge>}
                      </td>
                      <td className="px-5 py-4">
                        {u.status === 'active'
                          ? <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-none">Actif</Badge>
                          : <Badge className="bg-red-100 text-red-800 hover:bg-red-100 border-none">Bloqué</Badge>}
                      </td>
                      <td className="px-5 py-4 text-muted-foreground">{new Date(u.createdAt).toLocaleDateString('fr-FR')}</td>
                      <td className="px-5 py-4 text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => { setSelectedUser(u); setIsModalOpen(true); }}
                        >
                          Voir le dossier
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* ── Detail modal ── */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">
              Dossier client — {selectedUser?.firstName} {selectedUser?.lastName}
            </DialogTitle>
          </DialogHeader>

          {selectedUser && (
            <div className="space-y-6 pt-2">

              {/* KYC status banner */}
              <div className={`p-4 rounded-xl text-sm font-medium flex items-center gap-2 ${
                selectedUser.kycStatus === 'verified' ? 'bg-green-50 text-green-700 border border-green-200'
                : selectedUser.kycStatus === 'rejected' ? 'bg-red-50 text-red-700 border border-red-200'
                : 'bg-amber-50 text-amber-700 border border-amber-200'
              }`}>
                {selectedUser.kycStatus === 'verified' && '✅ Document KYC vérifié'}
                {selectedUser.kycStatus === 'rejected' && '❌ Document KYC refusé'}
                {selectedUser.kycStatus === 'pending' && '⏳ KYC en attente de vérification'}
                <span className="ml-auto font-normal text-xs">
                  Statut : {selectedUser.status === 'active' ? 'Actif' : 'Bloqué'}
                </span>
              </div>

              {/* Identité */}
              <section>
                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3 border-b border-border pb-2">Identité</h4>
                <div className="space-y-2">
                  <DetailRow label="Nom complet" value={`${selectedUser.firstName} ${selectedUser.lastName}`} />
                  <DetailRow label="Date de naissance" value={selectedUser.birthDate ? new Date(selectedUser.birthDate).toLocaleDateString('fr-FR') : undefined} />
                  <DetailRow label="Nationalité" value={selectedUser.nationality} />
                  <DetailRow label="N° pièce d'identité" value={selectedUser.idNumber} />
                </div>
              </section>

              {/* Contact */}
              <section>
                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3 border-b border-border pb-2">Contact</h4>
                <div className="space-y-2">
                  <DetailRow label="Email" value={selectedUser.email} />
                  <DetailRow label="Téléphone" value={selectedUser.phone} />
                </div>
              </section>

              {/* Adresse */}
              <section>
                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3 border-b border-border pb-2">Adresse postale</h4>
                <div className="space-y-2">
                  <DetailRow label="Rue" value={selectedUser.address} />
                  <DetailRow label="Boîte postale" value={selectedUser.postalBox} />
                  <DetailRow label="Ville" value={selectedUser.city} />
                  <DetailRow label="Code postal" value={selectedUser.postalCode} />
                  <DetailRow label="Pays" value={selectedUser.country} />
                </div>
              </section>

              {/* Compte */}
              <section>
                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3 border-b border-border pb-2">Compte bancaire</h4>
                <div className="space-y-2">
                  <DetailRow label="Type de compte" value={accountTypeLabel[selectedUser.accountType] ?? selectedUser.accountType} />
                  <DetailRow label="IBAN" value={selectedUser.iban} />
                  <DetailRow label="BIC" value={selectedUser.bic} />
                  <DetailRow label="Solde" value={new Intl.NumberFormat('fr-FR', { style: 'currency', currency: selectedUser.currency }).format(selectedUser.balance)} />
                  <DetailRow label="Date d'inscription" value={new Date(selectedUser.createdAt).toLocaleString('fr-FR')} />
                </div>
              </section>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-border">
                <Button onClick={handleApprove} className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                  ✅ Approuver et activer
                </Button>
                <Button onClick={handleReject} variant="outline" className="flex-1 text-red-600 hover:bg-red-50 hover:text-red-700 border-red-200">
                  ❌ Rejeter le dossier
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
