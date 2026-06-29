import { useState, useEffect } from "react";
import { getUsers, updateUser, User } from "@/lib/storage";
import { Lock, LogOut, RefreshCw, Clock, CheckCircle2, Users } from "lucide-react";
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

function UserTable({
  users,
  onSelect,
}: {
  users: User[];
  onSelect: (u: User) => void;
}) {
  if (users.length === 0) {
    return (
      <div className="px-6 py-16 text-center text-muted-foreground">
        Aucun dossier dans cette catégorie.
      </div>
    );
  }
  return (
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
          {users.map((u) => (
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
                {u.status === 'active' && <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-none">Actif</Badge>}
                {u.status === 'blocked' && <Badge className="bg-red-100 text-red-800 hover:bg-red-100 border-none">Bloqué</Badge>}
                {u.status === 'pending' && <Badge className="bg-slate-100 text-slate-700 hover:bg-slate-100 border-none">En attente</Badge>}
              </td>
              <td className="px-5 py-4 text-muted-foreground">{new Date(u.createdAt).toLocaleDateString('fr-FR')}</td>
              <td className="px-5 py-4 text-right">
                <Button variant="outline" size="sm" onClick={() => onSelect(u)}>
                  Voir le dossier
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<'pending' | 'processed'>('pending');

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBalance, setNewBalance] = useState("");
  const [saving, setSaving] = useState(false);

  const loadUsers = async () => {
    setLoading(true);
    const data = await getUsers();
    setUsers(data);
    setLoading(false);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const auth = sessionStorage.getItem("nelloa_admin_auth");
      if (auth === "true") {
        setIsAuthenticated(true);
        loadUsers();
      }
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "NELLOA_ADMIN_2025") {
      sessionStorage.setItem("nelloa_admin_auth", "true");
      setIsAuthenticated(true);
      loadUsers();
      setError("");
    } else {
      setError("Mot de passe incorrect");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("nelloa_admin_auth");
    window.location.reload();
  };

  const openModal = (u: User) => {
    setSelectedUser(u);
    setNewBalance(String(u.balance));
    setIsModalOpen(true);
  };

  const handleApprove = async () => {
    if (!selectedUser) return;
    setSaving(true);
    await updateUser(selectedUser.id, { status: 'active', kycStatus: 'verified' });
    setIsModalOpen(false);
    await loadUsers();
    setSaving(false);
  };

  const handleReject = async () => {
    if (!selectedUser) return;
    setSaving(true);
    await updateUser(selectedUser.id, { status: 'pending', kycStatus: 'rejected' });
    setIsModalOpen(false);
    await loadUsers();
    setSaving(false);
  };

  const handleBlock = async () => {
    if (!selectedUser) return;
    setSaving(true);
    await updateUser(selectedUser.id, { status: 'blocked' });
    setIsModalOpen(false);
    await loadUsers();
    setSaving(false);
  };

  const handleSetBalance = async () => {
    if (!selectedUser) return;
    const amount = parseFloat(newBalance);
    if (isNaN(amount)) return;
    setSaving(true);
    await updateUser(selectedUser.id, { balance: amount });
    setSelectedUser({ ...selectedUser, balance: amount });
    setUsers(prev => prev.map(u => u.id === selectedUser.id ? { ...u, balance: amount } : u));
    setSaving(false);
  };

  const pendingUsers = users.filter(u => u.status === 'pending');
  const processedUsers = users.filter(u => u.status !== 'pending');

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
          <Button variant="ghost" size="sm" onClick={loadUsers} disabled={loading} className="text-muted-foreground gap-2">
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Actualiser
          </Button>
          <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground hover:text-destructive gap-2">
            <LogOut className="h-4 w-4" />
            Déconnexion
          </Button>
        </div>
      </header>

      <main className="flex-1 p-6 md:p-10 max-w-[1400px] w-full mx-auto space-y-6">

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white border border-border rounded-xl p-5 flex items-center gap-4">
            <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center shrink-0">
              <Users className="h-5 w-5 text-slate-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{users.length}</p>
              <p className="text-xs text-muted-foreground">Total clients</p>
            </div>
          </div>
          <div className="bg-white border border-border rounded-xl p-5 flex items-center gap-4">
            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center shrink-0">
              <Clock className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{pendingUsers.length}</p>
              <p className="text-xs text-muted-foreground">En attente</p>
            </div>
          </div>
          <div className="bg-white border border-border rounded-xl p-5 flex items-center gap-4">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center shrink-0">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{processedUsers.length}</p>
              <p className="text-xs text-muted-foreground">Traités</p>
            </div>
          </div>
        </div>

        {/* Tabs + Table */}
        <div className="bg-white border border-border rounded-xl shadow-sm overflow-hidden">
          <div className="border-b border-border flex">
            <button
              onClick={() => setTab('pending')}
              className={`px-6 py-4 text-sm font-semibold flex items-center gap-2 border-b-2 transition-colors ${
                tab === 'pending'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <Clock className="h-4 w-4" />
              En attente
              {pendingUsers.length > 0 && (
                <span className="ml-1 bg-amber-100 text-amber-700 text-xs font-bold px-2 py-0.5 rounded-full">
                  {pendingUsers.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setTab('processed')}
              className={`px-6 py-4 text-sm font-semibold flex items-center gap-2 border-b-2 transition-colors ${
                tab === 'processed'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <CheckCircle2 className="h-4 w-4" />
              Traités
              <span className="ml-1 bg-slate-100 text-slate-600 text-xs font-bold px-2 py-0.5 rounded-full">
                {processedUsers.length}
              </span>
            </button>
          </div>

          {loading ? (
            <div className="px-6 py-16 text-center text-muted-foreground">Chargement…</div>
          ) : (
            <UserTable
              users={tab === 'pending' ? pendingUsers : processedUsers}
              onSelect={openModal}
            />
          )}
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
                  Statut : {selectedUser.status === 'active' ? 'Actif' : selectedUser.status === 'blocked' ? 'Bloqué' : 'En attente'}
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
                  <DetailRow label="Date d'inscription" value={new Date(selectedUser.createdAt).toLocaleString('fr-FR')} />
                </div>

                {/* Balance setter */}
                <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-border">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">Solde du compte</p>
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <Input
                        type="number"
                        value={newBalance}
                        onChange={(e) => setNewBalance(e.target.value)}
                        className="pr-12"
                        placeholder="0.00"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">
                        {selectedUser.currency}
                      </span>
                    </div>
                    <Button onClick={handleSetBalance} disabled={saving} size="sm" className="shrink-0">
                      {saving ? "…" : "Définir"}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Solde actuel : <span className="font-semibold text-foreground">
                      {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: selectedUser.currency }).format(selectedUser.balance)}
                    </span>
                  </p>
                </div>
              </section>

              {/* Actions */}
              <div className="flex flex-col gap-3 pt-2 border-t border-border">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button onClick={handleApprove} disabled={saving} className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                    ✅ Approuver et activer
                  </Button>
                  <Button onClick={handleReject} disabled={saving} variant="outline" className="flex-1 text-red-600 hover:bg-red-50 hover:text-red-700 border-red-200">
                    ❌ Rejeter le dossier
                  </Button>
                </div>
                <Button onClick={handleBlock} disabled={saving} variant="outline" className="w-full text-orange-600 hover:bg-orange-50 hover:text-orange-700 border-orange-200">
                  🔒 Bloquer le compte
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
