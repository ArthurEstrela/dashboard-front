import { Card, CardHeader, CardContent } from "../ui/card";
import { Avatar } from "../ui/avatar";
import { Star } from "lucide-react";
import { cn } from "../../lib/utils";

// Defina a interface correta baseada no seu hook useReviews
interface ReviewProps {
  review: any; // Substitua 'any' pela interface Review real se tiver
}

export function ReviewCard({ review }: ReviewProps) {
  return (
    <Card className="group hover:border-primary/50 transition-colors duration-200 overflow-hidden">
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
              review.overallSentiment === 'Positivo' ? "bg-green-50 text-green-700 ring-green-600/20" 
              : review.overallSentiment === 'Negativo' ? "bg-red-50 text-red-700 ring-red-600/20"
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
            {review.aspects.slice(0, 3).map((aspect: any, idx: number) => (
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
  );
}