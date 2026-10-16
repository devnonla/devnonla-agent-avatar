export type { DocsNavItem, DocsNavSection } from "./catalog";
export { DOCS_NAV, docNeighbors, findNavItem, flattenNav } from "./catalog";

export const GITHUB_REPO = "https://github.com/devnonla/devnonla-agent-avatar";

/** Old hashes and `/docs/…` paths → current docs URLs. */
export const LEGACY_ALIASES: Record<string, string> = {
  "chat/avatar": "/shape-avatar",
  "chat-avatar": "/shape-avatar",
  avatar: "/shape-avatar",
  "shape-avatar": "/shape-avatar",
  "devnonla-avatar": "/devnonla-avatar",
  "chat/animal-avatar": "/animal-avatar",
  "animal-avatar": "/animal-avatar",
  "chat/agent-body": "/agent-body",
  "chat-agent-body": "/agent-body",
  "agent-body": "/agent-body",
};

export function resolveLegacyPath(raw: string): string | null {
  const key = raw.replace(/^#\/?/, "").replace(/^\//, "").replace(/\/+$/, "");
  if (!key || key === "docs") return "/introduction";
  if (key.startsWith("docs/")) return `/${key.slice("docs/".length)}`;
  return LEGACY_ALIASES[key] ?? null;
}

function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

/** One-time rewrite of HashRouter bookmarks before BrowserRouter mounts. */
export function migrateLegacyLocation() {
  const { pathname, search, hash } = window.location;
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const appPathname = base && (pathname === base || pathname.startsWith(`${base}/`)) ? pathname.slice(base.length) || "/" : pathname;
  const hashPath = hash.replace(/^#\/?/, "").replace(/\/+$/, "");
  if (hashPath) {
    const next = resolveLegacyPath(hashPath);
    window.history.replaceState(null, "", `${withBase(next ?? "/introduction")}${search}`);
    return;
  }
  const stripped = appPathname.replace(/^\//, "").replace(/\/+$/, "");
  if (!stripped) return;
  if (stripped === "docs" || stripped.startsWith("docs/")) {
    const rest = stripped.replace(/^docs\/?/, "");
    window.history.replaceState(null, "", `${withBase(rest ? `/${rest}` : "/introduction")}${search}`);
    return;
  }
  const next = resolveLegacyPath(stripped);
  if (next) window.history.replaceState(null, "", `${withBase(next)}${search}`);
}
