# Verification report

Build session: November 5–6, 2026, America/New_York. Test data is fictional.

## Repeatable checks

- `npm test`: **8 / 8 pass**. Pending-transfer exclusion; same-term prerequisite rejection; preview immutability and stale-version protection; infeasible earlier goal reporting; full junior prerequisite-chain planning; duplicate/hard-load rejection; optional-term eligibility; known and unknown source retrieval.
- `npm run typecheck`: **pass**.
- `npm run lint`: **pass**, no lint errors or warnings.
- `npm run build`: **pass**, optimized Next.js production build.
- `node scripts/test-api.mjs`: **13 / 13 pass** against the local production server. Uses a separate random demo cookie, not the interactive user's workspace. Covers initial seed, invalid Apply, Discard, successful Apply and persisted reload, stale Apply, restore preview, generation, chat proposal, known/unknown citations, advisor anchoring, profile isolation, invalid profile target, source no-result response, and cross-origin rejection (some checks grouped in one scenario).

## Browser checks actually performed

At **1440×1000**:
- Loaded the actual Three.js continuous valley; clicked a future semester and a course in its drawer.
- Moved Spatial Experiences from Spring 2027 to Fall 2027: saw a diff and preferred-load warning before applying; map changed to 8/16 credits; schedule showed the course in Fall 2027 and version 2.
- Moved Capstone: Exhibition before Capstone: Development: saw the concrete prerequisite explanation and a disabled Apply button; discarded it.
- Opened course-context chat; received an honest fictional-course explanation; typed a move request and received a proposal with the active plan unchanged.
- Switched to simulated advisor, selected Spring 2027, saved a comment and verified the semester anchor.
- Generated a complete junior candidate by prioritizing the capstone prerequisite chain, reviewed four changes, applied version 3 and verified 12 credits in each remaining term.
- Reloaded after switching from development to the production server; the generated plan and comments persisted.
- Tested keyboard ArrowRight pan by comparing projected label positions.
- Selected 2D mode and confirmed semantic semester buttons remain available.
- Inspected the two official source cards, timestamps and bulletin-year mismatch disclosure.

At **390×844**:
- Reloaded to verify schedule-first startup and an unobstructed single-column schedule.
- Checked navigation, action buttons and fixed chat launcher in the mobile screenshot.

## Fixes found through browser QA

- Replaced Drei Html label roots with a normal accessible DOM projection layer after development-time React root-unmount warnings.
- Compared request Origin host to the incoming Host header to handle the local Next.js hostname correctly; same-origin browser edits now work and foreign-origin writes are rejected.
- Stabilized modal close handlers so typing does not reset focus.
- Updated selected course context after Apply.
- Added explicit camera reset revision so Overview restores position even when zoom/selection did not change.

## Verification limits

This is not an institutional academic audit. No real NYU API, LLM, SSO or advisor identity was tested or connected. Source search uses two curated records. Browser checks used Codex's browser interface, not a bundled Playwright suite. Automatic hardware WebGL-loss recovery and a full assistive-technology audit were not exhaustively simulated; the manual 2D fallback, semantic planning controls and reduced-motion implementation are present. Multi-process database concurrency is out of scope for the atomic single-process local store.

## Uploaded requirement update

- 12 unit tests pass, including four new degree-framework cases: category totals and uncertainty, zero-credit completion, exact-code matching, status separation, pending transfers and no double counting.
- 16 isolated API scenarios pass, adding mapping persistence, invalid mapping/substitution rejection and remapping/unassignment.
- Typecheck, lint and production build pass.
- Browser inspection confirms all six groups, original screenshot links, 128-credit provisional target, all six Distribution areas, writing conditions and Free Electives 20-credit total.

## Account and heading simplification

Typecheck, ESLint and production build passed. Browser checks confirmed Overview, Schedule, Requirements, History, Advising, Sources and Account titles; the Account modal displays only the active student, retains preferences, and no longer displays academic records, transfer entry, privacy paragraph or reset control. Account layout inspected at the normal browser viewport. No saved data was deleted.
