import { useEffect, useMemo } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useReviews } from "../hooks/useReviews";
import { useEstablishment } from "../hooks/useEstablishment";

// Importando nossos novos componentes
import { DashboardHeader } from "../components/dashboard/DashboardHeader";
import { StatsGrid } from "../components/dashboard/StatsGrid";
import { ReviewFeed } from "../components/dashboard/ReviewFeed";
import { InsightsSidebar } from "../components/dashboard/InsightsSidebar";

export function Dashboard() {
  const { user } = useAuth();
  const { reviews, isLoading, fetchReviews } = useReviews();
  const { createEstablishment, isLoading: isCreating } = useEstablishment();

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  // Lógica de Negócio (Criar Loja)
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

  // Lógica de Negócio (Cálculo de KPIs)
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
      
      {/* 1. Cabeçalho */}
      <DashboardHeader 
        userName={user?.name?.split(" ")[0]}
        isLoading={isLoading}
        isCreating={isCreating}
        onRefresh={fetchReviews}
        onNewStore={handleNewStore}
      />

      {/* 2. Grid de KPIs */}
      <StatsGrid 
        total={stats.total}
        score={stats.score}
        avgRating={stats.avgRating}
      />

      {/* 3. Layout Principal (Feed + Sidebar) */}
      <div className="grid gap-6 md:grid-cols-7">
        <ReviewFeed 
          reviews={reviews}
          isLoading={isLoading}
          onAddStore={handleNewStore}
        />
        <InsightsSidebar />
      </div>
    </div>
  );
}