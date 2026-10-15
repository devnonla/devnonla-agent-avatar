import * as avatar from "devnonla-agent-avatar";
import * as ui from "devnonla-ui";
import { mountReactCodeRunner } from "devnonla-ui/markdown";
import "./sandbox.css";

// The only modules markdown can import in the sandbox. Docs import the public package name.
const root = document.getElementById("root");
if (!root) throw new Error("Sandbox root element not found");

const stop = mountReactCodeRunner(root, {
  "devnonla-agent-avatar": avatar,
  "devnonla-ui": ui,
});

// Without this, Vite HMR runs the module again and mounts a second runner on the same node.
import.meta.hot?.dispose(stop);
