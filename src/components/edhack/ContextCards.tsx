import { Waves, Mountain, TreePine, ArrowUpRight } from "lucide-react";

const contexts = [
  {
    name: "Costa / Urbano",
    icon: Waves,
    bg: "bg-gradient-coast",
    desc: "Fenómenos sobre contaminación marina, hábitos urbanos y energía renovable en ciudad.",
    examples: ["Microplásticos en playas", "Islas de calor", "Gestión del agua potable"],
  },
  {
    name: "Sierra / Rural",
    icon: Mountain,
    bg: "bg-gradient-mountain",
    desc: "Indagaciones sobre agricultura andina, biodiversidad y saberes ancestrales.",
    examples: ["Conservación de papas nativas", "Heladas y cultivos", "Fitoterapia local"],
  },
  {
    name: "Selva",
    icon: TreePine,
    bg: "bg-gradient-jungle",
    desc: "Proyectos sobre ecosistemas amazónicos, salud comunitaria y bioprospección.",
    examples: ["Plantas medicinales", "Calidad del agua de río", "Biodiversidad local"],
  },
];

const ContextCards = () => {
  return (
    <section id="contextos" className="container py-24">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">Contextos locales</p>
        <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold tracking-tight">
          Una IA que entiende dónde enseñas
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Cada guía se adapta al ecosistema, recursos y realidades del territorio peruano.
        </p>
      </div>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        {contexts.map((c) => (
          <article
            key={c.name}
            className="group relative rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-elegant transition-all duration-500 ease-smooth hover:-translate-y-1 cursor-pointer"
          >
            <div className={`relative h-40 rounded-xl ${c.bg} overflow-hidden`}>
              <c.icon className="absolute right-4 bottom-4 h-20 w-20 text-foreground/15 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 ease-smooth" />
              <ArrowUpRight className="absolute right-3 top-3 h-5 w-5 text-foreground/40 group-hover:text-foreground transition-colors" />
            </div>
            <h3 className="mt-5 font-display text-xl font-semibold">{c.name}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
            <ul className="mt-4 space-y-1.5">
              {c.examples.map((e) => (
                <li key={e} className="text-xs text-muted-foreground flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-primary" />
                  {e}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ContextCards;