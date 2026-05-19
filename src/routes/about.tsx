import { createFileRoute } from "@tanstack/react-router";
import { PageShell, HoloCard } from "@/components/layout/PageShell";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({ meta: [
    { title: "About — Swadeep Bansode" },
    { name: "description", content: "Engineering journey, robotics, IoT, mentorship and the SYGNIX innovation mindset." },
  ]}),
});

const JOURNEY = [
  { year: "Origin", title: "First circuits", text: "Started with Arduino, line followers and a relentless curiosity for how things blink, beep, and move." },
  { year: "Build", title: "Embedded systems & PCBs", text: "Embedded C/C++, ESP32, FreeRTOS, sensor fusion. Began designing PCBs and full IoT meshes." },
  { year: "Lead", title: "AURORA & SYGNIX", text: "Founded SYGNIX. Shipped Aurora 1, 2, Indian variant. Began Aurora 3.0 — holographic AI companion." },
  { year: "Mentor", title: "ATL & beyond", text: "Mentor at Atal Tinkering Lab. Teaching the next builders. Building the ecosystem out loud." },
];

function About() {
  return (
    <PageShell eyebrow="Profile · v1.0" title="About Swadeep" subtitle="IoT Hardware engineer, robotics developer, innovator. Builder of AURORA. Lead of SYGNIX.">
      <div className="grid md:grid-cols-2 gap-5">
        {JOURNEY.map((j, i) => (
          <HoloCard key={i} className="animate-rise" >
            <div className="flex items-baseline justify-between mb-2">
              <h3 className="font-display text-xl text-gradient">{j.title}</h3>
              <span className="font-mono text-xs text-primary tracking-widest">{j.year}</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{j.text}</p>
          </HoloCard>
        ))}
      </div>

      <div className="mt-12 grid md:grid-cols-3 gap-5">
        {[
          { k: "Engineering", v: "Hardware-first thinking." },
          { k: "Innovation", v: "Ship bold, iterate fast." },
          { k: "Mentorship", v: "Lift while you climb." },
        ].map((p) => (
          <HoloCard key={p.k}>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">{p.k}</div>
            <div className="mt-2 font-display text-lg text-foreground">{p.v}</div>
          </HoloCard>
        ))}
      </div>
    </PageShell>
  );
}
