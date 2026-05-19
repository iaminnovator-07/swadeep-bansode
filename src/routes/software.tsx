import { createFileRoute, useLocation } from "@tanstack/react-router";
import { useEffect } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { ExpandableCard } from "@/components/cards/ExpandableCard";
import { SOFTWARE_PROJECTS } from "@/data/portfolio";
import { Code2 } from "lucide-react";

export const Route = createFileRoute("/software")({
  component: Software,
  head: () => ({ meta: [
    { title: "Software Projects — Swadeep Bansode" },
    { name: "description", content: "Web platforms, apps, dashboards and AI tooling." },
  ]}),
});

function Software() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const el = document.getElementById(location.hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          el.classList.add('ring-2', 'ring-accent', 'ring-offset-2', 'ring-offset-background', 'rounded-xl', 'transition-all', 'duration-700');
          setTimeout(() => el.classList.remove('ring-2', 'ring-accent', 'ring-offset-2', 'ring-offset-background'), 2000);
        }
      }, 100);
    }
  }, [location.hash]);

  const groups = [
    { year: "2026", title: "Flagship Systems", projects: [] as typeof SOFTWARE_PROJECTS },
    { year: "2024–2025", title: "Transition to Flagship", projects: [] as typeof SOFTWARE_PROJECTS },
    { year: "2023", title: "Advanced Innovation", projects: [] as typeof SOFTWARE_PROJECTS },
    { year: "2022", title: "IoT & Real-World Systems", projects: [] as typeof SOFTWARE_PROJECTS },
    { year: "2021", title: "Robotics, Aurora & Early AI", projects: [] as typeof SOFTWARE_PROJECTS },
    { year: "2020", title: "Foundation & Learning", projects: [] as typeof SOFTWARE_PROJECTS },
  ];

  SOFTWARE_PROJECTS.forEach(p => {
    const name = p.name;
    let year = "2020";
    if (name.includes("HazardEye") || name.includes("AranyaSync") || name.includes("MediRoute") || name.includes("Study Flow") || name.includes("Comrade") || name.includes("Machine Monitoring") || name.includes("Sensors Info") || name.includes("Music Player") || name.includes("Task Manager")) year = "2026";
    else if (name.includes("Aurora 3.0") || name.includes("Phantom") || name.includes("Karma") || name.includes("Saaya")) year = "2024–2025";
    else if (name.includes("C Code") || name.includes("EY") || name.includes("Battery") || name.includes("School")) year = "2023";
    else if (name.includes("Attendance App") || name.includes("Notifier") || name.includes("AgroBot Controller")) year = "2022";
    else if (name.includes("Aurora App") || name.includes("Aurora 2.0") || name.includes("Remote")) year = "2021";
    
    groups.find(g => g.year === year)?.projects.push(p);
  });

  return (
    <PageShell eyebrow={`${SOFTWARE_PROJECTS.length} stacks deployed`} title="Software Stack" subtitle="Web · Mobile apps · Dashboards · AI tooling.">
      <div className="space-y-16">
        {groups.map(group => group.projects.length > 0 && (
          <div key={group.year}>
            <div className="flex items-center gap-4 mb-6">
              <div className="chip font-bold text-accent border-accent/20 bg-accent/10">{group.year}</div>
              <h2 className="text-xl font-display font-bold text-foreground/90">{group.title}</h2>
              <div className="h-px flex-1 bg-accent/20" />
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {group.projects.map((p) => {
                const cardId = p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                return (
                <div key={p.name} id={cardId} className="scroll-mt-32 h-full">
                <ExpandableCard
                  accent="accent"
                  eyebrow="Software stack"
                  title={p.name}
                  subtitle={p.desc}
                  description={`${p.desc} Designed and shipped from the SYGNIX software stack — modern web/app architecture, clean UX, and production-ready tooling.`}
                  tags={p.tags}
                  meta={[
                    { label: "Status", value: p.status ?? "shipped" },
                    { label: "Domain", value: p.tags[0] ?? "Web" },
                  ]}
                  hint={`${p.name} — ${p.desc}`}
                  preview={
                    <>
                      <Code2 className="h-5 w-5 text-accent mb-3" />
                      <h3 className="font-display text-lg text-foreground group-hover:text-gradient transition">{p.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{p.desc}</p>
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {p.tags.map((t) => (
                          <span key={t} className="text-[10px] tracking-widest uppercase text-accent bg-accent/10 border border-accent/30 px-2 py-0.5 rounded">{t}</span>
                        ))}
                      </div>
                    </>
                  }
                />
                </div>
              )})}
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
