import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Plane } from "lucide-react";

const nav = [
  { to: "/marketplace", label: "Browse trips" },
  { to: "/publish", label: "Publish trip" },
  { to: "/send", label: "Send a package" },
  { to: "/how-it-works", label: "How it works" },
  { to: "/trust", label: "Trust & safety" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 h-16 flex items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Plane className="h-4 w-4 -rotate-12" />
          </span>
          <span className="font-display text-xl text-ink">CarryBridge</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              activeProps={{ className: "text-foreground font-medium" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link to="/send" className="text-sm font-medium text-foreground">
            Find a traveler
          </Link>
          <Link
            to="/publish"
            className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition"
          >
            List your trip
          </Link>
        </div>

        <button
          aria-label="Toggle menu"
          className="lg:hidden inline-flex h-9 w-9 items-center justify-center rounded-md border border-border"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="px-5 py-4 flex flex-col gap-3">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="text-sm text-foreground py-1"
              >
                {n.label}
              </Link>
            ))}
            <Link
              to="/publish"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground text-center"
            >
              List your trip
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
