import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";

import Home from "@/pages/home";
import Projects from "@/pages/projects";
import ProjectDetail from "@/pages/project-detail";
import Dashboard from "@/pages/dashboard";
import Admin from "@/pages/admin";
import PortalTourOperators from "@/pages/portal-tour-operators";
import PortalCommercial from "@/pages/portal-commercial";
import PortalDonors from "@/pages/portal-donors";
import Support from "@/pages/support";
import Contact from "@/pages/contact";
import About from "@/pages/about";
import HowItWorks from "@/pages/how-it-works";
import ImpactStories from "@/pages/impact-stories";
import Checkout from "@/pages/checkout";
import DonationSuccess from "@/pages/donation-success";
import NotFound from "@/pages/not-found";

function ScrollToTop() {
  const [location] = useLocation();
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);
  
  return null;
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/projects" component={Projects} />
        <Route path="/projects/:id" component={ProjectDetail} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/admin" component={Admin} />
        <Route path="/portal/tour-operators" component={PortalTourOperators} />
        <Route path="/portal/commercial" component={PortalCommercial} />
        <Route path="/portal/donors" component={PortalDonors} />
        <Route path="/support/:page" component={Support} />
        <Route path="/contact" component={Contact} />
        <Route path="/about" component={About} />
        <Route path="/how-it-works" component={HowItWorks} />
        <Route path="/impact-stories" component={ImpactStories} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/donation-success" component={DonationSuccess} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
