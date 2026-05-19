import { createFileRoute } from "@tanstack/react-router";
import { PageShell, HoloCard } from "@/components/layout/PageShell";
import { SKILLS } from "@/data/portfolio";

export const Route = createFileRoute("/skills")({
  component: Skills,
  head: () => ({ meta: [
    { title: "Skills — Swadeep Bansode" },
    { name: "description", content: "Technical, soft and analytical skills inventory." },
  ]}),
});

function Skills() {
  return (
    <PageShell eyebrow="Capability matrix" title="Skills" subtitle="What's loaded into the system.">
      <div className="grid md:grid-cols-2 gap-5">
        {Object.entries(SKILLS).map(([cat, items]) => (
          <HoloCard key={cat}>
            <div className="font-display text-sm uppercase tracking-widest text-gradient mb-4">{cat}</div>
            <div className="flex flex-wrap gap-2">
              {(items as string[]).map((s) => (
                <span key={s} className="text-xs px-2.5 py-1 rounded-md bg-primary/8 border border-primary/20 text-foreground/90 hover:bg-primary/15 hover:border-primary/40 transition">
                  {s}
                </span>
              ))}
            </div>
          </HoloCard>
        ))}
      </div>
    </PageShell>
  );
}
