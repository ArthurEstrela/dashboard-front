import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { AppLayout } from "./components/layout/AppLayout";
import { Login } from "./pages/Login"; // Sua página de login
import { Dashboard } from "./pages/Dashboard"; // Sua dashboard

// Componente para proteger rotas
function PrivateRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) return <div className="h-screen flex items-center justify-center">Carregando...</div>;
  
  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Rota Pública */}
          <Route path="/login" element={<Login />} />

          {/* Rotas Privadas (Dentro do Layout NEXO) */}
          <Route element={<PrivateRoute><AppLayout /></PrivateRoute>}>
             <Route path="/dashboard" element={<Dashboard />} />
             <Route path="/" element={<Navigate to="/dashboard" />} />
             {/* Adicione mais rotas aqui: /reviews, /settings */}
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}