# PRD implementation checklist

## Phase 0 — Scaffold
- [x] Next.js / TypeScript application, responsive visual tokens and functional screen navigation.
- [x] Single active account in the UI; existing fictional seed profiles retained internally.
- [x] README, .env.example, test commands and original PRD.
- [x] Production build, typecheck and lint pass.
- [~] Atomic local JSON persistence instead of Prisma/SQLite; React state instead of Zustand. Deliberate local prototype simplification.

## Phase 1 — Academic core
- [x] 15 fictional course definitions separated from visualization.
- [x] Completed/in-progress/pending records retained; account preference editing supported.
- [x] Pending transfer exclusion, duplicate/prerequisite/load checks and requirement evidence.
- [x] Future/current-only candidate allocations, missing-course reporting, graduation preference and optional term eligibility.
- [x] Structured schedule and validated editing.
- [ ] Arbitrary course-group substitutions, approved equivalencies and complex exceptions; not claimed supported.

## Phase 2 — Journey
- [x] Original continuous low-poly landscape with modular semester clearings and category-specific buildings.
- [x] Click semesters/courses; pan/zoom, keyboard pan/zoom, selection focus and overview reset.
- [x] Year navigation, current semester, completed/planned labels and data-driven graduation marker.
- [x] Shared plan state for map and schedule; selectable 2D fallback and WebGL failure fallback.
- [x] Mobile schedule-first, reduced-motion styling and accessible alternative controls.
- [ ] Smooth animated transitions, rich environmental motion and far-zoom label aggregation are deferred.

## Phase 3 — Safe changes
- [x] Server validation, diff preview, explicit Apply/Discard.
- [x] New versions on apply, stale proposal rejection and restore-as-proposal.
- [x] Browser-refresh and server-restart persistence.

## Phase 4 — Assistant and sources
- [x] Contextual floating chat, persisted per profile, deterministic demo intent adapter.
- [x] Chat proposes but cannot apply; invalid proposals display specific conflicts.
- [x] Curated real NYU program and course references with source metadata and honest missing-evidence response.
- [x] Source allowlist and Zod schema.
- [ ] Real LLM provider, live source crawling and comprehensive verified academic dataset are not connected.

## Phase 5 — Advisor and polish
- [x] Local simulated roles and comments anchored to a course/semester; resolve/reopen.
- [x] Student-controlled plan approval in the UI.
- [x] Desktop/mobile browser QA, domain tests and isolated API integration tests.
- [ ] Real identity, sharing, permissions and live collaboration are intentionally excluded.
- [ ] Full multi-plan side-by-side comparison remains deferred; proposal diff is implemented.

Legend: [x] implemented; [~] documented alternative; [ ] not implemented.

## Uploaded requirement update
- [x] Six source-backed category groups and subrequirements, including zero-credit Cohort.
- [x] Explicit 128-credit provisional target with Arts and Sciences elective assumption and writing applicability disclosure.
- [x] Persistent one-course/one-category local mappings, status-aware progress and missing-coverage validation.
