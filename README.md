# PlanIMA — interactive academic journey prototype

A working Next.js / TypeScript prototype based on `PlanIMA_Codex_Build_PRD_v3.md`. The interface is English, matching the PRD and its NYU audience. This is a local demonstration, not an official NYU degree audit or registration system.

## Uploaded four-year requirements (November 5 update)

The six supplied screenshots are now modeled in `src/domain/degree.ts` and shown in Requirements, with original-image links. Categories are Major Requirements 12, Major Distribution 24 (six distinct 4-credit areas), IMA Electives 24, Core 16, Arts and Sciences 32 provisional, and Free Electives 20.

The **128-credit target is provisional**: 112 credits are specified in the screenshots; four Arts and Sciences elective rows have no credit amounts, so 16 additional credits is an explicitly labeled assumption. Both writing applicability notes are preserved; no transfer exemption is inferred. The zero-credit Cohort remains an independent completion requirement. Free Electives retains 20 credits across six source rows, not six assumed 4-credit courses.

Existing profiles and plan versions are preserved. Course details now have a requirement-category selector, saved per profile. Each course can count in only one bucket; pending transfer credit is excluded; exact-code major requirements cannot be satisfied by fictional substitutions. Category progress distinguishes completed, in progress, planned and uncovered credits. The generator still schedules the small demo catalog and now warns about uncovered uploaded degree requirements instead of suggesting the demo catalog completes the degree.

## Run

Requires Node.js 20.9+ (tested with Node 24).

```bash
npm ci
npm run dev
```

Open **http://127.0.0.1:3000**. No API keys, account or database setup is required. Dependencies are already installed in the supplied working directory. If a machine has an unwritable npm cache, use `npm ci --cache /tmp/planima-npm-cache`.

For an optimized build:

```bash
npm run build
npm start
```

## Try the main story

1. Start with **Alex Chen**, a fictional third-year student. The full four-year valley shows completed semesters, current coursework and future plans. The initial plan intentionally extends past the selected graduation goal.
2. Select a semester label or course building. The right drawer shows exact courses, credits, prerequisites and uncertainty. Use arrow keys on the focused map to pan, +/- to zoom, or the on-screen controls. The timeline frames a year; Overview restores the full journey.
3. Open **Schedule**. The same assignments appear as structured semester cards. Choose a planned course, pick a semester and click **Preview change**. Review the before/after diff; only **Apply changes** commits it.
4. Try moving **Capstone: Exhibition** to Spring 2027 before **Capstone: Development**. The proposal explains the prerequisite conflict and disables Apply.
5. Click **Generate my journey**. A deterministic dependency-prioritized planner generates the junior's remaining path within the configured goal. If you set an infeasible earlier goal, missing courses are listed explicitly. Partial candidates remain labeled incomplete.
6. Open **Ask PlanIMA**. With a course selected, ask “Move this course to Spring 2027”. The demo assistant creates a proposal, never directly applies it. “How is my progress?” and “Rebalance my remaining semesters” also work. Arbitrary questions return an honest limited-information answer.
7. Open **Official sources** in the left rail. Read two verified NYU reference excerpts, with URLs and dates. Ask about `IMNY-UT 101` for a sourced real-course response. These references do not validate fictional DEMO courses.
8. Open **Advisor space**, switch to **Advisor · simulated**, select a semester/course and leave a local comment. Switch back to Student to approve any plan changes. There are no external invitations or real advisor identities.
9. **Plan history** can preview restoring any prior version. Refreshing preserves profiles, assignments, versions, proposals, messages and comments.
10. **Account** shows only the currently active student and supports editing graduation preferences. Profile switching, academic-record entry and workspace reset controls are removed from the account UI. Previously saved profiles, records and plans remain intact; unknown external records remain pending and do not contribute earned credits.

## Implemented

- Original low-poly Three.js / React Three Fiber valley; deterministic semester layout, selectable course landmarks, terrain, paths, trees, water and graduation marker.
- Map / schedule synchronization; desktop course drawer; mobile defaults to schedule without an obstructing drawer.
- 15 fictional courses, three fictional profiles, prerequisite chains, term load checks, duplicate prevention, pending-transfer exclusion and requirement progress.
- Server-validated proposals with diffs, explicit Apply / Discard, stale-version rejection and saved history.
- Dependency-prioritized deterministic candidate planning, including optional-term eligibility for the configured demo elective.
- Floating resizable chat with deterministic fallback, contextual course information, citations and proposal cards.
- Curated official source collection (two records), Zod schema, explicit allowlist and unavailable-evidence responses.
- Simulated advisor/student roles, comments anchored to semesters/courses and resolution status.
- Local persistence per browser demo cookie; keyboard controls, dialog focus trap and reduced-motion styling.
- Selectable 2D fallback and automatic WebGL fallback. All academic actions remain available through the drawer/schedule.

## Deliberate prototype boundaries

- **Every planning course/rule is Demo / Unverified.** The 60-credit total belongs only to this illustrative 15-course catalog, not to NYU's degree requirements. In-progress prerequisites are conditional, not completed.
- Official references are manually curated snapshots from the 2026–2027 bulletin; a student's applicable year may differ. Future offerings, seats, transfer equivalencies and personal degree applicability are unverified. There is no automatic catalog ingestion.
- Chat is deterministic intent handling, **not a connected LLM**. No external AI requests or student data transmissions occur. Optional provider integration remains future work.
- No Albert, NYU SSO, real transcript ingestion, registration, verified advisor identity or multi-user sharing.
- To keep the prototype independently runnable, persistence uses atomic local JSON files rather than Prisma / SQLite. UI state uses React; the domain is separate from rendering. This is a **single local Node process**, not a production concurrent service. Do not expose it publicly as a student-record system.
- UI screens use in-app navigation at `/`; API operations use a typed action endpoint. Dedicated page routes, full side-by-side multi-plan comparison, arbitrary substitutions/group exceptions, production auth and richer animations remain unimplemented.
- The current planner is a small deterministic heuristic. It prioritizes long prerequisite chains but is not an exhaustive optimizer. Unsupported official degree rules remain unresolved.
- Typography optionally loads Google Fonts; local sans-serif/serif fallbacks keep the app usable without it.

## Data, seed and privacy

On first request, the server seeds all three demo profiles from `src/domain/data.ts`. An HTTP-only, SameSite-strict random demo cookie identifies a local workspace in `.data/`. `PLANIMA_DATA_DIR` can override that directory; see `.env.example`. No private student data should be entered.

Use **Profile → Reset this demo workspace** to restore seeds for this browser. Files are local to this checkout, persist over server restarts and are excluded from source archives. This is a demo session boundary, not production authentication. Do not run multiple processes against the same data directory.

## Tests

```bash
npm test                 # 12 domain/source/degree tests
npm run typecheck
npm run lint
npm run build
# In a second terminal, while the server is running:
node scripts/test-api.mjs # 16 isolated HTTP integration scenarios
```

Browser checks were performed through the Codex browser automation interface at desktop 1440×1000 and mobile 390×844. See `VERIFICATION.md` for the actual outcomes and limitations. No separate Playwright runner is bundled.

## Project structure

- `src/app/page.tsx`: application screens, drawers, chat and proposal UX.
- `src/app/globals.css`: responsive visual system and reduced-motion behavior.
- `src/components/JourneyScene.tsx`: data-driven 3D map and 2D fallback.
- `src/domain/data.ts`: fictional catalog, profiles and normalized types.
- `src/domain/academic.ts`: pure audit, validation, planner and proposal functions.
- `src/domain/sources.ts`: source schema, domain allowlist and retrieval.
- `src/app/api/action/route.ts`: validated local actions and atomic commits.
- `src/app/api/sources/route.ts`: curated source-search API.
- `data/sources/official.json`: verified reference snapshots.
- `tests/academic.test.ts`, `scripts/test-api.mjs`: repeatable tests.

The original PRD and implementation checklist are included alongside this README.
