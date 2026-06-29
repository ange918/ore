import { useEffect } from "react";
import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import { LandingPage } from "@/pages/LandingPage";
import { LoginPage } from "@/pages/LoginPage";
import { RegisterPage } from "@/pages/RegisterPage";
import { DashboardPage } from "@/pages/DashboardPage";
import { AdminPage } from "@/pages/AdminPage";
import { OffrePage } from "@/pages/OffrePage";

const queryClient = new QueryClient();

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location]);
  return null;
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={LandingPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/dashboard" component={DashboardPage} />
        <Route path="/admin" component={AdminPage} />

        {/* Compte Bancaire */}
        <Route path="/offres/compte-personnel">{() => <OffrePage slug="compte-personnel" />}</Route>
        <Route path="/offres/compte-business">{() => <OffrePage slug="compte-business" />}</Route>
        <Route path="/offres/carte-bancaire">{() => <OffrePage slug="carte-bancaire" />}</Route>
        <Route path="/offres/epargne">{() => <OffrePage slug="epargne" />}</Route>

        {/* Crédit Bancaire */}
        <Route path="/credits/pret-immobilier">{() => <OffrePage slug="pret-immobilier" />}</Route>
        <Route path="/credits/pret-personnel">{() => <OffrePage slug="pret-personnel" />}</Route>
        <Route path="/credits/pret-auto">{() => <OffrePage slug="pret-auto" />}</Route>

        {/* Assurance Partenaire */}
        <Route path="/assurances/assurance-vie">{() => <OffrePage slug="assurance-vie" />}</Route>
        <Route path="/assurances/assurance-habitat">{() => <OffrePage slug="assurance-habitat" />}</Route>

        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
