import { ArrowRight, Clock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = ({ onGenerate }: { onGenerate: () => void }) => {
  return (
    <section id="hero" className="relative overflow-hidden bg-hero">
      <div className="container py-24 md:py-32 text-center relative">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur animate-fade-in">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          Alineado a EUREKA 2025 · Scaffolding Pedagógico
        </div>
        <h1 className="mt-6 font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] animate-fade-in">
          Planifica guías de indagación
          <br />
          <span className="inline-flex items-center gap-3">
            <span className="line-through text-muted-foreground/60 font-medium">de 8h</span>
            <ArrowRight className="h-8 w-8 md:h-12 md:w-12 text-primary" />
            <span className="text-gradient">a 2 horas</span>
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg md:text-xl text-muted-foreground animate-fade-in">
          La primera plataforma con <span className="text-foreground font-medium">Scaffolding Pedagógico</span> alineada a Eureka 2025. Convierte clases comunes en proyectos competitivos.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-in">
          <Button size="lg" onClick={onGenerate} className="bg-gradient-primary hover:opacity-95 shadow-glow text-base h-12 px-7">
            Generar mi primera guía
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
          <Button size="lg" variant="ghost" className="text-base h-12 px-6">
            <Clock className="mr-2 h-4 w-4" />
            Ver demo de 90 segundos
          </Button>
        </div>

        <div className="mt-16 mx-auto max-w-4xl rounded-2xl border border-border bg-card shadow-elegant overflow-hidden animate-scale-in">
          <div className="flex items-center gap-1.5 border-b border-border px-4 py-3 bg-muted/40">
            <span className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-success/70" />
            <span className="ml-3 text-xs text-muted-foreground">edhack.stem / generador</span>
          </div>
          <div className="grid grid-cols-2 gap-4 p-6 text-left">
            <div className="rounded-xl bg-gradient-coast p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-foreground/70">Contexto</p>
              <p className="mt-2 font-display text-xl font-semibold">Costa · Urbano</p>
              <p className="mt-1 text-sm text-foreground/70">Categoría B · Eureka 2025</p>
            </div>
            <div className="rounded-xl bg-card border border-border p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Fenómeno</p>
              <p className="mt-2 font-display text-xl font-semibold">Hábitos de higiene</p>
              <div className="mt-3 h-1.5 rounded-full bg-muted overflow-hidden">
                <div className="h-full w-3/4 bg-gradient-primary animate-shimmer bg-[length:200%_100%]" />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">Generando scaffolding…</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;