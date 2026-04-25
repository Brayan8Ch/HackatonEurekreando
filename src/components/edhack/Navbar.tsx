import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const departamentos = [
  "Amazonas", "Áncash", "Apurímac", "Arequipa", "Ayacucho", "Cajamarca",
  "Callao", "Cusco", "Huancavelica", "Huánuco", "Ica", "Junín", "La Libertad",
  "Lambayeque", "Lima", "Loreto", "Madre de Dios", "Moquegua", "Pasco",
  "Piura", "Puno", "San Martín", "Tacna", "Tumbes", "Ucayali"
];

interface NavbarProps {
  onNavigate: (id: string) => void;
}

const Navbar = ({ onNavigate }: NavbarProps) => {
  return (
    <header className="sticky top-0 z-50 glass">
      <div className="container flex h-16 items-center justify-between">
        <button
          onClick={() => onNavigate("hero")}
          className="flex items-center gap-2 font-display font-bold text-lg tracking-tight"
        >
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-primary text-primary-foreground shadow-glow">
            <Sparkles className="h-4 w-4" />
          </span>
          Eure - kreando
        </button>
        <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
          <button onClick={() => onNavigate("contextos")} className="hover:text-foreground transition-colors">Contextos</button>
          <button onClick={() => onNavigate("generador")} className="hover:text-foreground transition-colors">Generador</button>
          <button onClick={() => onNavigate("workspace")} className="hover:text-foreground transition-colors">Workspace</button>
          <button onClick={() => onNavigate("dashboard")} className="hover:text-foreground transition-colors">Mi Impacto</button>
          
          <Select>
            <SelectTrigger className="w-[170px] h-9 text-xs bg-background/50 backdrop-blur border-border">
              <SelectValue placeholder="Selecciona tu región" />
            </SelectTrigger>
            <SelectContent>
              {departamentos.map((dep) => (
                <SelectItem key={dep} value={dep.toLowerCase()}>
                  {dep}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </nav>
        <Button onClick={() => onNavigate("generador")} className="bg-gradient-primary hover:opacity-90 transition-opacity shadow-glow">
          Generar guía
        </Button>
      </div>
    </header>
  );
};

export default Navbar;