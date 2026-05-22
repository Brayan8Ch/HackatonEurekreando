import { Button } from "@/components/ui/button";

interface NavbarProps {
  onNavigate: (id: string) => void;
  onLogin: () => void;
}

const Navbar = ({ onNavigate, onLogin }: NavbarProps) => {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <button
          onClick={() => onNavigate("hero")}
          className="flex items-center gap-3 text-left"
        >
          <img src="/logo-positivo.png" alt="EureKreando" className="h-12 w-auto" />
        </button>
        <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
          <button onClick={() => onNavigate("hero")} className="hover:text-foreground transition-colors">Inicio</button>
          <button onClick={() => onNavigate("impacto")} className="hover:text-foreground transition-colors">Impacto</button>
        </nav>
        <Button onClick={onLogin} className="bg-primary px-5 text-primary-foreground shadow-glow hover:bg-primary/90">
          Login
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
