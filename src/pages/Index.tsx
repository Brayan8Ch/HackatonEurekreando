import { FormEvent, useState } from "react";
import Navbar from "@/components/edhack/Navbar";
import Hero from "@/components/edhack/Hero";
import StatsBar from "@/components/edhack/StatsBar";
import Generator from "@/components/edhack/Generator";
import Workspace from "@/components/edhack/Workspace";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export type GenerationConfig = {
  location: string;
  level: string;
  topic: string;
  chosen_route: {
    id: number;
    title: string;
    description: string;
    local_context: string;
    key_materials: string[];
    type?: string;
  };
};

const Index = () => {
  const [config, setConfig] = useState<GenerationConfig | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar onNavigate={scrollTo} onLogin={() => setLoginOpen(true)} />
        <main>
          <Hero onGenerate={() => setLoginOpen(true)} />
          <StatsBar />
          <footer className="border-t border-border">
            <div className="container py-10 flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
              <p>© 2025 EdHack STEM · Hecho para docentes peruanos.</p>
              <p>Alineado a EUREKA 2025</p>
            </div>
          </footer>
        </main>
        <LoginDialog
          open={loginOpen}
          onOpenChange={setLoginOpen}
          onSuccess={() => {
            setIsAuthenticated(true);
            setLoginOpen(false);
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between">
          <button onClick={() => scrollTo("generador")} className="flex items-center gap-3 text-left">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
              E
            </span>
            <span>
              <span className="block text-sm font-semibold text-foreground">EureKreando</span>
              <span className="block text-xs text-muted-foreground">Formulario docente</span>
            </span>
          </button>
          <div className="flex items-center gap-3 rounded-full border border-border bg-card px-3 py-2 shadow-subtle">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
              C
            </span>
            <span className="text-sm font-medium text-foreground">Colegio</span>
          </div>
        </div>
      </header>
      <main>
        <Generator
          onRouteSelected={(data) => {
            setConfig(data);
            setTimeout(() => scrollTo("workspace"), 300);
          }}
        />
        {config && <Workspace config={config} />}
      </main>
    </div>
  );
};

const LoginDialog = ({
  open,
  onOpenChange,
  onSuccess,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}) => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (user.trim() === "colegio" && password === "colegio") {
      setUser("");
      setPassword("");
      setError("");
      onSuccess();
      return;
    }

    setError('Usa usuario "colegio" y contraseña "colegio".');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-[20px] border-border bg-card p-8 shadow-elegant">
        <DialogHeader>
          <DialogTitle className="text-2xl font-medium tracking-tight text-foreground">Iniciar sesión</DialogTitle>
          <DialogDescription>
            Accede al formulario de generación con las credenciales del colegio.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="mt-2 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="login-user">Usuario</Label>
            <Input
              id="login-user"
              value={user}
              onChange={(event) => setUser(event.target.value)}
              className="h-12 rounded-lg bg-background"
              autoComplete="username"
              placeholder="colegio"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="login-password">Contraseña</Label>
            <Input
              id="login-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="h-12 rounded-lg bg-background"
              autoComplete="current-password"
              placeholder="colegio"
            />
          </div>
          {error && <p className="text-sm font-medium text-destructive">{error}</p>}
          <Button type="submit" className="h-12 w-full bg-primary text-primary-foreground hover:bg-primary/90">
            Entrar al formulario
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Index;
