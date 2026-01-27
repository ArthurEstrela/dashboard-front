import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Zap, Plus } from "lucide-react";

export function InsightsSidebar() {
  return (
    <div className="col-span-4 md:col-span-3 space-y-4">
      <h2 className="text-xl font-semibold tracking-tight">Insights da IA</h2>
      
      {/* Widget 1: Dica do Dia */}
      <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground border-none shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Zap size={18} className="fill-white" />
            Destaque do Dia
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-primary-foreground/90 text-sm leading-relaxed">
            O aspecto <strong>"Atendimento"</strong> recebeu <strong>85% de elogios</strong> essa semana. 
            Sua equipe está de parabéns!
          </p>
        </CardContent>
      </Card>

      {/* Widget 2: Pontos de Atenção */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Pontos de Atenção</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Tempo de Espera</span>
              <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-bold">-15%</span>
            </div>
            <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-red-500 w-[65%] rounded-full"></div>
            </div>
            <p className="text-[10px] text-muted-foreground text-right">3 reclamações recentes</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Preço</span>
              <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-bold">Neutro</span>
            </div>
            <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-yellow-500 w-[40%] rounded-full"></div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-dashed bg-secondary/20">
        <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-2">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-1">
            <Plus size={20} />
          </div>
          <h3 className="font-semibold text-sm">Adicionar Integração</h3>
          <p className="text-xs text-muted-foreground">Conecte com iFood ou TripAdvisor.</p>
        </CardContent>
      </Card>
    </div>
  );
}