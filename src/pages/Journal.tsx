import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { journalPosts } from "../data/products";
import { ProductVisual } from "../assets/ProductVisual";
import { Reveal, SectionHeading } from "../components/ui/Reveal";
import { Seo } from "../components/Seo";

const bodies: Record<string, string[]> = {
  "how-to-choose-brass-ganesha-idol": [
    "Start with placement: a 3–4 inch idol suits desks and dashboards; 6–8 inches anchors a pooja room; above 10 inches becomes the room's centre of gravity.",
    "Next, the mudra. Abhaya (raised palm) blesses and protects — the safest choice for a first altar. Dancing forms bring energy to living spaces; meditative forms suit bedrooms and studios.",
    "Finish matters more than photographs suggest. Antique patina hides dust and reads temple-old; classic polish glows in lamplight but asks for a weekly wipe. Choose the finish for the light the idol will live in.",
  ],
  "brass-vs-silver-idols": [
    "Brass is warm, forgiving and deeply traditional — the metal of temple bells and heirloom lamps. It develops a patina that collectors prize and needs only occasional oiling.",
    "Silver is cool, precise and precious. It demands more care — tarnish is chemistry, not neglect — but rewards with mirror light and certified heirloom value.",
    "Our honest rule: daily worship and gifting in volume → brass. Milestones, weddings and once-in-a-decade pieces → hallmarked silver.",
  ],
  "how-brass-idols-are-made": [
    "It begins in beeswax: a sculptor models the deity over 2–4 days, every ornament pressed by thumb and tool.",
    "The wax is coated in clay, fired (the wax melts out — hence 'lost wax'), and molten brass at 1,100°C takes its place.",
    "Then comes chasing: eleven-plus hours of hand engraving, eye-opening and burnishing before patina, polish and inspection.",
  ],
  "how-to-clean-brass-idol": [
    "Dust weekly with dry cotton. Never use steel wool, acids or dishwasher detergent — they strip patina permanently.",
    "For grime, lukewarm water with a drop of mild soap, soft brush, immediate thorough drying. A whisper of coconut or mustard oil restores depth.",
    "Never lacquer over antique finishes, and never 'restore' a temple-old patina you love — that darkness is decades of devotion.",
  ],
  "how-to-care-silver-idol": [
    "Silver tarnishes in air — store in the provided anti-tarnish pouch, not open shelves, when not in worship.",
    "Polish with a silver cloth only, in straight lines. Pastes and dips remove metal along with tarnish; use them rarely.",
    "For daily-pooja silver, expect a soft glow rather than mirror shine — and consider it beautiful. Mirrors are for vault pieces.",
  ],
  "guide-deity-iconography": [
    "Mudras are sentences: abhaya says 'fear not', varada says 'I give', dhyana says 'be still'. Read the hands first.",
    "Vahanas (vehicles) identify at a glance — mouse for Ganesha, lotus for Lakshmi, Garuda's echo for Vishnu, Nandi's patience for Shiva.",
    "Attributes tell stories: the damru's rhythm, the veena's learning, the trident's threefold time. An idol is a library in bronze.",
  ],
};

export function Journal() {
  return (
    <>
      <Seo title="Journal" description="Care guides, buying advice, craft stories and iconography — the IDIOL journal." path="/journal" />
      <div className="bg-gallery border-b border-ink/10">
        <div className="container-shell py-12 lg:py-16">
          <p className="eyebrow">Journal</p>
          <h1 className="heading-1 mt-2">Notes on craft & devotion</h1>
          <p className="body-l mt-3 max-w-xl">Practical, artisan-approved writing. No mysticism-as-marketing.</p>
        </div>
      </div>
      <div className="container-shell grid gap-5 py-10 md:grid-cols-2 lg:grid-cols-3">
        {journalPosts.map((j, i) => (
          <Reveal key={j.slug} delay={Math.min(i * 60, 300)}>
            <Link to={`/journal/${j.slug}`} className="card group block transition-all duration-500 hover:-translate-y-1 hover:shadow-lift">
              <span className="block aspect-[16/10] overflow-hidden">
                <span className="block h-full w-full transition-transform duration-700 group-hover:scale-105">
                  <ProductVisual art={{ deity: "Buddha", material: i % 2 ? "silver" : "brass", finish: "Classic", seed: j.seed }} view="detail" title={j.title} />
                </span>
              </span>
              <span className="block p-5">
                <span className="chip bg-ivory text-gold-deep">{j.tag}</span>
                <span className="mt-2 block font-display text-[19px] font-medium leading-snug">{j.title}</span>
                <span className="mt-1 block text-sm text-ink/60">{j.excerpt}</span>
                <span className="mt-2 block text-[12.5px] text-ink/45">{j.readTime} · Atelier notes</span>
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </>
  );
}

export function JournalArticle() {
  const { slug } = useParams();
  const post = journalPosts.find((j) => j.slug === slug);
  if (!post) {
    return (
      <div className="container-shell py-24 text-center">
        <p className="font-display text-3xl">Looks like this piece belongs somewhere else.</p>
        <Link to="/journal" className="btn mt-6 bg-ink px-7 py-3 text-sm text-ivory">Back to Journal</Link>
      </div>
    );
  }
  const paras = bodies[post.slug] ?? ["Full text arrives with the editorial launch."];
  const others = journalPosts.filter((j) => j.slug !== post.slug).slice(0, 2);
  return (
    <>
      <Seo title={post.title} description={post.excerpt} path={`/journal/${post.slug}`} type="article" />
      <article className="container-shell max-w-3xl py-12">
        <Link to="/journal" className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-deep"><ArrowLeft className="h-4 w-4" /> Journal</Link>
        <p className="eyebrow mt-5">{post.tag} · {post.readTime}</p>
        <h1 className="heading-1 mt-2">{post.title}</h1>
        <p className="body-l mt-3">{post.excerpt}</p>
        <div className="mt-6 overflow-hidden rounded-3xl border border-ink/10">
          <div className="aspect-[16/8]"><ProductVisual art={{ deity: "Buddha", material: "brass", finish: "Classic", seed: post.seed }} view="detail" title={post.title} /></div>
        </div>
        <div className="prose-luxe mt-8 space-y-5 text-[16.5px] leading-relaxed text-ink/80">
          {paras.map((p, i) => <p key={i}>{p}</p>)}
        </div>
        <SectionHeading align="left" eyebrow="Keep Reading" title="More from the journal" />
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {others.map((o) => (
            <Link key={o.slug} to={`/journal/${o.slug}`} className="card block p-5 transition-all hover:-translate-y-0.5 hover:shadow-lift">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gold-deep">{o.tag}</p>
              <p className="mt-1 font-display text-lg leading-snug">{o.title}</p>
            </Link>
          ))}
        </div>
      </article>
    </>
  );
}
