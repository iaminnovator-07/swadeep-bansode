import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { Background } from "@/components/fx/Background";
import { SiteNav } from "@/components/layout/SiteNav";
import { AuroraDock } from "@/components/aurora/AuroraDock";
import { SystemHUD } from "@/components/hud/SystemHUD";
import { BootLoader } from "@/components/hud/BootLoader";
import { PageLoader } from "@/components/hud/PageLoader";
import { Footer } from "@/components/layout/Footer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="glass-strong rounded-2xl p-10 text-center max-w-md">
        <h1 className="font-display text-7xl text-gradient">404</h1>
        <p className="mt-3 text-muted-foreground">Signal not found in this sector.</p>
        <Link to="/" className="inline-block mt-6 px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm tracking-widest uppercase hover:brightness-110">Return Home</Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="glass-strong rounded-2xl p-10 text-center max-w-md">
        <h1 className="font-display text-2xl text-gradient">System Glitch</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message || "Unknown anomaly."}</p>
        <button onClick={() => { router.invalidate(); reset(); }} className="mt-5 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm">Retry</button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Swadeep Bansode — Hardware Engineer · Robotics · SYGNIX" },
      { name: "description", content: "A futuristic AI engineering ecosystem by Swadeep Bansode. Hardware, robotics, IoT, software, and the AURORA holographic AI companion." },
      { property: "og:title", content: "Swadeep Bansode — AURORA · SYGNIX" },
      { property: "og:description", content: "Futuristic engineering ecosystem with the AURORA holographic AI companion." },
      { property: "og:image", content: "/logo.png" },
      { property: "og:image:width", content: "512" },
      { property: "og:image:height", content: "512" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Swadeep Bansode Portfolio" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Swadeep Bansode — AURORA · SYGNIX" },
      { name: "twitter:description", content: "Futuristic engineering ecosystem with the AURORA holographic AI companion." },
      { name: "twitter:image", content: "/logo.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/logo.png" }
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head><HeadContent /></head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const [booted, setBooted] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <Background />
      <PageLoader />
      <AnimatePresence mode="wait">
        {!booted ? (
          <BootLoader key="boot" onComplete={() => setBooted(true)} />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative z-10"
          >
            <SystemHUD />
            <SiteNav />
            <Outlet />
            <Footer />
            <AuroraDock />
          </motion.div>
        )}
      </AnimatePresence>
    </QueryClientProvider>
  );
}
