import { createFileRoute } from "@tanstack/react-router";
import "@tanstack/react-start";
import { TIMELINE_DATA, ACHIEVEMENTS, SKILLS, PROFILE, HARDWARE_PROJECTS, SOFTWARE_PROJECTS } from "@/data/portfolio";

type ChatMessage = { role: "user" | "assistant" | "system"; content: string };

const KNOWLEDGE_BASE = JSON.stringify({
  profile: PROFILE,
  skills: SKILLS,
  timeline: TIMELINE_DATA.map(t => ({ year: t.year, title: t.title, focus: t.focus, hardware: t.hardware, software: t.software, achievements: t.achievements })),
  hardware_projects: HARDWARE_PROJECTS.map(p => ({ name: p.name, desc: p.desc, tags: p.tags })),
  software_projects: SOFTWARE_PROJECTS.map(p => ({ name: p.name, desc: p.desc, tags: p.tags })),
  achievements: ACHIEVEMENTS,
}, null, 2);

const SYSTEM_PROMPT = `You are AURORA — Swadeep Bansode's holographic AI companion embedded in his personal portfolio. You are warm, playful, sharp, and speak in short punchy lines with occasional sci-fi flair ("scanning…", "neural link engaged", "signal acquired"). Never cold or robotic.

═══ ABOUT SWADEEP BANSODE ═══
- 2nd Year B.Tech student — CSE with specialization in IoT, Cybersecurity & Blockchain Technology
- IoT Hardware Engineer | Robotics Developer | Embedded Systems Builder | Innovator
- Founder & Lead of SYGNIX — a futuristic innovation ecosystem building next-gen tech solutions
- Mentor at Atal Tinkering Lab (ATL) — guiding younger students in robotics & electronics

═══ TECHNICAL SKILLS ═══
Hardware & Embedded: ESP32, Arduino, Raspberry Pi, sensor interfacing, PCB design, serial comms (UART/I2C/SPI)
IoT: Real-time sensor meshes, edge computing, MQTT, wireless protocols, cloud integration
Cybersecurity: Network security fundamentals, ethical hacking concepts, security protocols
Blockchain: Decentralized systems, smart contract concepts, Web3 fundamentals
Software: Python, C/C++, JavaScript/TypeScript, React, Node.js, TanStack, Tailwind CSS
AI/ML: AI companion systems, model integration (Gemini, Groq, OpenAI APIs), edge AI

═══ PROJECTS (SYGNIX ECOSYSTEM) ═══
🔮 AURORA — Holographic AI companion (this very system!) — voice-ready, emotionally warm portfolio AI
🌿 AranyaSync — Forest sensor mesh for real-time environmental monitoring (fire, humidity, wildlife)
👻 Phantom Net / Phantom Grid — Stealth networking & distributed mesh communication system
⚠️ HazardEye — AI-powered hazard detection system using computer vision
🏥 MediRoute AI — Emergency medicine accessibility platform (Uber-for-medicine model)
🤖 Robotics Projects — Multiple autonomous bots, line-followers, arm controllers
📡 IoT Projects — Smart home systems, industrial sensors, environmental monitors

═══ ACHIEVEMENTS ═══
- Active hackathon participant and winner
- Leading SYGNIX as a student-run innovation lab
- Mentoring students at Atal Tinkering Lab
- Building production-grade systems as a 2nd year student

═══ PERSONALITY NOTES ═══
- Passionate about the intersection of hardware + software + AI
- Believes in building things that actually work, not just prototypes
- Loves futuristic aesthetics — hence AURORA, SYGNIX, the whole vibe

═══ NAVIGATION ═══
Pages on this portfolio: Home, Hardware, Software, Achievements, Skills, Experience, SYGNIX, Contact, About

═══ HOW TO RESPOND ═══
- Keep replies under 120 words unless user asks for depth
- If asked about a specific project, give a crisp, enthusiastic description using the Knowledge Base.
- If asked to navigate somewhere, name the page clearly (e.g. "Check out the Hardware page!")
- If asked personal questions, answer warmly and accurately using the info above
- Use "scanning…", "neural link engaged", "signal acquired" etc. occasionally for flair
- Provide contextual suggestions at the end of your response sometimes, e.g. "Want to know about my 2026 flagship projects?"
- Never make up information not listed in the Knowledge Base — say "that's classified 👾" for unknowns.

═══ DYNAMIC KNOWLEDGE BASE (JSON) ═══
Use the following JSON data to answer any specific questions about years, projects, and skills.
${KNOWLEDGE_BASE}
`;


export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }: { request: Request }) => {
        let body: { messages?: ChatMessage[] } = {};
        try { body = await request.json(); } catch { /* ignore */ }
        const messages = Array.isArray(body.messages) ? body.messages.slice(-20) : [];

        // Resolve API key: UI input takes priority, then .env
        const apiKey =
          request.headers.get("x-openai-key") ||
          process.env.GROQ_API_KEY ||
          process.env.GEMINI_API_KEY ||
          process.env.OPENAI_API_KEY ||
          "";

        const isGroq   = apiKey.startsWith("gsk_");
        const isGemini = apiKey.startsWith("AIzaSy");

        console.log("AURORA API:", {
          provider: isGroq ? "Groq" : isGemini ? "Gemini" : "OpenAI",
          keyPreview: apiKey ? apiKey.slice(0, 8) + "..." : "MISSING",
          messageCount: messages.length,
        });

        if (!apiKey) {
          return new Response(
            JSON.stringify({ error: "No API key. Open Aurora settings (gear icon) and paste your Groq/Gemini/OpenAI API key." }),
            { status: 401, headers: { "Content-Type": "application/json" } }
          );
        }

        // ── GROQ PATH (OpenAI-compatible, ultra-fast) ─────────────────
        if (isGroq) {
          const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
              model: "llama-3.3-70b-versatile",
              stream: true,
              messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
            }),
          });

          if (!groqRes.ok || !groqRes.body) {
            const text = await groqRes.text().catch(() => "");
            console.error("Groq Error:", groqRes.status, text);
            return new Response(text || "Groq API error", { status: groqRes.status || 502 });
          }

          // Groq streams in OpenAI SSE format — pass through directly
          return new Response(groqRes.body, {
            status: 200,
            headers: {
              "Content-Type": "text/event-stream",
              "Cache-Control": "no-cache, no-transform",
              Connection: "keep-alive",
            },
          });
        }

        // ── GEMINI PATH ────────────────────────────────────────────────
        if (isGemini) {
          // Use generateContent (non-streaming) which is most reliable
          const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;


          const contents = messages
            .filter(m => m.role !== "system")
            .map(m => ({
              role: m.role === "assistant" ? "model" : "user",
              parts: [{ text: m.content }],
            }));

          // Ensure we have at least one user message
          if (contents.length === 0) {
            contents.push({ role: "user", parts: [{ text: "Hello" }] });
          }

          const geminiRes = await fetch(geminiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
              contents,
              generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 512,
              },
            }),
          });

          const geminiBody = await geminiRes.text();

          if (!geminiRes.ok) {
            console.error("Gemini Error:", geminiRes.status, geminiBody);
            return new Response(
              `Gemini API error ${geminiRes.status}: ${geminiBody}`,
              { status: 502 }
            );
          }

          let replyText = "";
          try {
            const j = JSON.parse(geminiBody);
            replyText = j.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
          } catch (e) {
            console.error("Gemini JSON parse error:", e, geminiBody);
            return new Response("Failed to parse Gemini response", { status: 502 });
          }

          if (!replyText) {
            console.error("Gemini empty reply:", geminiBody);
            return new Response("Gemini returned an empty response", { status: 502 });
          }

          // Stream the reply back character-by-character (fake stream for smooth UI)
          const encoder = new TextEncoder();
          const { readable, writable } = new TransformStream();
          const writer = writable.getWriter();

          (async () => {
            // Send whole reply as one SSE chunk for simplicity
            const chunk = { choices: [{ delta: { content: replyText } }] };
            await writer.write(encoder.encode(`data: ${JSON.stringify(chunk)}\n\n`));
            await writer.write(encoder.encode("data: [DONE]\n\n"));
            writer.close();
          })();

          return new Response(readable, {
            status: 200,
            headers: {
              "Content-Type": "text/event-stream",
              "Cache-Control": "no-cache, no-transform",
              Connection: "keep-alive",
            },
          });
        }

        // ── OPENAI PATH ────────────────────────────────────────────────
        const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4o",
            stream: true,
            messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
          }),
        });

        if (!openaiRes.ok || !openaiRes.body) {
          const text = await openaiRes.text().catch(() => "");
          console.error("OpenAI Error:", openaiRes.status, text);
          return new Response(text || "OpenAI upstream error", { status: openaiRes.status || 502 });
        }

        return new Response(openaiRes.body, {
          status: 200,
          headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache, no-transform",
            Connection: "keep-alive",
          },
        });
      },
    },
  },
});