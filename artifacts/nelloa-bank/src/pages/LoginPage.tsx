import { useState } from "react";
import { getUserByEmail, setSession } from "@/lib/storage";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { Header } from "@/components/Header";
import { useLang } from "@/lib/i18n";

export function LoginPage() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useLang();
  const l = t.login;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const user = await getUserByEmail(email);
      if (user && user.password === password) {
        setSession(user.id);
        setLocation("/dashboard");
      } else {
        setError(l.error);
        setIsLoading(false);
      }
    } catch {
      setError(l.errorGeneric);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[100dvh] flex flex-col bg-slate-50">
      <Header />
      <div className="flex-1 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8 sm:p-12">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-foreground">{l.title}</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">{l.email}</Label>
              <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="votre@email.com" className="h-12" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{l.password}</Label>
              <div className="relative">
                <Input id="password" type={showPassword ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="h-12 pr-10" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {error && <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm font-medium text-center">{error}</div>}

            <Button type="submit" className="w-full h-12 text-base" disabled={isLoading}>
              {isLoading ? l.submitting : l.submit}
            </Button>
          </form>

          <div className="mt-8 text-center text-sm">
            <span className="text-muted-foreground">{l.noAccount} </span>
            <Link href="/register" className="text-primary font-medium hover:underline">{l.register}</Link>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
