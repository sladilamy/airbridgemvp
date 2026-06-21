import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { useTrips } from "@/lib/store";
import { TripCard } from "@/components/TripCard";

export const Route = createFileRoute("/marketplace")({
  head: () => ({
    meta: [
      { title: "Browse trips — CarryBridge" },
      { name: "description", content: "Find verified travelers between Kazakhstan and Europe. Filter by route, date, and trust level." },
      { property: "og:title", content: "Browse upcoming travelers — CarryBridge" },
      { property: "og:description", content: "Verified flights between Kazakhstan and Europe." },
    ],
  }),
  component: Marketplace,
});

function Marketplace() {
  const { trips } = useTrips();
  const [q, setQ] = useState("");
  const [verif, setVerif] = useState<string>("all");
  const [sort, setSort] = useState<"date" | "price" | "recent">("date");

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    let list = trips.filter((t) => {
      if (term) {
        const blob = `${t.fromCity} ${t.toCity} ${t.travelerName}`.toLowerCase();
        if (!blob.includes(term)) return false;
      }
      if (verif !== "all" && !t.verified.includes(verif as never)) return false;
      return true;
    });
    list = [...list].sort((a, b) => {
      if (sort === "price") return a.pricePerKg - b.pricePerKg;
      if (sort === "recent") return b.createdAt - a.createdAt;
      return +new Date(a.date) - +new Date(b.date);
    });
    return list;
  }, [trips, q, verif, sort]);

  return (
    <section className="mx-auto max-w-7xl px-5 lg:px-8 py-12 lg:py-16">
      <header className="mb-8">
        <h1 className="text-4xl lg:text-5xl text-ink">Upcoming travelers</h1>
        <p className="mt-2 text-muted-foreground">
          {filtered.length} verified {filtered.length === 1 ? "trip" : "trips"} available.
        </p>
      </header>

      <div className="rounded-2xl bg-card border border-border p-4 lg:p-5 shadow-card flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search a city or traveler — e.g. Almaty, Milan"
            className="w-full rounded-full border border-border bg-background pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary"
          />
        </div>
        <select
          value={verif}
          onChange={(e) => setVerif(e.target.value)}
          className="rounded-full border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:border-primary"
        >
          <option value="all">All verification</option>
          <option value="identity">ID verified</option>
          <option value="student">Student verified</option>
          <option value="flight">Flight verified</option>
          <option value="trusted">Trusted traveler</option>
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as "date" | "price" | "recent")}
          className="rounded-full border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:border-primary"
        >
          <option value="date">Soonest departure</option>
          <option value="price">Lowest price/kg</option>
          <option value="recent">Recently listed</option>
        </select>
        <button
          onClick={() => { setQ(""); setVerif("all"); setSort("date"); }}
          className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2.5 text-sm hover:bg-secondary"
        >
          <SlidersHorizontal className="h-3.5 w-3.5" /> Reset
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-12 text-center rounded-2xl border border-dashed border-border py-16">
          <p className="text-lg font-medium">No trips match those filters.</p>
          <p className="mt-1 text-sm text-muted-foreground">Try clearing filters or check back tomorrow.</p>
        </div>
      ) : (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((t) => <TripCard key={t.id} trip={t} />)}
        </div>
      )}
    </section>
  );
}
