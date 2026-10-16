import { cn } from "../cn";
import "./avatar.css";

export type AvatarMouthProps = {
  /** Center of the smile, in the 64-unit avatar box. */
  cx: number;
  /** Lip line. The opening grows up and down from here. */
  cy: number;
  /** Corner-to-corner width of the smile. */
  width: number;
  /** Lip and mouth color. Defaults to `currentColor`. */
  color?: string;
  className?: string;
};

type SpeciesMouthProps = {
  color?: string;
  className?: string;
};

/**
 * Generic curved smile. Prefer a species mouth on animal faces —
 * each animal keeps its own rest shape and open shape.
 * A parent with `data-motion="talk"` (`.nonla-avatar` or `.nonla-body`) opens and closes it.
 */
export function AvatarMouth({ cx, cy, width, color = "currentColor", className }: AvatarMouthProps) {
  const rx = width / 2;
  const depth = Math.max(1.35, width * 0.22);
  const stroke = Math.min(1.7, Math.max(1.05, width * 0.12));
  const openRy = Math.min(2.8, Math.max(1.8, width * 0.16));
  const rest = `M ${cx - rx} ${cy} Q ${cx} ${cy + depth} ${cx + rx} ${cy}`;

  return (
    <g className={cn("nonla-avatar-mouth", className)}>
      <path className="nonla-avatar-mouth-rest" d={rest} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" />
      <ellipse className="nonla-avatar-mouth-open" cx={cx} cy={cy + depth / 4} rx={rx} ry={openRy} fill={color} />
    </g>
  );
}

/** Wide amphibian grin. */
export function FrogMouth({ color = "currentColor", className }: SpeciesMouthProps) {
  const cx = 32;
  const cy = 44.2;
  const rx = 11;
  const depth = 5.2;
  return (
    <g className={cn("nonla-avatar-mouth", className)}>
      <path
        className="nonla-avatar-mouth-rest"
        d={`M ${cx - rx} ${cy} Q ${cx} ${cy + depth} ${cx + rx} ${cy}`}
        fill="none"
        stroke={color}
        strokeWidth={1.7}
        strokeLinecap="round"
      />
      <ellipse className="nonla-avatar-mouth-open" cx={cx} cy={cy + 1.6} rx={rx} ry={3.2} fill={color} />
    </g>
  );
}

/** Sly tilted smirk on the tapered chin. */
export function FoxMouth({ color = "currentColor", className }: SpeciesMouthProps) {
  const cx = 32;
  const cy = 44.5;
  return (
    <g className={cn("nonla-avatar-mouth", className)}>
      <path
        className="nonla-avatar-mouth-rest"
        d={`M ${cx - 4.8} ${cy + 0.4} Q ${cx - 0.5} ${cy + 2.2} ${cx + 5.2} ${cy - 1.1}`}
        fill="none"
        stroke={color}
        strokeWidth={1.4}
        strokeLinecap="round"
      />
      <ellipse className="nonla-avatar-mouth-open" cx={cx} cy={cy + 0.6} rx={3.8} ry={2.1} fill={color} />
    </g>
  );
}

/** Natural seed beak tucked between the eye discs; lower beak drops open when talking. */
export function OwlMouth({ color = "currentColor", className }: SpeciesMouthProps) {
  return (
    <g className={cn("nonla-avatar-mouth", className)}>
      <path
        className="nonla-avatar-mouth-open"
        d="M 29.5 39.5 L 34.5 39.5 Q 34 44.8 32 47.5 Q 30 44.8 29.5 39.5 Z"
        fill={color}
      />
      <path
        d="M 29.2 38.6 Q 32 36.6 34.8 38.6 Q 34.2 42.2 32 44.6 Q 29.8 42.2 29.2 38.6 Z"
        fill={color}
      />
    </g>
  );
}

/** Small bunny “w” under the eyes. */
export function BunnyMouth({ color = "currentColor", className }: SpeciesMouthProps) {
  const cx = 32;
  const cy = 49.5;
  return (
    <g className={cn("nonla-avatar-mouth", className)}>
      <path
        className="nonla-avatar-mouth-rest"
        d={`M ${cx - 4.6} ${cy} Q ${cx - 2.3} ${cy + 2.4} ${cx} ${cy + 0.15} Q ${cx + 2.3} ${cy + 2.4} ${cx + 4.6} ${cy}`}
        fill="none"
        stroke={color}
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <ellipse className="nonla-avatar-mouth-open" cx={cx} cy={cy + 1} rx={3.5} ry={1.9} fill={color} />
    </g>
  );
}

/** Soft wide curve. */
export function KoalaMouth({ color = "currentColor", className }: SpeciesMouthProps) {
  const cx = 32;
  const cy = 44.5;
  const rx = 8;
  const depth = 2.4;
  return (
    <g className={cn("nonla-avatar-mouth", className)}>
      <path
        className="nonla-avatar-mouth-rest"
        d={`M ${cx - rx} ${cy} Q ${cx} ${cy + depth} ${cx + rx} ${cy}`}
        fill="none"
        stroke={color}
        strokeWidth={1.45}
        strokeLinecap="round"
      />
      <ellipse className="nonla-avatar-mouth-open" cx={cx} cy={cy + 0.9} rx={6.5} ry={2.4} fill={color} />
    </g>
  );
}
