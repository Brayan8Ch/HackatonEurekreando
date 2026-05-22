import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = ({ onGenerate }: { onGenerate: () => void }) => {
  return (
    <section id="hero" className="relative overflow-hidden bg-hero">
      <div className="container grid min-h-[calc(100vh-4rem)] items-center py-20 md:py-28">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mx-auto mb-8 inline-flex items-center rounded-full border border-border bg-card px-4 py-2 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground shadow-subtle">
            Plataforma docente con IA
          </div>
          <h1 className="font-display text-5xl font-medium tracking-[-0.04em] text-foreground md:text-7xl lg:text-8xl">
            Guías de indagación listas para el aula peruana.
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
            Convierte contexto local, nivel educativo y tema STEM en una sesión estructurada para docentes de EBR, sin mostrar el formulario hasta iniciar sesión.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" onClick={onGenerate} className="h-12 bg-primary px-7 text-base text-primary-foreground shadow-glow hover:bg-primary/90">
              Iniciar sesión para generar
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
            <button
              onClick={() => document.getElementById("impacto")?.scrollIntoView({ behavior: "smooth", block: "start" })}
              className="h-12 rounded-full border border-border px-7 text-sm font-medium text-foreground transition-colors hover:bg-card"
            >
              Ver impacto
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
