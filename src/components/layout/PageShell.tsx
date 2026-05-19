
import { ReactNode } from "react";

export function PageShell({
  children,
  eyebrow,
  title,
  subtitle
}: {
  children: ReactNode;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
}) {
  return (
    <main className="
relative
pt-32
pb-32
px-4
md:px-8
max-w-7xl
mx-auto
bg-transparent
z-10
">
      {(eyebrow || title || subtitle) && (
        <header className="mb-12 animate-rise bg-transparent">
          {eyebrow && <div className="chip mb-4">{eyebrow}</div>}

          {title && (
            <h1 className="font-display text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight">
              <span className="text-gradient">{title}</span>
            </h1>
          )}

          {subtitle && (
            <p className="mt-4 max-w-2xl text-muted-foreground text-base md:text-lg">
              {subtitle}
            </p>
          )}
        </header>
      )}

      {children}
    </main>
  );
}

export function HoloCard({
  children,
  className = ""
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`
        relative
        rounded-xl
        p-5
        transition
        hover:border-primary/40
        hover:-translate-y-0.5
        hover:shadow-[0_20px_60px_-20px_oklch(0.85_0.18_210/0.4)]

        bg-[rgba(8,12,30,0.08)]
        backdrop-blur-md
        border
        border-cyan-400/10

        ${className}
      `}
    >
      <div className="absolute inset-x-4 -top-px h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

      {children}
    </div>
  );
}
