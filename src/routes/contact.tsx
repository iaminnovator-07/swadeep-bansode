import { createFileRoute } from "@tanstack/react-router";
import { PageShell, HoloCard } from "@/components/layout/PageShell";
import { Github, Linkedin, Mail, Instagram } from "lucide-react";
import { PROFILE } from "@/data/portfolio";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  component: Contact,
  head: () => ({ meta: [
    { title: "Contact — Swadeep Bansode" },
    { name: "description", content: "Open a channel with Swadeep. Collaborations, mentorship, ideas." },
  ]}),
});

function Contact() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`https://formsubmit.co/ajax/${PROFILE.links.email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `New portfolio transmission from ${formData.name}`
        })
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data?.message || "Transmission failed");
      }

      setSent(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (err: any) {
      setError(err?.message || "Failed to transmit. Please try again or use direct channels.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageShell eyebrow="Open a channel" title="Contact" subtitle="Collaborations, mentorship, weird hardware ideas — all welcome.">
      <div className="grid md:grid-cols-2 gap-5">
        <HoloCard>
          <form
            onSubmit={handleSubmit}
            className="space-y-3"
          >
            <input 
              required 
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Your name" 
              className="w-full bg-background/60 border border-primary/30 rounded-lg px-3 py-2.5 outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/30 text-sm" 
            />
            <input 
              required 
              type="email" 
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Email" 
              className="w-full bg-background/60 border border-primary/30 rounded-lg px-3 py-2.5 outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/30 text-sm" 
            />
            <textarea 
              required 
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Transmission…" 
              rows={5} 
              className="w-full bg-background/60 border border-primary/30 rounded-lg px-3 py-2.5 outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/30 text-sm resize-none" 
            />
            {error && <p className="text-red-400 text-xs">{error}</p>}
            <button 
              type="submit" 
              disabled={loading || sent}
              className="w-full rounded-lg bg-primary text-primary-foreground py-2.5 text-sm uppercase tracking-widest hover:brightness-110 glow-cyan transition disabled:opacity-50"
            >
              {loading ? "Transmitting..." : sent ? "Signal sent ✓" : "Transmit"}
            </button>
          </form>
        </HoloCard>

        <div className="space-y-4">
          <HoloCard>
            <div className="font-display text-sm uppercase tracking-widest text-muted-foreground mb-3">Direct channels</div>
            <div className="space-y-2">
              <ChannelLink icon={<Github className="h-4 w-4" />} label="GitHub" href={PROFILE.links.github} />
              <ChannelLink icon={<Linkedin className="h-4 w-4" />} label="LinkedIn" href={PROFILE.links.linkedin} />
              <ChannelLink icon={<Mail className="h-4 w-4" />} label={PROFILE.links.email} href={`mailto:${PROFILE.links.email}`} />
              <ChannelLink icon={<Instagram className="h-4 w-4" />} label="Instagram" href={PROFILE.links.instagram} />
            </div>
          </HoloCard>
          <HoloCard>
            <div className="font-display text-sm uppercase tracking-widest text-muted-foreground mb-2">Or — ask AURORA</div>
            <p className="text-sm text-muted-foreground">Tap the orb in the bottom-right. She knows everything about Swadeep's projects, SYGNIX and the roadmap.</p>
          </HoloCard>
        </div>
      </div>
    </PageShell>
  );
}

function ChannelLink({ icon, label, href }: { icon: React.ReactNode; label: string; href: string }) {
  return (
    <a href={href} className="flex items-center gap-3 px-3 py-2 rounded-lg border border-primary/20 hover:bg-primary/10 hover:border-primary/40 transition group">
      <span className="text-primary">{icon}</span>
      <span className="text-sm text-foreground/90 group-hover:text-foreground">{label}</span>
    </a>
  );
}
