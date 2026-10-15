# devnonla-agent-avatar

React agent avatars for Nonla Agents: a face, an animal face, and a standing body.

Docs: https://devnonla.github.io/devnonla-agent-avatar/

```bash
bun add devnonla-agent-avatar
```

Peer deps: `react` / `react-dom` >= 19.

```tsx
import "devnonla-agent-avatar/styles.css";
import { AgentAvatar, AgentAnimalAvatar, AgentBody } from "devnonla-agent-avatar";

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

`devnonla-ui` re-exports these components. Import from this package when you only need the avatars.
