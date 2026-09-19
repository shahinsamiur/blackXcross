export default function GrungeOverlay() {
  return (
    <>
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.15] mix-blend-overlay"
      >
        <filter id="bxc-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#bxc-grain)" />
      </svg>

      <div
        aria-hidden
        className="pointer-events-none absolute -left-16 -bottom-20 h-72 w-72 rounded-full bg-[radial-gradient(circle,var(--primary)_0%,transparent_70%)] opacity-25 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-10 top-0 h-40 w-40 rounded-full bg-[radial-gradient(circle,var(--primary)_0%,transparent_70%)] opacity-10 blur-2xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/3 bottom-0 h-24 w-px rotate-12 bg-primary/20 blur-[1px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/4 bottom-4 h-16 w-px -rotate-6 bg-primary/10 blur-[1px]"
      />
    </>
  );
}
