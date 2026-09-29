import { Flame, Eye, PackageCheck, Gem, Hammer, Paintbrush } from "lucide-react";
import { products } from "../data/products";
import { ProductVisual } from "../assets/ProductVisual";

/** Real catalog pieces illustrating each stage — resolves to real photo folders. */
const muses = [
  "p-ganesha-seated-blessing",
  "p-krishna-flute",
  "p-lakshmi-kamal-brass",
  "p-shiva-meditative",
  "p-buddha-dhyana-brass",
  "p-durga-sherawali",
].map((id) => products.find((p) => p.id === id) ?? products[0]);
import { Reveal, SectionHeading } from "../components/ui/Reveal";
import { Seo } from "../components/Seo";
import { ButtonLink } from "../components/ui/Button";

const stages = [
  { icon: Paintbrush, n: "01", t: "Design", d: "Master karigars sketch each form against canonical iconography — mudra, proportion, attribute — before a single gram of wax is touched." },
  { icon: Gem, n: "02", t: "Wax Modelling", d: "Beeswax models are sculpted by hand over 2–4 days. This is why no two IDIOL pieces are ever perfectly identical." },
  { icon: Flame, n: "03", t: "Casting", d: "Clay moulds, molten metal at 1,100°C, the ancient lost-wax pour. Rough castings cool for a full day before breaking." },
  { icon: Hammer, n: "04", t: "Chasing & Finishing", d: "Eleven-plus hours of hand-chasing: eyes opened, jewellery defined, drapery given movement." },
  { icon: Eye, n: "05", t: "Polishing & Patina", d: "Antique, classic, premium or mirror — finishes built in layers, sealed with natural waxes." },
  { icon: PackageCheck, n: "06", t: "Quality & Packaging", d: "Weight, balance, iconography and finish checked twice, then foam-moulded, silk-wrapped and crated." },
];

export function Craft() {
  return (
    <>
      <Seo title="Our Craft" description="Lost-wax casting by fourth-generation karigars — design, wax, casting, chasing, patina, packaging." path="/craft" />
      <div className="bg-ink text-ivory">
        <div className="container-shell grid items-center gap-10 py-14 lg:grid-cols-2 lg:py-20">
          <Reveal>
            <p className="eyebrow !text-gold-light">Our Craft · Moradabad</p>
            <h1 className="h-display mt-3 text-ivory"><span className="block">Fire, metal,</span><span className="gold-text-light block italic">devotion.</span></h1>
            <p className="mt-5 max-w-lg text-[16px] leading-relaxed text-ivory/70">
              Eleven pairs of hands. Six stages. Up to three weeks. One idol.
              We still cast the way it was done 4,000 years ago — because no machine has yet learned devotion.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonLink to="/shop" variant="gold">Shop the Craft</ButtonLink>
              <ButtonLink to="/about" variant="ghost" className="!text-ivory/80 hover:!bg-white/10 hover:!text-ivory">Meet the house →</ButtonLink>
            </div>
          </Reveal>
          <Reveal delay={120} className="mx-auto w-full max-w-[380px] overflow-hidden rounded-3xl border border-ivory/15">
            <div className="aspect-[4/5]"><ProductVisual art={{ deity: "Shiva", material: "brass", finish: "Premium", seed: 104 }} view="detail" title="Hand-chased detailing close-up" /></div>
          </Reveal>
        </div>
      </div>

      <div className="container-shell py-14 lg:py-20">
        <SectionHeading eyebrow="The Process" title="From wax to worship" copy="Scroll the making of a single Ganesha — the same journey every IDIOL piece travels." />
        <ol className="mt-10 space-y-4">
          {stages.map((s, i) => (
            <Reveal key={s.n} delay={Math.min(i * 60, 300)}>
              <li className="grid gap-4 rounded-3xl border border-ink/10 bg-ivory-card p-6 md:grid-cols-[80px_1fr_220px] md:items-center md:p-7">
                <span className="flex items-center gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-ivory text-gold-deep"><s.icon className="h-5 w-5" /></span>
                  <span className="font-display text-2xl text-ink/30">{s.n}</span>
                </span>
                <span>
                  <span className="block font-display text-xl">{s.t}</span>
                  <span className="mt-1 block max-w-2xl text-[14.5px] text-ink/65">{s.d}</span>
                </span>
                <span className="hidden overflow-hidden rounded-2xl border border-ink/10 md:block">
                  <span className="block aspect-[16/10]"><ProductVisual art={muses[i % muses.length].art} view={i % 2 ? "detail" : "side"} title={`${s.t} stage`} /></span>
                </span>
              </li>
            </Reveal>
          ))}
        </ol>

        <div className="bg-gallery mt-10 grid gap-6 rounded-3xl border border-ink/10 p-8 md:grid-cols-3 md:p-10">
          {[
            ["4,000 yrs", "The lost-wax lineage we practise"],
            ["11+ hrs", "Hand-chasing per idol, minimum"],
            ["2×", "Independent quality inspections"],
          ].map(([v, l]) => (
            <Reveal key={l}><p className="font-display text-4xl">{v}</p><p className="mt-1 text-sm text-ink/60">{l}</p></Reveal>
          ))}
        </div>

        <Reveal className="mt-10 text-center">
          <p className="font-display text-2xl">Own a piece of the process.</p>
          <ButtonLink to="/shop" variant="primary" className="mt-4">Explore Collection</ButtonLink>
        </Reveal>
      </div>
    </>
  );
}
