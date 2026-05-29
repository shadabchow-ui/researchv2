import type { Metadata } from "next";
import { Header } from "../../components/header";

export const metadata: Metadata = {
  title: "Templates - Research",
  description: "Pre-built research templates for common use cases.",
};

const templates = [
  {
    icon: "Search",
    name: "Search",
    description: "Quick web search with configurable depth and results count.",
    href: "/research/search",
    mode: "fast",
    example: "Recent developments in quantum computing",
    available: true,
  },
  {
    icon: "FileText",
    name: "Contents",
    description: "Deep content analysis with structured findings and brief.",
    href: "/research/contents",
    mode: "deep",
    example: "Impact of remote work on software engineering teams",
    available: true,
  },
  {
    icon: "Sparkles",
    name: "Answer",
    description:
      "Focused research with AI synthesis and citation-backed summary.",
    href: "/research/answer",
    mode: "deep",
    example: "What are the key challenges in LLM evaluation?",
    available: true,
  },
  {
    icon: "Bot",
    name: "Agent",
    description:
      "Autonomous research agent with multi-step reasoning (not wired yet).",
    mode: "deep",
    example: "Analyze market trends in the EV battery industry",
    available: false,
  },
  {
    icon: "Globe",
    name: "Websets",
    description: "Curated collections of entities and sources (not wired yet).",
    mode: "company",
    example: "Top AI infrastructure companies",
    available: false,
  },
  {
    icon: "Bell",
    name: "Monitors",
    description: "Scheduled monitoring with change detection (not wired yet).",
    mode: "deep",
    example: "Monitor competitor product launches",
    available: false,
  },
];

const TemplatesPage = () => (
  <>
    <Header page="Templates" pages={["Upcube", "Research"]} />
    <div className="flex flex-1 animate-fade-in flex-col gap-6 p-6 pt-0">
      <div className="space-y-1">
        <h1 className="font-semibold text-2xl tracking-tight">Templates</h1>
        <p className="text-muted-foreground text-sm">
          Pre-built research templates for common use cases.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {templates.map((t) => {
          const Container = t.available ? "a" : "div";
          const containerProps = t.available ? { href: t.href } : {};
          return (
            <Container
              className={`rounded-xl border bg-card p-5 ${
                t.available
                  ? "cursor-pointer hover:bg-accent/50 hover:shadow-sm"
                  : "border-dashed opacity-60"
              } transition-all duration-150 ease-out`}
              key={t.name}
              {...containerProps}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-2">
                  <h3 className="font-medium leading-none">{t.name}</h3>
                  <p className="text-muted-foreground text-sm leading-snug">
                    {t.description}
                  </p>
                </div>
                <span className="inline-flex items-center rounded-md border px-2 py-0.5 font-medium text-[10px] text-muted-foreground/60 uppercase tracking-wide">
                  {t.mode}
                </span>
              </div>
              <div className="mt-3 rounded-md bg-muted/40 px-3 py-2 font-mono text-muted-foreground/70 text-xs italic">
                &ldquo;{t.example}&rdquo;
              </div>
              {!t.available && (
                <p className="mt-2 text-[10px] text-muted-foreground/50 uppercase tracking-wider">
                  Not wired yet &middot; example only
                </p>
              )}
            </Container>
          );
        })}
      </div>
    </div>
  </>
);

export default TemplatesPage;
