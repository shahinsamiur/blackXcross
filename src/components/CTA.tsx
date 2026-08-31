import { HiArrowRight } from "react-icons/hi";

export default function CTA() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-20 md:pb-28">
      <div className="rounded-xl bg-ledger px-8 py-16 text-center text-ivory md:py-20">
        <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
          Let the ledger balance itself.
        </h2>
        <p className="mx-auto mt-3 max-w-md text-ivory/80">
          Connect your first account in under ten minutes. No credit card required.
        </p>
        <a
          href="#pricing"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-ivory px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-white"
        >
          Get started
          <HiArrowRight />
        </a>
      </div>
    </section>
  );
}
