import type { ComponentType } from "react";
import { BotIcon } from "@solar-icons/react/outline/bot";
import { CodeIcon } from "@solar-icons/react/outline/code";
import { UserRoundedIcon } from "@solar-icons/react/outline/user-rounded";
import { UsersGroupRoundedIcon } from "@solar-icons/react/outline/users-group-rounded";
import { Widget4Icon } from "@solar-icons/react/outline/widget-4";

const NAV_ICONS: Record<string, ComponentType<{ size?: number }>> = {
  "apps-24": Widget4Icon,
  "bot-24": BotIcon,
  "code-24": CodeIcon,
  "people-community-24": UsersGroupRoundedIcon,
  "person-24": UserRoundedIcon,
};

export function NavIcon({ name }: { name: string }) {
  const Icon = NAV_ICONS[name];
  if (!Icon) return null;
  return <Icon size={16} />;
}
