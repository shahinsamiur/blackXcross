import SkullIcon from "../../components/icons/SkullIcon";

export default function BrandHero() {
  return (
    <div className="relative flex flex-col items-center gap-3 px-4 pb-8 pt-2 text-center sm:px-6 lg:px-8">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,var(--primary)_0%,transparent_70%)] opacity-20"
      />
      <div className="relative flex items-center gap-4">
        <h1 className="text-4xl font-black uppercase tracking-wide sm:text-5xl lg:text-6xl">
          Black<span className="text-primary">×</span>Cross
        </h1>
        <SkullIcon className="h-12 w-12 shrink-0 text-foreground/80 sm:h-14 sm:w-14 lg:h-16 lg:w-16" />
      </div>
      <p className="relative text-xs font-semibold tracking-[0.2em] text-foreground/70 uppercase sm:text-sm">
        A crowdsourced public record investigative archive
      </p>
      <p className="relative text-xs tracking-wide text-muted uppercase sm:text-sm">
        Exploring cold cases. Connecting investigators. Seeking the truth.
      </p>
    </div>
  );
}
