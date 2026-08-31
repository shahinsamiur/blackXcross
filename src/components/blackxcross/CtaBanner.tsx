import { FiArrowRight } from "react-icons/fi";
import SkullIcon from "../../components/icons/SkullIcon";

export default function CtaBanner() {
  return (
    <section className="mx-4 mb-8 flex flex-col items-center gap-6 rounded-xl border border-primary/30 bg-card p-6 sm:mx-6 sm:flex-row sm:justify-between lg:mx-8">
      <div className="flex items-center gap-4 text-center sm:text-left">
        <SkullIcon className="h-10 w-10 shrink-0 text-primary" />
        <p className="text-base leading-snug text-foreground/90">
          BLACK×CROSS thrives because of people like you.
          <br />
          Share. Investigate. Uncover the truth.
        </p>
      </div>

      <button
        type="button"
        className="flex shrink-0 items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-bold uppercase tracking-wide text-background hover:opacity-90"
      >
        Submit a Case or Tip
        <FiArrowRight size={16} />
      </button>
    </section>
  );
}
