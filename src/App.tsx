import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { PrivateRoute } from "./routes/PrivateRoute";
import { AppLayout } from "./components/layout/AppLayout";

// Páginas
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Dashboard } from "./pages/Dashboard";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* ==================================================== */}
          {/* 1. ROTAS PÚBLICAS (Acesso Livre)                     */}
          {/* ==================================================== */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* ==================================================== */}
          {/* 2. ROTAS PROTEGIDAS (Requer Login + Layout Padrão)   */}
          {/* ==================================================== */}
          
          {/* O PrivateRoute protege tudo que está dentro dele */}
          <Route element={<PrivateRoute />}>
            
            {/* O AppLayout adiciona Sidebar e Header em tudo que está dentro dele */}
            <Route element={<AppLayout />}>
              
              <Route path="/dashboard" element={<Dashboard />} />
              
              {/* Futuras rotas entram aqui: */}
              {/* <Route path="/minhas-lojas" element={<Stores />} /> */}
              {/* <Route path="/configuracoes" element={<Settings />} /> */}

              {/* Rota padrão: Se acessar a raiz "/", manda pro Dashboard */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              
            </Route>
            
          </Route>

          {/* ==================================================== */}
          {/* 3. ROTA 404 (Catch-All)                              */}
          {/* ==================================================== */}
          <Route path="*" element={<Navigate to="/login" replace />} />
          
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}