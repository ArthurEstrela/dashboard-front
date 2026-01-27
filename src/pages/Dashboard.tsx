import { useEffect, useMemo } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useReviews } from "../hooks/useReviews";
import { useEstablishment } from "../hooks/useEstablishment";
import { Typography } from "../components/ui/typography";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Avatar } from "../components/ui/avatar";
import { Plus, RefreshCcw, TrendingUp, MessageSquare, Star as StarIcon } from "lucide-react";
import { cn } from "../lib/utils";

export function Dashboard() {
  const { user } = useAuth();
  const { reviews, isLoading, fetchReviews } = useReviews(); // Hook que busca dados do Java
  const { createEstablishment, isLoading: isCreating } = useEstablishment();

  // Busca dados ao montar a tela
  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  // Função para criar loja (Simples por enquanto)
  async function handleNewStore() {
    const url = prompt("Cole a URL do Google Maps:");
    const name = prompt("Nome do Estabelecimento:");
    
    if (url && name) {
      const result = await createEstablishment({ name, url });
      if (result) {
        alert("Loja criada e mineração iniciada! Aguarde alguns instantes.");
        fetchReviews(); // Atualiza a lista
      }
    }
  }

  // --- CÁLCULO DE MÉTRICAS (KPIs) ---
  const stats = useMemo(() => {
    const total = reviews.length;
    // Filtra reviews com sentimento "Positivo" (baseado no seu Review.java)
    const positive = reviews.filter(r => r.overallSentiment === "Positivo").length; 
    const negative = reviews.filter(r => r.overallSentiment === "Negativo").length;
    
    // Calcula % de aprovação
    const score = total > 0 ? Math.round((positive / total) * 100) : 0;

    return { total, positive, negative, score };
  }, [reviews]);

  // Helper para cor do sentimento
  const getSentimentColor = (sentiment: string) => {
    // Valores baseados no Review.java / Aspect.java
    if (sentiment === "Positivo") return "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800";
    if (sentiment === "Negativo") return "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800";
    return "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-400";
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* 1. CABEÇALHO */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Typography variant="h2">Dashboard</Typography>
          <Typography variant="muted">
            Olá, {user?.name}. Aqui está o panorama do seu negócio hoje.
          </Typography>
        </div>
        <div className="flex gap-2">
            <Button variant="outline" onClick={fetchReviews} disabled={isLoading}>
                <RefreshCcw size={16} className={cn("mr-2", isLoading && "animate-spin")} />
                Atualizar
            </Button>
            <Button onClick={handleNewStore} isLoading={isCreating}>
                <Plus size={16} className="mr-2" /> Nova Loja
            </Button>
        </div>
      </div>

      {/* 2. CARDS DE MÉTRICAS (KPIs) */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Avaliações</CardTitle>
                <MessageSquare size={16} className="text-slate-500" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{stats.total}</div>
                <p className="text-xs text-slate-500">+12% em relação ao mês passado</p>
            </CardContent>
        </Card>

        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Score de Aprovação</CardTitle>
                <TrendingUp size={16} className="text-green-500" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{stats.score}%</div>
                <p className="text-xs text-slate-500">Baseado em sentimentos positivos</p>
            </CardContent>
        </Card>

        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Média de Estrelas</CardTitle>
                <StarIcon size={16} className="text-yellow-500" />
            </CardHeader>
            <CardContent>
                {/* Cálculo simples de média de rating */}
                <div className="text-2xl font-bold">
                    {(reviews.reduce((acc, r) => acc + (r.rating || 0), 0) / (reviews.length || 1)).toFixed(1)}
                </div>
                <p className="text-xs text-slate-500">Média geral do Google Maps</p>
            </CardContent>
        </Card>
      </div>

      {/* 3. LISTA DE REVIEWS RECENTES */}
      <div className="space-y-4">
        <Typography variant="h3">Avaliações Recentes</Typography>
        
        {isLoading ? (
            <div className="text-center py-10 text-slate-500">Carregando análises da IA...</div>
        ) : reviews.length === 0 ? (
            <Card className="p-8 text-center text-slate-500 border-dashed">
                Nenhuma avaliação encontrada. Cadastre uma loja para começar!
            </Card>
        ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {reviews.map((review) => (
                    <Card key={review.id} className="flex flex-col hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-2">
                             {/* Avatar com as iniciais do autor */}
                            <Avatar fallback={review.author} />
                            <div className="flex-1 overflow-hidden">
                                <CardTitle className="text-base truncate">{review.author}</CardTitle>
                                <div className="flex items-center gap-2 mt-1">
                                    {/* Badge de Sentimento */}
                                    <span className={cn(
                                        "px-2 py-0.5 rounded-full text-xs font-medium border",
                                        getSentimentColor(review.overallSentiment)
                                    )}>
                                        {review.overallSentiment}
                                    </span>
                                    <span className="text-xs text-slate-400">• {review.date}</span>
                                </div>
                            </div>
                        </CardHeader>
                        
                        <CardContent className="flex-1 mt-2">
                             {/* Texto da Review (Limitado a 3 linhas com line-clamp) */}
                            <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-3">
                                "{review.text}"
                            </p>
                            
                            {/* Exibindo Aspectos Minerados pela IA */}
                            {review.aspects && review.aspects.length > 0 && (
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {review.aspects.slice(0, 3).map(aspect => (
                                        <span key={aspect.id} className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-slate-600 dark:text-slate-400">
                                            {aspect.name}: {aspect.sentiment}
                                        </span>
                                    ))}
                                    {review.aspects.length > 3 && (
                                        <span className="text-xs text-slate-400 px-1 py-1">+{review.aspects.length - 3}</span>
                                    )}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        )}
      </div>
    </div>
  );
}