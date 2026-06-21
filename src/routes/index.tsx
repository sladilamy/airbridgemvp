import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, GraduationCap, Plane, MessageCircle, Sparkles } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import { useTrips } from "@/lib/store";
import { TripCard } from "@/components/TripCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CarryBridge — Trusted peer delivery between Kazakhstan and Europe" },
      { name: "description", content: "Verified student travelers carry your packages between Kazakhstan and Europe. Browse upcoming routes or list your own trip." },
      { property: "og:title", content: "CarryBridge — Peer delivery Kazakhstan ↔ Europe" },
      { property: "og:description", content: "Verified travelers, real flights, personal delivery." },
    ],
  }),
  component: Home,
});

const routes = [
  "Almaty ↔ Milan", "Rome ↔ Astana", "Berlin ↔ Almaty",
  "Vienna ↔ Astana", "Warsaw ↔ Almaty", "Paris ↔ Almaty",
];

function Home() {
  const { trips } = useTrips();
  const featured = trips.slice(0, 3);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 pt-14 lg:pt-20 pb-16 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
              <Sparkles className="h-3 w-3 text-amber" /> Now matching: Italy ↔ Kazakhstan
            </span>
            <h1 className="mt-5 text-5xl lg:text-6xl text-ink leading-[1.02]">
              Turn empty luggage<br />into a{" "}
              <span className="italic text-primary">bridge home.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              CarryBridge connects verified student travelers between Kazakhstan and Europe
              with families and friends who need small items delivered — faster, cheaper,
              and more personal than traditional shipping.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/send" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:opacity-90 transition">
                Find a traveler <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/publish" className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-card px-6 py-3 text-sm font-medium text-foreground hover:bg-secondary transition">
                Become a traveler
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-5 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-primary" /> ID verified</span>
              <span className="inline-flex items-center gap-1.5"><GraduationCap className="h-3.5 w-3.5 text-emerald-600" /> Student verified</span>
              <span className="inline-flex items-center gap-1.5"><Plane className="h-3.5 w-3.5 text-sky-600" /> Flight confirmed</span>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] lg:aspect-[5/6] overflow-hidden rounded-3xl shadow-lift">
              <img src={heroImg} alt="Traveler at airport gate at sunset" className="h-full w-full object-cover" width={1600} height={1200} />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden md:block rounded-2xl bg-card border border-border shadow-card p-4 max-w-[260px]">
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <MessageCircle className="h-3.5 w-3.5 text-primary" /> Match found
              </div>
              <p className="mt-2 text-sm">
                <span className="font-medium">Adil</span> can carry your package from{" "}
                <span className="font-medium">Almaty → Milan</span> on Jul 12.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ROUTES STRIP */}
      <section className="border-y border-border bg-card">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-5 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm">
          <span className="text-xs uppercase tracking-wider text-muted-foreground">Live routes</span>
          {routes.map((r) => (
            <span key={r} className="font-medium text-foreground">{r}</span>
          ))}
        </div>
      </section>

      {/* FEATURED TRIPS */}
      <section className="mx-auto max-w-7xl px-5 lg:px-8 py-20">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl lg:text-4xl text-ink">Upcoming travelers</h2>
            <p className="mt-2 text-muted-foreground">Verified flights with available luggage space.</p>
          </div>
          <Link to="/marketplace" className="hidden md:inline-flex items-center gap-1 text-sm font-medium text-primary">
            See all trips <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((t) => <TripCard key={t.id} trip={t} />)}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-secondary/50 border-y border-border">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-20">
          <h2 className="text-3xl lg:text-4xl text-ink max-w-2xl">A simple, founder-matched process.</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            For our MVP, every match is hand-introduced by our team. No bots,
            no automated risk. Just real people connecting.
          </p>
          <div className="mt-10 grid md:grid-cols-4 gap-5">
            {[
              { n: "01", t: "Post or browse", d: "Travelers publish a route. Senders submit a request." },
              { n: "02", t: "We verify", d: "ID, student email, and flight confirmation are checked." },
              { n: "03", t: "We introduce", d: "A founder personally connects you over Telegram or email." },
              { n: "04", t: "Delivered", d: "Meet, hand over, deliver. Leave a rating." },
            ].map((s) => (
              <div key={s.n} className="rounded-2xl bg-card border border-border p-6">
                <div className="font-display text-amber text-2xl">{s.n}</div>
                <h3 className="mt-3 text-lg">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-5 lg:px-8 py-20">
        <div className="rounded-3xl bg-primary text-primary-foreground p-10 lg:p-14 grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl lg:text-4xl">Flying soon between KZ and Europe?</h2>
            <p className="mt-3 text-primary-foreground/75 max-w-md">
              Earn a little, help a student, and use the space you'd waste anyway.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Link to="/publish" className="inline-flex items-center gap-2 rounded-full bg-amber px-6 py-3 text-sm font-medium text-amber-foreground">
              Publish your trip <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/trust" className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/25 px-6 py-3 text-sm font-medium text-primary-foreground">
              How we verify travelers
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
