import { useState } from "react";
import Navbar from "@/components/edhack/Navbar";
import Hero from "@/components/edhack/Hero";
import StatsBar from "@/components/edhack/StatsBar";
import Generator from "@/components/edhack/Generator";
import Workspace from "@/components/edhack/Workspace";
import Dashboard from "@/components/edhack/Dashboard";

export type GenerationConfig = {
  location: string;
  level: string;
  topic: string;
  chosen_route: any;
};

const Index = () => {
  const [config, setConfig] = useState<GenerationConfig | null>(null);
  const [count, setCount] = useState(12);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar onNavigate={scrollTo} />
      <main>
        <Hero onGenerate={() => scrollTo("generador")} />
        <StatsBar />
        <Generator
          onRouteSelected={(data) => {
            setConfig(data);
            setCount((c) => c + 1);
            setTimeout(() => scrollTo("workspace"), 300);
          }}
        />
        {config && <Workspace config={config} />}
        <Dashboard guidesCreated={count} />
        <footer className="border-t border-border">
          <div className="container py-10 flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© 2025 EdHack STEM · Hecho para docentes peruanos.</p>
            <p>Alineado a EUREKA 2025</p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
