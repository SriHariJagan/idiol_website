import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Award, Globe2, Hammer, PackageCheck, ShieldCheck } from "lucide-react";
import { deities, journalPosts, products, testimonials } from "../data/products";
import { ProductVisual } from "../assets/ProductVisual";
import { ProductCard } from "../components/ui/ProductCard";
import { Reveal, SectionHeading, Stars } from "../components/ui/Reveal";
import { Seo } from "../components/Seo";
import { ButtonLink } from "../components/ui/Button";
import { fadeUp, staggerChild, staggerParent } from "../utils/animations";

/** First catalog piece per deity — deity cards always resolve to a real photo folder. */
const firstByDeity: Record<string, (typeof products)[number]> = Object.fromEntries(
  deities.map((d) => [d.name, products.find((p) => p.deity === d.name) ?? products[0]])
);

const trust = [
  { icon: ShieldCheck, title: "Authentic Materials", text: "Solid brass · 925 hallmarked silver" },
  { icon: Hammer, title: "Handcrafted", text: "Lost-wax casting by master karigars" },
  { icon: Award, title: "Made in India", text: "Moradabad ateliers, fourth generation" },
  { icon: PackageCheck, title: "Premium Packaging", text: "Museum-grade crating, silk wrap" },
  { icon: Globe2, title: "Worldwide Delivery", text: "Insured shipping to 40+ countries" },
];

const craftSteps = [
  { n: "01", title: "Wax Modelling", text: "Each idol begins as a hand-sculpted beeswax model — no two are ever identical." },
  { n: "02", title: "Casting", text: "Molten brass or silver is poured into clay moulds in the 4,000-year-old lost-wax method." },
  { n: "03", title: "Chasing & Finishing", text: "Eleven-plus hours of hand-chasing bring out the eyes, jewellery and drapery." },
  { n: "04", title: "Polishing & Patina", text: "Antique, classic or mirror finishes are built up layer by layer, then sealed." },
  { n: "05", title: "Quality Inspection", text: "Weight, balance, iconography and finish checked against master benchmarks." },
  { n: "06", title: "Packaging", text: "Foam-moulded housing, silk wrap and double-walled crates for global travel." },
];

export function Home() {
  const featured = products.filter((p) => p.featured).slice(0, 4);
  const best = products.filter((p) => p.bestSeller).slice(0, 8);
  const silver = products.filter((p) => p.material === "silver").slice(0, 3);

  return (
    <>
      <Seo
        title="Sacred Craftsmanship. Made in India"
        description="Handcrafted brass & silver idols inspired by India's timeless spiritual heritage. Authentic materials, artisan crafted, worldwide delivery."
        path="/"
        schema={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "IDIOL",
          url: "https://idiol.in",
          slogan: "Authentic Indian craftsmanship for sacred spaces and meaningful gifts.",
        }}
      />

      {/* ---------- HERO ---------- */}
      <section className="bg-gallery texture-grain relative overflow-hidden" aria-label="Introduction">
        <div className="container-shell grid items-center gap-8 pb-10 pt-8 lg:grid-cols-[1.05fr_0.95fr] lg:pb-14 lg:pt-12">
          <motion.div variants={staggerParent} initial="hidden" animate="visible" className="relative z-10">
            <motion.p variants={staggerChild} className="eyebrow">Handcrafted Brass & Silver Idols</motion.p>
            <motion.h1 variants={staggerChild} className="h-display mt-4">
              <span className="block">Sacred Craftsmanship.</span>
              <span className="gold-text block italic">Made in India.</span>
            </motion.h1>
            <motion.p variants={staggerChild} className="body-l mt-4 max-w-lg">
              Handcrafted brass & silver idols inspired by India's timeless spiritual heritage — for sacred spaces and meaningful gifts.
            </motion.p>
            <motion.div variants={staggerChild} className="mt-6 flex flex-wrap gap-2.5">
              <ButtonLink to="/shop" variant="primary">Explore Collection <ArrowRight className="h-4 w-4" /></ButtonLink>
              <ButtonLink to="/custom" variant="outline">Custom Order</ButtonLink>
            </motion.div>
            <motion.dl variants={staggerChild} className="mt-7 flex flex-wrap gap-x-8 gap-y-3">
              {[
                ["24+", "Curated idols"],
                ["4.9", "Average rating"],
                ["40+", "Countries served"],
              ].map(([v, l]) => (
                <div key={l}>
                  <dt className="sr-only">{l}</dt>
                  <dd className="font-display text-2xl font-medium">{v}</dd>
                  <dd className="text-[12.5px] text-ink/55">{l}</dd>
                </div>
              ))}
            </motion.dl>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: [0.22, 0.61, 0.36, 1] }}
            className="relative"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="arch relative mx-auto aspect-[4/5] max-w-[340px] overflow-hidden border border-ink/10 shadow-lift"
            >
              <ProductVisual art={{ deity: "Ganesha", material: "brass", finish: "Antique", seed: 11 }} view="front" title="Handcrafted antique brass Ganesha idol" eager />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/20 via-transparent to-transparent" />
            </motion.div>
            <div className="absolute -left-2 top-8 hidden rounded-xl border border-ink/10 bg-white/85 px-3 py-2.5 shadow-card backdrop-blur md:block">
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-gold-deep">No. 047 / 200</p>
              <p className="font-display text-[14px]">Siddhi Ganesha · 8"</p>
            </div>
            <div className="absolute -right-2 bottom-10 hidden rounded-xl border border-ink/10 bg-white/85 px-3 py-2.5 shadow-card backdrop-blur md:block">
              <Stars value={5} />
              <p className="mt-1 max-w-[160px] text-[12px] leading-snug text-ink/70">“Looks like it has been prayed to for decades.”</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---------- TRUST BAR ---------- */}
      <section className="border-y border-ink/10 bg-ivory-card" aria-label="Why IDIOL">
        <div className="container-shell grid grid-cols-2 gap-x-4 gap-y-5 py-5 md:grid-cols-3 lg:grid-cols-5">
          {trust.map((t, i) => (
            <Reveal key={t.title} delay={i * 60} className="flex items-start gap-2.5">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ivory text-gold-deep"><t.icon className="h-4 w-4" /></span>
              <span>
                <span className="block text-[13.5px] font-semibold">{t.title}</span>
                <span className="block text-[12px] text-ink/55">{t.text}</span>
              </span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- SHOP BY DEITY ---------- */}
      <section className="container-shell py-12 lg:py-16" aria-labelledby="deity-h">
        <SectionHeading eyebrow="Shop by Deity" title="Eleven sacred forms, one standard of craft" copy="Every deity is cast to iconographic precision — mudra, vahana and attribute verified by our master karigars." />
        <motion.div variants={staggerParent} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {deities.slice(0, 8).map((d) => (
            <motion.div key={d.slug} variants={staggerChild}>
              <Link to={`/deities/${d.slug}`} className="group relative block overflow-hidden rounded-xl border border-ink/10 bg-ivory shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-lift">
                <span className="block aspect-square">
                  <span className="block h-full w-full transition-transform duration-700 group-hover:scale-[1.04]">
                    <ProductVisual art={firstByDeity[d.name].art} view="front" title={`${d.name} idol`} />
                  </span>
                </span>
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/75 via-ink/25 to-transparent p-3 pt-10 text-ivory">
                  <span className="font-display text-[16px] font-medium">{d.name}</span>
                  <span className="flex items-center justify-between text-[12px] text-ivory/75">
                    {d.line} <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        <Reveal className="mt-6 text-center">
          <Link to="/collections" className="link-underline text-sm font-semibold text-gold-deep">View all deities & collections →</Link>
        </Reveal>
      </section>

      {/* ---------- FEATURED ---------- */}
      <section className="bg-stone-soft border-y border-ink/10" aria-labelledby="feat-h">
        <div className="container-shell py-12 lg:py-16">
          <SectionHeading eyebrow="Featured Collection" title="Pieces that define the house" copy="Master-artisan castings in limited runs — numbered, documented, heirloom-grade." />
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5">
            {featured.map((p) => <ProductCard key={p.id} product={p} />)}
          </motion.div>
        </div>
      </section>

      {/* ---------- EDITORIAL ---------- */}
      <section className="container-shell grid items-center gap-8 py-12 lg:grid-cols-2 lg:py-16" aria-label="Philosophy">
        <Reveal className="relative overflow-hidden rounded-2xl border border-ink/10 shadow-card">
          <div className="aspect-[16/10]">
            <ProductVisual art={{ deity: "Shiva", material: "brass", finish: "Premium", seed: 104 }} view="lifestyle" title="Meditative Shiva idol in a modern living space" />
          </div>
        </Reveal>
        <Reveal delay={120}>
          <p className="eyebrow">The IDIOL Philosophy</p>
          <h2 className="heading-1 mt-2">Where tradition becomes timeless.</h2>
          <p className="body-l mt-4">
            We don't manufacture idols — we continue a 4,000-year-old conversation between fire, metal and devotion.
            Every piece passes through eleven pairs of artisan hands before it earns the IDIOL monogram.
          </p>
          <p className="body-s mt-3">
            Contemporary in presentation. Uncompromising in craft. Equally at home in a pooja room, a penthouse, or a museum vitrine.
          </p>
          <div className="mt-6 flex flex-wrap gap-2.5">
            <ButtonLink to="/craft" variant="primary">Discover Our Craft</ButtonLink>
            <ButtonLink to="/about" variant="ghost">Our story →</ButtonLink>
          </div>
        </Reveal>
      </section>

      {/* ---------- CRAFT STRIP ---------- */}
      <section className="bg-ink text-ivory" aria-label="The craft process">
        <div className="container-shell py-12 lg:py-16">
          <SectionHeading dark eyebrow="Our Craft" title="Six stages. Eleven hands. One idol." copy="A horizontal journey from wax to worship — drag or scroll through the making." />
          <div className="mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-3 no-scrollbar lg:grid lg:grid-cols-6 lg:overflow-visible">
            {craftSteps.map((s, i) => (
              <Reveal key={s.n} delay={i * 70} className="w-[210px] shrink-0 snap-start rounded-xl border border-ivory/12 bg-white/[0.04] p-4 lg:w-auto">
                <p className="font-display text-2xl text-gold-light">{s.n}</p>
                <h3 className="mt-1.5 font-display text-[16px]">{s.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-ivory/60">{s.text}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-6 text-center">
            <ButtonLink to="/craft" variant="gold">Watch the full journey</ButtonLink>
          </Reveal>
        </div>
      </section>

      {/* ---------- BEST SELLERS ---------- */}
      <section className="container-shell py-12 lg:py-16" aria-labelledby="best-h">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div className="max-w-lg">
            <p className="eyebrow">Best Sellers</p>
            <h2 className="heading-1 mt-2">Loved in homes across 40+ countries</h2>
          </div>
          <Link to="/shop?filter=bestsellers" className="link-underline text-sm font-semibold text-gold-deep">Shop all best sellers →</Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5">
          {best.map((p, i) => <ProductCard key={p.id} product={p} rank={i + 1} />)}
        </div>
      </section>

      {/* ---------- SILVER EDITORIAL ---------- */}
      <section className="bg-gallery-dark texture-grain relative overflow-hidden text-ivory" aria-label="Silver collection">
        <div className="container-shell grid items-center gap-8 py-12 lg:grid-cols-2 lg:py-16">
          <Reveal>
            <p className="eyebrow !text-gold-pale">The Silver Atelier</p>
            <h2 className="heading-1 mt-2 text-ivory">Cool light, mirror polish, certified purity.</h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ivory/70">
              Every silver idol is cast in solid 925 silver, BIS-hallmarked and assay-documented.
              Satin robes against mirror faces — restraint rendered in precious metal.
            </p>
            <ul className="mt-5 space-y-2 text-[14px] text-ivory/75">
              {["925 BIS hallmark on every piece", "Assay & authenticity documentation", "Insured worldwide delivery"].map((t) => (
                <li key={t} className="flex items-center gap-2.5"><ShieldCheck className="h-4 w-4 text-gold-light" /> {t}</li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-2.5">
              <ButtonLink to="/shop?category=silver" variant="gold">Explore Silver</ButtonLink>
              <ButtonLink to="/journal/brass-vs-silver-idols" variant="ghost" className="!text-ivory/80 hover:!bg-white/10 hover:!text-ivory">Brass vs Silver →</ButtonLink>
            </div>
          </Reveal>
          <div className="grid grid-cols-3 gap-2.5 md:gap-3">
            {silver.map((p, i) => (
              <Reveal key={p.id} delay={i * 90} className={i === 1 ? "mt-6" : ""}>
                <Link to={`/product/${p.slug}`} className="group block overflow-hidden rounded-xl border border-ivory/15">
                  <span className="block aspect-[3/4] transition-transform duration-700 group-hover:scale-105">
                    <ProductVisual art={p.art} view="front" title={p.name} />
                  </span>
                  <span className="block bg-white/5 p-2.5 backdrop-blur">
                    <span className="block truncate font-display text-[13px]">{p.name.split("—")[0]}</span>
                    <span className="text-[12px] text-ivory/60">{p.height}" · 925 Silver</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CUSTOM ---------- */}
      <section className="container-shell py-12 lg:py-16" aria-label="Custom orders">
        <div className="bg-gallery relative overflow-hidden rounded-2xl border border-ink/10 px-5 py-9 shadow-card md:px-10 lg:px-12">
          <div className="grid items-center gap-6 lg:grid-cols-[1fr_280px]">
            <Reveal>
              <p className="eyebrow">Custom Atelier</p>
              <h2 className="heading-1 mt-2">Made for your vision.</h2>
              <p className="body-l mt-3 max-w-lg">Custom sizes, temple commissions, engraved blessings, wedding & corporate gifting — from a single heirloom to five hundred keepsakes.</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {["Custom Sizes", "Engraving", "Temple Orders", "Wedding Gifts", "Corporate Gifts"].map((t) => (
                  <span key={t} className="chip border border-ink/15 bg-white/60 text-ink/70">{t}</span>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-2.5">
                <ButtonLink to="/custom" variant="primary">Discuss Your Custom Order</ButtonLink>
                <ButtonLink to="/gifting" variant="outline">Corporate & Wedding Gifting</ButtonLink>
              </div>
            </Reveal>
            <Reveal delay={120} className="mx-auto w-full max-w-[260px] overflow-hidden rounded-xl border border-ink/10 shadow-lift">
              <div className="aspect-[3/4]"><ProductVisual art={{ deity: "Ram Darbar", material: "brass", finish: "Premium", seed: 155 }} view="front" title="Custom Ram Darbar commission" /></div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- REVIEWS ---------- */}
      <section className="border-y border-ink/10 bg-ivory" aria-label="Customer stories">
        <div className="container-shell py-12 lg:py-16">
          <SectionHeading eyebrow="Customer Stories" title="In their words, in their homes" copy="Verified-purchase stories from collectors, gifters and first-altar families. (Demo content — shown as placeholder.)" />
          <div className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 70} className="card flex flex-col gap-2.5 p-5">
                <Stars value={t.rating} />
                <p className="flex-1 font-display text-[15px] leading-snug">“{t.text}”</p>
                <div className="border-t border-ink/10 pt-2.5">
                  <p className="text-[13.5px] font-semibold">{t.name} <span className="font-normal text-ink/50">· {t.location}</span></p>
                  <p className="text-[12px] text-gold-deep">{t.product} · Verified purchase (demo)</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- GALLERY + JOURNAL ---------- */}
      <section className="container-shell py-12 lg:py-16" aria-label="Gallery and journal">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div><p className="eyebrow">The Gallery</p><h2 className="heading-1 mt-2">Idols in living spaces</h2></div>
          <Link to="/journal" className="link-underline text-sm font-semibold text-gold-deep">Read the Journal →</Link>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-2.5 md:grid-cols-4">
          {products.slice(4, 8).map((p, i) => (
            <Reveal key={p.id} delay={i * 60} className="overflow-hidden rounded-xl border border-ink/10">
              <Link to={`/product/${p.slug}`} className="group block aspect-square" aria-label={p.name}>
                <span className="block h-full w-full transition-transform duration-700 group-hover:scale-105">
                  <ProductVisual art={p.art} view="lifestyle" title={`${p.name} in a living space`} />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 grid gap-3 md:grid-cols-3">
          {journalPosts.slice(0, 3).map((j, i) => (
            <Reveal key={j.slug} delay={i * 70}>
              <Link to={`/journal/${j.slug}`} className="card group block transition-all duration-500 hover:-translate-y-1 hover:shadow-lift">
                <span className="block aspect-[16/10] overflow-hidden">
                  <span className="block h-full w-full transition-transform duration-700 group-hover:scale-105">
                    <ProductVisual art={{ deity: "Buddha", material: "brass", finish: "Classic", seed: j.seed }} view="detail" title={j.title} />
                  </span>
                </span>
                <span className="block p-4">
                  <span className="chip bg-ivory text-gold-deep">{j.tag}</span>
                  <span className="mt-1.5 block font-display text-[16px] font-medium leading-snug">{j.title}</span>
                  <span className="mt-1 block text-[13.5px] text-ink/60">{j.excerpt}</span>
                  <span className="mt-1.5 block text-[12px] text-ink/45">{j.readTime}</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
