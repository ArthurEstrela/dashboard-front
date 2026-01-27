// src/services/authService.ts
import { api } from "../lib/api";
import { STORAGE_KEYS } from "../lib/storage";

// Tipagem forte para os dados de entrada e saída
interface LoginRequest {
  email: string;
  pass: string; // ou password, depende do seu backend
}

interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export const authService = {
  async login(credentials: LoginRequest) {
    const { data } = await api.post<LoginResponse>("/auth/login", credentials);
    
    // Salvar token automaticamente ao logar
    localStorage.setItem(STORAGE_KEYS.TOKEN, data.token);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data.user));
    
    return data;
  },

  logout() {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
    // window.location.href = "/login"; // Se quiser redirecionar forçado
  }
};