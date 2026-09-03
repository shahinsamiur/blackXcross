import { FiArrowRight } from "react-icons/fi";
import SkullIcon from "../../components/icons/SkullIcon";

export default function CtaBanner() {
  return (
    <section className=" mb-8 flex w-auto flex-col items-center gap-5 rounded-xl border border-primary/30 bg-card p-5 sm:mx-6 sm:flex-row sm:justify-between sm:gap-6 sm:p-6 lg:mx-8">
      <div className="flex min-w-0 items-center gap-3 text-center sm:gap-4 sm:text-left">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 shadow-[0_0_20px_var(--primary)]/30 sm:h-14 sm:w-14">
          <SkullIcon className="h-6 w-6 text-primary sm:h-8 sm:w-8" />
        </span>
        <p className="min-w-0 text-sm leading-snug text-foreground/80 sm:text-base">
          BLACK×CROSS thrives because of people like you.
          <br />
          Share. Investigate. Uncover the truth.
        </p>
      </div>

      <button
        type="button"
        className="flex w-full shrink-0 items-center justify-center gap-2 rounded-lg border border-primary/60 bg-linear-to-b from-primary/80 to-primary/40 px-4 py-2.5 text-xs font-bold uppercase tracking-normal text-foreground/80 hover:opacity-90 cursor-pointer sm:w-auto sm:px-6 sm:py-3 sm:text-sm sm:tracking-wide"
      >
        Submit a Case or Tip
        <FiArrowRight size={16} />
      </button>
    </section>
  );
}
