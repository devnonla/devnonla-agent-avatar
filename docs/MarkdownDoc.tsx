import * as avatar from "devnonla-agent-avatar";
import * as ui from "devnonla-ui";
import { MarkdownViewer } from "devnonla-ui/markdown";

/** Same modules a docs fence may import. Stable so each block compiles once. */
const trustedModules = {
  "devnonla-agent-avatar": avatar,
  "devnonla-ui": ui,
};

/** Renders a docs page whose body is a markdown string. */
export function MarkdownDoc({ value }: { value: string }) {
  return <MarkdownViewer value={value} trustedModules={trustedModules} />;
}
