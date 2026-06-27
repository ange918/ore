import { useState, useEffect } from "react";
import { getUsers, updateUser, User } from "@/lib/storage";
import { Lock, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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

  const refreshData = () => {
    setUsers(getUsers());
  };

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
        <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground hover:text-destructive">
          <LogOut className="h-4 w-4 mr-2" />
          Déconnexion
        </Button>
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
                  <th className="px-6 py-4 font-medium">Prénom</th>
                  <th className="px-6 py-4 font-medium">Nom</th>
                  <th className="px-6 py-4 font-medium">Email</th>
                  <th className="px-6 py-4 font-medium">Type</th>
                  <th className="px-6 py-4 font-medium">KYC</th>
                  <th className="px-6 py-4 font-medium">Statut</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center text-muted-foreground">
                      Aucun membre inscrit pour le moment.
                    </td>
                  </tr>
                ) : (
                  users.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-medium">{u.firstName}</td>
                      <td className="px-6 py-4 font-medium">{u.lastName}</td>
                      <td className="px-6 py-4 text-muted-foreground">{u.email}</td>
                      <td className="px-6 py-4 capitalize">{u.accountType}</td>
                      <td className="px-6 py-4">
                        {u.kycStatus === 'pending' && <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-none">En attente</Badge>}
                        {u.kycStatus === 'verified' && <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-none">Vérifié</Badge>}
                        {u.kycStatus === 'rejected' && <Badge className="bg-red-100 text-red-800 hover:bg-red-100 border-none">Refusé</Badge>}
                      </td>
                      <td className="px-6 py-4">
                        {u.status === 'active' ? (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-none">Actif</Badge>
                        ) : (
                          <Badge className="bg-red-100 text-red-800 hover:bg-red-100 border-none">Bloqué</Badge>
                        )}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">{new Date(u.createdAt).toLocaleDateString('fr-FR')}</td>
                      <td className="px-6 py-4 text-right">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => { setSelectedUser(u); setIsModalOpen(true); }}
                        >
                          Voir
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

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">Détails de l'utilisateur</DialogTitle>
          </DialogHeader>
          
          {selectedUser && (
            <div className="space-y-6 pt-4">
              <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm">
                <div>
                  <p className="text-muted-foreground mb-1">Nom complet</p>
                  <p className="font-semibold">{selectedUser.firstName} {selectedUser.lastName}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Téléphone</p>
                  <p className="font-semibold">{selectedUser.phone}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-muted-foreground mb-1">Email</p>
                  <p className="font-semibold">{selectedUser.email}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Type de compte</p>
                  <p className="font-semibold capitalize">{selectedUser.accountType}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Date d'inscription</p>
                  <p className="font-semibold">{new Date(selectedUser.createdAt).toLocaleDateString('fr-FR')}</p>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <p className="text-sm font-medium mb-2">Statut actuel du document KYC :</p>
                <div className="flex gap-2">
                  {selectedUser.kycStatus === 'pending' && <span className="font-bold text-amber-600">En attente de vérification</span>}
                  {selectedUser.kycStatus === 'verified' && <span className="font-bold text-green-600">Document vérifié ✅</span>}
                  {selectedUser.kycStatus === 'rejected' && <span className="font-bold text-red-600">Document refusé ❌</span>}
                </div>
              </div>

              <div className="flex flex-col gap-3 pt-2">
                <Button 
                  onClick={handleApprove} 
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  ✅ Approuver et Activer
                </Button>
                <Button 
                  onClick={handleReject} 
                  variant="outline" 
                  className="w-full text-red-600 hover:bg-red-50 hover:text-red-700 border-red-200"
                >
                  ❌ Rejeter
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
