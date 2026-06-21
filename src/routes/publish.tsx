import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Plane, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { useTrips } from "@/lib/store";

export const Route = createFileRoute("/publish")({
  head: () => ({
    meta: [
      { title: "Publish your trip — CarryBridge" },
      { name: "description", content: "Earn from your unused baggage. List a Kazakhstan ↔ Europe flight and we'll match you with verified senders." },
      { property: "og:title", content: "Publish your trip — CarryBridge" },
      { property: "og:description", content: "List your flight and start carrying for verified senders." },
    ],
  }),
  component: Publish,
});

const accepts = ["Documents", "Clothing", "Books", "Gifts", "Cosmetics", "Small electronics"];
const declines = ["Food", "Liquids", "Medicines", "Dangerous"];

function Publish() {
  const { addTrip } = useTrips();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    travelerName: "",
    email: "",
    fromCity: "Almaty",
    toCity: "Milan",
    date: "",
    capacityKg: 5,
    pricePerKg: 12,
    note: "",
  });
  const [pickedAccepts, setPickedAccepts] = useState<string[]>(["Documents", "Clothing", "Books", "Gifts"]);
  const [pickedDeclines, setPickedDeclines] = useState<string[]>(["Liquids", "Dangerous"]);

  function toggle(list: string[], set: (v: string[]) => void, item: string) {
    set(list.includes(item) ? list.filter((i) => i !== item) : [...list, item]);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.travelerName || !form.date) {
      toast.error("Please fill name and travel date.");
      return;
    }
    addTrip({
      travelerName: form.travelerName,
      fromCity: form.fromCity,
      toCity: form.toCity,
      date: form.date,
      capacityKg: Number(form.capacityKg),
      pricePerKg: Number(form.pricePerKg),
      accepts: pickedAccepts,
      declines: pickedDeclines,
      verified: ["identity"],
      note: form.note,
    });
    toast.success("Trip published. Founders will verify within 24 hours.");
    setTimeout(() => navigate({ to: "/marketplace" }), 600);
  }

  return (
    <section className="mx-auto max-w-3xl px-5 lg:px-8 py-12 lg:py-16">
      <div className="flex items-center gap-2 text-sm text-amber-foreground bg-amber/15 border border-amber/30 rounded-full px-3 py-1 w-fit">
        <Plane className="h-3.5 w-3.5" /> For verified student travelers
      </div>
      <h1 className="mt-4 text-4xl lg:text-5xl text-ink">Publish your trip</h1>
      <p className="mt-2 text-muted-foreground">
        Tell us when you fly. We'll match you with verified senders going the same way.
      </p>

      <form onSubmit={submit} className="mt-8 rounded-3xl bg-card border border-border p-6 lg:p-8 shadow-card space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Your name">
            <input className="input" value={form.travelerName} onChange={(e) => setForm({ ...form, travelerName: e.target.value })} placeholder="e.g. Adil M." />
          </Field>
          <Field label="University email">
            <input type="email" className="input" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@university.edu" />
          </Field>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <Field label="From">
            <input className="input" value={form.fromCity} onChange={(e) => setForm({ ...form, fromCity: e.target.value })} />
          </Field>
          <Field label="To">
            <input className="input" value={form.toCity} onChange={(e) => setForm({ ...form, toCity: e.target.value })} />
          </Field>
          <Field label="Travel date">
            <input type="date" className="input" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
          </Field>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Available luggage (kg)">
            <input type="number" min={1} className="input" value={form.capacityKg} onChange={(e) => setForm({ ...form, capacityKg: Number(e.target.value) })} />
          </Field>
          <Field label="Price per kg (USD)">
            <input type="number" min={0} className="input" value={form.pricePerKg} onChange={(e) => setForm({ ...form, pricePerKg: Number(e.target.value) })} />
          </Field>
        </div>

        <Field label="I'm willing to carry">
          <Chips items={accepts} picked={pickedAccepts} onToggle={(i) => toggle(pickedAccepts, setPickedAccepts, i)} tone="accept" />
        </Field>

        <Field label="I will NOT carry">
          <Chips items={declines} picked={pickedDeclines} onToggle={(i) => toggle(pickedDeclines, setPickedDeclines, i)} tone="decline" />
        </Field>

        <Field label="Note (optional)">
          <textarea className="input min-h-[90px]" value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} placeholder="e.g. flexible to meet in central Almaty before flight" />
        </Field>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <p className="text-xs text-muted-foreground inline-flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" /> Founder will verify your flight before publishing.
          </p>
          <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:opacity-90">
            <Check className="h-4 w-4" /> Publish trip
          </button>
        </div>
      </form>

      <style>{`
        .input { width: 100%; border-radius: 12px; border: 1px solid var(--border); background: var(--background); padding: 0.7rem 0.9rem; font-size: 0.95rem; }
        .input:focus { outline: none; border-color: var(--primary); box-shadow: 0 0 0 3px oklch(0.27 0.06 255 / 0.1); }
      `}</style>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-foreground mb-1.5">{label}</span>
      {children}
    </label>
  );
}

function Chips({ items, picked, onToggle, tone }: { items: string[]; picked: string[]; onToggle: (i: string) => void; tone: "accept" | "decline" }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((i) => {
        const on = picked.includes(i);
        const base = "rounded-full px-3.5 py-1.5 text-sm border transition cursor-pointer select-none";
        const cls = on
          ? tone === "accept"
            ? "bg-primary/10 text-primary border-primary/30"
            : "bg-destructive/10 text-destructive border-destructive/30"
          : "bg-card text-muted-foreground border-border hover:border-foreground/30";
        return (
          <button type="button" key={i} onClick={() => onToggle(i)} className={`${base} ${cls}`}>{i}</button>
        );
      })}
    </div>
  );
}
