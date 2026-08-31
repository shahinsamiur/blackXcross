import { HiCheck } from "react-icons/hi";
import { pricingTiers } from "../lib/data";
import TornCard from "../components/ui/TornCard";

export default function Pricing() {
  return (
    <section id="pricing" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <div className="text-center">
        <h2 className="font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
          Pricing that scales with your ledger, not your headcount.
        </h2>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {pricingTiers.map((tier) => (
          <TornCard
            key={tier.id}
            className={`flex flex-col px-6 pb-8 ${
              tier.highlighted ? "border-ink ring-1 ring-ink" : ""
            }`}
          >
            {tier.highlighted && (
              <span className="mb-3 w-fit rounded-full bg-signal px-3 py-1 font-mono text-xs uppercase tracking-wide text-white">
                Most popular
              </span>
            )}
            <h3 className="font-display text-xl font-semibold text-ink">
              {tier.name}
            </h3>
            <p className="mt-2 text-sm text-ink/60">{tier.description}</p>
            <div className="mt-6 flex items-baseline gap-2">
              <span className="font-mono text-4xl font-semibold text-ink tabular-nums">
                {tier.price}
              </span>
              <span className="text-sm text-ink/50">{tier.cadence}</span>
            </div>
            <ul className="mt-6 flex flex-1 flex-col gap-3">
              {tier.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2 text-sm text-ink/70"
                >
                  <HiCheck className="mt-0.5 shrink-0 text-ledger" />
                  {feature}
                </li>
              ))}
            </ul>
            <a
              href="#"
              className={`mt-8 rounded-full px-5 py-3 text-center text-sm font-semibold transition-colors ${
                tier.highlighted
                  ? "bg-ink text-ivory hover:bg-signal"
                  : "border border-paper text-ink hover:border-ink"
              }`}
            >
              Choose {tier.name}
            </a>
          </TornCard>
        ))}
      </div>

      <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-lg border border-paper bg-white/60 px-8 py-6 sm:flex-row">
        <div>
          <h3 className="font-display text-lg font-semibold text-ink">
            Enterprise
          </h3>
          <p className="mt-1 text-sm text-ink/60">
            Custom limits, dedicated support, and SSO for larger finance teams.
          </p>
        </div>
        <a
          href="#"
          className="shrink-0 rounded-full border border-ink px-5 py-2.5 text-sm font-semibold text-ink hover:bg-ink hover:text-ivory"
        >
          Talk to sales
        </a>
      </div>
    </section>
  );
}
