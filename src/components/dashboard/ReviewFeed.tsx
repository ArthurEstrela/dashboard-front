import { Zap } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { ReviewCard } from "./ReviewCard";

interface ReviewFeedProps {
  reviews: any[];
  isLoading: boolean;
  onAddStore: () => void;
}

export function ReviewFeed({ reviews, isLoading, onAddStore }: ReviewFeedProps) {
  return (
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
          <Button variant="default" onClick={onAddStore}>Cadastrar primeira loja</Button>
        </Card>
      ) : (
        <div className="grid gap-4">
          {reviews.slice(0, 5).map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      )}
    </div>
  );
}