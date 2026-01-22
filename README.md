# Trusted Hand - Frontend Challenge

Transform this functional-but-ugly citation verification interface into a world-class experience.

## The Product

Trusted Hand verifies citations in legal briefs. Lawyers upload a document, and the system checks whether cited cases exist, quotes are accurate, and authorities are still good law.

This starter shows the **annotated document view**—where users scroll through their brief, see flags on problematic citations, and click to understand what's wrong.

## Your Task

The app works. It's just... rough.

- The brief content is **markdown**, but it's rendered as plain text
- No visual design (system fonts, no spacing, no color system)
- No interactions (no hover states, no transitions, no animations)
- Poor layout (edge-to-edge content, always-visible sidebar)
- No polish (no loading states, no empty states, no keyboard navigation)

**Make it feel like a product lawyers would trust and enjoy using.**

## Getting Started

```bash
yarn install
yarn dev
```

Open [http://localhost:5173](http://localhost:5173) to see the current state.

## Tech Stack

**Provided:**
- Vite + React 18 + TypeScript
- Tailwind CSS

**Allowed:**
- Markdown rendering libraries (react-markdown, marked, etc.)
- Animation libraries (Framer Motion, React Spring, etc.)
- Icon libraries (Lucide, Heroicons, etc.)
- Utility libraries (clsx, date-fns, etc.)

**Not Allowed:**
- UI component libraries (shadcn/ui, Material UI, Chakra, Radix, Ant Design)
- CSS frameworks with pre-built components (Bootstrap, Bulma)

We want to see *your* design sensibilities, not a library's defaults.

## What Was Implemented

### Visual Design ✅
- **Typography**: Georgia serif for long-form legal document reading with clear heading hierarchy (H1-H6)
- **Color System**: Semantic palette (green/yellow/red) for citation severity with Tailwind custom tokens
- **Spacing**: Consistent 8px base unit rhythm throughout the interface
- **Layout**: Professional header with live statistics, responsive grid system

### Micro-interactions & Animations ✅
- **Citations**: Hover lift effect with shadow increase (200ms transitions)
- **Detail Panel**: Smooth slide-in animation using Framer Motion with spring physics
- **Tooltips**: Fade-in/fade-out with position awareness
- **Loading States**: Skeleton animation with pulse effect
- **Keyboard Navigation**: Escape closes panel, Enter/Space activates citations, Tab navigation

### Architecture ✅
- **Design System**: Reusable components (Badge, Card, Tooltip, StatusIcon, ErrorState, ContentSkeleton)
- **Separation of Concerns**: `pages/` for state, `components/` for presentation, `designSystem/` for primitives
- **Path Aliases**: Clean imports with `@components`, `@designSystem`, `@utils`
- **TypeScript**: Full type safety across the application

### Extra Features ✅
- **Citation Jump Links**: Click header statistics to scroll to first citation of that severity
- **Responsive Tooltips**: Max-width constraints prevent mobile overflow
- **Empty States**: Clear instructions in DetailPanel when no citation selected
- **Focus States**: Custom focus-visible rings for accessibility
- **Performance**: CSS transforms for GPU-accelerated animations (60fps)

## Sample Data

The application includes a fictional motion to dismiss with 6 citations displaying different verification statuses:

| Citation | Status | Severity |
|----------|--------|----------|
| Bell Atlantic Corp. v. Twombly | Valid | None |
| Ashcroft v. Iqbal | Quote Mismatch | Warning |
| Henderson v. United States Dep't of Justice | Not Found | Critical |
| Dura Pharmaceuticals, Inc. v. Broudo | Valid | None |
| Basic Inc. v. Levinson | Overruled | Warning |
| Tellabs, Inc. v. Makor Issues & Rights | Valid | None |

## Implementation Approach

### 2. Design Rationale (500 words max)

**Typography & Visual Hierarchy**

Georgia serif provides legibility for long-form reading—standard in legal/academic contexts where documents often exceed 50 pages. Heading hierarchy uses size progression (32px → 24px → 20px → 18px) with weight variation (700 → 600 → 600 → 500) to establish a clear information architecture without relying solely on color.

**Color System**

Green/yellow/red severity palette uses universal color associations: safe, caution, danger. The design system implements Tailwind custom tokens. Spacing follows an 8px base unit with key stops at 12px, 16px, 24px, and 32px for rhythm consistency. Typography classes (`.h1`-`.h6`, `.body1`-`.body3`) ensure text rendering stays uniform across components.

**Architecture**

Codebase structured in layers to separate concerns: `pages/` manages application state and orchestration, `components/` handles presentation logic, `designSystem/` provides reusable primitives (Badge, Card, Tooltip, StatusIcon, ErrorState, ContentSkeleton), `constants/` centralizes configuration, and `utils/` contains shared helpers. Barrel exports (`index.ts`) and path aliases (`@components`, `@designSystem`) keep imports clean and prevent relative path complexity. This architecture allows extending functionality—adding new citation types or verification rules—without modifying UI components. The separation means a backend integration would primarily touch the data layer.

**Interactions & Animations**

Micro-interactions provide feedback at every touch point. Citations lift 2px on hover with shadow increase (200ms duration—the perceptual threshold for "instant" response). Tooltips fade in with opacity transitions. Technical implementation prioritizes performance: CSS transforms (`translateY`, `translateX`) trigger GPU compositing instead of layout recalculation. Framer Motion handles the drawer with `AnimatePresence` for proper mount/unmount animations and cleanup.

**Features Added**

- **Citation Jump Links**: Clicking the header statistics scrolls to the first citation of that severity with a 2-second colored highlight ring. Low implementation complexity, high navigation value.
- **Keyboard Navigation**: Escape closes the detail panel, Enter/Space activates citations, Tab navigates focusable elements. Essential for accessibility compliance and power users.
- **Responsive Tooltips**: Max-width constraints on mobile prevent viewport overflow while desktop shows full content without wrapping.
- **Error Handling**: Demo component demonstrates error boundary.

**Trade-offs**

Prioritized interaction and design polish over feature breadth. Filtering and search functionality would benefit scenarios with 20+ citations, but added complexity without proportional value for this 6-citation demo. Avoided premature optimization: no `useMemo`/`useCallback` because the component tree is shallow and render cost is negligible. Profiling showed no performance bottlenecks, so optimization would reduce code clarity without measurable gains.

**Edge Cases**

Loading state renders a skeleton with pulse animation matching the actual content structure. The empty state in the DetailPanel provides clear instructions. Independent scroll areas (brief content vs. detail panel) handle long documents without layout conflicts.

**Future Enhancements**

With additional time: filter/sort UI for citation status, review history tracking to show which citations have been examined, and PDF export for verification reports.

### 3. Loom Video (3-5 minutes)
Walk us through the experience as a user would encounter it. Highlight 1-2 technical decisions you're proud of. Show us something we might miss just clicking around.

Sent on email.

## Time Budget

**4-6 hours.** Stop there. We mean it.

If you're past 6 hours, stop. A beautiful, polished subset beats a complete but rough implementation. Scope down if needed—we'd rather see taste than sprawl.

## Project Structure

```
src/
├── components/
│   ├── BriefViewer.tsx    # Renders brief with citation highlights
│   └── DetailPanel.tsx    # Shows verification details for selected citation
├── data/
│   └── sampleBrief.ts     # Sample brief and verification results
├── types/
│   └── index.ts           # TypeScript interfaces
├── App.tsx                # Main app component
└── main.tsx               # Entry point
```

## Questions?

Reply to the challenge email—we're happy to clarify anything.

Good luck. We're excited to see what you build.
# lh-ai-fe-ch
