import "./avatar.css";
import {
  AGENT_ANIMAL_PARTS,
  type AgentAnimalShape,
  type AgentAvatarEyeColor,
  type AgentAvatarLook,
  AvatarFace,
} from "./AgentAvatar";

export type { AgentAnimalShape };
export { AGENT_ANIMAL_PARTS };

/** `still` holds the pose. `idle` bobs, blinks, and glances. `talk` opens and closes the mouth. */
export type AgentAnimalMotion = "still" | "idle" | "talk";

/** An animal is one species, a color, two eyes, and a mouth. */
export type AgentAnimalAvatarConfig = {
  shape: AgentAnimalShape;
  color: string;
  eyeColor?: AgentAvatarEyeColor;
};

export type AgentAnimalAvatarProps = {
  /** Species and color. Omitted parts use frog and `#3EAE4A`. */
  config?: Partial<AgentAnimalAvatarConfig>;
  /** Square size in px. Defaults to 64. */
  size?: number;
  motion?: AgentAnimalMotion;
  /** Which way the face is turned. Defaults to straight ahead. */
  look?: AgentAvatarLook;
  className?: string;
  /** Accessible name. Defaults to "Agent". */
  label?: string;
};

const DEFAULT_CONFIG: AgentAnimalAvatarConfig = {
  shape: "frog",
  color: "#3EAE4A",
};

/**
 * Animal face. Each species has eyes and its own mouth.
 * `motion="talk"` opens that mouth.
 */
export function AgentAnimalAvatar({
  config,
  size = 64,
  motion = "still",
  look = "forward",
  className,
  label = "Agent",
}: AgentAnimalAvatarProps) {
  return (
    <AvatarFace
      config={{
        shape: config?.shape ?? DEFAULT_CONFIG.shape,
        color: config?.color ?? DEFAULT_CONFIG.color,
        eyeColor: config?.eyeColor,
      }}
      size={size}
      motion={motion}
      look={look}
      className={className}
      label={label}
    />
  );
}
