import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from "uuid";
import { CreditCard, Building, Star, CheckCircle2, PiggyBank } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { saveUsers, getUsers, setSession, getUserByEmail, generateIban, BIC } from "@/lib/storage";
import { Badge } from "@/components/ui/badge";

const infoSchema = z.object({
  firstName: z.string().min(2, "Prénom requis"),
  lastName: z.string().min(2, "Nom requis"),
  birthDate: z.string().min(1, "Date de naissance requise"),
  nationality: z.string().min(2, "Nationalité requise"),
  idNumber: z.string().min(4, "Numéro de pièce d'identité requis"),
  phone: z.string().min(10, "Téléphone invalide"),
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "6 caractères minimum"),
  confirmPassword: z.string(),
  address: z.string().min(5, "Adresse requise"),
  postalBox: z.string().optional(),
  city: z.string().min(2, "Ville requise"),
  postalCode: z.string().min(4, "Code postal requis"),
  country: z.string().min(2, "Pays requis"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

type InfoFormValues = z.infer<typeof infoSchema>;
type AccountType = 'personnel' | 'courant' | 'premium' | 'epargne';

const accountOptions: {
  type: AccountType;
  Icon: React.ElementType;
  label: string;
  avantages: string[];
  badge?: { text: string; className: string };
}[] = [
  {
    type: 'personnel',
    Icon: CreditCard,
    label: 'Personnel',
    avantages: ['IBAN personnel', 'Carte virtuelle', 'Suivi en temps réel'],
  },
  {
    type: 'courant',
    Icon: Building,
    label: 'Courant',
    avantages: ['Virements illimités', 'Chéquier disponible', 'Domiciliation'],
  },
  {
    type: 'premium',
    Icon: Star,
    label: 'Premium',
    avantages: ['Conseiller dédié', 'Cashback 2 %', 'Carte Gold'],
    badge: { text: 'Populaire', className: 'bg-primary text-white' },
  },
  {
    type: 'epargne',
    Icon: PiggyBank,
    label: 'Épargne',
    avantages: ['Taux 3,5 % / an', 'Intérêts mensuels', 'Objectifs auto'],
    badge: { text: 'Nouveau', className: 'bg-teal-600 text-white' },
  },
];

function RecapRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-4">
      <p className="text-sm text-muted-foreground sm:w-44 sm:shrink-0">{label}</p>
      <p className="font-medium text-foreground text-sm break-all">{value}</p>
    </div>
  );
}

export function RegisterPage() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(1);
  const [accountType, setAccountType] = useState<AccountType>('courant');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const type = searchParams.get('type');
    if (type === 'personnel' || type === 'courant' || type === 'premium' || type === 'epargne') {
      setAccountType(type);
    }
  }, []);

  const form = useForm<InfoFormValues>({
    resolver: zodResolver(infoSchema),
    defaultValues: {
      firstName: "", lastName: "", birthDate: "", nationality: "", idNumber: "",
      phone: "", email: "", password: "", confirmPassword: "",
      address: "", postalBox: "", city: "", postalCode: "", country: "France",
    },
  });

  const onInfoSubmit = (data: InfoFormValues) => {
    if (getUserByEmail(data.email)) {
      form.setError("email", { message: "Cet email est déjà utilisé" });
      return;
    }
    setStep(2);
  };

  const handleFinalSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const data = form.getValues();
      const id = uuidv4();
      const iban = generateIban(id);

      const newUser = {
        id,
        firstName: data.firstName,
        lastName: data.lastName,
        birthDate: data.birthDate,
        nationality: data.nationality,
        idNumber: data.idNumber,
        address: data.address,
        postalBox: data.postalBox || undefined,
        city: data.city,
        postalCode: data.postalCode,
        country: data.country,
        phone: data.phone,
        email: data.email,
        password: data.password,
        accountType,
        balance: 3200,
        currency: 'EUR',
        status: 'blocked' as const,
        kycStatus: 'pending' as const,
        createdAt: new Date().toISOString(),
        iban,
        bic: BIC,
      };

      const users = getUsers();
      users.push(newUser);
      saveUsers(users);

      fetch('/api/notify-admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: data.firstName, lastName: data.lastName, email: data.email,
          phone: data.phone, accountType, createdAt: newUser.createdAt,
          birthDate: data.birthDate, nationality: data.nationality, idNumber: data.idNumber,
          address: data.address, postalBox: data.postalBox,
          city: data.city, postalCode: data.postalCode, country: data.country,
        }),
      }).catch(() => {});

      setSession(id);
      setLocation('/dashboard');
    }, 1500);
  };

  const values = form.getValues();
  const accountTypeLabels: Record<AccountType, string> = {
    personnel: 'Compte Personnel',
    courant: 'Compte Courant',
    premium: 'Compte Premium',
    epargne: 'Compte Épargne',
  };

  return (
    <div className="min-h-[100dvh] bg-slate-50 flex flex-col">
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-3xl">

          {/* STEPPER */}
          <div className="flex items-center justify-between mb-8 relative">
            <div className="absolute left-0 top-1/2 w-full h-0.5 bg-slate-200 -z-10 -translate-y-1/2" />
            <div className="absolute left-0 top-1/2 h-0.5 bg-primary -z-10 -translate-y-1/2 transition-all duration-300" style={{ width: `${(step - 1) * 50}%` }} />
            {[
              { n: 1, label: "Identité & Adresse" },
              { n: 2, label: "Type de compte" },
              { n: 3, label: "Récapitulatif" },
            ].map(({ n, label }) => (
              <div key={n} className="flex flex-col items-center gap-2 bg-slate-50 px-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 ${step >= n ? 'bg-primary text-white' : 'bg-slate-200 text-slate-500'}`}>
                  {step > n ? <CheckCircle2 className="h-5 w-5" /> : n}
                </div>
                <span className={`text-xs md:text-sm font-medium text-center max-w-[90px] ${step >= n ? 'text-foreground' : 'text-muted-foreground'}`}>{label}</span>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-border p-6 md:p-10">

            {/* ── STEP 1 ── Identité & Adresse */}
            {step === 1 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-2xl font-bold mb-8">Vos informations personnelles</h2>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onInfoSubmit)} className="space-y-8">

                    {/* Identité */}
                    <div>
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-4">Identité</h3>
                      <div className="grid md:grid-cols-2 gap-5">
                        <FormField control={form.control} name="firstName" render={({ field }) => (
                          <FormItem><FormLabel>Prénom</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="lastName" render={({ field }) => (
                          <FormItem><FormLabel>Nom</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="birthDate" render={({ field }) => (
                          <FormItem><FormLabel>Date de naissance</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="nationality" render={({ field }) => (
                          <FormItem><FormLabel>Nationalité</FormLabel><FormControl><Input placeholder="Française" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="idNumber" render={({ field }) => (
                          <FormItem className="md:col-span-2"><FormLabel>Numéro de pièce d'identité (CNI ou Passeport)</FormLabel><FormControl><Input placeholder="Ex : 123456789012" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                      </div>
                    </div>

                    {/* Contact */}
                    <div>
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-4">Contact</h3>
                      <div className="grid md:grid-cols-2 gap-5">
                        <FormField control={form.control} name="email" render={({ field }) => (
                          <FormItem><FormLabel>Adresse email</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="phone" render={({ field }) => (
                          <FormItem><FormLabel>Téléphone</FormLabel><FormControl><Input type="tel" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                      </div>
                    </div>

                    {/* Adresse */}
                    <div>
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-4">Adresse postale</h3>
                      <div className="grid md:grid-cols-2 gap-5">
                        <FormField control={form.control} name="address" render={({ field }) => (
                          <FormItem className="md:col-span-2"><FormLabel>Rue et numéro</FormLabel><FormControl><Input placeholder="12 rue des Lilas" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="postalBox" render={({ field }) => (
                          <FormItem className="md:col-span-2"><FormLabel>Boîte postale <span className="text-muted-foreground font-normal">(optionnel)</span></FormLabel><FormControl><Input placeholder="BP 12345" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="city" render={({ field }) => (
                          <FormItem><FormLabel>Ville</FormLabel><FormControl><Input placeholder="Paris" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="postalCode" render={({ field }) => (
                          <FormItem><FormLabel>Code postal</FormLabel><FormControl><Input placeholder="75001" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="country" render={({ field }) => (
                          <FormItem className="md:col-span-2"><FormLabel>Pays</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                      </div>
                    </div>

                    {/* Sécurité */}
                    <div>
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-4">Sécurité</h3>
                      <div className="grid md:grid-cols-2 gap-5">
                        <FormField control={form.control} name="password" render={({ field }) => (
                          <FormItem><FormLabel>Mot de passe</FormLabel><FormControl><Input type="password" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="confirmPassword" render={({ field }) => (
                          <FormItem><FormLabel>Confirmer le mot de passe</FormLabel><FormControl><Input type="password" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                      </div>
                    </div>

                    <div className="flex justify-end pt-2">
                      <Button type="submit" size="lg">Suivant →</Button>
                    </div>
                  </form>
                </Form>
              </div>
            )}

            {/* ── STEP 2 ── Choix du compte */}
            {step === 2 && (
              <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                <h2 className="text-2xl font-bold mb-2">Choisissez votre compte</h2>
                <p className="text-muted-foreground mb-8">Vous pourrez changer de formule à tout moment depuis votre espace.</p>
                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  {accountOptions.map(({ type, Icon, label, avantages, badge }) => (
                    <div
                      key={type}
                      onClick={() => setAccountType(type)}
                      className={`relative cursor-pointer rounded-xl border-2 p-6 transition-all duration-200 ${
                        accountType === type
                          ? 'border-primary bg-primary/5 shadow-md'
                          : 'border-border hover:border-primary/40 hover:shadow-sm'
                      }`}
                    >
                      {badge && (
                        <span className={`absolute top-3 right-3 text-xs font-bold px-2 py-0.5 rounded-full ${badge.className}`}>
                          {badge.text}
                        </span>
                      )}
                      <Icon className={`h-8 w-8 mb-4 ${accountType === type ? 'text-primary' : 'text-muted-foreground'}`} />
                      <h3 className="font-bold text-lg mb-3">Compte {label}</h3>
                      <ul className="space-y-1.5">
                        {avantages.map((a) => (
                          <li key={a} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${accountType === type ? 'bg-primary' : 'bg-slate-300'}`} />
                            {a}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setStep(1)} size="lg">← Précédent</Button>
                  <Button onClick={() => setStep(3)} size="lg">Suivant →</Button>
                </div>
              </div>
            )}

            {/* ── STEP 3 ── Récapitulatif */}
            {step === 3 && (
              <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                <h2 className="text-2xl font-bold mb-2">Récapitulatif</h2>
                <p className="text-muted-foreground mb-8">Vérifiez vos informations avant de valider.</p>

                <div className="space-y-6">
                  {/* Identité */}
                  <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                    <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">Identité</h3>
                    <div className="space-y-2">
                      <RecapRow label="Nom complet" value={`${values.firstName} ${values.lastName}`} />
                      <RecapRow label="Date de naissance" value={values.birthDate ? new Date(values.birthDate).toLocaleDateString('fr-FR') : undefined} />
                      <RecapRow label="Nationalité" value={values.nationality} />
                      <RecapRow label="N° pièce d'identité" value={values.idNumber} />
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                    <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">Contact</h3>
                    <div className="space-y-2">
                      <RecapRow label="Email" value={values.email} />
                      <RecapRow label="Téléphone" value={values.phone} />
                    </div>
                  </div>

                  {/* Adresse */}
                  <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                    <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">Adresse postale</h3>
                    <div className="space-y-2">
                      <RecapRow label="Rue" value={values.address} />
                      <RecapRow label="Boîte postale" value={values.postalBox} />
                      <RecapRow label="Ville" value={values.city} />
                      <RecapRow label="Code postal" value={values.postalCode} />
                      <RecapRow label="Pays" value={values.country} />
                    </div>
                  </div>

                  {/* Compte */}
                  <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                    <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">Compte choisi</h3>
                    <div className="space-y-2">
                      <RecapRow label="Type de compte" value={accountTypeLabels[accountType]} />
                      <RecapRow label="Prime de bienvenue" value="3 200 € (créditée automatiquement après activation par notre équipe)" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-between mt-8">
                  <Button variant="outline" onClick={() => setStep(2)} size="lg" disabled={isSubmitting}>← Précédent</Button>
                  <Button onClick={handleFinalSubmit} size="lg" disabled={isSubmitting} className="min-w-[200px]">
                    {isSubmitting ? "Création en cours..." : "Créer mon compte"}
                  </Button>
                </div>
              </div>
            )}
          </div>

          <p className="text-center text-xs text-muted-foreground mt-6">
            Vous avez déjà un compte ?{" "}
            <Link href="/login" className="text-primary hover:underline font-medium">Se connecter</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
