---
path: "/installation"
title: "Installation"
group: "Get started"
groupOrder: 1
order: 2
icon: "code-24"
---

# Installation

Add the package and render a component. The motion CSS is imported by the component.

## Package

```bash
bun add devnonla-agent-avatar
```

Peer deps: `react` / `react-dom` ≥ 19.

## Use

```tsx
import { AgentAnimalAvatar, AgentBody, AgentShapeAvatar, DevNonlaAvatar } from "devnonla-agent-avatar";

export function Faces() {
  return (
    <>
      <DevNonlaAvatar />
      <AgentShapeAvatar config={{ shape: "drop", color: "#6E56F0" }} />
      <AgentAnimalAvatar config={{ shape: "frog", color: "#3EAE4A" }} motion="talk" />
      <AgentBody config={{ shape: "nonla", color: "#F47820" }} motion="walk" />
    </>
  );
}
```

[DevNonlaAvatar](/devnonla-avatar) is the mark. [AgentShapeAvatar](/shape-avatar) is a geometric face. [AgentAnimalAvatar](/animal-avatar) adds a mouth. [Agent body](/agent-body) stands, walks, and talks.
