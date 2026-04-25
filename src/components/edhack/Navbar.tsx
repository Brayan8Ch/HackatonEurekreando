import { Button } from "@/components/ui/button";

interface NavbarProps {
  onNavigate: (id: string) => void;
}

const Navbar = ({ onNavigate }: NavbarProps) => {
  return (
    <header className="sticky top-0 z-50 glass">
      <div className="container flex h-16 items-center justify-between">
        <button
          onClick={() => onNavigate("hero")}
          className="flex items-center"
        >
          <img src="/logo-positivo.png" alt="Logo" className="h-16 w-auto" />
        </button>
        <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
          <button onClick={() => onNavigate("contextos")} className="hover:text-foreground transition-colors">Contextos</button>
          <button onClick={() => onNavigate("generador")} className="hover:text-foreground transition-colors">Generador</button>

        </nav>
        <Button onClick={() => onNavigate("generador")} className="bg-amber-500 hover:bg-amber-400 active:bg-amber-600 transition-colors shadow-glow">
          Generar guía
        </Button>
      </div>
    </header>
  );
};

export default Navbar;