import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How CarryBridge works" },
      { name: "description", content: "From posting a trip to delivery — a four-step, founder-matched process for Kazakhstan ↔ Europe deliveries." },
      { property: "og:title", content: "How CarryBridge works" },
      { property: "og:description", content: "Founder-matched delivery for Kazakhstan ↔ Europe." },
    ],
  }),
  component: HowItWorks,
});

function HowItWorks() {
  return (
    <section className="mx-auto max-w-4xl px-5 lg:px-8 py-12 lg:py-20">
      <h1 className="text-4xl lg:text-5xl text-ink">How it works</h1>
      <p className="mt-3 text-lg text-muted-foreground max-w-2xl">
        CarryBridge is in MVP mode. Our team manually matches every traveler and
        sender to ensure trust before we automate anything.
      </p>

      <ol className="mt-10 space-y-6">
        {[
          { t: "Travelers post a route", d: "Tell us where you're flying, when, how much luggage you can spare, and what categories you're willing to carry." },
          { t: "Senders submit a request", d: "Describe what you need delivered, where it's coming from, and where it's going." },
          { t: "Founders manually match", d: "We personally review submissions and only introduce verified, suitable matches. No bots." },
          { t: "Delivery happens", d: "Both parties meet (or use a trusted drop-off), the package is handed over, and rating happens after delivery." },
        ].map((s, i) => (
          <li key={s.t} className="rounded-2xl bg-card border border-border p-6 flex gap-5">
            <div className="font-display text-3xl text-amber w-10 shrink-0">0{i + 1}</div>
            <div>
              <h2 className="text-xl">{s.t}</h2>
              <p className="mt-1 text-muted-foreground">{s.d}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-12 rounded-2xl bg-secondary/60 border border-border p-6">
        <h2 className="text-xl">Why manual matching?</h2>
        <p className="mt-2 text-muted-foreground">
          Trust is the product. By introducing matches ourselves, we learn what
          users care about, prevent risky transfers, and only invest in automation
          once we understand the real workflow.
        </p>
      </div>

      <div className="mt-10 flex gap-3 flex-wrap">
        <Link to="/publish" className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground">Publish a trip</Link>
        <Link to="/send" className="rounded-full border border-foreground/15 bg-card px-5 py-2.5 text-sm font-medium">Send a package</Link>
      </div>
    </section>
  );
}
