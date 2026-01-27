// src/types/index.ts

// ==========================================
// Entidades do Domínio (Model)
// ==========================================

export type Sentiment = "Positivo" | "Negativo" | "Neutro" | string;

export interface Aspect {
  id: number;
  name: string;
  sentiment: Sentiment;
  excerpt: string;
}

export interface Review {
  id: string; // É uma String/UUID vinda do Python
  author: string;
  text: string;
  rating: number;
  date: string;
  source: string;
  
  // Dados da IA
  sentimentScore: number;
  overallSentiment: Sentiment;
  analysisDate?: string; // Pode ser nulo se não foi analisado ainda
  
  // Relacionamento (Review tem vários Aspectos)
  aspects: Aspect[];
}

export interface Establishment {
  id: number; // É Long no Java
  name: string;
  mapsUrl: string;
  
  // Relacionamento (Establishment tem várias Reviews)
  // Opcional (?) porque em algumas listagens pode vir vazio se for LAZY loading
  reviews?: Review[]; 
}

export interface User {
  id: string; // UUID no Java
  name: string;
  email: string;
  // establishments não vem por padrão no JSON do User para evitar peso desnecessário
}

// ==========================================
// DTOs de Resposta e Requisição (API)
// ==========================================

// Resposta do Login (/auth/login) e Registro (/auth/register)
// Baseado no seu arquivo ResponseDTO.java: record ResponseDTO(String name, String token)
export interface AuthResponse {
  name: string;
  token: string;
  // Nota: Seu backend atual NÃO retorna o objeto 'User' completo nem o 'id' no login.
  // Apenas 'name' e 'token'. O front terá que lidar com isso.
}

// Payload para criar Estabelecimento (/establishments)
export interface CreateEstablishmentDTO {
  name: string;
  url: string;
}

// Payload para disparar a Mineração (/api/reviews/mine)
export interface MineReviewsParams {
  url: string;
  establishmentId: number;
}