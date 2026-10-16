# devnonla-agent-avatar

Give an AI agent a face. One color, four React components, and motion that already knows how to blink.

[![Docs](https://img.shields.io/badge/docs-live-6E56F0)](https://devnonla.github.io/devnonla-agent-avatar/)
[![License](https://img.shields.io/badge/license-MIT-1C1C1C)](./LICENSE)

A chat bubble with no one in it feels unfinished. Drop in a hat, a geometric face, an animal, or a full body. Eyes glance. Mouths open. Legs walk. The [live docs](https://devnonla.github.io/devnonla-agent-avatar/) are the demo — every example on the page is the real component.

| Component | On the page |
| --- | --- |
| [`DevNonlaAvatar`](https://devnonla.github.io/devnonla-agent-avatar/devnonla-avatar) | The Nonla mark. One color splits into brim, face, and hat. |
| [`AgentShapeAvatar`](https://devnonla.github.io/devnonla-agent-avatar/shape-avatar) | Twelve silhouettes — drop, shield, cloud, gem — and two eyes. |
| [`AgentAnimalAvatar`](https://devnonla.github.io/devnonla-agent-avatar/animal-avatar) | Frog, fox, owl, bunny, koala. Each species keeps its own mouth. |
| [`AgentBody`](https://devnonla.github.io/devnonla-agent-avatar/agent-body) | Head, torso, arms, and legs. Walk, run, or speak in a bubble. |

## Install

```bash
bun add devnonla-agent-avatar
```

Peer dependencies: `react` and `react-dom` >= 19. Motion CSS ships with the components.

## Use

```tsx
import { AgentAnimalAvatar, AgentBody, AgentShapeAvatar, DevNonlaAvatar } from "devnonla-agent-avatar";

export function Cast() {
  return (
    <>
      <DevNonlaAvatar motion="idle" />
      <AgentShapeAvatar config={{ shape: "drop", color: "#6E56F0" }} look="left" />
      <AgentAnimalAvatar config={{ shape: "frog", color: "#3EAE4A" }} motion="talk" />
      <AgentBody config={{ shape: "nonla", color: "#F47820" }} motion="walk" say="On my way." />
    </>
  );
}
```

`still` holds the pose. `idle` bobs, blinks, and glances. Animals open their mouth on `talk`. The body also `walk`s and `run`s, and `say` types a line in a bubble above the head.

`devnonla-ui` re-exports these components. Import from this package when the page only needs the avatars.

## Docs

<https://devnonla.github.io/devnonla-agent-avatar/>

Shapes, looks, colors, and the walkable stage are all there, live.

## License

[MIT](./LICENSE)
