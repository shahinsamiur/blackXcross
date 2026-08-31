const columns = [
  {
    title: "Product",
    links: ["Features", "Pricing", "Security", "Changelog"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Blog", "Contact"],
  },
  {
    title: "Resources",
    links: ["Help center", "API docs", "Status", "Community"],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-paper">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <p className="font-display text-lg font-bold text-ink">
              Xit<span className="text-ledger">.</span>
            </p>
            <p className="mt-3 max-w-[220px] text-sm text-ink/50">
              Bookkeeping that reconciles itself.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <p className="font-mono text-xs uppercase tracking-wide text-ink/40">
                {col.title}
              </p>
              <ul className="mt-4 flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-ink/70 transition-colors hover:text-ink"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="overflow-hidden border-t border-paper">
        <p className="translate-y-[18%] select-none text-center font-display font-bold leading-none text-ink/[0.04]" style={{ fontSize: "clamp(5rem, 18vw, 13rem)" }}>
          Xit.
        </p>
      </div>
    </footer>
  );
}
