import { Link } from "react-router-dom";
import { ProductVisual } from "../assets/ProductVisual";
import { Reveal, SectionHeading } from "../components/ui/Reveal";
import { Seo } from "../components/Seo";
import { ButtonLink } from "../components/ui/Button";

const timeline = [
  ["2016", "A single atelier", "Two karigar families in Moradabad begin casting exclusively for IDIOL."],
  ["2019", "The hallmark promise", "Every silver piece BIS-hallmarked; every brass piece weight-certified."],
  ["2022", "Across borders", "Insured worldwide delivery launches — first idols reach 12 countries."],
  ["2024", "The Premium Atelier", "Numbered master-artisan editions; custom & temple commissions open."],
  ["2026", "40+ countries", "24 curated idols, eleven deities, one standard: heirloom or nothing."],
];

export function About() {
  return (
    <>
      <Seo title="About" description="IDIOL — authentic Indian craftsmanship for sacred spaces and meaningful gifts. Our story, values and journey." path="/about" />
      <div className="bg-gallery border-b border-ink/10">
        <div className="container-shell grid items-center gap-8 py-12 lg:grid-cols-2 lg:py-16">
          <Reveal>
            <p className="eyebrow">Our Story</p>
            <h1 className="h-display mt-2">Authenticity, cast in metal.</h1>
            <p className="body-l mt-4">IDIOL exists for one reason: that a brass Ganesha bought online should feel like it came from a temple town — because it did. We work directly with fourth-generation karigar families. No middlemen, no resin, no shortcuts.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink to="/craft" variant="primary">See How We Make</ButtonLink>
              <ButtonLink to="/shop" variant="outline">Shop the Collection</ButtonLink>
            </div>
          </Reveal>
          <Reveal delay={120} className="mx-auto w-full max-w-[360px] overflow-hidden rounded-3xl border border-ink/10 shadow-card">
            <div className="aspect-[4/5]"><ProductVisual art={{ deity: "Buddha", material: "brass", finish: "Antique", seed: 180 }} view="front" title="IDIOL atelier piece" /></div>
          </Reveal>
        </div>
      </div>

      <div className="container-shell py-14">
        <SectionHeading align="left" eyebrow="Values" title="What we refuse to compromise" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Authentic Materials", "Solid brass. 925 hallmarked silver. Certified, every time."],
            ["Artisan First", "Karigars named, credited and paid above trade rates."],
            ["Honest Imagery", "What you see is the casting standard you receive."],
            ["Global Care", "Museum-grade crating and insured delivery, worldwide."],
          ].map(([t, d], i) => (
            <Reveal key={t} delay={i * 60} className="card p-6">
              <p className="font-display text-lg">{t}</p>
              <p className="body-s mt-2">{d}</p>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="border-y border-ink/10 bg-ivory">
        <div className="container-shell py-14">
          <SectionHeading align="left" eyebrow="Journey" title="The road so far" />
          <ol className="mt-8 space-y-0">
            {timeline.map(([y, t, d], i) => (
              <Reveal key={y} delay={Math.min(i * 60, 240)} className="relative grid gap-1 border-l-2 border-gold/50 pb-8 pl-6 last:pb-0 sm:grid-cols-[90px_220px_1fr]">
                <span className="absolute -left-[7px] top-1 h-3 w-3 rounded-full bg-gold" aria-hidden="true" />
                <span className="font-display text-2xl text-gold-deep">{y}</span>
                <span className="font-display text-lg">{t}</span>
                <span className="text-[14.5px] text-ink/65">{d}</span>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>

      <div className="container-shell py-14 text-center">
        <Reveal>
          <p className="font-display text-2xl md:text-3xl">“We don't sell statues. We deliver someone's daily prayer.”</p>
          <p className="mt-2 text-sm text-ink/55">— Founder's note (demo)</p>
          <ButtonLink to="/journal" variant="outline" className="mt-6">Read the Journal</ButtonLink>
        </Reveal>
        <p className="mt-8 text-[13px] text-ink/45">Questions? <Link to="/contact" className="font-semibold text-gold-deep">Contact us →</Link></p>
      </div>
    </>
  );
}
