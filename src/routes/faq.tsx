import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — CarryBridge" },
      { name: "description", content: "Common questions about CarryBridge — items, matching, verification, and lost packages." },
      { property: "og:title", content: "Frequently asked questions — CarryBridge" },
      { property: "og:description", content: "Items, matching, verification, and policies." },
    ],
  }),
  component: FAQ,
});

const faqs = [
  { q: "What items are allowed?", a: "Small personal items, gifts, books, food (sealed), clothing, and student essentials. We do not allow weapons, cash, controlled substances, or customs-restricted goods." },
  { q: "How does matching work?", a: "During our MVP, every match is hand-made by our founders. We review submissions and personally introduce compatible travelers and senders over Telegram or email." },
  { q: "What if a package is lost?", a: "Our policies are evolving with our community. For now we limit risk by recommending lower-value items and only matching verified users with confirmed flights." },
  { q: "Is verification required?", a: "Yes. Travelers must complete identity verification before any route is published. Student verification and flight verification add additional trust badges." },
  { q: "Which routes are live right now?", a: "Our initial focus is Italy ↔ Kazakhstan, with active expansion across Germany, Austria, and Poland. Marketplaces need density — we'd rather be excellent on a few routes than mediocre everywhere." },
  { q: "How much does it cost?", a: "Travelers set their own price per kilogram. Most listings sit between $8–$15/kg. CarryBridge itself takes no fee during the MVP — we want to learn first." },
];

function FAQ() {
  return (
    <section className="mx-auto max-w-3xl px-5 lg:px-8 py-12 lg:py-20">
      <h1 className="text-4xl lg:text-5xl text-ink">Frequently asked</h1>
      <p className="mt-3 text-muted-foreground">Everything we get asked most often.</p>

      <div className="mt-10 divide-y divide-border border-y border-border">
        {faqs.map((f) => (
          <details key={f.q} className="group py-5">
            <summary className="flex items-center justify-between cursor-pointer list-none">
              <span className="text-lg font-medium pr-4">{f.q}</span>
              <span className="text-2xl text-muted-foreground group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="mt-3 text-muted-foreground">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
