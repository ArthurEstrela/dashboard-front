import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Activity, ArrowUpRight, TrendingUp, Star, Users } from "lucide-react";

interface StatsGridProps {
  total: number;
  score: number;
  avgRating: string;
}

export function StatsGrid({ total, score, avgRating }: StatsGridProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Card 1: Total */}
      <Card className="shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-l-primary bg-card/50 backdrop-blur">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total de Reviews</CardTitle>
          <Activity size={18} className="text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold tracking-tight">{total}</div>
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
          <div className="text-3xl font-bold tracking-tight">{score}%</div>
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
          <div className="text-3xl font-bold tracking-tight">{avgRating}</div>
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
  );
}