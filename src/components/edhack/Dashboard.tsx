import { Award, Clock, FileCheck2, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Dashboard = ({ guidesCreated }: { guidesCreated: number }) => {
  const hoursSaved = guidesCreated * 6;
  const templates = [
    { title: "Microplásticos en la costa", region: "Costa", cat: "B" },
    { title: "Heladas y agricultura andina", region: "Sierra", cat: "C" },
    { title: "Plantas medicinales amazónicas", region: "Selva", cat: "A" },
  ];

  return (
    <section id="dashboard" className="container py-24">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">Tu impacto</p>
        <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold tracking-tight">
          Dashboard del Docente
        </h2>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
        <Stat icon={FileCheck2} label="Guías creadas" value={String(guidesCreated)} accent />
        <Stat icon={Clock} label="Tiempo total ahorrado" value={`${hoursSaved} h`} sub="6 h por guía" />
        <div className="rounded-2xl border border-border bg-gradient-primary p-6 text-primary-foreground shadow-glow flex flex-col justify-between">
          <Award className="h-7 w-7" />
          <div>
            <p className="text-sm opacity-80">Reconocimiento</p>
            <p className="mt-1 font-display text-xl font-semibold">Docente Innovador STEM</p>
            <Badge className="mt-3 bg-primary-foreground text-primary border-0">Nivel 2</Badge>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <div className="flex items-end justify-between">
          <h3 className="font-display text-xl font-semibold">Plantillas pre-diseñadas</h3>
          <span className="text-sm text-muted-foreground">Listas para personalizar</span>
        </div>
        <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-5">
          {templates.map((t) => (
            <article
              key={t.title}
              className="group rounded-2xl border border-border bg-card p-5 transition-all duration-300 ease-smooth hover:-translate-y-1 hover:shadow-elegant cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <Badge variant="secondary">{t.region}</Badge>
                <span className="text-xs text-muted-foreground">Cat. {t.cat}</span>
              </div>
              <p className="mt-4 font-display text-lg font-semibold group-hover:text-primary transition-colors">
                {t.title}
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                <TrendingUp className="h-3.5 w-3.5" /> Usada por 124 docentes
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

const Stat = ({ icon: Icon, label, value, sub, accent }: { icon: any; label: string; value: string; sub?: string; accent?: boolean }) => (
  <div className={`rounded-2xl border border-border bg-card p-6 shadow-sm`}>
    <Icon className={`h-7 w-7 ${accent ? "text-primary" : "text-muted-foreground"}`} />
    <p className="mt-4 text-sm text-muted-foreground">{label}</p>
    <p className="mt-1 font-display text-3xl font-bold tracking-tight">{value}</p>
    {sub && <p className="mt-1 text-xs text-muted-foreground">{sub}</p>}
  </div>
);

export default Dashboard;