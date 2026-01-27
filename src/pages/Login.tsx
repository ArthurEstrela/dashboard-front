import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "../components/ui/card";
import { Typography } from "../components/ui/typography";
import { Sparkles, ArrowRight, Lock, Mail } from "lucide-react";

export function Login() {
  const navigate = useNavigate();
  const { signIn } = useAuth(); // Nosso hook
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await signIn({ email, pass: password });
      navigate("/dashboard");
    } catch (err) {
      setError(err + " Email ou senha incorretos.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 p-4">
      <div className="w-full max-w-md animate-in fade-in zoom-in duration-300">
        
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
            <CardTitle className="text-2xl">Bem-vindo de volta</CardTitle>
            <CardDescription>
              Entre com suas credenciais para acessar o painel.
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Input 
                  label="Email" 
                  type="email" 
                  placeholder="admin@nexo.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  icon={<Mail size={16} />}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <Input 
                      label="Senha" 
                      type="password" 
                      placeholder="••••••••" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      icon={<Lock size={16} />}
                      required
                    />
                </div>
              </div>

              {error && (
                <div className="p-3 rounded-md bg-red-50 text-red-600 text-sm border border-red-200 dark:bg-red-900/20 dark:border-red-900 dark:text-red-400">
                  {error}
                </div>
              )}

              <Button className="w-full" size="lg" isLoading={isLoading}>
                Entrar na Plataforma <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </CardContent>
          <CardFooter className="justify-center">
            <Button variant="link" size="sm" className="text-slate-500">
              Esqueceu sua senha?
            </Button>
          </CardFooter>
        </Card>
        
        <p className="mt-6 text-center text-sm text-slate-500">
          Não tem uma conta? <span className="font-semibold text-slate-900 cursor-pointer hover:underline dark:text-slate-100">Criar agora</span>
        </p>
      </div>
    </div>
  );
}