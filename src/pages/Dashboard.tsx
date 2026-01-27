import { useEffect, useMemo } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useReviews } from "../hooks/useReviews";
import { useEstablishment } from "../hooks/useEstablishment";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Avatar } from "../components/ui/avatar";
import { Plus, RefreshCcw, TrendingUp, Users, Star, Activity, ArrowUpRight, Zap } from "lucide-react";
import { cn } from "../lib/utils";

export function Dashboard() {
  const { user } = useAuth();
  const { reviews, isLoading, fetchReviews } = useReviews();
  const { createEstablishment, isLoading: isCreating } = useEstablishment();

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  // Função simplificada para criar loja via Prompt (pode trocar por Modal depois)
  async function handleNewStore() {
    const url = prompt("Cole a URL do Google Maps:");
    const name = prompt("Nome do Estabelecimento:");
    
    if (url && name) {
      const result = await createEstablishment({ name, url });
      if (result) {
        alert("Loja criada! A IA começou a ler as avaliações.");
        fetchReviews();
      }
    }
  }

  // Cálculos de KPIs
  const stats = useMemo(() => {
    const total = reviews.length;
    const positive = reviews.filter(r => r.overallSentiment === "Positivo").length;
    const score = total > 0 ? Math.round((positive / total) * 100) : 0;
    const avgRating = total > 0 
      ? (reviews.reduce((acc, r) => acc + (r.rating || 0), 0) / total).toFixed(1) 
      : "0.0";
    
    return { total, score, avgRating };
  }, [reviews]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10">
      
      {/* HEADER PRINCIPAL */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/40 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Visão Geral
          </h1>
          <p className="text-muted-foreground mt-1 text-lg">
            Bem-vindo, {user?.name?.split(" ")[0]}. Aqui está a performance do <span className="font-semibold text-primary">NEXO</span>.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={fetchReviews} disabled={isLoading} className="shadow-sm">
            <RefreshCcw size={16} className={cn("mr-2", isLoading && "animate-spin")} />
            Atualizar
          </Button>
          <Button onClick={handleNewStore} isLoading={isCreating} className="shadow-md shadow-primary/20 bg-primary hover:bg-primary/90">
            <Plus size={16} className="mr-2" /> Nova Loja
          </Button>
        </div>
      </div>

      {/* GRID DE KPIs (INDICADORES) */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        
        {/* Card 1: Total */}
        <Card className="shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-l-primary bg-card/50 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total de Reviews</CardTitle>
            <Activity size={18} className="text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight">{stats.total}</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center">
              <span className="text-green-500 font-medium flex items-center mr-1">
                <ArrowUpRight size={12} className="mr-1"/> +12%
              </span> 
              esse mês
            </p>
          </CardContent>
        </Card>

        {/* Card 2: Score IA */}
        <Card className="shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-l-green-500 bg-card/50 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Satisfação (IA)</CardTitle>
            <TrendingUp size={18} className="text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight">{stats.score}%</div>
            <p className="text-xs text-muted-foreground mt-1">Sentimento positivo</p>
          </CardContent>
        </Card>

        {/* Card 3: Nota Google */}
        <Card className="shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-l-yellow-500 bg-card/50 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Nota Média</CardTitle>
            <Star size={18} className="text-yellow-500 fill-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight">{stats.avgRating}</div>
            <p className="text-xs text-muted-foreground mt-1">Google Maps</p>
          </CardContent>
        </Card>

        {/* Card 4: Lojas */}
        <Card className="shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-l-blue-500 bg-card/50 backdrop-blur">
           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Lojas Ativas</CardTitle>
            <Users size={18} className="text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight">1</div>
            <p className="text-xs text-muted-foreground mt-1">Plano Pro</p>
          </CardContent>
        </Card>
      </div>

      {/* FEED DE REVIEWS + SIDEBAR DE INSIGHTS */}
      <div className="grid gap-6 md:grid-cols-7">
        
        {/* Coluna Principal: Feed (4/7) */}
        <div className="col-span-4 space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
                  <Zap size={20} className="text-yellow-500 fill-yellow-500" />
                  Últimas Análises
                </h2>
                <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">Ver todas</Button>
            </div>
            
            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-12 space-y-4 border rounded-lg border-dashed">
                     <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                     <p className="text-muted-foreground text-sm">A IA está lendo as avaliações...</p>
                </div>
            ) : reviews.length === 0 ? (
                <Card className="p-12 text-center border-dashed border-2 bg-slate-50/50">
                    <p className="text-muted-foreground mb-4">Nenhuma avaliação encontrada.</p>
                    <Button variant="default" onClick={handleNewStore}>Cadastrar primeira loja</Button>
                </Card>
            ) : (
                <div className="grid gap-4">
                    {reviews.slice(0, 5).map((review) => (
                        <Card key={review.id} className="group hover:border-primary/50 transition-colors duration-200 overflow-hidden">
                            <CardHeader className="flex flex-row items-start gap-4 p-4 pb-2 space-y-0">
                                <Avatar fallback={review.author} className="h-10 w-10 border bg-primary/10 text-primary" />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-semibold text-sm truncate">{review.author}</h3>
                                        <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">{review.date}</span>
                                    </div>
                                    <div className="flex items-center gap-2 mt-1">
                                        <div className="flex">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <Star 
                                                    key={i} 
                                                    size={12} 
                                                    className={cn(
                                                        i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200"
                                                    )} 
                                                />
                                            ))}
                                        </div>
                                        <span className={cn(
                                            "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ring-1 ring-inset",
                                            review.overallSentiment === 'Positivo' 
                                                ? "bg-green-50 text-green-700 ring-green-600/20" 
                                                : review.overallSentiment === 'Negativo'
                                                ? "bg-red-50 text-red-700 ring-red-600/20"
                                                : "bg-gray-50 text-gray-600 ring-gray-500/10"
                                        )}>
                                            {review.overallSentiment}
                                        </span>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="p-4 pt-2">
                                <p className="text-sm text-foreground/80 leading-relaxed line-clamp-3">
                                    "{review.text}"
                                </p>
                                {/* Aspectos Minerados */}
                                {review.aspects && review.aspects.length > 0 && (
                                    <div className="mt-3 flex flex-wrap gap-2 pt-3 border-t border-border/40">
                                        {review.aspects.slice(0, 3).map((aspect, idx) => (
                                            <span key={idx} className="inline-flex items-center rounded-md bg-secondary/80 px-2 py-1 text-xs font-medium text-secondary-foreground ring-1 ring-inset ring-gray-500/10">
                                                {aspect.name}: <span className={cn("ml-1 font-bold", 
                                                  aspect.sentiment === 'Positivo' ? "text-green-600" :
                                                  aspect.sentiment === 'Negativo' ? "text-red-600" : "text-gray-600"
                                                )}>{aspect.sentiment}</span>
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>

        {/* Coluna Lateral: Insights e Dicas (3/7) */}
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

             <Card className="border-dashed bg-slate-50/50">
                <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-2">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-1">
                      <Plus size={20} />
                    </div>
                    <h3 className="font-semibold text-sm">Adicionar Integração</h3>
                    <p className="text-xs text-muted-foreground">Conecte com iFood ou TripAdvisor.</p>
                </CardContent>
             </Card>
        </div>
      </div>
    </div>
  );
}