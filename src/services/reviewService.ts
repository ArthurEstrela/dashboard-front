import { api } from "../lib/api";
import { type Review, type MineReviewsParams } from "../types";

export const reviewService = {
  // Busca todas as reviews (GET /api/reviews)
  async getAll() {
    const response = await api.get<Review[]>("/api/reviews");
    return response.data;
  },

  // Dispara mineração manual (POST /api/reviews/mine)
  async mine(params: MineReviewsParams) {
    // O backend retorna uma String de sucesso, não um JSON complexo
    const response = await api.post("/api/reviews/mine", null, {
      params: params // Envia como Query Params (?url=...&establishmentId=...)
    });
    return response.data;
  }
};