import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { ExpandableCard } from "@/components/cards/ExpandableCard";
import { EXPERIENCE } from "@/data/portfolio";

export const Route = createFileRoute("/experience")({
  component: Experience,
  head: () => ({ meta: [
    { title: "Experience & Leadership — Swadeep Bansode" },
    { name: "description", content: "Roles, leadership, mentorship and ecosystem building." },
  ]}),
});

function Experience() {
  return (
    <PageShell eyebrow="Career timeline" title="Experience & Leadership" subtitle="Roles, mentorship, leadership across innovation, finance and education.">
      <div className="relative pl-6 border-l border-primary/30 space-y-5">
        {EXPERIENCE.map((e, i) => (
          <div key={i} className="relative">
            <div className="absolute -left-[31px] top-3 h-3 w-3 rounded-full bg-primary glow-cyan" />
            <ExpandableCard
              eyebrow={`${e.org} · ${e.period}`}
              title={e.role}
              subtitle={e.org}
              description={e.detail}
              meta={[
                { label: "Role", value: e.role },
                { label: "Period", value: e.period },
              ]}
              hint={`${e.role} @ ${e.org}`}
              preview={
                <>
                  <div className="flex items-baseline justify-between gap-2 flex-wrap">
                    <h3 className="font-display text-lg text-gradient">{e.role}</h3>
                    <span className="font-mono text-xs text-primary">{e.period}</span>
                  </div>
                  <div className="text-sm text-foreground/90 mt-1">{e.org}</div>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{e.detail}</p>
                </>
              }
            />
          </div>
        ))}
      </div>
    </PageShell>
  );
}
