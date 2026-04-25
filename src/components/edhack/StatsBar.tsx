import { useEffect, useRef, useState } from "react";

function useCountUp(target: number, duration = 1800) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (t: number) => {
            const p = Math.min(1, (t - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(Math.round(target * eased));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);
  return { val, ref };
}

const StatItem = ({ value, suffix, label }: { value: number; suffix: string; label: string }) => {
  const { val, ref } = useCountUp(value);
  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-4xl md:text-5xl font-bold tracking-tight">
        {val.toLocaleString("es-PE")}
        <span className="text-primary">{suffix}</span>
      </div>
      <p className="mt-2 text-sm md:text-base text-muted-foreground">{label}</p>
    </div>
  );
};

const StatsBar = () => {
  return (
    <section className="border-y border-border bg-card/40">
      <div className="container py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        <StatItem value={1500} suffix="+" label="horas ahorradas por docentes" />
        <StatItem value={85} suffix="%" label="mejora en calidad de proyectos" />
        <StatItem value={420} suffix="+" label="guías contextualizadas generadas" />
      </div>
    </section>
  );
};

export default StatsBar;