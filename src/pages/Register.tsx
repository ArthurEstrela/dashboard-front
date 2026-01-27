import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { authService } from "../services/authService"; // Importe direto o serviço aqui
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "../components/ui/card";
import { Typography } from "../components/ui/typography";
import { Sparkles, ArrowRight, Lock, Mail, User as UserIcon } from "lucide-react";

export function Register() {
  const navigate = useNavigate();
  const { signIn } = useAuth(); // Usaremos o signIn para logar automático após cadastrar
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // 1. Cria a conta na API
      await authService.register({ name, email, pass: password });
      
      // 2. Já faz o login automático para o usuário não precisar digitar de novo
      await signIn({ email, pass: password });
      
      // 3. Redireciona para o Dashboard
      navigate("/dashboard");
      
    } catch (err: any) {
      // Se a API retornar erro (ex: Email já existe), mostramos aqui
      const msg = err.response?.data || "Erro ao criar conta. Tente novamente.";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 p-4">
      <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* Branding */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white shadow-lg">
                <Sparkles size={20} />
            </div>
            <Typography variant="h2" className="border-none text-3xl">NEXO</Typography>
          </div>
        </div>

        <Card className="shadow-xl border-slate-200 dark:border-slate-800">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl">Crie sua conta</CardTitle>
            <CardDescription>
              Comece a gerenciar suas avaliações com inteligência.
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Campo Nome */}
              <div className="space-y-2">
                <Input 
                  label="Nome Completo" 
                  type="text" 
                  placeholder="Seu nome" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  icon={<UserIcon size={16} />}
                  required
                />
              </div>

              {/* Campo Email */}
              <div className="space-y-2">
                <Input 
                  label="Email Corporativo" 
                  type="email" 
                  placeholder="voce@empresa.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  icon={<Mail size={16} />}
                  required
                />
              </div>

              {/* Campo Senha */}
              <div className="space-y-2">
                <Input 
                  label="Senha" 
                  type="password" 
                  placeholder="No mínimo 6 caracteres" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  icon={<Lock size={16} />}
                  required
                  minLength={6}
                />
              </div>

              {error && (
                <div className="p-3 rounded-md bg-red-50 text-red-600 text-sm border border-red-200 dark:bg-red-900/20 dark:border-red-900 dark:text-red-400">
                  {error}
                </div>
              )}

              <Button className="w-full" size="lg" isLoading={isLoading}>
                Criar Conta Grátis <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </CardContent>
          <CardFooter className="justify-center">
            <p className="text-sm text-slate-500">
              Já tem uma conta?{" "}
              <Link to="/login" className="font-semibold text-slate-900 hover:underline dark:text-slate-100">
                Fazer login
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}