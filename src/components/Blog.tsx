import { blogPosts } from "../lib/data";
import TornCard from "../components/ui/TornCard";

export default function Blog() {
  return (
    <section id="blog" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <div className="flex items-end justify-between">
        <h2 className="font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
          From the ledger
        </h2>
        <a
          href="#"
          className="hidden text-sm font-semibold text-ink/60 hover:text-ink sm:block"
        >
          View all
        </a>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {blogPosts.map((post) => (
          <TornCard key={post.id} className="flex flex-col px-6 pb-8">
            <p className="font-mono text-xs text-ink/40">
              {post.date} · {post.readTime}
            </p>
            <h3 className="mt-3 font-display text-lg font-semibold text-ink">
              {post.title}
            </h3>
            <p className="mt-2 flex-1 text-sm text-ink/60">{post.excerpt}</p>
            <a href="#" className="mt-4 text-sm font-semibold text-signal">
              Read more
            </a>
          </TornCard>
        ))}
      </div>
    </section>
  );
}
