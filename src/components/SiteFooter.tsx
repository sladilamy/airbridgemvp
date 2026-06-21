import { Link } from "@tanstack/react-router";
import { Plane } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-12 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Plane className="h-4 w-4 -rotate-12" />
            </span>
            <span className="font-display text-xl">CarryBridge</span>
          </div>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            A community-powered delivery network between Kazakhstan and Europe.
            Built around verified students and real travelers.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold mb-3">Product</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/marketplace" className="hover:text-foreground">Browse trips</Link></li>
            <li><Link to="/publish" className="hover:text-foreground">Publish trip</Link></li>
            <li><Link to="/send" className="hover:text-foreground">Send a package</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold mb-3">Company</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/how-it-works" className="hover:text-foreground">How it works</Link></li>
            <li><Link to="/trust" className="hover:text-foreground">Trust & safety</Link></li>
            <li><Link to="/faq" className="hover:text-foreground">FAQ</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-5 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} CarryBridge. Built for students between Kazakhstan and Europe.</p>
          <p>Almaty ↔ Milan · Rome ↔ Astana · Berlin ↔ Almaty</p>
        </div>
      </div>
    </footer>
  );
}
