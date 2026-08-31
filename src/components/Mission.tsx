import TornCard from "../components/ui/TornCard";

const highlights = [
  {
    label: "01",
    title: "Connect",
    body: "Link every bank, card, and processor in one pass.",
  },
  {
    label: "02",
    title: "Categorize",
    body: "Transactions sort themselves as they clear.",
  },
  {
    label: "03",
    title: "Reconcile",
    body: "Xit matches invoices to payments automatically.",
  },
  {
    label: "04",
    title: "Close",
    body: "Review a five-minute summary instead of a spreadsheet.",
  },
];

export default function Mission() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <div className="max-w-2xl">
        <h2 className="font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
          Bookkeeping was never supposed to be a monthly emergency.
        </h2>
        <p className="mt-4 text-lg text-ink/70">
          Most tools import your transactions. Xit reads them — recognizing what
          repeats, what&apos;s owed, and what looks wrong — the moment they
          land.
        </p>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {highlights.map((item) => (
          <TornCard key={item.label} className="px-5 pb-6">
            <span className="font-mono text-xs text-ink/40">{item.label}</span>
            <h3 className="mt-3 font-display text-lg font-semibold text-ink">
              {item.title}
            </h3>
            <p className="mt-2 text-sm text-ink/60">{item.body}</p>
          </TornCard>
        ))}
      </div>
    </section>
  );
}
