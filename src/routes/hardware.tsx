import { createFileRoute, useLocation } from "@tanstack/react-router";
import { useEffect } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { ExpandableCard } from "@/components/cards/ExpandableCard";
import { HARDWARE_PROJECTS } from "@/data/portfolio";
import { Cpu } from "lucide-react";

export const Route = createFileRoute("/hardware")({
  component: Hardware,
  head: () => ({ meta: [
    { title: "Hardware Projects — Swadeep Bansode" },
    { name: "description", content: "Embedded systems, robotics, IoT mesh, PCB design and sensor projects." },
  ]}),
});

function Hardware() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const el = document.getElementById(location.hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          el.classList.add('ring-2', 'ring-primary', 'ring-offset-2', 'ring-offset-background', 'rounded-xl', 'transition-all', 'duration-700');
          setTimeout(() => el.classList.remove('ring-2', 'ring-primary', 'ring-offset-2', 'ring-offset-background'), 2000);
        }
      }, 100);
    }
  }, [location.hash]);

  const groups = [
    { year: "2026", title: "Flagship Systems", projects: [] as typeof HARDWARE_PROJECTS },
    { year: "2024–2025", title: "Transition to Flagship", projects: [] as typeof HARDWARE_PROJECTS },
    { year: "2023", title: "Advanced Innovation", projects: [] as typeof HARDWARE_PROJECTS },
    { year: "2022", title: "IoT & Real-World Systems", projects: [] as typeof HARDWARE_PROJECTS },
    { year: "2021", title: "Robotics, Aurora & Early AI", projects: [] as typeof HARDWARE_PROJECTS },
    { year: "2020", title: "Foundation & Learning", projects: [] as typeof HARDWARE_PROJECTS },
  ];

  HARDWARE_PROJECTS.forEach(p => {
    const name = p.name;
    let year = "2020";
    if (name.includes("HazardEye") || name.includes("AranyaSync") || name.includes("Machine Monitoring")) year = "2026";
    else if (name.includes("Phantom") || name.includes("Karma") || name.includes("Saaya") || name.includes("Aurora 3.0")) year = "2024–2025";
    else if (name.includes("Battery")) year = "2023";
    else if (name.includes("RFID") || name.includes("Women") || name.includes("Blind") || name.includes("Traffic") || name.includes("ESP32") || name.includes("AgroBot") || name.includes("Corona")) year = "2022";
    else if (name.includes("Car") || name.includes("Robot") || name.includes("Parking") || name.includes("LPG") || name.includes("Dustbin") || name.includes("Solar") || name.includes("Aurora")) year = "2021";
    
    groups.find(g => g.year === year)?.projects.push(p);
  });

  return (
    <PageShell eyebrow={`${HARDWARE_PROJECTS.length} systems online`} title="Hardware Lab" subtitle="Embedded systems · Robotics · IoT · PCB design · Sensor fusion.">
      <div className="space-y-16">
        {groups.map(group => group.projects.length > 0 && (
          <div key={group.year}>
            <div className="flex items-center gap-4 mb-6">
              <div className="chip font-bold text-primary">{group.year}</div>
              <h2 className="text-xl font-display font-bold text-foreground/90">{group.title}</h2>
              <div className="h-px flex-1 bg-primary/20" />
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {group.projects.map((p, i) => {
                const cardId = p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                return (
                <div key={p.name + i} id={cardId} className="scroll-mt-32 h-full">
                <ExpandableCard
                  eyebrow="Hardware module"
                  title={p.name}
                  subtitle={p.desc}
                  description={`${p.desc} Engineered as part of Swadeep's hardware lab — combining embedded firmware, sensor fusion and rugged enclosure design. Built and validated through iterative prototyping.`}
                  tags={p.tags}
                  meta={[
                    { label: "Status", value: p.status ?? "prototype" },
                    { label: "Domain", value: p.tags[0] ?? "Embedded" },
                  ]}
                  hint={`${p.name} — ${p.desc}`}
                  preview={
                    <>
                      <div className="flex items-start justify-between mb-3">
                        <Cpu className="h-5 w-5 text-primary" />
                        {p.status && (
                          <span
                            className="chip"
                            style={{
                              borderColor: p.status === "active" ? "oklch(0.88 0.22 145 / 0.4)" : undefined,
                              color: p.status === "active" ? "oklch(0.88 0.22 145)" : undefined,
                            }}
                          >
                            {p.status}
                          </span>
                        )}
                      </div>
                      <h3 className="font-display text-lg text-foreground group-hover:text-gradient transition">{p.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{p.desc}</p>
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {p.tags.map((t) => (
                          <span key={t} className="text-[10px] tracking-widest uppercase text-primary/80 bg-primary/10 border border-primary/20 px-2 py-0.5 rounded">{t}</span>
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
