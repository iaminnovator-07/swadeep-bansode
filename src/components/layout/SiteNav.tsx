import { Link, useLocation } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, PROFILE } from "@/data/portfolio";
import logoImg from "@/assets/logo.png";

export function SiteNav() {
  const loc = useLocation();
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 inset-x-0 z-40">
      <div className="mx-auto max-w-7xl px-4 md:px-8 pt-4">
        <div className="glass rounded-2xl flex items-center justify-between px-4 md:px-6 py-3">
          <Link to="/" className="flex items-center gap-3 group">
            <img src={logoImg} alt="SYGNIX Logo" className="h-8 w-8 object-contain filter drop-shadow-[0_0_8px_rgba(0,255,255,0.4)] group-hover:scale-105 transition-transform duration-300" />
            <span className="font-display tracking-[0.18em] text-sm uppercase text-gradient">{PROFILE.name.split(" ")[0]}</span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((l) => {
              const active = loc.pathname === l.to;
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`px-3 py-1.5 rounded-lg text-xs uppercase tracking-widest transition ${
                    active ? "text-primary neon-text bg-primary/10 border border-primary/30" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>
          <button onClick={() => setOpen((v) => !v)} className="md:hidden text-foreground" aria-label="Menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {open && (
          <div className="glass-strong rounded-2xl mt-2 p-3 md:hidden grid grid-cols-2 gap-1">
            {NAV_LINKS.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="px-3 py-2 rounded-lg text-xs uppercase tracking-widest text-foreground/80 hover:bg-primary/10">
                {l.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
