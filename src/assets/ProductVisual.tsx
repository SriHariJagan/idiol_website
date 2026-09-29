import { useId, useState } from "react";
import type { ArtSpec, ArtView } from "../data/products";
import { cn } from "../utils/helpers";

interface Props {
  art: ArtSpec;
  view?: ArtView;
  className?: string;
  title?: string;
  /** Set for above-the-fold imagery (hero). Defaults to lazy. */
  eager?: boolean;
}

/**
 * Convention: /images/<material>/<deity>-<seed>/<view>.jpg
 * e.g. /images/brass/ganesha-11/front.jpg
 * Drop exported JPGs there — no code changes needed. Until then the
 * generative gallery visual below renders as the placeholder.
 */
export function photoPathFor(art: ArtSpec, view: ArtView) {
  const slug = art.deity.toLowerCase().replace(/\s+/g, "-");
  return `/images/${art.material}/${slug}-${art.seed}/${view}.jpg`;
}

/**
 * Deterministic gallery-grade product visual.
 * Same art descriptor => same idol in every view (front / side / detail / lifestyle).
 */
export function ProductVisual({ art, view = "front", className, title, eager = false }: Props) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const [photoOk, setPhotoOk] = useState(false);
  const photoSrc = photoPathFor(art, view);
  const brass = art.material === "brass";
  const seed = art.seed;

  const bg1 = brass ? "#F6EDD9" : "#EDEEF1";
  const bg2 = brass ? "#E7D3AC" : "#D5D8DE";
  const bg3 = brass ? "#C9AE7C" : "#B9BDC6";
  const metal1 = brass ? "#F3DCA4" : "#F7F8FA";
  const metal2 = brass ? "#C99B42" : "#C6CAD1";
  const metal3 = brass ? "#7A5518" : "#7E8590";
  const deep = brass ? "#3A2A10" : "#2B2F36";
  const accent = brass ? "#8A6420" : "#5B6470";

  const shift = (seed % 7) - 3;
  const haloR = 200 + (seed % 5) * 6;

  const figure = (scale: number, dx: number, dy: number, forDetail = false) => (
    <g transform={`translate(${300 + dx + shift * 3} ${430 + dy}) scale(${scale})`}>
      {/* prabhavali halo */}
      <circle r={haloR} fill="none" stroke={accent} strokeWidth={forDetail ? 3 : 5} opacity={0.55} />
      <circle r={haloR - 18} fill="none" stroke={accent} strokeWidth={1.5} opacity={0.5} />
      {Array.from({ length: 24 }).map((_, i) => {
        const a = (i / 24) * Math.PI * 2 + (seed % 10) * 0.03;
        const r1 = haloR - 8;
        const r2 = haloR + (i % 2 === 0 ? 10 : 4);
        return (
          <line
            key={i}
            x1={Math.cos(a) * r1}
            y1={Math.sin(a) * r1}
            x2={Math.cos(a) * r2}
            y2={Math.sin(a) * r2}
            stroke={accent}
            strokeWidth={i % 2 === 0 ? 3 : 1.5}
            opacity={0.6}
          />
        );
      })}
      {/* pedestal */}
      <ellipse cx={0} cy={150} rx={120} ry={20} fill={deep} opacity={0.22} />
      <rect x={-104} y={104} width={208} height={44} rx={8} fill={`url(#ped${uid})`} />
      <rect x={-104} y={104} width={208} height={10} rx={5} fill="#ffffff" opacity={0.25} />
      {/* body */}
      <ellipse cx={0} cy={40} rx={52} ry={72} fill={`url(#body${uid})`} />
      <ellipse cx={-18} cy={18} rx={16} ry={52} fill="#ffffff" opacity={0.28} />
      {/* shoulders + arms */}
      <path d="M-52 10 Q-88 44 -84 96" stroke={`url(#body${uid})`} strokeWidth={26} strokeLinecap="round" fill="none" />
      <path d="M52 10 Q88 44 84 96" stroke={`url(#body${uid})`} strokeWidth={26} strokeLinecap="round" fill="none" />
      {/* head */}
      <circle cx={0} cy={-72} r={44} fill={`url(#body${uid})`} />
      <ellipse cx={-14} cy={-84} rx={12} ry={18} fill="#ffffff" opacity={0.3} />
      {/* crown */}
      <path d="M-38 -100 L-24 -150 L-10 -106 L0 -158 L10 -106 L24 -150 L38 -100 Z" fill={`url(#crown${uid})`} />
      <circle cx={0} cy={-158} r={7} fill={metal1} stroke={accent} strokeWidth={2} />
      <DeityMotif deity={art.deity} metal={`url(#body${uid})`} accent={accent} deep={deep} />
      {/* waist sash */}
      <path d="M-52 62 Q0 92 52 62 L52 84 Q0 114 -52 84 Z" fill={deep} opacity={0.28} />
      <circle cx={0} cy={88} r={9} fill={metal1} stroke={accent} strokeWidth={2} />
    </g>
  );

  return (
    <div
      className={cn("relative h-full w-full overflow-hidden", className)}
      role="img"
      aria-label={title ?? `${art.deity} idol, ${art.material}, ${view} view`}
    >
      {!photoOk && (
      <svg
        viewBox="0 0 600 750"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
        preserveAspectRatio="xMidYMid slice"
      >
      <defs>
        <linearGradient id={`bg${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={bg1} />
          <stop offset="55%" stopColor={bg2} />
          <stop offset="100%" stopColor={bg3} />
        </linearGradient>
        <linearGradient id={`body${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={metal1} />
          <stop offset="45%" stopColor={metal2} />
          <stop offset="100%" stopColor={metal3} />
        </linearGradient>
        <linearGradient id={`crown${uid}`} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor={metal3} />
          <stop offset="60%" stopColor={metal2} />
          <stop offset="100%" stopColor={metal1} />
        </linearGradient>
        <linearGradient id={`ped${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={deep} stopOpacity={0.85} />
          <stop offset="100%" stopColor={deep} />
        </linearGradient>
        <radialGradient id={`spot${uid}`} cx="0.5" cy="0.32" r="0.75">
          <stop offset="0%" stopColor="#ffffff" stopOpacity={brass ? 0.55 : 0.7} />
          <stop offset="45%" stopColor="#ffffff" stopOpacity={0} />
        </radialGradient>
      </defs>

      <rect width={600} height={750} fill={`url(#bg${uid})`} />
      <rect width={600} height={750} fill={`url(#spot${uid})`} />

      {/* backdrop arch */}
      <path
        d="M110 700 L110 330 A190 190 0 0 1 490 330 L490 700"
        fill="none"
        stroke={accent}
        strokeWidth={2}
        opacity={0.35}
      />
      <path
        d="M140 700 L140 345 A160 160 0 0 1 460 345 L460 700"
        fill="none"
        stroke={accent}
        strokeWidth={1}
        opacity={0.25}
      />

      {view === "front" && figure(1, 0, -10)}
      {view === "side" && (
        <g>
          <ellipse cx={310} cy={640} rx={150} ry={22} fill={deep} opacity={0.18} />
          {figure(0.94, 44, -6)}
          <g opacity={0.35}>{figure(0.9, -72, 6)}</g>
        </g>
      )}
      {view === "detail" && (
        <g>
          <g transform="translate(300 330) scale(2.1) translate(-300 -380)">{figure(1, 0, 0, true)}</g>
          <circle cx={300} cy={330} r={150} fill="none" stroke="#ffffff" strokeWidth={2} opacity={0.7} />
          <circle cx={300} cy={330} r={190} fill="none" stroke={accent} strokeWidth={1.5} opacity={0.5} />
        </g>
      )}
      {view === "lifestyle" && (
        <g>
          <rect x={60} y={470} width={480} height={230} rx={10} fill={deep} opacity={0.82} />
          <rect x={60} y={470} width={480} height={14} fill={metal2} opacity={0.8} />
          <rect x={90} y={120} width={150} height={200} rx={6} fill="#ffffff" opacity={0.18} />
          <rect x={360} y={150} width={150} height={170} rx={6} fill={deep} opacity={0.25} />
          {figure(0.62, -90, 60)}
          {/* diyas */}
          {[
            [470, 560],
            [510, 580],
          ].map(([x, y], i) => (
            <g key={i} transform={`translate(${x} ${y})`}>
              <ellipse cx={0} cy={0} rx={26} ry={10} fill={metal2} stroke={accent} />
              <ellipse cx={0} cy={-14} rx={5} ry={11} fill="#FFD98A" />
              <ellipse cx={0} cy={-16} rx={2.4} ry={6} fill="#FFF6DE" />
            </g>
          ))}
          {/* marigold dots */}
          {Array.from({ length: 14 }).map((_, i) => (
            <circle
              key={i}
              cx={380 + ((seed * (i + 3)) % 150)}
              cy={640 + ((seed * (i + 7)) % 40)}
              r={4}
              fill={i % 2 ? "#C96A1E" : "#E9A13B"}
              opacity={0.9}
            />
          ))}
        </g>
      )}

      {/* floor shadow */}
      {view === "front" && <ellipse cx={300} cy={668} rx={170} ry={20} fill={deep} opacity={0.2} />}

      {/* finish tag */}
      <g transform="translate(36 668)" opacity={0.85}>
        <rect width={200} height={44} rx={22} fill="#191612" opacity={0.72} />
        <text x={100} y={28} textAnchor="middle" fontSize={19} letterSpacing={4} fill="#F1E2BE" fontFamily="Inter, sans-serif">
          {art.finish.toUpperCase()}
        </text>
      </g>
      </svg>
      )}
      {/* Real photography layer — renders only when the JPG exists.
          Missing file => onError removes the tag, SVG stays. Zero broken images. */}
      <img
        src={photoSrc}
        alt=""
        aria-hidden="true"
        loading={eager ? "eager" : "lazy"}
        {...(eager ? { fetchPriority: "high" as const } : {})}
        decoding="async"
        draggable={false}
        onError={(e) => e.currentTarget.remove()}
        onLoad={() => setPhotoOk(true)}
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
}

function DeityMotif({ deity, metal, accent, deep }: { deity: string; metal: string; accent: string; deep: string }) {
  switch (deity) {
    case "Ganesha":
      return (
        <g>
          <ellipse cx={-52} cy={-78} rx={14} ry={22} fill={metal} stroke={accent} strokeWidth={2} />
          <ellipse cx={52} cy={-78} rx={14} ry={22} fill={metal} stroke={accent} strokeWidth={2} />
          <path d="M0 -60 Q6 -30 -14 -14 Q-26 -4 -40 -10" stroke={metal} strokeWidth={18} strokeLinecap="round" fill="none" />
          <path d="M0 -60 Q6 -30 -14 -14" stroke={accent} strokeWidth={3} fill="none" opacity={0.7} />
          <circle cx={-16} cy={-76} r={3.4} fill={deep} />
          <circle cx={16} cy={-76} r={3.4} fill={deep} />
        </g>
      );
    case "Krishna":
      return (
        <g>
          <line x1={52} y1={-30} x2={96} y2={-52} stroke={deep} strokeWidth={7} strokeLinecap="round" />
          {[0, 1, 2, 3].map((i) => (
            <circle key={i} cx={62 + i * 9} cy={-35 - i * 5} r={2} fill={deep} />
          ))}
          <path d="M-30 -116 A34 34 0 0 1 30 -116" stroke={accent} strokeWidth={4} fill="none" />
          <circle cx={-14} cy={-74} r={3.2} fill={deep} />
          <circle cx={14} cy={-74} r={3.2} fill={deep} />
          <path d="M-8 -58 Q0 -54 8 -58" stroke={deep} strokeWidth={2.5} fill="none" />
        </g>
      );
    case "Shiva":
      return (
        <g>
          <path d="M-34 -128 A40 24 0 0 1 20 -140" stroke={metal} strokeWidth={7} fill="none" strokeLinecap="round" />
          <circle cx={0} cy={-92} r={4.5} fill={deep} />
          <line x1={-20} y1={-74} x2={-6} y2={-74} stroke={deep} strokeWidth={3} strokeLinecap="round" />
          <line x1={6} y1={-74} x2={20} y2={-74} stroke={deep} strokeWidth={3} strokeLinecap="round" />
        </g>
      );
    case "Lakshmi":
      return (
        <g>
          {[0, 1, 2, 3, 4].map((i) => {
            const a = (Math.PI * (200 + i * 35)) / 180;
            return <ellipse key={i} cx={Math.cos(a) * 0} cy={120 + i * 0} rx={0} ry={0} fill="none" stroke="none" />;
          })}
          <g transform="translate(0 118)">
            {[ -40, -20, 0, 20, 40].map((x, i) => (
              <ellipse key={i} cx={x} cy={i % 2 ? -8 : 0} rx={13} ry={22} fill={metal} stroke={accent} strokeWidth={2} opacity={0.95} />
            ))}
          </g>
          <circle cx={-14} cy={-74} r={3.2} fill={deep} />
          <circle cx={14} cy={-74} r={3.2} fill={deep} />
        </g>
      );
    case "Buddha":
      return (
        <g>
          <circle cx={0} cy={-118} r={10} fill={metal} stroke={accent} strokeWidth={2} />
          <path d="M-30 -80 Q0 -88 30 -80" stroke={deep} strokeWidth={2.5} fill="none" opacity={0.8} />
          <line x1={-22} y1={-74} x2={22} y2={-74} stroke={deep} strokeWidth={3} strokeLinecap="round" opacity={0.9} />
        </g>
      );
    case "Durga":
      return (
        <g>
          {[-64, 64].map((x) => (
            <g key={x}>
              <path d={`M${x > 0 ? 52 : -52} 10 Q${x} 40 ${x > 0 ? 96 : -96} 20`} stroke={metal} strokeWidth={16} strokeLinecap="round" fill="none" />
              <circle cx={x > 0 ? 96 : -96} cy={20} r={8} fill={metal} stroke={accent} strokeWidth={2} />
            </g>
          ))}
          <circle cx={-14} cy={-74} r={3.2} fill={deep} />
          <circle cx={14} cy={-74} r={3.2} fill={deep} />
          <circle cx={0} cy={-94} r={5} fill="none" stroke={accent} strokeWidth={2.5} />
        </g>
      );
    case "Hanuman":
      return (
        <g>
          <line x1={84} y1={20} x2={108} y2={-64} stroke={metal} strokeWidth={14} strokeLinecap="round" />
          <circle cx={108} cy={-72} r={12} fill={metal} stroke={accent} strokeWidth={2} />
          <circle cx={-14} cy={-74} r={3.2} fill={deep} />
          <circle cx={14} cy={-74} r={3.2} fill={deep} />
        </g>
      );
    case "Saraswati":
      return (
        <g>
          <ellipse cx={-40} cy={60} rx={26} ry={12} fill="none" stroke={metal} strokeWidth={8} transform="rotate(-24 -40 60)" />
          <line x1={-40} y1={48} x2={40} y2={80} stroke={deep} strokeWidth={5} strokeLinecap="round" />
          <circle cx={-14} cy={-74} r={3.2} fill={deep} />
          <circle cx={14} cy={-74} r={3.2} fill={deep} />
        </g>
      );
    case "Vishnu":
      return (
        <g>
          <path d="M-70 96 Q-30 60 0 88 Q30 110 70 76" stroke={metal} strokeWidth={14} fill="none" strokeLinecap="round" />
          <circle cx={-14} cy={-74} r={3.2} fill={deep} />
          <circle cx={14} cy={-74} r={3.2} fill={deep} />
          <circle cx={0} cy={-94} r={4} fill={accent} />
        </g>
      );
    case "Ram Darbar":
      return (
        <g>
          <path d="M-120 130 L-120 -40 A120 120 0 0 1 120 -40 L120 130" fill="none" stroke={accent} strokeWidth={4} opacity={0.8} />
          <circle cx={-58} cy={-60} r={20} fill={metal} stroke={accent} strokeWidth={2} />
          <circle cx={58} cy={-60} r={20} fill={metal} stroke={accent} strokeWidth={2} />
          <circle cx={-14} cy={-74} r={3.2} fill={deep} />
          <circle cx={14} cy={-74} r={3.2} fill={deep} />
        </g>
      );
    default:
      return (
        <g>
          <circle cx={-14} cy={-74} r={3.2} fill={deep} />
          <circle cx={14} cy={-74} r={3.2} fill={deep} />
          <path d="M-8 -58 Q0 -54 8 -58" stroke={deep} strokeWidth={2.5} fill="none" />
        </g>
      );
  }
}

/** Wide editorial visual for hero / banners. */
export function HeroArt({ className, material = "brass" }: { className?: string; material?: "brass" | "silver" }) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <ProductVisual
        art={{ deity: "Ganesha", material, finish: "Antique", seed: 11 }}
        view="front"
        className="h-full w-full"
        title="Handcrafted Ganesha idol in cinematic gallery light"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent" />
    </div>
  );
}
