import { bentoFeatures } from "../lib/data";
import TornCard from "../components/ui/TornCard";

export default function BentoFeatures() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <div className="max-w-xl">
        <h2 className="font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
          Everything the books need, none of the busywork.
        </h2>
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {bentoFeatures.map((feature) => (
          <TornCard
            key={feature.id}
            className={`px-6 pb-8 ${feature.size === "lg" ? "md:col-span-2" : ""}`}
          >
            <h3 className="font-display text-xl font-semibold text-ink">
              {feature.title}
            </h3>
            <p className="mt-2 max-w-sm text-sm text-ink/60">
              {feature.description}
            </p>
          </TornCard>
        ))}
      </div>
    </section>
  );
}
