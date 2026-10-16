import { createContext, type ReactNode, useContext, useEffect, useId, useState } from "react";
import { cn } from "../cn";
import "./avatar.css";
import { BunnyMouth, FoxMouth, FrogMouth, KoalaMouth, OwlMouth } from "./AvatarMouth";

/** `still` holds the pose. `idle` bobs the body, blinks, and glances. Defaults to `still`. */
export type AgentAvatarMotion = "still" | "idle";

/** Fixed facing. The shape stays centered and the eyes move that way. No straight-up glance. */
export type AgentAvatarLook = "forward" | "left" | "right" | "down" | "up-left" | "up-right" | "down-left" | "down-right";

/** Pupil color. Omitted picks black, or white when the face is dark. */
export type AgentAvatarEyeColor = "black" | "white";

export const AGENT_SHAPE_PARTS = {
  shape: ["circle", "square", "triangle", "diamond", "hex", "gem", "pill", "arch", "cloud", "blob", "drop", "shield"],
  color: ["#6E56F0", "#1C1C1C", "#F0B429", "#3DCFC0", "#F47820", "#3B82F6", "#F2549B", "#A56B3C"],
} as const;

/** @deprecated Use `AGENT_SHAPE_PARTS`. */
export const AGENT_AVATAR_PARTS = AGENT_SHAPE_PARTS;

/** Animal faces. These are the ones with a mouth. See `AgentAnimalAvatar`. */
export const AGENT_ANIMAL_PARTS = {
  shape: ["frog", "fox", "owl", "bunny", "koala"],
  color: AGENT_AVATAR_PARTS.color,
} as const;

export type AgentAnimalShape = (typeof AGENT_ANIMAL_PARTS.shape)[number];

/** A drawn face: a geometric shape, the Nonla mark, or an animal. */
export type AvatarFaceConfig = {
  shape: AgentAvatarConfig["shape"] | "nonla" | AgentAnimalShape;
  color: string;
  eyeColor?: AgentAvatarEyeColor;
};

type Part<K extends keyof typeof AGENT_AVATAR_PARTS> = (typeof AGENT_AVATAR_PARTS)[K][number];

/** A character is one shape, a color, and two eyes. */
export type AgentAvatarConfig = {
  shape: Part<"shape">;
  color: string;
  eyeColor?: AgentAvatarEyeColor;
};

export type AgentAvatarProps = {
  /** Shape and color. Omitted parts use circle and `#6E56F0`. */
  config?: Partial<AgentAvatarConfig>;
  /** Square size in px. Defaults to 64. */
  size?: number;
  motion?: AgentAvatarMotion;
  /** Which way the face is turned. Defaults to straight ahead. */
  look?: AgentAvatarLook;
  className?: string;
  /** Accessible name. Defaults to "Agent". */
  label?: string;
};

function hash(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

const DEFAULT_CONFIG: AgentAvatarConfig = {
  shape: AGENT_AVATAR_PARTS.shape[0],
  color: AGENT_AVATAR_PARTS.color[0],
};

function resolveConfig(config?: Partial<AgentAvatarConfig>): AgentAvatarConfig {
  return {
    shape: config?.shape ?? DEFAULT_CONFIG.shape,
    color: config?.color ?? DEFAULT_CONFIG.color,
    eyeColor: config?.eyeColor,
  };
}

function stagger(seed: string) {
  return (hash(seed) % 8) * 0.2;
}

const EYE = "#111";
const EYE_ON_DARK = "#fff";

function eyeInk(color: string) {
  const hex = color.replace("#", "");
  if (hex.length < 6) return EYE;
  const r = Number.parseInt(hex.slice(0, 2), 16);
  const g = Number.parseInt(hex.slice(2, 4), 16);
  const b = Number.parseInt(hex.slice(4, 6), 16);
  const luma = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  return luma < 0.28 ? EYE_ON_DARK : EYE;
}

function eyeFill(color: string, eyeColor?: AgentAvatarEyeColor) {
  if (eyeColor === "white") return EYE_ON_DARK;
  if (eyeColor === "black") return EYE;
  return eyeInk(color);
}

function randomLook(current: AgentAvatarLook) {
  const pool = LOOKS.filter((item) => item !== current);
  return pool[Math.floor(Math.random() * pool.length)];
}

/** Idle holds one facing, then picks a different one. */
function useIdleLook(active: boolean, home: AgentAvatarLook, delay: number) {
  const [glance, setGlance] = useState(home);

  useEffect(() => {
    if (!active) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) {
      setGlance(home);
      return;
    }

    let timer = 0;
    const arm = (wait: number) => {
      timer = window.setTimeout(() => {
        setGlance((current) => randomLook(current));
        arm(1100 + Math.random() * 1700);
      }, wait);
    };

    setGlance(home);
    arm(700 + delay * 1000 + Math.random() * 900);

    const onChange = () => {
      if (!media.matches) return;
      window.clearTimeout(timer);
      setGlance(home);
    };
    media.addEventListener("change", onChange);
    return () => {
      window.clearTimeout(timer);
      media.removeEventListener("change", onChange);
    };
  }, [active, home, delay]);

  return active ? glance : home;
}

/** Eye travel in viewBox units. The shape stays on the center of the box. */
const LOOK: Record<AgentAvatarLook, [number, number]> = {
  forward: [0, 0],
  left: [-6.4, 0],
  right: [6.4, 0],
  down: [0, 4.4],
  "up-left": [-4.5, -3.1],
  "up-right": [4.5, -3.1],
  "down-left": [-4.5, 3.1],
  "down-right": [4.5, 3.1],
};

const LOOKS = Object.keys(LOOK) as AgentAvatarLook[];

function mixHex(color: string, toward: "#fff" | "#000", amount: number) {
  const hex = color.replace("#", "");
  const channel = (start: number) => Number.parseInt(hex.slice(start, start + 2), 16);
  const target = toward === "#fff" ? 255 : 0;
  const mix = (value: number) => Math.round(value + (target - value) * amount)
    .toString(16)
    .padStart(2, "0");
  return `#${mix(channel(0))}${mix(channel(2))}${mix(channel(4))}`;
}

const PaintContext = createContext("#111");
const ShadowContext = createContext<string | undefined>(undefined);
const InkContext = createContext(EYE);

/** Logo mark, fitted to the avatar box. The mark stays centered. The eyes travel. */
const NONLA_HAT =
  "M32.05 11.6C31.32 11.6 26.28 15.07 17.23 22.05C12.68 25.52 8.71 28.77 6.19 31.06C5.2 31.92 4.21 32.86 3.49 33.77C2.95 34.49 2.36 35.16 2.09 35.57C1.91 36.15 1.95 36.83 2 37.37A30 4.86 0 0 1 62 37.37C62.05 36.83 62.09 36.15 61.91 35.57C61.64 35.16 61.05 34.49 60.51 33.77C59.79 32.86 58.8 31.92 57.81 31.06C55.29 28.77 51.32 25.52 46.77 22.05C37.72 15.07 32.68 11.6 32.05 11.6Z";

function nonlaTones(color: string) {
  return {
    brim: mixHex(color, "#000", 0.3),
    face: mixHex(color, "#fff", 0.25),
    hat: color,
  };
}

function NonlaHat({ tone }: { tone: ReturnType<typeof nonlaTones> }) {
  return (
    <>
      <path fill={tone.hat} d={NONLA_HAT} />
      <path fill="none" stroke={tone.hat} strokeWidth="0.4" d="M2.5 37.37A29.5 4.86 0 0 1 61.5 37.37" />
      <path fill="none" stroke={tone.brim} strokeWidth="1" d="M2.5 37.37A29.5 4.77 0 0 1 61.5 37.37" />
      <g fill="none" stroke={tone.brim} strokeWidth="0.5" strokeLinecap="round" opacity="0.55">
        <path d="M31.23 12.86C25.6 20.25 17.95 27.5 10.15 33.9" />
        <path d="M31.59 12.86C28.98 19.4 26.46 25.52 23.94 31.38" />
        <path d="M32.5 12.86C35.11 19.4 37.63 25.52 40.15 31.38" />
        <path d="M32.86 12.86C38.49 20.25 46.14 27.5 53.94 33.9" />
      </g>
    </>
  );
}

function NonlaMark({ color }: { color: string }) {
  const tone = nonlaTones(color);
  const ink = useContext(InkContext);
  const shadow = useContext(ShadowContext);
  const catchlight = ink === EYE_ON_DARK ? EYE : "#fff";
  const clip = `nonla-face-${useId().replace(/:/g, "")}`;
  return (
    <>
      <g filter={shadow}>
        <ellipse cx="32" cy="37.37" rx="30" ry="8.56" fill={tone.brim} />
        <circle cx="32.05" cy="35.66" r="16.74" fill={tone.face} />
        <NonlaHat tone={tone} />
      </g>
      <clipPath id={clip}>
        <circle cx="32.05" cy="35.66" r="16.74" />
      </clipPath>
      <g clipPath={`url(#${clip})`}>
        <g className="nonla-avatar-gaze">
          <g className="nonla-avatar-eyes">
            <ellipse cx="24.82" cy="40.3" rx="2" ry="3.06" fill={ink} />
            <ellipse cx="38.96" cy="40.3" rx="2" ry="3.06" fill={ink} />
            <ellipse cx="25.29" cy="39.08" rx="0.59" ry="0.86" fill={catchlight} />
            <ellipse cx="39.43" cy="39.08" rx="0.59" ry="0.86" fill={catchlight} />
          </g>
        </g>
      </g>
      {/* Covers eyes that travel up into the cone. */}
      <NonlaHat tone={tone} />
    </>
  );
}

/** Wide head, two eyes sitting on top, a smile. Pupils stay inside the sockets. */
function FrogMark({ color }: { color: string }) {
  const paint = useContext(PaintContext);
  const shadow = useContext(ShadowContext);
  const ink = useContext(InkContext);
  const socket = ink === EYE_ON_DARK ? mixHex(color, "#000", 0.35) : mixHex(color, "#fff", 0.78);
  const catchlight = ink === EYE_ON_DARK ? EYE : "#fff";
  const clip = `frog-eye-${useId().replace(/:/g, "")}`;
  const y = 18;
  const left = 18;
  const right = 46;
  const socketR = 7.4;

  return (
    <>
      <g filter={shadow}>
        <circle cx={left} cy={y} r="11" fill={paint} />
        <circle cx={right} cy={y} r="11" fill={paint} />
        <ellipse cx="32" cy="41" rx="22" ry="15.5" fill={paint} />
      </g>
      <g className="nonla-avatar-mark">
        <circle cx={left} cy={y} r={socketR} fill={socket} />
        <circle cx={right} cy={y} r={socketR} fill={socket} />
        <clipPath id={clip}>
          <circle cx={left} cy={y} r={socketR} />
          <circle cx={right} cy={y} r={socketR} />
        </clipPath>
        <g clipPath={`url(#${clip})`}>
          <g className="nonla-avatar-gaze-soft">
            <g className="nonla-avatar-eyes">
              <circle cx={left} cy={y} r="3.6" fill={ink} />
              <circle cx={right} cy={y} r="3.6" fill={ink} />
              <circle cx={left + 1.05} cy={y - 1.2} r="1" fill={catchlight} />
              <circle cx={right + 1.05} cy={y - 1.2} r="1" fill={catchlight} />
            </g>
          </g>
        </g>
        <FrogMouth className="nonla-avatar-gaze-soft" color={ink} />
      </g>
    </>
  );
}

/** Pointed ears and a sly smirk. The round face is the mass; no nose. */
function FoxMark({ color }: { color: string }) {
  const paint = useContext(PaintContext);
  const shadow = useContext(ShadowContext);
  const ink = useContext(InkContext);
  const inner = mixHex(color, "#fff", 0.46);
  const ear = { fill: paint, stroke: paint, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };

  return (
    <>
      <g filter={shadow}>
        <path d="M16 32 L12 6 L30 26 Z" strokeWidth="3.5" {...ear} />
        <path d="M48 32 L52 6 L34 26 Z" strokeWidth="3.5" {...ear} />
        <path d="M17.5 24 L15 11 L26 22 Z" fill={inner} />
        <path d="M46.5 24 L49 11 L38 22 Z" fill={inner} />
        <circle cx="32" cy="36" r="17" fill={paint} />
      </g>
      <g className="nonla-avatar-mark">
        <Eyes cx={32} cy={32} w={4.4} h={7.2} />
        <FoxMouth className="nonla-avatar-gaze" color={ink} />
      </g>
    </>
  );
}

/** Ear tufts on the head line, one pale disc around each big eye, and a v-beak mouth. */
function OwlMark({ color }: { color: string }) {
  const paint = useContext(PaintContext);
  const shadow = useContext(ShadowContext);
  const ink = useContext(InkContext);
  const disc = ink === EYE_ON_DARK ? mixHex(color, "#000", 0.22) : mixHex(color, "#fff", 0.7);
  const socket = ink === EYE_ON_DARK ? mixHex(color, "#000", 0.42) : "#fff";
  const catchlight = ink === EYE_ON_DARK ? EYE : "#fff";
  const clip = `owl-eye-${useId().replace(/:/g, "")}`;
  const y = 33.5;
  const left = 22;
  const right = 42;
  const socketR = 7.4;

  return (
    <>
      <g filter={shadow}>
        <path
          d="M11 22L8 7L22 16Q32 13 42 16L56 7L53 22Q58 30 56 40Q52 56 32 57Q12 56 8 40Q6 30 11 22Z"
          fill={paint}
          stroke={paint}
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <circle cx={left} cy={y} r="10.8" fill={disc} />
        <circle cx={right} cy={y} r="10.8" fill={disc} />
      </g>
      <g className="nonla-avatar-mark">
        <circle cx={left} cy={y} r={socketR} fill={socket} />
        <circle cx={right} cy={y} r={socketR} fill={socket} />
        <clipPath id={clip}>
          <circle cx={left} cy={y} r={socketR} />
          <circle cx={right} cy={y} r={socketR} />
        </clipPath>
        <g clipPath={`url(#${clip})`}>
          <g className="nonla-avatar-gaze-soft">
            <g className="nonla-avatar-eyes">
              <circle cx={left} cy={y} r="4" fill={ink} />
              <circle cx={right} cy={y} r="4" fill={ink} />
              <circle cx={left + 1.1} cy={y - 1.3} r="1.1" fill={catchlight} />
              <circle cx={right + 1.1} cy={y - 1.3} r="1.1" fill={catchlight} />
            </g>
          </g>
        </g>
        <OwlMouth className="nonla-avatar-gaze-soft" color={ink} />
      </g>
    </>
  );
}

/** Two long upright ears on a round head, and a small “w”. No nose. */
function BunnyMark({ color }: { color: string }) {
  const paint = useContext(PaintContext);
  const shadow = useContext(ShadowContext);
  const ink = useContext(InkContext);
  const inner = mixHex(color, "#fff", 0.5);

  return (
    <>
      <g filter={shadow}>
        <g transform="rotate(-8 23 32)">
          <ellipse cx="23" cy="18" rx="6" ry="15" fill={paint} />
          <ellipse cx="23" cy="19" rx="2.8" ry="10.5" fill={inner} />
        </g>
        <g transform="rotate(8 41 32)">
          <ellipse cx="41" cy="18" rx="6" ry="15" fill={paint} />
          <ellipse cx="41" cy="19" rx="2.8" ry="10.5" fill={inner} />
        </g>
        <ellipse cx="32" cy="44" rx="17" ry="14" fill={paint} />
      </g>
      <g className="nonla-avatar-mark">
        <Eyes cx={32} cy={42} w={4} h={6.4} />
        <BunnyMouth className="nonla-avatar-gaze" color={ink} />
      </g>
    </>
  );
}

/** Fluffy round ears and a soft smile. No nose. */
function KoalaMark({ color }: { color: string }) {
  const paint = useContext(PaintContext);
  const shadow = useContext(ShadowContext);
  const ink = useContext(InkContext);
  const inner = mixHex(color, "#fff", 0.42);

  return (
    <>
      <g filter={shadow}>
        <circle cx="12" cy="28" r="12" fill={paint} />
        <circle cx="52" cy="28" r="12" fill={paint} />
        <circle cx="12" cy="28" r="6.5" fill={inner} />
        <circle cx="52" cy="28" r="6.5" fill={inner} />
        <circle cx="32" cy="36" r="17" fill={paint} />
      </g>
      <g className="nonla-avatar-mark">
        <Eyes cx={32} cy={32} w={4.4} h={7} />
        <KoalaMouth className="nonla-avatar-gaze" color={ink} />
      </g>
    </>
  );
}

function Eyes({
  cx,
  cy,
  w = 5.2,
  h = 12,
}: {
  cx: number;
  cy: number;
  w?: number;
  h?: number;
}) {
  const gap = w * 1.5;
  const top = cy - h / 2;
  const fill = useContext(InkContext);
  return (
    <g className="nonla-avatar-gaze">
      <g className="nonla-avatar-eyes">
        <rect x={cx - gap / 2 - w} y={top} width={w} height={h} rx={w / 2} fill={fill} />
        <rect x={cx + gap / 2} y={top} width={w} height={h} rx={w / 2} fill={fill} />
      </g>
    </g>
  );
}

function Shape({ shape, color, eyeColor }: AvatarFaceConfig) {
  const paint = useContext(PaintContext);
  const shadow = useContext(ShadowContext);
  const soft = { fill: paint, stroke: paint, strokeLinejoin: "round" as const };
  const face = (mark: ReactNode, pupils: ReactNode, shiftY = 0) => (
    <g transform={shiftY ? `translate(0 ${shiftY})` : undefined}>
      <g filter={shadow}>{mark}</g>
      {pupils}
    </g>
  );
  const body: Record<AvatarFaceConfig["shape"], ReactNode> = {
    circle: face(<circle cx="32" cy="32" r="22" fill={paint} />, <Eyes cx={32} cy={30} />),
    square: face(<rect x="9" y="9" width="46" height="46" rx="16" fill={paint} />, <Eyes cx={32} cy={30} />),
    triangle: face(<path d="M32 16 L50 50 H14 Z" strokeWidth="14" {...soft} />, <Eyes cx={32} cy={38} />, -1),
    diamond: face(<path d="M32 14 L50 32 L32 50 L14 32 Z" strokeWidth="8" {...soft} />, <Eyes cx={32} cy={30} />),
    hex: face(<path d="M32 12 L49 22 L49 42 L32 52 L15 42 L15 22 Z" strokeWidth="8" {...soft} />, <Eyes cx={32} cy={30} />),
    gem: face(<path d="M22 12 H42 L52 22 V42 L42 52 H22 L12 42 V22 Z" strokeWidth="8" {...soft} />, <Eyes cx={32} cy={30} />),
    pill: face(<rect x="6" y="18" width="52" height="28" rx="14" fill={paint} />, <Eyes cx={32} cy={30} />),
    arch: face(<path d="M14 50V32C14 18 50 18 50 32V50C50 56 14 56 14 50Z" fill={paint} />, <Eyes cx={32} cy={36} />, -6),
    cloud: face(
      <g fill={paint}>
        <circle cx="20" cy="38" r="12" />
        <circle cx="44" cy="38" r="12" />
        <circle cx="32" cy="28" r="14" />
        <rect x="16" y="34" width="32" height="14" />
      </g>,
      <Eyes cx={32} cy={36} />,
    ),
    blob: face(<ellipse cx="32" cy="34" rx="24" ry="18" fill={paint} />, <Eyes cx={32} cy={32} />, -2),
    drop: face(
      <path d="M27 23C19 30 15 37 15 46C15 55 22.5 60 32 60C41.5 60 49 55 49 46C49 37 45 30 37 23Q32 16 27 23Z" strokeWidth="5" {...soft} />,
      <Eyes cx={32} cy={42} />,
      -8,
    ),
    shield: face(
      <path d="M18 18H46C52 18 54 24 54 32V36C54 48 46 56 32 58C18 56 10 48 10 36V32C10 24 12 18 18 18Z" fill={paint} />,
      <Eyes cx={32} cy={34} />,
      -6,
    ),
    nonla: <NonlaMark color={color} />,
    frog: <FrogMark color={color} />,
    fox: <FoxMark color={color} />,
    owl: <OwlMark color={color} />,
    bunny: <BunnyMark color={color} />,
    koala: <KoalaMark color={color} />,
  };
  return <InkContext.Provider value={eyeFill(color, eyeColor)}>{body[shape]}</InkContext.Provider>;
}

export {
  eyeFill,
  InkContext,
  LOOK,
  mixHex,
  PaintContext,
  resolveConfig as resolveAvatarConfig,
  ShadowContext,
  Shape as AvatarShape,
  stagger as avatarStagger,
  useIdleLook,
};

export function AvatarFace({
  config,
  size = 64,
  motion = "still",
  look = "forward",
  className,
  label = "Agent",
}: {
  config: AvatarFaceConfig;
  size?: number;
  motion?: AgentAvatarMotion | "talk";
  look?: AgentAvatarLook;
  className?: string;
  label?: string;
}) {
  const resolved = config;
  const delay = stagger(`${resolved.shape}${resolved.color}`);
  const shown = useIdleLook(motion === "idle", look, delay);
  const [ex, ey] = LOOK[shown];
  const uid = useId().replace(/:/g, "");
  const light = `nonla-av-${uid}`;
  const shadow = `nonla-av-s-${uid}`;

  return (
    <span
      role="img"
      aria-label={label}
      data-motion={motion}
      data-look={shown}
      className={cn("nonla-avatar", className)}
      style={{
        width: size,
        height: size,
        ["--nonla-avatar-delay" as string]: `${delay}s`,
        ["--nonla-avatar-ex" as string]: `${(ex / 64) * 100}%`,
        ["--nonla-avatar-ey" as string]: `${(ey / 64) * 100}%`,
      }}
    >
      <span className="nonla-avatar-bob" aria-hidden>
        <svg viewBox="0 0 64 64" width="100%" height="100%">
          <defs>
            <linearGradient id={light} gradientUnits="userSpaceOnUse" x1="32" y1="4" x2="32" y2="60">
              <stop offset="0" stopColor={mixHex(resolved.color, "#fff", 0.16)} />
              <stop offset="1" stopColor={resolved.color} />
            </linearGradient>
            <filter id={shadow} x="-20%" y="-20%" width="140%" height="150%">
              <feDropShadow dx="0" dy="0.8" stdDeviation="0.6" floodColor="#000" floodOpacity="0.18" />
            </filter>
          </defs>
          <PaintContext.Provider value={`url(#${light})`}>
            <ShadowContext.Provider value={`url(#${shadow})`}>
              <Shape {...resolved} />
            </ShadowContext.Provider>
          </PaintContext.Provider>
        </svg>
      </span>
    </span>
  );
}

export function AgentShapeAvatar({ config, size, motion = "still", look = "forward", className, label = "Agent" }: AgentAvatarProps) {
  return <AvatarFace config={resolveConfig(config)} size={size} motion={motion} look={look} className={className} label={label} />;
}

/** @deprecated Use `AgentShapeAvatar`. */
export const AgentAvatar = AgentShapeAvatar;

export type AgentShapeAvatarConfig = AgentAvatarConfig;
export type AgentShapeAvatarProps = AgentAvatarProps;
