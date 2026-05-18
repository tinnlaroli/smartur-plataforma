# Agent skills — PLATAFORMA

Agents working on UI must follow **two project documents** before applying individual skills:

| Priority | Document | Role |
| -------- | -------- | ---- |
| 1 | **[design.md](../design.md)** | SMARTUR design system: typography, colors, spacing, radius, shadows, motion tokens, components, a11y checklist. **Hard constraints** for this product. |
| 2 | **This file** (`.agents/AGENTS.md`) | Which skills to load and in what order for implementation. |

Individual skills in `.agents/skills/` **extend** these docs; they must not contradict `design.md` or override brand tokens with generic advice (e.g. avoiding Inter when `design.md` specifies it).

---

## Skill priority (UI & animation)

When multiple skills apply, use this order **after** reading `design.md`:

1. **emil-design-eng** — Whether to animate, duration, easing, purpose, review format. Applies Emil’s philosophy **within** SMARTUR motion tokens (`design.md` § Motion). **Wins** over other skills on motion decisions.
2. **gsap-react** / **gsap-core** / **gsap-timeline** / **gsap-scrolltrigger** / **gsap-performance** — GSAP implementation when Emil + `design.md` allow JS animation. **Only JS animation library** (not Framer Motion / Motion).
3. **tailwind-css-patterns** — Utilities and layout aligned with `design.md` spacing/radius.
4. **frontend-design** — Optional inspiration for layout/visual direction only; **defer** typography, colors, and motion to `design.md` + **emil-design-eng**.
5. **accessibility** — WCAG audits; must align with `design.md` Accessibility Checklist.
6. **react-best-practices** — Performance only; ignore Next.js-specific rules (Vite + React Router).

### Animation decision flow

```
UI / animation task
        │
        ▼
   design.md          →  Brand tokens, durations, easing baseline, reduced motion
        │
        ▼
   emil-design-eng    →  Should it animate? Purpose? Emil timing/easing refinements
        │
        ├── Simple (hover, press, opacity) → CSS / Tailwind (design.md tokens)
        │
        └── JS (timeline, scroll, interruptible) → GSAP (+ gsap-react in React)
```

Do **not** suggest Framer Motion or Motion unless the user explicitly requests it.

### Skills must reference

- **emil-design-eng** → Read `design.md` first; never contradict SMARTUR palette or type scale.
- **gsap-*** → Read `design.md` + **emil-design-eng** before writing tweens.
- **frontend-design** → Subordinate to `design.md` for all product UI on PLATAFORMA.
