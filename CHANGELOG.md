# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2026-10-16

### Added

- `DevNonlaAvatar` draws the Nonla mark. `color` sets the hat; the brim and face are mixed from it.
- `AgentShapeAvatar` and `AGENT_SHAPE_PARTS` for the twelve geometric faces.

### Changed

- Avatar components import their motion CSS. A separate `import "devnonla-agent-avatar/styles.css"` is optional. The styles entry is still exported.
- `AgentBody` lists `nonla` on `AGENT_BODY_PARTS.shape`. The default head is still that mark.

### Upgrade notes

- Use `DevNonlaAvatar` for the hat. `AgentAvatar` no longer accepts `shape: "nonla"`.
- `AgentAvatar` and `AGENT_AVATAR_PARTS` remain as aliases of `AgentShapeAvatar` and `AGENT_SHAPE_PARTS`.
- `AgentBody` still accepts `config.shape: "nonla"`.

## [0.1.0] - 2026-10-16

### Added

- `AgentAvatar`, `AgentAnimalAvatar`, `AgentBody`, and `AvatarMouth`, extracted from `devnonla-ui`.
- Styles entry `devnonla-agent-avatar/styles.css`.
- Docs site, published to GitHub Pages.

[0.2.0]: https://github.com/devnonla/devnonla-agent-avatar/compare/v0.1.0...v0.2.0
