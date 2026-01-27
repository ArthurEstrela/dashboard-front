import { useState, useCallback } from "react";
import { reviewService } from "../services/reviewService";
import { type Review, type MineReviewsParams } from "../types";

export function useReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMining, setIsMining] = useState(false); // Estado separado para mineração
  const [error, setError] = useState<string | null>(null);

  // Função para buscar reviews (Memorizada com useCallback)
  const fetchReviews = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await reviewService.getAll();
      setReviews(data);
      setError(null);
    } catch (err) {
      console.error("Erro ao buscar reviews", err);
      setError("Não foi possível carregar as avaliações.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Função para pedir para a IA minerar novamente
  const triggerMining = async (params: MineReviewsParams) => {
    setIsMining(true);
    try {
      await reviewService.mine(params);
      // Após minerar, atualizamos a lista automaticamente
      await fetchReviews(); 
    } catch (err) {
      console.error("Erro na mineração", err);
      throw err;
    } finally {
      setIsMining(false);
    }
  };

  return {
    reviews,
    isLoading,
    isMining,
    error,
    fetchReviews,
    triggerMining
  };
}