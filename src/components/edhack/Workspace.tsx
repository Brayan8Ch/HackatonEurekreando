import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BookOpen, Lightbulb, Sparkles,
  FileText, NotebookPen, Target, Loader2, CheckCircle2, Download,
  Brain, Microscope, Users, MessageSquare, TrendingUp, Star,
  Package, ShoppingCart, Leaf, Recycle, DollarSign,
} from "lucide-react";
import { GenerationConfig } from "@/pages/Index";

interface WorkspaceProps {
  config: GenerationConfig;
}

const MOCK_GUIDE = {
  title: "El Sistema Solar: Viajeros del Espacio en Nuestro Aula",
  grade_level: "5to grado de primaria",
  total_duration_minutes: 90,
  learning_objective:
    "El estudiante indaga las características de los planetas del sistema solar mediante la construcción de modelos a escala relativa, identificando patrones de distancia y tamaño que explican la posición única de la Tierra para albergar vida.",
  inicio: {
    duration_minutes: 20,
    motivating_activity:
      "El docente apaga las luces y proyecta una imagen del cielo nocturno de la región. Pregunta: '¿Cuántas veces han visto el cielo de noche? ¿Qué ven ahí?' Entrega a cada grupo una bolita de plastilina diferente y les dice que representan planetas.",
    cognitive_conflict:
      "¿Si la Tierra fuera de este tamaño (muestra una pelota de tenis), a qué distancia creés que estaría el Sol? Los estudiantes hacen estimaciones con los brazos. Luego revela la escala real: el Sol estaría a más de 100 metros.",
    teacher_questions: [
      "¿Qué ven cuando miran al cielo de noche?",
      "¿Creen que todos los planetas son del mismo tamaño?",
      "¿Por qué creen que en la Tierra hay vida y en los otros planetas no?",
      "Si viajaran al espacio, ¿qué llevarían y por qué?",
    ],
  },
  desarrollo: {
    duration_minutes: 60,
    problem_statement:
      "¿Qué características únicas tiene la Tierra dentro del sistema solar que permiten la existencia de vida, y cómo se comparan su tamaño y distancia al Sol con los demás planetas?",
    hypothesis_guide:
      "El docente pide que cada grupo escriba: 'Creemos que la Tierra puede tener vida porque...' Sin corregir, las hipótesis se pegan en el pizarrón para contrastarlas al final.",
    inquiry_plan:
      "1. Cada grupo recibe una tarjeta con datos de un planeta (diámetro, distancia al Sol, temperatura). 2. Con plastilina, construyen su planeta a escala relativa al tamaño de la Tierra. 3. En el patio, ubican los planetas a escala de distancia usando una cuerda de 10 metros. 4. Registran en su ficha: ¿Qué planeta está más cerca? ¿Cuál es el más grande? ¿Cuál tiene temperatura similar a la Tierra? 5. Regresan al aula y comparan sus hipótesis iniciales con lo observado.",
    teacher_questions: [
      "¿Qué notan sobre las distancias entre los planetas más cercanos al Sol versus los más lejanos?",
      "Si la temperatura en Mercurio es de 430°C y en Neptuno es de -200°C, ¿qué nos dice eso sobre la distancia al Sol?",
      "¿Por qué creen que Venus, siendo más cercano al Sol que la Tierra, tiene temperatura más alta que Mercurio?",
      "¿Cómo cambió su modelo de plastilina respecto a lo que imaginaban antes?",
    ],
  },
  cierre: {
    duration_minutes: 10,
    metacognition_questions: [
      "¿Qué fue lo que más te sorprendió de lo que aprendiste hoy?",
      "¿Qué cambiarías de tu hipótesis inicial? ¿Por qué?",
      "¿Qué pregunta nueva te quedó sin responder?",
      "¿Cómo explicarías el sistema solar a un familiar esta noche?",
    ],
    evaluation_criteria: [
      "Construye un modelo de planeta a escala relativa correcta respecto a la Tierra",
      "Identifica al menos 3 características que diferencian a la Tierra del resto de planetas",
      "Formula una hipótesis escrita antes del experimento y la contrasta con la evidencia",
      "Registra datos observados con dibujos o texto en su ficha de indagación",
      "Participa en la puesta en común explicando sus conclusiones con vocabulario científico básico",
    ],
    reflection_activity:
      "Cada estudiante completa la frase: 'Antes pensaba que... Ahora sé que...' y la comparte con el compañero de al lado. El docente cierra preguntando: '¿La Tierra es especial por accidente o por su posición exacta en el sistema solar?'",
  },
  materials_list: [
    "Plastilina de colores (8 colores)",
    "Cuerda de 10 metros",
    "Tarjetas con datos de planetas (impresas)",
    "Fichas de indagación del estudiante",
    "Pelota de tenis (modelo de la Tierra)",
    "Proyector o pantalla",
    "Reglas y lápices",
  ],
  curriculum_alignment: [
    "Indaga mediante métodos científicos — construye modelos, formula hipótesis y contrasta con evidencia",
    "Explica el mundo físico — identifica características del sistema solar y la posición de la Tierra",
    "Comunicación científica — presenta conclusiones usando vocabulario apropiado al nivel",
    "Alineado a EUREKA 2025 — scaffolding en los 3 momentos pedagógicos (Inicio, Desarrollo, Cierre)",
  ],
};

const Workspace = ({ config }: WorkspaceProps) => {
  const [guide, setGuide] = useState<typeof MOCK_GUIDE | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setGuide(MOCK_GUIDE), 1200);
    return () => clearTimeout(timer);
  }, [config]);

  const nivelLabel = config.level.charAt(0).toUpperCase() + config.level.slice(1);
  const depLabel = config.location
    ? config.location.charAt(0).toUpperCase() + config.location.slice(1)
    : "Nacional";

  if (!guide) {
    return (
      <section id="workspace" className="container py-24 min-h-[50vh] flex flex-col items-center justify-center text-center">
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
          <Loader2 className="h-16 w-16 animate-spin text-primary relative z-10" />
        </div>
        <h3 className="mt-8 text-2xl font-display font-bold">El Arquitecto Pedagógico está trabajando...</h3>
        <p className="mt-2 text-muted-foreground">Estructurando los momentos pedagógicos de la sesión</p>
      </section>
    );
  }

  return (
    <section id="workspace" className="container py-24">
      {/* Cabecera */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">Resultado Final</p>
          <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold tracking-tight">
            Guía de Clase Generada
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            El <strong>Arquitecto Pedagógico</strong> consolidó la sesión de 90 minutos para tu contexto.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{nivelLabel}</Badge>
            <Badge variant="secondary">{depLabel}</Badge>
            <Badge variant="secondary">Tema: {config.topic}</Badge>
            <Badge className="bg-gradient-primary text-primary-foreground border-0">Eureka Pro</Badge>
          </div>
          <a href="/sesion.pdf" download="sesion-eureka.pdf">
            <Button className="bg-gradient-primary shadow-glow h-10 px-5 gap-2">
              <Download className="h-4 w-4" />
              Descargar clase
            </Button>
          </a>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* ── Guía del docente ─────────────────────────────────────────────── */}
        <div className="rounded-2xl border border-border bg-card shadow-elegant overflow-hidden">
          <div className="flex items-center justify-between gap-3 border-b border-border bg-muted/40 px-5 py-3">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-primary" />
              <p className="text-sm font-semibold">Guía del Docente</p>
            </div>
            <Badge variant="outline" className="text-xs">IA Auditada</Badge>
          </div>

          <Tabs defaultValue="informe" className="p-5">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="informe">
                <FileText className="mr-1.5 h-3.5 w-3.5" /> Informe
              </TabsTrigger>
              <TabsTrigger value="bitacora">
                <NotebookPen className="mr-1.5 h-3.5 w-3.5" /> CNEB
              </TabsTrigger>
              <TabsTrigger value="rubrica">
                <Target className="mr-1.5 h-3.5 w-3.5" /> Materiales
              </TabsTrigger>
            </TabsList>

            {/* Informe */}
            <TabsContent value="informe" className="mt-6 space-y-6 animate-fade-in">
              <div>
                <h3 className="font-bold text-xl">{guide.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{guide.learning_objective}</p>
              </div>

              <Block title="Inicio" badge={`${guide.inicio.duration_minutes} min`}>
                <p><strong>Actividad motivadora:</strong> {guide.inicio.motivating_activity}</p>
                <p className="mt-2"><strong>Conflicto cognitivo:</strong> {guide.inicio.cognitive_conflict}</p>
              </Block>

              <Block title="Desarrollo" badge={`${guide.desarrollo.duration_minutes} min`}>
                <p><strong>Problema:</strong> {guide.desarrollo.problem_statement}</p>
                <p className="mt-2"><strong>Plan de indagación:</strong> {guide.desarrollo.inquiry_plan}</p>
              </Block>

              <Block title="Cierre" badge={`${guide.cierre.duration_minutes} min`}>
                <p>{guide.cierre.reflection_activity}</p>
              </Block>

              <div className="rounded-xl border border-primary/20 bg-accent p-5">
                <p className="flex items-center gap-2 text-sm font-semibold text-accent-foreground">
                  <Lightbulb className="h-4 w-4" /> Preguntas de Scaffolding
                </p>
                <ul className="mt-3 space-y-2 text-sm text-foreground/80">
                  {[...guide.inicio.teacher_questions, ...guide.desarrollo.teacher_questions].map((q, i) => (
                    <li key={i}>• {q}</li>
                  ))}
                </ul>
              </div>
            </TabsContent>

            {/* CNEB */}
            <TabsContent value="bitacora" className="mt-6 space-y-3 animate-fade-in">
              <h4 className="font-semibold mb-3">Alineación Curricular</h4>
              {guide.curriculum_alignment.map((s, i) => (
                <div key={i} className="flex items-center gap-3 rounded-lg border border-border p-3">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground text-xs font-semibold">
                    {i + 1}
                  </span>
                  <p className="text-sm">{s}</p>
                </div>
              ))}

              <h4 className="font-semibold mt-6 mb-3">Criterios de Evaluación</h4>
              {guide.cierre.evaluation_criteria.map((s, i) => (
                <div key={i} className="flex items-start gap-3 rounded-lg border border-border p-3">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-success" />
                  <p className="text-sm">{s}</p>
                </div>
              ))}
            </TabsContent>

            {/* Materiales */}
            <TabsContent value="rubrica" className="mt-6 animate-fade-in">
              <h4 className="font-semibold mb-4">Materiales Requeridos</h4>
              <div className="flex flex-wrap gap-2">
                {guide.materials_list.map((m, i) => (
                  <Badge key={i} variant="outline">{m}</Badge>
                ))}
              </div>

              <h4 className="font-semibold mt-6 mb-3">Preguntas de Metacognición (Cierre)</h4>
              <ul className="space-y-2">
                {guide.cierre.metacognition_questions.map((q, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Sparkles className="h-3.5 w-3.5 mt-0.5 shrink-0 text-primary" />
                    {q}
                  </li>
                ))}
              </ul>
            </TabsContent>
          </Tabs>
        </div>

        {/* ── Materiales ───────────────────────────────────────────────────── */}
        <div className="rounded-2xl border border-border bg-card shadow-elegant overflow-hidden flex flex-col">
          <div className="flex items-center justify-between gap-3 border-b border-border bg-muted/40 px-5 py-3">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-primary" />
              <p className="text-sm font-semibold">Materiales Recomendados</p>
            </div>
            <Badge variant="outline" className="text-xs">Accesibles localmente</Badge>
          </div>

          <div className="p-6 md:p-8 space-y-6 flex-1">

            {/* Lista principal */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Para el experimento</p>
              <div className="space-y-2">
                {guide.materials_list.map((m, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-lg border border-border bg-background px-4 py-3">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-accent">
                      <ShoppingCart className="h-3.5 w-3.5 text-primary" />
                    </span>
                    <span className="text-sm">{m}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Categorías */}
            <div className="grid grid-cols-1 gap-3">
              {MATERIAL_TIPS.map(({ icon: Icon, label, description, color, bg }) => (
                <div key={label} className={`flex items-start gap-3 rounded-xl border border-border ${bg} px-4 py-3`}>
                  <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-background ${color}`}>
                    <Icon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>

      {/* ── Competencias ────────────────────────────────────────────────────── */}
      <div className="mt-12">
        <div className="flex flex-col gap-1 mb-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">Impacto Pedagógico</p>
          <h3 className="font-display text-2xl md:text-3xl font-bold tracking-tight">
            Competencias que desarrollan tus estudiantes
          </h3>
          <p className="mt-1 text-muted-foreground">
            Al completar esta sesión, cada estudiante habrá ejercitado las siguientes capacidades.
          </p>
        </div>

        {/* CNEB */}
        <div className="mb-8">
          <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-4">
            Currículo Nacional del Perú (CNEB)
          </h4>
          <div className="grid sm:grid-cols-2 gap-3">
            {guide.curriculum_alignment.map((c, i) => (
              <div key={i} className="flex items-start gap-4 rounded-xl border border-border bg-card p-4 shadow-sm">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gradient-primary text-primary-foreground text-sm font-bold shadow-glow">
                  {i + 1}
                </span>
                <p className="text-sm leading-relaxed">{c}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Habilidades del siglo XXI */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-4">
            Habilidades del Siglo XXI
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {SKILLS_21.map(({ icon: Icon, label, description, color }) => (
              <div key={label} className="flex flex-col gap-2 rounded-xl border border-border bg-card p-4 shadow-sm">
                <span className={`grid h-9 w-9 place-items-center rounded-lg bg-accent ${color}`}>
                  <Icon className="h-4 w-4" />
                </span>
                <p className="font-semibold text-sm">{label}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
};

const MATERIAL_TIPS = [
  {
    icon: DollarSign,
    label: "Costo estimado por sesión",
    description: "Todos los materiales tienen un costo total menor a S/ 15 y se consiguen en cualquier mercado local.",
    color: "text-green-600",
    bg: "bg-green-50/50 dark:bg-green-950/20",
  },
  {
    icon: Leaf,
    label: "Materiales del entorno natural",
    description: "Algunos materiales (tierra, agua, ramas) pueden recolectarse directamente en el entorno escolar.",
    color: "text-emerald-600",
    bg: "bg-emerald-50/50 dark:bg-emerald-950/20",
  },
  {
    icon: Recycle,
    label: "Reutilizables en sesiones futuras",
    description: "Las cuerdas, reglas y fichas impresas pueden reutilizarse en otras sesiones de indagación.",
    color: "text-blue-600",
    bg: "bg-blue-50/50 dark:bg-blue-950/20",
  },
];

const SKILLS_21 = [
  {
    icon: Brain,
    label: "Pensamiento Crítico",
    description: "Formula hipótesis, contrasta con evidencia y revisa sus ideas iniciales.",
    color: "text-blue-500",
  },
  {
    icon: Microscope,
    label: "Indagación Científica",
    description: "Diseña y ejecuta un experimento, registra datos y extrae conclusiones.",
    color: "text-purple-500",
  },
  {
    icon: Users,
    label: "Trabajo Colaborativo",
    description: "Construye modelos y analiza resultados en equipo con roles definidos.",
    color: "text-green-500",
  },
  {
    icon: MessageSquare,
    label: "Comunicación",
    description: "Expone sus conclusiones usando vocabulario científico ante sus pares.",
    color: "text-orange-500",
  },
  {
    icon: TrendingUp,
    label: "Metacognición",
    description: "Reflexiona sobre su propio proceso: qué aprendió y qué cambiaría.",
    color: "text-pink-500",
  },
  {
    icon: Star,
    label: "Conexión con el Entorno",
    description: "Vincula el fenómeno científico con su comunidad y vida cotidiana.",
    color: "text-yellow-500",
  },
];

const Block = ({ title, badge, children }: { title: string; badge: string; children: React.ReactNode }) => (
  <div>
    <div className="flex items-center justify-between">
      <h4 className="font-display font-semibold">{title}</h4>
      <span className="text-xs text-muted-foreground">{badge}</span>
    </div>
    <div className="mt-2 text-sm text-muted-foreground leading-relaxed space-y-1">{children}</div>
  </div>
);

export default Workspace;
