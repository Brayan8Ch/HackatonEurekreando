import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Lightbulb, ListChecks, Pencil, Sparkles, FileText, NotebookPen, Target } from "lucide-react";

interface WorkspaceProps {
  data: { departamento?: string; entorno: string; fenomeno: string; pro: boolean };
}

const Workspace = ({ data }: WorkspaceProps) => {
  const depLabel = data.departamento ? data.departamento.charAt(0).toUpperCase() + data.departamento.slice(1) : "Nacional";
  const entornoLabel = data.entorno.charAt(0).toUpperCase() + data.entorno.slice(1);

  return (
    <section id="workspace" className="container py-24">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">Resultado</p>
          <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold tracking-tight">
            Workspace de Vista Dual
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Lado izquierdo: la guía completa para ti. Lado derecho: la ficha del estudiante, lista para imprimir.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{depLabel}</Badge>
          <Badge variant="secondary">{entornoLabel}</Badge>
          {data.pro && <Badge className="bg-gradient-primary text-primary-foreground border-0">Eureka Pro</Badge>}
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Guía del docente */}
        <div className="rounded-2xl border border-border bg-card shadow-elegant overflow-hidden">
          <div className="flex items-center justify-between gap-3 border-b border-border bg-muted/40 px-5 py-3">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-primary" />
              <p className="text-sm font-semibold">Guía del Docente</p>
            </div>
            <Badge variant="outline" className="text-xs">Scaffolding activado</Badge>
          </div>
          <Tabs defaultValue="informe" className="p-5">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="informe">
                <FileText className="mr-1.5 h-3.5 w-3.5" /> Informe
              </TabsTrigger>
              <TabsTrigger value="bitacora">
                <NotebookPen className="mr-1.5 h-3.5 w-3.5" /> Bitácora
              </TabsTrigger>
              <TabsTrigger value="rubrica">
                <Target className="mr-1.5 h-3.5 w-3.5" /> Rúbrica
              </TabsTrigger>
            </TabsList>

            <TabsContent value="informe" className="mt-6 space-y-6 animate-fade-in">
              <Block title="Inicio" badge="15 min">
                Conversación motivadora sobre <strong>{data.fenomeno.toLowerCase()}</strong> en el entorno {entornoLabel.toLowerCase()}. Recoger saberes previos a través de un mapa colectivo.
              </Block>
              <Block title="Desarrollo · Reto cognitivo" badge="60 min">
                Plantear pregunta indagable: <em>“¿Cómo influye el entorno {entornoLabel.toLowerCase()} en {data.fenomeno.toLowerCase()}?”</em> Los estudiantes diseñan su estrategia y registran datos en la ficha.
              </Block>
              <Block title="Cierre" badge="20 min">
                Socialización de hallazgos, contraste de hipótesis y compromiso comunitario.
              </Block>
              <div className="rounded-xl border border-primary/20 bg-accent p-5">
                <p className="flex items-center gap-2 text-sm font-semibold text-accent-foreground">
                  <Lightbulb className="h-4 w-4" /> Tips de Scaffolding
                </p>
                <ul className="mt-3 space-y-2 text-sm text-foreground/80">
                  <li>• En lugar de dar la respuesta, pregunta: <em>“¿qué evidencia te llevó a pensar eso?”</em></li>
                  <li>• Usa analogías del contexto {depLabel.toLowerCase()} para anclar el concepto.</li>
                  <li>• Modela una sola vez y luego retira el andamio para fomentar autonomía.</li>
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="bitacora" className="mt-6 space-y-3 animate-fade-in">
              {["Sesión 1 · Observación inicial", "Sesión 2 · Diseño experimental", "Sesión 3 · Recolección de datos", "Sesión 4 · Análisis", "Sesión 5 · Comunicación"].map((s, i) => (
                <div key={s} className="flex items-center gap-3 rounded-lg border border-border p-3">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-accent text-accent-foreground text-xs font-semibold">{i + 1}</span>
                  <p className="text-sm">{s}</p>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="rubrica" className="mt-6 animate-fade-in">
              <div className="overflow-hidden rounded-xl border border-border">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50 text-left">
                    <tr>
                      <th className="p-3 font-semibold">Criterio</th>
                      <th className="p-3 font-semibold">Inicio</th>
                      <th className="p-3 font-semibold">Logrado</th>
                      <th className="p-3 font-semibold">Destacado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {[
                      ["Problematiza", "Identifica", "Formula pregunta", "Pregunta indagable"],
                      ["Diseña", "Sigue pasos", "Propone diseño", "Diseño riguroso"],
                      ["Comunica", "Describe", "Argumenta", "Sustenta con evidencia"],
                    ].map((row) => (
                      <tr key={row[0]}>
                        {row.map((c, i) => (
                          <td key={i} className={i === 0 ? "p-3 font-medium" : "p-3 text-muted-foreground"}>{c}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Ficha del estudiante */}
        <div className="rounded-2xl border border-border bg-card shadow-elegant overflow-hidden">
          <div className="flex items-center justify-between gap-3 border-b border-border bg-muted/40 px-5 py-3">
            <div className="flex items-center gap-2">
              <Pencil className="h-4 w-4 text-primary" />
              <p className="text-sm font-semibold">Ficha del Estudiante</p>
            </div>
            <Badge variant="outline" className="text-xs">Lenguaje sencillo</Badge>
          </div>
          <div className="p-6 md:p-8 space-y-6">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Mi nombre</p>
              <div className="mt-1 h-10 rounded-md border border-dashed border-border" />
            </div>
            <div>
              <p className="font-display text-lg font-semibold">¡Vamos a investigar!</p>
              <p className="mt-1 text-sm text-muted-foreground">Hoy descubriremos sobre {data.fenomeno.toLowerCase()}.</p>
            </div>

            <InquirySpace
              icon={<Lightbulb className="h-4 w-4" />}
              title="¿Qué creo que pasará?"
              hint="Escribe o dibuja tu hipótesis"
            />
            <InquirySpace
              icon={<ListChecks className="h-4 w-4" />}
              title="Lo que observo"
              hint="Dibuja lo que ves a tu alrededor"
              tall
            />
            <InquirySpace
              icon={<Sparkles className="h-4 w-4" />}
              title="Mi descubrimiento"
              hint="Comparto lo que aprendí"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const Block = ({ title, badge, children }: { title: string; badge: string; children: React.ReactNode }) => (
  <div>
    <div className="flex items-center justify-between">
      <h4 className="font-display font-semibold">{title}</h4>
      <span className="text-xs text-muted-foreground">{badge}</span>
    </div>
    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{children}</p>
  </div>
);

const InquirySpace = ({ icon, title, hint, tall }: { icon: React.ReactNode; title: string; hint: string; tall?: boolean }) => (
  <div>
    <p className="flex items-center gap-2 text-sm font-medium">
      <span className="grid h-6 w-6 place-items-center rounded-md bg-accent text-accent-foreground">{icon}</span>
      {title}
    </p>
    <div
      className={`mt-2 rounded-xl border-2 border-dashed border-border bg-background/40 ${tall ? "h-40" : "h-24"} grid place-items-center`}
    >
      <span className="text-xs text-muted-foreground">{hint}</span>
    </div>
  </div>
);

export default Workspace;