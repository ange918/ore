import { useState, useEffect, useMemo } from "react";
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
import { createUser, setSession, getUserByEmail, generateIban, BIC } from "@/lib/storage";
import { sendWelcomeEmail } from "@/lib/email";
import { useLang } from "@/lib/i18n";

type AccountType = 'personnel' | 'courant' | 'premium' | 'epargne';

const ACCOUNT_ICONS: Record<AccountType, React.ElementType> = {
  personnel: CreditCard,
  courant: Building,
  premium: Star,
  epargne: PiggyBank,
};

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
  const { t } = useLang();
  const r = t.register;

  const infoSchema = useMemo(() => z.object({
    firstName: z.string().min(2, r.firstNameReq),
    lastName: z.string().min(2, r.lastNameReq),
    birthDate: z.string().min(1, r.birthDateReq),
    nationality: z.string().min(2, r.nationalityReq),
    idNumber: z.string().min(4, r.idNumberReq),
    phone: z.string().min(10, r.phoneInvalid),
    email: z.string().email(r.emailInvalid),
    password: z.string().min(6, r.passwordMin),
    confirmPassword: z.string(),
    address: z.string().min(5, r.addressReq),
    postalBox: z.string().optional(),
    city: z.string().min(2, r.cityReq),
    postalCode: z.string().min(4, r.postalCodeReq),
    country: z.string().min(2, r.countryReq),
  }).refine((data) => data.password === data.confirmPassword, {
    message: r.passwordMismatch,
    path: ["confirmPassword"],
  }), [r]);

  type InfoFormValues = z.infer<typeof infoSchema>;

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
      address: "", postalBox: "", city: "", postalCode: "", country: "",
    },
  });

  const onInfoSubmit = async (data: InfoFormValues) => {
    const existing = await getUserByEmail(data.email);
    if (existing) {
      form.setError("email", { message: r.emailUsed });
      return;
    }
    setStep(2);
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    try {
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
        balance: 0,
        currency: 'EUR',
        status: 'pending' as const,
        kycStatus: 'pending' as const,
        createdAt: new Date().toISOString(),
        iban,
        bic: BIC,
      };

      await createUser(newUser);
      sendWelcomeEmail({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        accountType,
      }).catch((err) => console.error('[email] sendWelcomeEmail failed:', err));
      setSession(id);
      setLocation('/dashboard');
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
  };

  const values = form.getValues();

  const accountOptions: { type: AccountType; avantages: string[]; badge?: { text: string; className: string } }[] = [
    { type: 'personnel', avantages: r.avPersonnel },
    { type: 'courant', avantages: r.avCourant },
    { type: 'premium', avantages: r.avPremium, badge: { text: r.badgePopular, className: 'bg-primary text-white' } },
    { type: 'epargne', avantages: r.avEpargne, badge: { text: r.badgeNew, className: 'bg-teal-600 text-white' } },
  ];

  const acctLabels: Record<AccountType, string> = {
    personnel: r.acctPersonnelLabel,
    courant: r.acctCourantLabel,
    premium: r.acctPremiumLabel,
    epargne: r.acctEpargneLabel,
  };

  const acctNames: Record<AccountType, string> = {
    personnel: r.acctPersonnel,
    courant: r.acctCourant,
    premium: r.acctPremium,
    epargne: r.acctEpargne,
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
              { n: 1, label: r.step1 },
              { n: 2, label: r.step2 },
              { n: 3, label: r.step3 },
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

            {/* ── STEP 1 ── */}
            {step === 1 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-2xl font-bold mb-8">{r.title1}</h2>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onInfoSubmit)} className="space-y-8">

                    {/* Identité */}
                    <div>
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-4">{r.identity}</h3>
                      <div className="grid md:grid-cols-2 gap-5">
                        <FormField control={form.control} name="firstName" render={({ field }) => (
                          <FormItem><FormLabel>{r.firstName}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="lastName" render={({ field }) => (
                          <FormItem><FormLabel>{r.lastName}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="birthDate" render={({ field }) => (
                          <FormItem><FormLabel>{r.birthDate}</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="nationality" render={({ field }) => (
                          <FormItem><FormLabel>{r.nationality}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="idNumber" render={({ field }) => (
                          <FormItem className="md:col-span-2"><FormLabel>{r.idNumber}</FormLabel><FormControl><Input placeholder="Ex : 123456789012" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                      </div>
                    </div>

                    {/* Contact */}
                    <div>
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-4">{r.contact}</h3>
                      <div className="grid md:grid-cols-2 gap-5">
                        <FormField control={form.control} name="email" render={({ field }) => (
                          <FormItem><FormLabel>{r.emailLabel}</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="phone" render={({ field }) => (
                          <FormItem><FormLabel>{r.phone}</FormLabel><FormControl><Input type="tel" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                      </div>
                    </div>

                    {/* Adresse */}
                    <div>
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-4">{r.address}</h3>
                      <div className="grid md:grid-cols-2 gap-5">
                        <FormField control={form.control} name="address" render={({ field }) => (
                          <FormItem className="md:col-span-2"><FormLabel>{r.street}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="postalBox" render={({ field }) => (
                          <FormItem className="md:col-span-2"><FormLabel>{r.postalBox} <span className="text-muted-foreground font-normal">{r.postalBoxOpt}</span></FormLabel><FormControl><Input placeholder="BP 12345" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="city" render={({ field }) => (
                          <FormItem><FormLabel>{r.city}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="postalCode" render={({ field }) => (
                          <FormItem><FormLabel>{r.postalCode}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="country" render={({ field }) => (
                          <FormItem className="md:col-span-2"><FormLabel>{r.country}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                      </div>
                    </div>

                    {/* Sécurité */}
                    <div>
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-4">{r.security}</h3>
                      <div className="grid md:grid-cols-2 gap-5">
                        <FormField control={form.control} name="password" render={({ field }) => (
                          <FormItem><FormLabel>{r.password}</FormLabel><FormControl><Input type="password" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="confirmPassword" render={({ field }) => (
                          <FormItem><FormLabel>{r.confirmPassword}</FormLabel><FormControl><Input type="password" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                      </div>
                    </div>

                    <div className="flex justify-end pt-2">
                      <Button type="submit" size="lg">{r.next}</Button>
                    </div>
                  </form>
                </Form>
              </div>
            )}

            {/* ── STEP 2 ── */}
            {step === 2 && (
              <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                <h2 className="text-2xl font-bold mb-2">{r.title2}</h2>
                <p className="text-muted-foreground mb-8">{r.title2Sub}</p>
                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  {accountOptions.map(({ type, avantages, badge }) => {
                    const Icon = ACCOUNT_ICONS[type];
                    return (
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
                        <h3 className="font-bold text-lg mb-3">{acctLabels[type]}</h3>
                        <ul className="space-y-1.5">
                          {avantages.map((a) => (
                            <li key={a} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${accountType === type ? 'bg-primary' : 'bg-slate-300'}`} />
                              {a}
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setStep(1)} size="lg">{r.prev}</Button>
                  <Button onClick={() => setStep(3)} size="lg">{r.next}</Button>
                </div>
              </div>
            )}

            {/* ── STEP 3 ── */}
            {step === 3 && (
              <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                <h2 className="text-2xl font-bold mb-2">{r.title3}</h2>
                <p className="text-muted-foreground mb-8">{r.title3Sub}</p>

                <div className="space-y-6">
                  <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                    <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">{r.identity}</h3>
                    <div className="space-y-2">
                      <RecapRow label={r.recapFullName} value={`${values.firstName} ${values.lastName}`} />
                      <RecapRow label={r.recapBirthDate} value={values.birthDate ? new Date(values.birthDate).toLocaleDateString('fr-FR') : undefined} />
                      <RecapRow label={r.recapNationality} value={values.nationality} />
                      <RecapRow label={r.recapId} value={values.idNumber} />
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                    <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">{r.contact}</h3>
                    <div className="space-y-2">
                      <RecapRow label={r.recapEmail} value={values.email} />
                      <RecapRow label={r.recapPhone} value={values.phone} />
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                    <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">{r.address}</h3>
                    <div className="space-y-2">
                      <RecapRow label={r.recapStreet} value={values.address} />
                      <RecapRow label={r.recapBox} value={values.postalBox} />
                      <RecapRow label={r.recapCity} value={values.city} />
                      <RecapRow label={r.recapPostal} value={values.postalCode} />
                      <RecapRow label={r.recapCountry} value={values.country} />
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                    <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">{r.recapAccountType}</h3>
                    <div className="space-y-2">
                      <RecapRow label={r.recapAccountType} value={acctNames[accountType]} />
                    </div>
                  </div>
                </div>

                <div className="flex justify-between mt-8">
                  <Button variant="outline" onClick={() => setStep(2)} size="lg" disabled={isSubmitting}>{r.prev}</Button>
                  <Button onClick={handleFinalSubmit} size="lg" disabled={isSubmitting} className="min-w-[200px]">
                    {isSubmitting ? r.creating : r.create}
                  </Button>
                </div>
              </div>
            )}
          </div>

          <p className="text-center text-xs text-muted-foreground mt-6">
            {r.hasAccount}{" "}
            <Link href="/login" className="text-primary hover:underline font-medium">{r.signin}</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
