import { useEffect, useRef } from "react";

export function Background() {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = canvas.current;
    if (!el) return;
    const ctx = el.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let t = 0;
    let W = (el.width = window.innerWidth);
    let H = (el.height = window.innerHeight);

    let mx = 0, my = 0;
    let targetMx = 0, targetMy = 0;

    // Track mouse position with client coordinates mapped to center-relative coords
    const onMouseMove = (e: MouseEvent) => {
      targetMx = (e.clientX / W) * 2 - 1;
      targetMy = (e.clientY / H) * 2 - 1;
    };
    window.addEventListener("mousemove", onMouseMove);

    // Double-layered mountains for parallax depth
    const distantMountains: { x: number; y: number }[] = [];
    const closeMountains: { x: number; y: number }[] = [];
    const mountainCount = 40;

    const generateMountains = () => {
      distantMountains.length = 0;
      closeMountains.length = 0;
      for (let i = 0; i <= mountainCount; i++) {
        const x = (i / mountainCount) * W * 1.6 - W * 0.3;
        
        // Distant mountains (lower peaks, further back)
        const distY = H * 0.7 + (Math.sin(i * 0.4) * 35) + (Math.cos(i * 1.1) * 15) - 30;
        distantMountains.push({ x, y: distY });

        // Close mountains (higher, sharper peaks, closer to lake)
        const closeY = H * 0.74 + (Math.sin(i * 0.6) * 45) + (Math.cos(i * 1.5) * 20) - 20;
        closeMountains.push({ x, y: closeY });
      }
    };
    generateMountains();

    const onResize = () => {
      W = el.width = window.innerWidth;
      H = el.height = window.innerHeight;
      generateMountains();
    };
    window.addEventListener("resize", onResize);

    // Twinkling stars with depth
    const stars = Array.from({ length: 280 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H * 0.75, // Stars mostly in sky
      r: 0.3 + Math.random() * 1.2,
      alpha: 0.15 + Math.random() * 0.8,
      twinkle: Math.random() * Math.PI * 2,
      speed: 0.003 + Math.random() * 0.015,
      parallax: 0.05 + Math.random() * 0.25
    }));

    // Richer, multi-color overlapping bands matching reference image:
    // Green bottom, shifting to magenta/pink in the middle, and violet/deep blue at the top.
    const bands = [
      // 1. Green / Lime bottom layer (Strongest, close to horizon)
      { yRatio: 0.32, freq: 0.0018, phase: 0.0, phaseSpd: 0.002, amp: 110, h1: 115, h2: 145, thick: 240, alpha: 0.5 },
      // 2. Cyan / Teal mid layer
      { yRatio: 0.24, freq: 0.0024, phase: 1.5, phaseSpd: 0.003, amp: 130, h1: 160, h2: 195, thick: 200, alpha: 0.4 },
      // 3. Magenta / Violet upper-mid layer
      { yRatio: 0.18, freq: 0.0012, phase: 3.2, phaseSpd: 0.0015, amp: 140, h1: 295, h2: 325, thick: 220, alpha: 0.45 },
      // 4. Purple / Deep Indigo top layer
      { yRatio: 0.12, freq: 0.0020, phase: 4.8, phaseSpd: 0.0025, amp: 100, h1: 255, h2: 285, thick: 180, alpha: 0.35 },
    ];

    // Floating ambient dust particles with slow sway and mouse push
    const particles = Array.from({ length: 65 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      s: Math.random() * 1.8 + 0.4,
      vy: -0.15 - Math.random() * 0.35,
      vxOffset: Math.random() * Math.PI * 2,
      vxSpeed: 0.005 + Math.random() * 0.01,
      glowAlpha: 0.03 + Math.random() * 0.07,
      colorHue: Math.random() > 0.5 ? 140 : 280 // Greenish or violet dust
    }));

    // Mouse coordinates relative to page for particle push interaction
    let mousePageX = -1000;
    let mousePageY = -1000;
    const onMousePageMove = (e: MouseEvent) => {
      mousePageX = e.clientX;
      mousePageY = e.clientY;
    };
    window.addEventListener("mousemove", onMousePageMove);

    // Dynamic Aurora Drawer (Curtain / Vertical Drapery Rays)
    const drawAurora = (ctx: CanvasRenderingContext2D, yOffset: number, scaleY: number = 1, isReflection: boolean = false) => {
      ctx.globalCompositeOperation = "lighter";
      
      for (const b of bands) {
        const breathe = 0.8 + 0.2 * Math.sin(t * 0.008 + b.phase);
        
        // Calculate dynamic slice rendering (step size based on width for optimal performance)
        const stepSize = Math.max(4, Math.ceil(W / 160));
        
        for (let x = 0; x < W; x += stepSize) {
          const px = x + mx * W * 0.02;
          
          // Primary wave equation
          const wave = Math.sin(px * b.freq + b.phase + t * b.phaseSpd);
          const py = b.yRatio * H + wave * b.amp;
          
          // Vertical light shaft modulation (volumetric streaks)
          // Combines high-frequency noise and low-frequency sways
          const drapery = Math.sin(px * 0.08 - t * 0.03) * Math.cos(px * 0.025 + t * 0.01);
          const rayIntensity = 0.55 + 0.45 * Math.sin(px * 0.008 + drapery * 4);
          
          const height = b.thick * (0.75 + 0.25 * Math.sin(px * 0.006 + t * 0.004)) * scaleY;
          const finalAlpha = b.alpha * breathe * rayIntensity * (isReflection ? 0.3 : 1.0);

          // Skip drawing if invisible
          if (finalAlpha <= 0.01) continue;

          const topY = yOffset + py * scaleY - height * 0.5;
          const bottomY = yOffset + py * scaleY + height * 0.5;

          // Vertical linear gradient representing light shafts
          const grad = ctx.createLinearGradient(x, topY, x, bottomY);
          
          // Invert gradient flow for reflection to match vertical scale
          if (scaleY < 0) {
            grad.addColorStop(0, `hsla(${b.h2}, 95%, 60%, 0)`);
            grad.addColorStop(0.3, `hsla(${b.h1}, 95%, 65%, ${finalAlpha * 0.8})`);
            grad.addColorStop(0.5, `hsla(${b.h2}, 100%, 75%, ${finalAlpha})`);
            grad.addColorStop(0.7, `hsla(${b.h1}, 95%, 65%, ${finalAlpha * 0.8})`);
            grad.addColorStop(1, `hsla(${b.h1}, 100%, 70%, 0)`);
          } else {
            grad.addColorStop(0, `hsla(${b.h1}, 100%, 70%, 0)`);
            grad.addColorStop(0.3, `hsla(${b.h1}, 95%, 65%, ${finalAlpha * 0.8})`);
            grad.addColorStop(0.5, `hsla(${b.h2}, 100%, 75%, ${finalAlpha})`);
            grad.addColorStop(0.7, `hsla(${b.h1}, 95%, 65%, ${finalAlpha * 0.8})`);
            grad.addColorStop(1, `hsla(${b.h2}, 95%, 60%, 0)`);
          }

          ctx.beginPath();
          ctx.moveTo(x, topY);
          ctx.lineTo(x, bottomY);
          ctx.strokeStyle = grad;
          ctx.lineWidth = stepSize + 1; // Slight overlap to prevent seam gaps
          ctx.stroke();
        }
      }
      
      ctx.globalCompositeOperation = "source-over";
    };

    const tick = () => {
      t++;
      
      // Interpolate parallax offsets
      mx += (targetMx - mx) * 0.04;
      my += (targetMy - my) * 0.04;

      ctx.clearRect(0, 0, W, H);
      
      // Deep cinematic night sky
      const sky = ctx.createLinearGradient(0, 0, 0, H * 0.85);
      sky.addColorStop(0, "hsl(232, 48%, 3%)");
      sky.addColorStop(0.3, "hsl(238, 33%, 5%)");
      sky.addColorStop(0.6, "hsl(245, 25%, 6.5%)");
      sky.addColorStop(1, "hsl(255, 18%, 8%)");
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, W, H);

      // Stars drawing
      for (const s of stars) {
        s.twinkle += s.speed;
        const alphaMod = 0.45 + 0.55 * Math.sin(s.twinkle);
        ctx.globalAlpha = s.alpha * alphaMod;
        
        ctx.fillStyle = `hsl(${190 + Math.floor(s.r * 30)}, 85%, 94%)`;
        
        // Parallax coordinates wrapping
        const px = s.x - mx * W * s.parallax * 0.03;
        const py = s.y - my * H * s.parallax * 0.03;
        const wrappedX = (px % W + W) % W;
        const wrappedY = (py % H + H) % H;
        
        ctx.beginPath();
        ctx.arc(wrappedX, wrappedY, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1.0;

      // Volumetric atmospheric aurora backdrop (Soft ambient glow before sharp lines)
      ctx.globalCompositeOperation = "lighter";
      const greenBackGlow = ctx.createRadialGradient(W * 0.45, H * 0.65, 50, W * 0.45, H * 0.6, H * 0.55);
      greenBackGlow.addColorStop(0, "hsla(130, 95%, 55%, 0.08)");
      greenBackGlow.addColorStop(0.5, "hsla(180, 90%, 60%, 0.03)");
      greenBackGlow.addColorStop(1, "hsla(280, 95%, 50%, 0)");
      ctx.fillStyle = greenBackGlow;
      ctx.fillRect(0, 0, W, H);

      const purpleBackGlow = ctx.createRadialGradient(W * 0.15, H * 0.45, 20, W * 0.2, H * 0.4, H * 0.45);
      purpleBackGlow.addColorStop(0, "hsla(300, 95%, 60%, 0.07)");
      purpleBackGlow.addColorStop(0.6, "hsla(265, 90%, 55%, 0.02)");
      purpleBackGlow.addColorStop(1, "hsla(220, 95%, 50%, 0)");
      ctx.fillStyle = purpleBackGlow;
      ctx.fillRect(0, 0, W, H);
      ctx.globalCompositeOperation = "source-over";

      // Draw Main Aurora
      drawAurora(ctx, 0, 1.0, false);

      // Distant Mist & Fog (Lies between aurora and mountains)
      const distantFog = ctx.createLinearGradient(0, H * 0.45, 0, H * 0.76);
      distantFog.addColorStop(0, "hsla(232, 40%, 12%, 0)");
      distantFog.addColorStop(0.5, "hsla(220, 30%, 10%, 0.25)");
      distantFog.addColorStop(1, "hsla(232, 25%, 8%, 0.65)");
      ctx.fillStyle = distantFog;
      ctx.fillRect(0, H * 0.45, W, H * 0.32);

      // Layer 1: Distant Mountains (Parallax Layer)
      const distMountOffset = mx * W * 0.012;
      ctx.beginPath();
      ctx.moveTo(-100, H);
      for (const m of distantMountains) {
        ctx.lineTo(m.x - distMountOffset, m.y - my * 6);
      }
      ctx.lineTo(W + 100, H);
      ctx.closePath();
      
      const distantMountGrad = ctx.createLinearGradient(0, H * 0.62, 0, H * 0.85);
      distantMountGrad.addColorStop(0, "hsl(234, 18%, 8.5%)");
      distantMountGrad.addColorStop(1, "hsl(238, 20%, 4.5%)");
      ctx.fillStyle = distantMountGrad;
      ctx.fill();

      // Layer 2: Close Mountains (Sharper, parallax is faster)
      const closeMountOffset = mx * W * 0.024;
      ctx.beginPath();
      ctx.moveTo(-100, H);
      for (const m of closeMountains) {
        ctx.lineTo(m.x - closeMountOffset, m.y - my * 12);
      }
      ctx.lineTo(W + 100, H);
      ctx.closePath();

      const closeMountGrad = ctx.createLinearGradient(0, H * 0.68, 0, H * 0.82);
      closeMountGrad.addColorStop(0, "hsl(235, 22%, 5.5%)");
      closeMountGrad.addColorStop(1, "hsl(238, 25%, 2.5%)");
      ctx.fillStyle = closeMountGrad;
      ctx.fill();

      // Highlight Mountain ridges (Snowy silhouettes catching the aurora light)
      ctx.beginPath();
      for (let i = 0; i < closeMountains.length; i++) {
        const m = closeMountains[i];
        if (i === 0) {
          ctx.moveTo(m.x - closeMountOffset, m.y - my * 12);
        } else {
          ctx.lineTo(m.x - closeMountOffset, m.y - my * 12);
        }
      }
      ctx.strokeStyle = "hsla(135, 60%, 65%, 0.12)";
      ctx.lineWidth = 1.8;
      ctx.stroke();

      // Distant Glowing Horizon Mist (soft wrap at lake level)
      const horizonFog = ctx.createLinearGradient(0, H * 0.72, 0, H * 0.78);
      horizonFog.addColorStop(0, "hsla(238, 25%, 5%, 0)");
      horizonFog.addColorStop(0.5, "hsla(140, 50%, 40%, 0.08)");
      horizonFog.addColorStop(1, "hsla(238, 30%, 4%, 0.85)");
      ctx.fillStyle = horizonFog;
      ctx.fillRect(0, H * 0.72, W, H * 0.07);

      // Layer 3: Icy Lake Reflection
      const lakeY = H * 0.775;
      ctx.save();
      
      // Clip rendering to lake bounds
      ctx.beginPath();
      ctx.rect(0, lakeY, W, H - lakeY);
      ctx.clip();
      
      const lakeBase = ctx.createLinearGradient(0, lakeY, 0, H);
      lakeBase.addColorStop(0, "hsl(238, 32%, 5%)");
      lakeBase.addColorStop(0.3, "hsl(240, 24%, 3.5%)");
      lakeBase.addColorStop(1, "hsl(245, 18%, 2%)");
      ctx.fillStyle = lakeBase;
      ctx.fill();

      // Reflected Volumetric Aurora
      // Multiplied by -0.35 to flip, shrink and dim the vertical range
      drawAurora(ctx, lakeY * 2.0, -0.33, true);

      // Dynamic Water ripples with horizontal noise displacement
      ctx.globalCompositeOperation = "overlay";
      ctx.fillStyle = "hsla(180, 50%, 60%, 0.07)";
      for (let i = 0; i < 7; i++) {
        // Waves displace in sine sequences
        const waveY = lakeY + 8 + i * 28 + Math.sin(t * 0.02 + i) * 12;
        const waveXDisplace = Math.cos(t * 0.01 + i) * 45;
        
        ctx.beginPath();
        ctx.ellipse(W * 0.5 + waveXDisplace, waveY, W * 0.65, 1.2, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";
      ctx.restore();

      // Layer 4: Dust Particles (Floating Embers & Atmospheric Dust)
      for (const p of particles) {
        // Sway horizontally
        p.vxOffset += p.vxSpeed;
        const sway = Math.sin(p.vxOffset) * 0.22;
        
        p.y += p.vy;
        p.x += sway;

        // Mouse avoidance/push logic
        const dx = p.x - mousePageX;
        const dy = p.y - mousePageY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 130) {
          const force = (130 - dist) / 130;
          const pushX = (dx / dist) * force * 2.2;
          const pushY = (dy / dist) * force * 1.5;
          p.x += pushX;
          p.y += pushY;
        }

        // Boundary wrapping
        if (p.y < 0) {
          p.y = H;
          p.x = Math.random() * W;
        }
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;

        // Apply background parallax
        const px = p.x - mx * W * 0.015;
        const finalX = (px % W + W) % W;

        // Radial glowing halo for atmospheric particles
        const halo = ctx.createRadialGradient(finalX, p.y, 0, finalX, p.y, p.s * 4);
        halo.addColorStop(0, `hsla(${p.colorHue}, 100%, 80%, 0.8)`);
        halo.addColorStop(0.3, `hsla(${p.colorHue}, 80%, 75%, ${p.glowAlpha})`);
        halo.addColorStop(1, `hsla(${p.colorHue}, 80%, 75%, 0)`);

        ctx.beginPath();
        ctx.arc(finalX, p.y, p.s * 4, 0, Math.PI * 2);
        ctx.fillStyle = halo;
        ctx.fill();

        // Bright core
        ctx.beginPath();
        ctx.arc(finalX, p.y, p.s * 0.7, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.colorHue}, 100%, 94%, 0.95)`;
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    };

    tick();
    
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousemove", onMousePageMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <canvas ref={canvas} className="absolute inset-0" style={{ zIndex: 0 }} />
      {/* High-fidelity noise overlay for analog filmic texture */}
      <div 
        className="absolute inset-0 z-10 opacity-[0.035] mix-blend-overlay"
        style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }}
      />
      {/* Cinematic Vignette */}
      <div 
        className="absolute inset-0 z-10" 
        style={{ background: "radial-gradient(ellipse at center, transparent 35%, hsl(235 40% 3% / 0.85) 90%, hsl(232 45% 2% / 0.98) 100%)" }} 
        role="presentation"
      />
      {/* Bottom overlay gradient to maintain readability of text */}
      <div 
        className="absolute inset-x-0 bottom-0 z-10 h-[45vh] bg-gradient-to-t from-background via-background/88 to-transparent" 
        role="presentation"
      />
    </div>
  );
}
