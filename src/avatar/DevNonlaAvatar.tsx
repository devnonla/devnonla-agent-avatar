import "./avatar.css";
import { type AgentAvatarEyeColor, type AgentAvatarLook, type AgentAvatarMotion, AvatarFace } from "./AgentAvatar";

export type DevNonlaAvatarProps = {
  /** Hat color. The brim and face are mixed from it. Defaults to `#F47820`. */
  color?: string;
  eyeColor?: AgentAvatarEyeColor;
  /** Square size in px. Defaults to 64. */
  size?: number;
  motion?: AgentAvatarMotion;
  /** Which way the face is turned. Defaults to straight ahead. */
  look?: AgentAvatarLook;
  className?: string;
  /** Accessible name. Defaults to "DevNonla". */
  label?: string;
};

/** Nonla logo mark, as a face. The mark stays centered. The eyes travel. */
export function DevNonlaAvatar({ color = "#F47820", eyeColor, size = 64, motion = "still", look = "forward", className, label = "DevNonla" }: DevNonlaAvatarProps) {
  return <AvatarFace config={{ shape: "nonla", color, eyeColor }} size={size} motion={motion} look={look} className={className} label={label} />;
}
