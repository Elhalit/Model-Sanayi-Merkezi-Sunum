import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Presentation from "@/pages/Presentation";
import MasterPlanPage from "@/pages/MasterPlanPage";
import "./lib/i18n";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Presentation} />
      <Route path="/master-plan" component={MasterPlanPage} />
      <Route component={NotFound} />
    </Switch>
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
