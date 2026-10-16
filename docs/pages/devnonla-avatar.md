---
path: "/devnonla-avatar"
title: "DevNonlaAvatar"
group: "Avatars"
groupOrder: 2
order: 0
icon: "bot-24"
---

# DevNonlaAvatar

The Nonla logo, as a face. One color splits into brim, face, and hat. The mark stays centered. The eyes travel with `look`.

## Basic

```live-react
import { DevNonlaAvatar } from "devnonla-agent-avatar";

export default function Demo() {
  return <DevNonlaAvatar />;
}
```

## Look

Facing is fixed. The mark stays centered. The eyes travel that way.

```live-react
import { DevNonlaAvatar } from "devnonla-agent-avatar";

const looks = [
  ["forward", "Forward"],
  ["left", "Left"],
  ["right", "Right"],
  ["down", "Down"],
  ["up-left", "Top left"],
  ["up-right", "Top right"],
  ["down-left", "Bottom left"],
  ["down-right", "Bottom right"],
];

export default function Demo() {
  return looks.map(([look, label]) => (
    <div key={look} className="flex w-20 flex-col items-center gap-1">
      <DevNonlaAvatar color="#ffa333" size={80} look={look} label={label} />
      <span className="text-center text-[15px] leading-7 text-muted-foreground">{label}</span>
    </div>
  ));
}
```

## API

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| `color` | Hat color. The brim and face are mixed from it. | `string` | `#F47820` |
| `eyeColor` | Pupil color. Omitted uses black, or white when the hat is dark. | `black` \| `white` | black, or white on a dark hat |
| `size` | Width and height, in pixels. | `number` | `64` |
| `motion` | `still` holds the pose. `idle` bobs, blinks, and glances. | `still` \| `idle` | `still` |
| `look` | Fixed facing. The mark stays centered and the eyes move that way. | `forward` \| `left` \| `right` \| `down` \| `up-left` \| `up-right` \| `down-left` \| `down-right` | `forward` |
| `className` | Extra class on the root element. | `string` | `-` |
| `label` | Accessible name. | `string` | `DevNonla` |
