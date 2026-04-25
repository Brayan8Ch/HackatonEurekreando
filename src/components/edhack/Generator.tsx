import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, Sparkles, Mountain, Waves, TreePine, Building2, Tractor, FlaskConical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const regions = [
  { id: "costa", label: "Costa", icon: Waves },
  { id: "sierra", label: "Sierra", icon: Mountain },
  { id: "selva", label: "Selva", icon: TreePine },
];
const entornos = [
  { id: "urbano", label: "Urbano", icon: Building2 },
  { id: "rural", label: "Rural", icon: Tractor },
];
const categorias = ["A", "B", "C", "D", "E"];

interface GeneratorProps {
  onGenerated: (data: { region: string; entorno: string; categoria: string; fenomeno: string; pro: boolean }) => void;
}

const Generator = ({ onGenerated }: GeneratorProps) => {
  const [step, setStep] = useState(0);
  const [region, setRegion] = useState("sierra");
  const [entorno, setEntorno] = useState("rural");
  const [categoria, setCategoria] = useState("B");
  const [competencia, setCompetencia] = useState("Indaga mediante métodos científicos");
  const [capacidades, setCapacidades] = useState("Problematiza · Diseña estrategias · Genera y registra datos");
  const [fenomeno, setFenomeno] = useState("Hábitos de higiene en la comunidad");
  const [pro, setPro] = useState(true);

  const steps = ["Configuración de Entorno", "Definición Pedagógica", "Personalización de Agentes"];

  const handleGenerate = () => {
    const entornoLabel = entornos.find((e) => e.id === entorno)?.label ?? "";
    toast.success(`Guía contextualizada para entorno ${entornoLabel} generada con éxito`, {
      description: `Región ${region} · Categoría ${categoria}${pro ? " · Modo Eureka Pro" : ""}`,
    });
    onGenerated({ region, entorno, categoria, fenomeno, pro });
  };

  return (
    <section id="generador" className="container py-24">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">El corazón</p>
        <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold tracking-tight">
          Generador con Scaffolding
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Tres pasos guiados. Una guía completa, contextualizada y lista para Eureka.
        </p>
      </div>

      {/* Stepper */}
      <ol className="mt-10 grid grid-cols-3 gap-3">
        {steps.map((s, i) => (
          <li key={s} className="flex items-center gap-3">
            <span
              className={cn(
                "grid h-9 w-9 shrink-0 place-items-center rounded-full border text-sm font-semibold transition-all",
                i < step && "bg-success text-success-foreground border-success",
                i === step && "bg-gradient-primary text-primary-foreground border-transparent shadow-glow",
                i > step && "border-border bg-card text-muted-foreground"
              )}
            >
              {i < step ? <Check className="h-4 w-4" /> : i + 1}
            </span>
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Paso {i + 1}</p>
              <p className={cn("text-sm font-medium truncate", i === step && "text-foreground")}>{s}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-8 rounded-2xl border border-border bg-card p-6 md:p-10 shadow-elegant">
        {step === 0 && (
          <div className="grid gap-8 animate-fade-in">
            <div>
              <Label className="text-sm font-semibold">Región</Label>
              <div className="mt-3 grid grid-cols-3 gap-3">
                {regions.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setRegion(r.id)}
                    className={cn(
                      "group relative rounded-xl border p-5 text-left transition-all duration-300 ease-smooth",
                      region === r.id ? "border-primary bg-accent shadow-glow" : "border-border hover:border-primary/40 hover:bg-accent/40"
                    )}
                  >
                    <r.icon className={cn("h-6 w-6 mb-3", region === r.id ? "text-primary" : "text-muted-foreground")} />
                    <p className="font-medium">{r.label}</p>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label className="text-sm font-semibold">Entorno</Label>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {entornos.map((e) => (
                  <button
                    key={e.id}
                    onClick={() => setEntorno(e.id)}
                    className={cn(
                      "rounded-xl border p-5 text-left transition-all duration-300",
                      entorno === e.id ? "border-primary bg-accent shadow-glow" : "border-border hover:border-primary/40"
                    )}
                  >
                    <e.icon className={cn("h-6 w-6 mb-3", entorno === e.id ? "text-primary" : "text-muted-foreground")} />
                    <p className="font-medium">{e.label}</p>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label className="text-sm font-semibold">Categoría Eureka</Label>
              <div className="mt-3 flex flex-wrap gap-2">
                {categorias.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCategoria(c)}
                    className={cn(
                      "h-11 w-11 rounded-lg border font-display font-semibold transition-all",
                      categoria === c ? "bg-gradient-primary text-primary-foreground border-transparent shadow-glow" : "border-border hover:border-primary/40"
                    )}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="grid gap-6 animate-fade-in">
            <div>
              <Label htmlFor="competencia" className="text-sm font-semibold">Competencia</Label>
              <Input id="competencia" value={competencia} onChange={(e) => setCompetencia(e.target.value)} className="mt-2 h-12" />
            </div>
            <div>
              <Label htmlFor="capacidades" className="text-sm font-semibold">Capacidades</Label>
              <Input id="capacidades" value={capacidades} onChange={(e) => setCapacidades(e.target.value)} className="mt-2 h-12" />
            </div>
            <div>
              <Label htmlFor="fenomeno" className="text-sm font-semibold">Fenómeno a investigar</Label>
              <Textarea
                id="fenomeno"
                value={fenomeno}
                onChange={(e) => setFenomeno(e.target.value)}
                rows={4}
                className="mt-2 resize-none"
                placeholder="Ej: hábitos de higiene en la comunidad"
              />
              <p className="mt-2 text-xs text-muted-foreground">Basado en el formato oficial de Sesión de Aprendizaje.</p>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="grid gap-6 animate-fade-in">
            <div className="flex items-start justify-between gap-6 rounded-xl border border-border bg-accent/40 p-5">
              <div className="flex gap-4">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-primary text-primary-foreground shrink-0">
                  <Sparkles className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold">Modo Eureka Pro</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Asegura que la guía cumpla los <span className="text-foreground font-medium">15 puntos de las bases Eureka 2025</span>: rigor científico, originalidad, viabilidad y rúbrica oficial.
                  </p>
                </div>
              </div>
              <Switch checked={pro} onCheckedChange={setPro} />
            </div>
            <div className="rounded-xl border border-dashed border-border p-5">
              <p className="text-sm font-semibold flex items-center gap-2">
                <FlaskConical className="h-4 w-4 text-primary" /> Agentes activados
              </p>
              <ul className="mt-3 grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-success" /> Diseñador de scaffolding</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-success" /> Curador contextual</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-success" /> Generador de rúbricas</li>
                <li className="flex items-center gap-2"><Check className={cn("h-4 w-4", pro ? "text-success" : "text-muted-foreground/40")} /> Auditor Eureka 2025</li>
              </ul>
            </div>
          </div>
        )}

        <div className="mt-8 flex items-center justify-between gap-3 border-t border-border pt-6">
          <Button variant="ghost" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>
            <ArrowLeft className="mr-1 h-4 w-4" /> Atrás
          </Button>
          {step < 2 ? (
            <Button onClick={() => setStep((s) => s + 1)} className="bg-gradient-primary shadow-glow">
              Siguiente <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleGenerate} className="bg-gradient-primary shadow-glow">
              <Sparkles className="mr-2 h-4 w-4" /> Generar guía
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Generator;