---
path: "/installation"
title: "Installation"
group: "Get started"
groupOrder: 1
order: 2
icon: "code-24"
---

# Installation

Add the package and import the CSS. The components do not wrap the page in a theme host.

## Package

```bash
bun add devnonla-agent-avatar
```

Peer deps: `react` / `react-dom` ≥ 19.

## Styles

```css
@import "devnonla-agent-avatar/styles.css";
```

Blink, glance, walk, and the speech bubble live in that file. Without it the shapes still draw, and they do not move.

## Use

```tsx
import "devnonla-agent-avatar/styles.css";
import { AgentAnimalAvatar, AgentAvatar, AgentBody } from "devnonla-agent-avatar";

export function Faces() {
  return (
    <>
      <AgentAvatar config={{ shape: "drop", color: "#6E56F0" }} />
      <AgentAnimalAvatar config={{ shape: "frog", color: "#3EAE4A" }} motion="talk" />
      <AgentBody config={{ shape: "nonla", color: "#F47820" }} motion="walk" />
    </>
  );
}
```

[Avatar](/avatar) is the face. [Animal avatar](/animal-avatar) adds a mouth. [Agent body](/agent-body) stands, walks, and talks.
