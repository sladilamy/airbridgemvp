import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, GraduationCap, Plane, Star } from "lucide-react";

export const Route = createFileRoute("/trust")({
  head: () => ({
    meta: [
      { title: "Trust & safety — CarryBridge" },
      { name: "description", content: "Four layers of verification, clear rules on what can be carried, and a manual-review-first approach." },
      { property: "og:title", content: "Trust & safety — CarryBridge" },
      { property: "og:description", content: "Layered verification and clear rules from day one." },
    ],
  }),
  component: Trust,
});

function Trust() {
  return (
    <section className="mx-auto max-w-4xl px-5 lg:px-8 py-12 lg:py-20">
      <h1 className="text-4xl lg:text-5xl text-ink">Trust & safety</h1>
      <p className="mt-3 text-lg text-muted-foreground max-w-2xl">
        You're not trusting software. You're trusting a person. Our entire product
        is designed around making that as safe as possible.
      </p>

      <h2 className="mt-12 text-2xl">Four layers of verification</h2>
      <div className="mt-5 grid md:grid-cols-2 gap-4">
        {[
          { i: <ShieldCheck className="h-5 w-5" />, t: "Email & ID", d: "Government ID confirmation before posting any route." },
          { i: <GraduationCap className="h-5 w-5" />, t: "Student verification", d: "University email domains (.edu, student.university.it) to confirm enrollment." },
          { i: <Plane className="h-5 w-5" />, t: "Flight verification", d: "Boarding pass or itinerary review by a founder before listing goes live." },
          { i: <Star className="h-5 w-5" />, t: "Reputation", d: "The strongest layer over time — completed deliveries, ratings, and reviews." },
        ].map((x) => (
          <div key={x.t} className="rounded-2xl bg-card border border-border p-5">
            <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary">{x.i}</div>
            <h3 className="mt-3 text-lg">{x.t}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{x.d}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-12 text-2xl">What can be carried</h2>
      <div className="mt-5 grid md:grid-cols-2 gap-4">
        <div className="rounded-2xl bg-card border border-border p-5">
          <h3 className="text-lg text-emerald-700">Allowed</h3>
          <ul className="mt-3 space-y-1.5 text-sm text-foreground/80">
            {["Food (sealed, non-restricted)", "Clothing", "Books", "Personal belongings", "Gifts", "Student supplies", "Documents", "Small electronics"].map((x) => <li key={x}>· {x}</li>)}
          </ul>
        </div>
        <div className="rounded-2xl bg-card border border-border p-5">
          <h3 className="text-lg text-destructive">Restricted</h3>
          <ul className="mt-3 space-y-1.5 text-sm text-foreground/80">
            {["Illegal items", "Weapons", "Dangerous goods", "Cash & valuables", "Controlled substances", "Customs-sensitive items"].map((x) => <li key={x}>· {x}</li>)}
          </ul>
        </div>
      </div>

      <div className="mt-12 rounded-2xl bg-amber/15 border border-amber/30 p-6">
        <p className="text-sm text-foreground">
          <strong>A word of honesty.</strong> Early on, don't ship passports, expensive
          electronics, or high-value items. Start small — snacks from home, a book, a
          jacket your mom forgot to pack. Trust grows with each successful delivery.
        </p>
      </div>
    </section>
  );
}
