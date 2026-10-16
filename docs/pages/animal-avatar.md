---
path: "/animal-avatar"
title: "AgentAnimalAvatar"
group: "Avatars"
groupOrder: 2
order: 2
icon: "people-community-24"
---

# AgentAnimalAvatar

`frog`, `fox`, `owl`, `bunny`, and `koala`. Two eyes and a mouth. Shapes on [AgentShapeAvatar](/shape-avatar) stay eyes only. The logo is [DevNonlaAvatar](/devnonla-avatar). For a standing character, pass any of these as the head of [Agent body](/agent-body).

## Basic

```live-react
import { AgentAnimalAvatar } from "devnonla-agent-avatar";

export default function Demo() {
  return <AgentAnimalAvatar />;
}
```

## Species

`frog` sets two eyes on a wide head. `fox` is pointed ears on a round face. `owl` is ear tufts and a pale disc around each big eye. `bunny` is two long upright ears on a round head. `koala` is fluffy round ears. The face color paints the silhouette. Each species has its own mouth — wide grin, sly smirk, curved beak, bunny “w”, or soft curve — until `talk` opens it.

```live-react
import { AGENT_ANIMAL_PARTS, AgentAnimalAvatar } from "devnonla-agent-avatar";

const colors = {
  frog: "#3EAE4A",
  fox: "#E07A2F",
  owl: "#A56B3C",
  bunny: "#E8A0B0",
  koala: "#8A95A1",
};

export default function Demo() {
  return AGENT_ANIMAL_PARTS.shape.map((shape) => (
    <div key={shape} className="flex flex-col items-center gap-1">
      <AgentAnimalAvatar
        config={{ shape, color: colors[shape] }}
        size={96}
        motion="idle"
        label={shape}
      />
      <span className="text-[15px] leading-7 text-muted-foreground capitalize">{shape}</span>
    </div>
  ));
}
```

## Talk

`still` holds the pose. `idle` bobs, blinks, and glances. `talk` holds the facing and opens that species’ mouth.

```live-react
import { AgentAnimalAvatar } from "devnonla-agent-avatar";

const animals = [
  { shape: "frog", color: "#3EAE4A", label: "Frog" },
  { shape: "fox", color: "#E07A2F", label: "Fox" },
  { shape: "owl", color: "#A56B3C", label: "Owl" },
  { shape: "bunny", color: "#E8A0B0", label: "Bunny" },
  { shape: "koala", color: "#8A95A1", label: "Koala" },
];

export default function Demo() {
  return animals.map((animal) => (
    <div key={animal.shape} className="flex flex-col items-center gap-1">
      <AgentAnimalAvatar config={animal} size={96} motion="talk" label={animal.label} />
      <span className="text-[15px] leading-7 text-muted-foreground">{animal.label}</span>
    </div>
  ));
}
```

## API

Pass species, color, and eye color together: `config={{ shape, color, eyeColor }}`.

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| `config.shape` | Species. | `frog` \| `fox` \| `owl` \| `bunny` \| `koala` | `frog` |
| `config.color` | Face color, as a hex string. | `string` | `#3EAE4A` |
| `config.eyeColor` | Pupil color. Omitted uses black, or white when the face is dark. | `black` \| `white` | black, or white on a dark face |
| `size` | Width and height, in pixels. | `number` | `64` |
| `motion` | `still` holds the pose. `idle` bobs, blinks, and glances. `talk` opens and closes that species’ mouth. | `still` \| `idle` \| `talk` | `still` |
| `look` | Fixed facing. The shape stays centered and the eyes and mouth move that way. | `forward` \| `left` \| `right` \| `down` \| `up-left` \| `up-right` \| `down-left` \| `down-right` | `forward` |
| `className` | Extra class on the root element. | `string` | `-` |
| `label` | Accessible name. | `string` | `Agent` |
