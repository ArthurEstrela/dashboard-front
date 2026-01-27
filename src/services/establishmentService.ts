import { api } from "../lib/api";
import { type CreateEstablishmentDTO, type Establishment } from "../types";

export const establishmentService = {
  // Cria e já minera (POST /establishments)
  async create(data: CreateEstablishmentDTO) {
    const response = await api.post<Establishment>("/establishments", data);
    return response.data;
  },

  // TODO: Se no futuro você criar um GET /establishments/my no Java, adicione aqui
  // async getMyEstablishments() { ... }
};