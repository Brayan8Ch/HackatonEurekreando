import { ArrowRight, Clock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = ({ onGenerate }: { onGenerate: () => void }) => {
  return (
    <section id="hero" className="relative overflow-hidden bg-hero">
      <div className="container py-24 md:py-32 text-center relative">
        <h1 className="mt-6 font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] animate-fade-in">
          Planifica guías de indagación
          <br />
          <span className="inline-flex items-center gap-3">
            <span className="line-through text-muted-foreground/60 font-medium">de 8h</span>
            <ArrowRight className="h-8 w-8 md:h-12 md:w-12 text-primary" />
            <span className="text-gradient">a minutos</span>
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg md:text-xl text-muted-foreground animate-fade-in">
          La primera plataforma de <span className="text-foreground font-medium">guías de indagación</span> para docentes de educación básica regular (EBR) </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-in">
          <Button size="lg" onClick={onGenerate} className="bg-gradient-primary hover:opacity-95 shadow-glow text-base h-12 px-7">
            Generar mi primera guía
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>

        </div>

      </div>
    </section>
  );
};

export default Hero;