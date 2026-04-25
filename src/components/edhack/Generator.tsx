import { useState } from "react";
import { ArrowRight, Check, Sparkles, Loader2, FlaskConical, Leaf, Globe, MapPin, GraduationCap, BookMarked } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const departamentos = [
  "Amazonas", "Áncash", "Apurímac", "Arequipa", "Ayacucho", "Cajamarca",
  "Callao", "Cusco", "Huancavelica", "Huánuco", "Ica", "Junín", "La Libertad",
  "Lambayeque", "Lima", "Loreto", "Madre de Dios", "Moquegua", "Pasco",
  "Piura", "Puno", "San Martín", "Tacna", "Tumbes", "Ucayali"
];

const MOCK_ROUTES = [
  {
    id: 1,
    title: "El Sistema Solar en tu Patio: Órbitas, Gravedad y Distancias Reales",
    description:
      "Los estudiantes replican el sistema solar a escala en el patio usando objetos del aula como planetas. Resuelven por qué los planetas no caen al Sol y qué mantiene las órbitas estables.",
    local_context: "",
    key_materials: [],
    type: "física",
  },
  {
    id: 2,
    title: "La Zona Dorada: ¿Por qué Solo la Tierra Puede Albergar Vida?",
    description:
      "Los estudiantes investigan la 'zona habitable' del sistema solar: la franja donde el agua puede existir en estado líquido. Analizan temperatura, distancia al Sol y atmósfera en cada planeta.",
    local_context: "",
    key_materials: [],
    type: "biológica",
  },
  {
    id: 3,
    title: "Júpiter: El Escudo Gigante que Protege la Tierra de Asteroides",
    description:
      "Los estudiantes modelan cómo la gravedad de Júpiter desvía asteroides que de otro modo impactarían la Tierra, y analizan los cráteres de la Luna como evidencia de impactos pasados.",
    local_context: "",
    key_materials: [],
    type: "socioambiental",
  },
];

const typeConfig = {
  física: { icon: FlaskConical, label: "Experimentación Física", color: "text-blue-500" },
  biológica: { icon: Leaf, label: "Observación Biológica", color: "text-green-500" },
  socioambiental: { icon: Globe, label: "Impacto Socio-Ambiental", color: "text-orange-500" },
};

interface RouteOption {
  id: number;
  title: string;
  description: string;
  local_context: string;
  key_materials: string[];
  type?: string;
}

interface GeneratorProps {
  onRouteSelected: (config: { location: string; level: string; topic: string; chosen_route: RouteOption }) => void;
}

const Generator = ({ onRouteSelected }: GeneratorProps) => {
  const [step, setStep] = useState(0);
  const [nivel, setNivel] = useState("secundaria");
  const [departamento, setDepartamento] = useState("");
  const [tema, setTema] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [routes, setRoutes] = useState<RouteOption[]>([]);

  const steps = ["Configuración de Entorno", "Selección de Proyecto"];

  const handleGenerateIdeas = async () => {
    if (!departamento || !tema) {
      toast.error("Faltan datos", { description: "Por favor completá el departamento y el tema a revisar." });
      return;
    }

    setIsLoading(true);

    await new Promise((r) => setTimeout(r, 2800));

    setRoutes(MOCK_ROUTES);
    setIsLoading(false);
    setStep(1);
    toast.success("¡3 proyectos generados!", {
      description: "El Etnógrafo de Datos analizó tu contexto.",
    });
  };

  const selectRoute = (route: RouteOption) => {
    const levelStr = nivel === "secundaria" ? "Secundaria" : "Primaria";
    onRouteSelected({ location: departamento, level: levelStr, topic: tema, chosen_route: route });
  };

  return (
    <>
      {/* ── Modal de carga ─────────────────────────────────────────────────── */}
      <Dialog open={isLoading}>
        <DialogContent
          className="sm:max-w-md text-center gap-0 p-10"
          onInteractOutside={(e) => e.preventDefault()}
          hideClose
        >
          <div className="flex justify-center mb-6">
            <div className="relative grid h-20 w-20 place-items-center rounded-2xl bg-gradient-primary shadow-glow">
              <Sparkles className="h-9 w-9 text-white" />
              <span className="absolute -bottom-1 -right-1 flex h-5 w-5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex rounded-full h-5 w-5 bg-primary" />
              </span>
            </div>
          </div>

          <h3 className="font-display text-xl font-bold">El Etnógrafo está trabajando</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Analizando el contexto de <span className="font-semibold text-foreground">{departamento}</span> para{" "}
            <span className="font-semibold text-foreground">{tema}</span>...
          </p>

          <div className="mt-8 space-y-3 text-left">
            {[
              "Cruzando datos geográficos y culturales...",
              "Identificando fenómenos STEM locales...",
              "Diseñando 3 enfoques pedagógicos distintos...",
            ].map((msg, i) => (
              <div key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                <Loader2 className="h-3.5 w-3.5 shrink-0 animate-spin text-primary" style={{ animationDelay: `${i * 0.3}s` }} />
                {msg}
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* ── Sección principal ──────────────────────────────────────────────── */}
      <section id="generador" className="container py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">IA en Acción</p>
          <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold tracking-tight">
            Agentes Diseñadores
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Ingresá tu contexto y el Etnógrafo de Datos creará 3 proyectos Eureka adaptados a tu realidad local.
          </p>
        </div>

        {/* Stepper */}
        <ol className="mt-10 grid grid-cols-2 gap-3 max-w-2xl">
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

          {/* ── Paso 1: Formulario ─────────────────────────────────────────── */}
          {step === 0 && (
            <div className="animate-fade-in">
              <div className="mb-8">
                <h3 className="font-display text-xl font-bold">Configura tu contexto</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Completá los datos de tu clase y el Etnógrafo generará 3 proyectos a medida.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Departamento */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-sm font-semibold">
                    <MapPin className="h-4 w-4 text-primary" /> Departamento
                  </Label>
                  <Select value={departamento} onValueChange={setDepartamento}>
                    <SelectTrigger className="h-12 bg-background border-border rounded-xl px-4 transition-all hover:border-primary/40 focus:ring-primary">
                      <SelectValue placeholder="¿Dónde enseñás?" />
                    </SelectTrigger>
                    <SelectContent>
                      {departamentos.map((dep) => (
                        <SelectItem key={dep} value={dep}>{dep}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Nivel educativo */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-sm font-semibold">
                    <GraduationCap className="h-4 w-4 text-primary" /> Nivel Educativo
                  </Label>
                  <Select value={nivel} onValueChange={setNivel}>
                    <SelectTrigger className="h-12 bg-background border-border rounded-xl px-4 transition-all hover:border-primary/40 focus:ring-primary">
                      <SelectValue placeholder="Seleccioná el nivel" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="primaria">Primaria</SelectItem>
                      <SelectItem value="secundaria">Secundaria</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Tema */}
              <div className="mt-6 space-y-2">
                <Label htmlFor="tema" className="flex items-center gap-2 text-sm font-semibold">
                  <BookMarked className="h-4 w-4 text-primary" /> Tema a investigar
                </Label>
                <Input
                  id="tema"
                  value={tema}
                  onChange={(e) => setTema(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleGenerateIdeas()}
                  className="h-12 rounded-xl px-4 border-border transition-all hover:border-primary/40"
                  placeholder="Ej: Sistema solar, Plantas medicinales, Contaminación del agua..."
                />
              </div>

              {/* Resumen + botón */}


              <div className="mt-8 flex justify-end">
                <Button
                  onClick={handleGenerateIdeas}
                  className="bg-gradient-primary shadow-glow h-12 px-8 text-base"
                >
                  <Sparkles className="mr-2 h-4 w-4" /> Generar 3 Ideas
                </Button>
              </div>
            </div>
          )}

          {/* ── Paso 2: Las 3 opciones ─────────────────────────────────────── */}
          {step === 1 && (
            <div className="grid gap-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display text-xl font-bold">Elegí tu proyecto</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    3 enfoques para <span className="font-medium text-foreground">{tema}</span> en <span className="font-medium text-foreground">{departamento}</span>
                  </p>
                </div>
                <Button variant="outline" size="sm" onClick={() => setStep(0)}>
                  Modificar datos
                </Button>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mt-2">
                {routes.map((route) => {
                  const cfg = typeConfig[route.type as keyof typeof typeConfig] ?? { icon: FlaskConical, label: route.type ?? "", color: "text-primary" };
                  const Icon = cfg.icon;
                  return (
                    <div
                      key={route.id}
                      className="flex flex-col rounded-xl border border-border bg-background p-6 transition-all hover:border-primary/50 hover:shadow-elegant group cursor-pointer"
                      onClick={() => selectRoute(route)}
                    >
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <span className={cn("grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent", cfg.color)}>
                            <Icon className="h-5 w-5" />
                          </span>
                          <span className="text-xs font-semibold px-2 py-1 bg-muted rounded-full text-muted-foreground whitespace-nowrap">
                            {cfg.label}
                          </span>
                        </div>

                        <h4 className="mt-4 font-semibold text-lg leading-tight group-hover:text-primary transition-colors">
                          {route.title}
                        </h4>
                        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                          {route.description}
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-border">
                        <Button variant="ghost" className="w-full justify-between group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                          Elegir este proyecto <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      </section>
    </>
  );
};

export default Generator;
