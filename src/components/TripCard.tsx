import { Link } from "@tanstack/react-router";
import { ArrowRight, Calendar, Package, ShieldCheck, GraduationCap, Plane, Star } from "lucide-react";
import type { Trip } from "@/lib/store";

const badgeMap: Record<string, { label: string; icon: React.ReactNode; cls: string }> = {
  identity:  { label: "ID verified",      icon: <ShieldCheck className="h-3 w-3" />, cls: "bg-primary/10 text-primary" },
  student:   { label: "Student verified", icon: <GraduationCap className="h-3 w-3" />, cls: "bg-emerald-500/10 text-emerald-700" },
  flight:    { label: "Flight verified",  icon: <Plane className="h-3 w-3" />, cls: "bg-sky-500/10 text-sky-700" },
  trusted:   { label: "Trusted traveler", icon: <Star className="h-3 w-3" />, cls: "bg-amber/20 text-amber-foreground border border-amber/40" },
};

export function TripCard({ trip }: { trip: Trip }) {
  const d = new Date(trip.date);
  const dateLabel = d.toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
  return (
    <article className="group rounded-2xl bg-card border border-border p-5 shadow-card hover:shadow-lift hover:border-primary/30 transition">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm text-muted-foreground">Traveler</div>
          <div className="font-medium text-foreground">{trip.travelerName}</div>
        </div>
        <div className="text-right">
          <div className="font-display text-2xl text-ink leading-none">${trip.pricePerKg}</div>
          <div className="text-xs text-muted-foreground mt-1">per kg</div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 text-base font-medium">
        <span>{trip.fromCity}</span>
        <ArrowRight className="h-4 w-4 text-primary" />
        <span>{trip.toCity}</span>
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" /> {dateLabel}</span>
        <span className="inline-flex items-center gap-1"><Package className="h-3 w-3" /> {trip.capacityKg} kg available</span>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {trip.verified.map((v) => {
          const b = badgeMap[v];
          if (!b) return null;
          return (
            <span key={v} className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${b.cls}`}>
              {b.icon}{b.label}
            </span>
          );
        })}
      </div>

      {trip.accepts.length > 0 && (
        <div className="mt-3 text-xs text-muted-foreground">
          <span className="font-medium text-foreground">Carries:</span>{" "}
          {trip.accepts.slice(0, 4).join(" · ")}
        </div>
      )}

      {trip.note && <p className="mt-3 text-sm text-foreground/80 line-clamp-2">{trip.note}</p>}

      <div className="mt-4 flex items-center justify-between">
        <Link
          to="/send"
          className="text-sm font-medium text-primary hover:underline underline-offset-4"
        >
          Request match →
        </Link>
        <span className="text-[11px] text-muted-foreground">
          Listed {Math.max(1, Math.round((Date.now() - trip.createdAt) / 3_600_000))}h ago
        </span>
      </div>
    </article>
  );
}
