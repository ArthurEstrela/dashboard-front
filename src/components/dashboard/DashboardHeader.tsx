import { Button } from "../ui/button";
import { RefreshCcw, Plus } from "lucide-react";
import { cn } from "../../lib/utils";

interface DashboardHeaderProps {
  userName?: string;
  isLoading: boolean;
  isCreating: boolean;
  onRefresh: () => void;
  onNewStore: () => void;
}

export function DashboardHeader({ userName, isLoading, isCreating, onRefresh, onNewStore }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/40 pb-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Visão Geral
        </h1>
        <p className="text-muted-foreground mt-1 text-lg">
          Bem-vindo, {userName}. Aqui está a performance do <span className="font-semibold text-primary">NEXO</span>.
        </p>
      </div>
      <div className="flex gap-3">
        <Button variant="outline" onClick={onRefresh} disabled={isLoading} className="shadow-sm">
          <RefreshCcw size={16} className={cn("mr-2", isLoading && "animate-spin")} />
          Atualizar
        </Button>
        <Button onClick={onNewStore} isLoading={isCreating} className="shadow-md shadow-primary/20 bg-primary hover:bg-primary/90">
          <Plus size={16} className="mr-2" /> Nova Loja
        </Button>
      </div>
    </div>
  );
}