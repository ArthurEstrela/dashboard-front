import { useAuth } from "../../contexts/AuthContext";
import { Typography } from "../ui/typography";
import { Avatar } from "../ui/avatar";
import { Button } from "../ui/button";
import { NavItem } from "./NavItem";
import { 
  LayoutDashboard, 
  Store, 
  Star, 
  Settings, 
  LogOut, 
  Sparkles 
} from "lucide-react";

export function Sidebar() {
  const { user, signOut } = useAuth();

  return (
    <aside className="hidden md:flex h-screen w-64 flex-col border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 fixed left-0 top-0">
      
      {/* 1. Header da Sidebar (Logo) */}
      <div className="p-6 border-b border-slate-100 dark:border-slate-900">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white">
            <Sparkles size={16} />
          </div>
          <Typography variant="h3" className="text-xl tracking-tight">
            NEXO
          </Typography>
        </div>
      </div>

      {/* 2. Navegação Principal */}
      <nav className="flex-1 space-y-1 p-4">
        <div className="px-2 mb-2">
          <Typography variant="muted" className="text-xs uppercase tracking-wider font-bold">
            Menu
          </Typography>
        </div>
        
        {/* Simulação de rotas - depois você troca pelos Links do react-router */}
        <NavItem icon={LayoutDashboard} label="Dashboard" isActive />
        <NavItem icon={Store} label="Minhas Lojas" />
        <NavItem icon={Star} label="Avaliações" />
        <NavItem icon={Settings} label="Configurações" />
      </nav>

      {/* 3. Footer da Sidebar (Perfil) */}
      <div className="border-t border-slate-200 p-4 dark:border-slate-800">
        <div className="flex items-center gap-3 mb-4">
          <Avatar 
            fallback={user?.name || "US"} 
            className="h-9 w-9 border border-slate-200 dark:border-slate-700"
          />
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-medium truncate">{user?.name}</span>
            <span className="text-xs text-slate-500 truncate">{user?.email}</span>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          className="w-full justify-start gap-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
          onClick={signOut}
        >
          <LogOut size={16} />
          Sair
        </Button>
      </div>
    </aside>
  );
}