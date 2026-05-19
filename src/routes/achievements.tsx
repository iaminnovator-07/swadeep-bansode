import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { ExpandableCard } from "@/components/cards/ExpandableCard";
import { ACHIEVEMENTS } from "@/data/portfolio";
import { Trophy } from "lucide-react";

export const Route = createFileRoute("/achievements")({
  component: Achievements,
  head: () => ({ meta: [
    { title: "Achievements — Swadeep Bansode" },
    { name: "description", content: "National rankings, hackathon wins, awards and recognitions." },
  ]}),
});

function Achievements() {
  const grouped = ACHIEVEMENTS.reduce((acc, curr) => {
    const year = curr.year || "—";
    if (!acc[year]) acc[year] = [];
    acc[year].push(curr);
    return acc;
  }, {} as Record<string, typeof ACHIEVEMENTS>);

  const sortedYears = Object.keys(grouped).sort((a, b) => {
    if (a === "—") return 1;
    if (b === "—") return -1;
    return parseInt(b) - parseInt(a);
  });

  return (
    <PageShell eyebrow="Trophy room" title="Achievements" subtitle="Wins, podiums and recognitions across the engineering circuit.">
      <div className="space-y-16">
        {sortedYears.map((year) => (
          <div key={year}>
            <div className="flex items-center gap-4 mb-6">
              <div className="chip font-bold text-emerald-400 border-emerald-400/20 bg-emerald-400/10">
                {year === "—" ? "Earlier & Ongoing" : year}
              </div>
              <div className="h-px flex-1 bg-emerald-400/20" />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {grouped[year].map((a, i) => (
                <ExpandableCard
                  key={i}
                  eyebrow={`Achievement`}
                  title={a.title}
                  subtitle={a.detail}
                  description={`${a.detail}. Awarded in ${a.year}. A milestone recognising Swadeep's contribution to innovation, engineering and the SYGNIX ecosystem.`}
                  meta={[
                    { label: "Year", value: a.year },
                    { label: "Category", value: a.title.split(" ")[0] },
                  ]}
                  hint={`${a.title} — ${a.detail}`}
                  preview={
                    <div className="flex items-start gap-4">
                      <div className="rounded-lg bg-emerald-400/15 border border-emerald-400/30 p-2">
                        <Trophy className="h-5 w-5 text-emerald-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-baseline justify-between gap-2">
                          <h3 className="font-display text-base text-foreground group-hover:text-gradient transition">{a.title}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{a.detail}</p>
                      </div>
                    </div>
                  }
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
