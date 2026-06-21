import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Package } from "lucide-react";
import { toast } from "sonner";
import { useRequests } from "@/lib/store";

export const Route = createFileRoute("/send")({
  head: () => ({
    meta: [
      { title: "Send a package — CarryBridge" },
      { name: "description", content: "Tell us what you need to send between Kazakhstan and Europe. We'll match you with a verified traveler." },
      { property: "og:title", content: "Send a package — CarryBridge" },
      { property: "og:description", content: "Submit a request and we'll match a verified traveler." },
    ],
  }),
  component: Send,
});

function Send() {
  const { addRequest } = useRequests();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    senderName: "",
    contact: "",
    itemDescription: "",
    weightKg: 1,
    fromCity: "Milan",
    toCity: "Almaty",
    byDate: "",
  });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.senderName || !form.itemDescription || !form.contact) {
      toast.error("Please fill name, item, and contact.");
      return;
    }
    addRequest({
      senderName: form.senderName,
      itemDescription: form.itemDescription,
      weightKg: Number(form.weightKg),
      fromCity: form.fromCity,
      toCity: form.toCity,
      byDate: form.byDate,
      contact: form.contact,
    });
    toast.success("Request submitted. We'll introduce a matching traveler shortly.");
    setTimeout(() => navigate({ to: "/marketplace" }), 700);
  }

  return (
    <section className="mx-auto max-w-3xl px-5 lg:px-8 py-12 lg:py-16">
      <div className="flex items-center gap-2 text-sm text-primary bg-primary/10 rounded-full px-3 py-1 w-fit">
        <Package className="h-3.5 w-3.5" /> Sender request
      </div>
      <h1 className="mt-4 text-4xl lg:text-5xl text-ink">Send a package</h1>
      <p className="mt-2 text-muted-foreground">
        Tell us what you'd like to send. A founder will personally introduce you to a matching verified traveler.
      </p>

      <form onSubmit={submit} className="mt-8 rounded-3xl bg-card border border-border p-6 lg:p-8 shadow-card space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Your name">
            <input className="input" value={form.senderName} onChange={(e) => setForm({ ...form, senderName: e.target.value })} />
          </Field>
          <Field label="Contact (Telegram, WhatsApp or email)">
            <input className="input" value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} placeholder="@username or email" />
          </Field>
        </div>

        <Field label="What are you sending?">
          <textarea className="input min-h-[90px]" value={form.itemDescription} onChange={(e) => setForm({ ...form, itemDescription: e.target.value })} placeholder="e.g. winter coat and 2 books for my son" />
        </Field>

        <div className="grid md:grid-cols-3 gap-4">
          <Field label="Weight (kg)">
            <input type="number" min={0.1} step="0.1" className="input" value={form.weightKg} onChange={(e) => setForm({ ...form, weightKg: Number(e.target.value) })} />
          </Field>
          <Field label="From">
            <input className="input" value={form.fromCity} onChange={(e) => setForm({ ...form, fromCity: e.target.value })} />
          </Field>
          <Field label="To">
            <input className="input" value={form.toCity} onChange={(e) => setForm({ ...form, toCity: e.target.value })} />
          </Field>
        </div>

        <Field label="Needed by (optional)">
          <input type="date" className="input" value={form.byDate} onChange={(e) => setForm({ ...form, byDate: e.target.value })} />
        </Field>

        <div className="rounded-xl bg-secondary/60 border border-border p-4 text-xs text-muted-foreground">
          <strong className="text-foreground">Allowed:</strong> personal items, gifts, books, clothes, student supplies, small electronics.<br />
          <strong className="text-foreground">Not allowed:</strong> cash, weapons, controlled substances, customs-restricted goods.
        </div>

        <div className="flex justify-end pt-2">
          <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:opacity-90">
            <Check className="h-4 w-4" /> Submit request
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
