import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { ExpandableCard } from "@/components/cards/ExpandableCard";
import { SYGNIX } from "@/data/portfolio";

export const Route = createFileRoute("/sygnix")({
  component: Sygnix,
  head: () => ({ meta: [
    { title: "SYGNIX — Innovation Ecosystem" },
    { name: "description", content: "An innovation ecosystem fusing hardware, software, AI and robotics." },
  ]}),
});

function Sygnix() {
  return (
    <PageShell eyebrow="Ecosystem · v1.0" title="SYGNIX" subtitle={SYGNIX.tagline}>
      {/* Pillars */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {SYGNIX.pillars.map((p) => (
          <ExpandableCard
            key={p.name}
            eyebrow="SYGNIX Pillar"
            title={p.name}
            subtitle={p.detail}
            description={`${p.detail} A core pillar of the SYGNIX ecosystem driving long-term R&D, talent and shipped products.`}
            hint={`Pillar: ${p.name}`}
            preview={
              <>
                <h3 className="font-display text-lg text-gradient mb-2">{p.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{p.detail}</p>
              </>
            }
          />
        ))}
      </div>

      {/* Roadmap */}
      <h2 className="mt-16 mb-6 font-display text-2xl text-foreground">Roadmap</h2>
      <div className="grid md:grid-cols-4 gap-4">
        {SYGNIX.roadmap.map((r, i) => (
          <ExpandableCard
            key={i}
            accent="accent"
            eyebrow={`Roadmap · ${r.phase}`}
            title={r.title}
            subtitle={r.detail}
            description={`${r.detail} Planned for ${r.phase} of the SYGNIX roadmap — a milestone in the ecosystem's evolution.`}
            meta={[{ label: "Phase", value: r.phase }, { label: "Status", value: "Planned" }]}
            hint={`${r.phase} — ${r.title}`}
            preview={
              <>
                <div className="font-mono text-xs tracking-widest text-primary">{r.phase}</div>
                <div className="mt-2 font-display text-lg text-foreground">{r.title}</div>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{r.detail}</p>
              </>
            }
          />
        ))}
      </div>
    </PageShell>
  );
}
