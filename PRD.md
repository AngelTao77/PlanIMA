# PlanIMA — Codex Build Specification (PRD v3.0)

**Status:** Implementation-ready MVP specification  
**Product:** PlanIMA — AI Academic Journey Planner  
**Primary users:** NYU Interactive Media Arts (IMA) undergraduates  
**Secondary users:** Academic advisors (prototype role)  
**Platform:** Desktop-first responsive web app  
**Visual direction:** Continuous low-poly landscape + modular semester tiles  
**Source of truth:** Structured academic data, never the 3D scene or LLM output  
**Important:** This document is a product specification, not a verified statement of current NYU degree rules. All real academic rules must be checked against the student's applicable official NYU bulletin and department sources before being labeled verified.

---

## 0. Instructions for Codex

Build a working application, not a static mockup. Use this document as the implementation contract. Prioritize correctness and usable flows over decorative polish. The primary experience must be a coherent interactive academic landscape, but every academic action must also work in a structured schedule view.

**Operating rules:**
1. Inspect the existing repository first. Preserve existing functional code and adapt the stack if already established. If starting from scratch, use the stack below.
2. Work in vertical slices; run tests and verify the app after each phase. Never claim a feature is complete when it is only mocked.
3. Use seeded fictional academic profiles and clearly labeled illustrative course/rule data until official sources have been verified.
4. Do not invent official NYU courses, credits, prerequisites, graduation policies, course availability, transfer-credit decisions, or source URLs. Unverified items must be labeled **Demo / Unverified**.
5. Do not integrate Albert, official NYU SSO, private student records, registration, or transfer-credit approval.
6. Do not send personal student data to an AI provider without a deliberate opt-in and appropriate privacy handling. Seeded fictional profiles are the default.
7. Every AI-proposed plan mutation is previewed and validated; it is committed only after the student clicks **Apply changes**.
8. If an external API key is absent, the application must remain usable in **Demo Mode**, with honest labels and a deterministic non-LLM fallback. Do not fabricate retrieved sources.
9. No hardcoded academic facts should be mixed into 3D scene components. Keep data, academic logic, and visualization separate.
10. Keep a README, `.env.example`, seed instructions, and a running implementation checklist.

## 1. Product thesis

**One sentence:** PlanIMA turns a student's remaining IMA degree into an explorable, editable academic journey map, supported by official-source-aware AI chat and optional advisor review.

**Primary job:** A current IMA student enters what they have taken, sees what remains, creates a semester-by-semester path, asks questions, and revises the plan without losing sight of prerequisites, credit constraints, and uncertainty.

**Design hypothesis:** A spatial map can make the overall degree journey more understandable and engaging than a conventional spreadsheet, as long as precise course information remains immediately accessible.

**Non-goals:** Official degree audit; university approval; automatic course registration; live seat inventory; automatic transcript ingestion; guarantee of graduation.

## 2. Target scenarios

**S1 — Mid-degree entry (primary demo):** A third-year IMA student has completed multiple semesters, enters prior coursework, sets a target graduation term, and receives a plan for remaining terms only. The full journey can show completed periods as context; planning never requires four years of future semesters.

**S2 — Early graduation:** Student changes graduation target to an earlier term. System recalculates a candidate schedule, identifies missing requirements or infeasibility, and optionally considers Summer/J-Term if enabled and supported by verified data.

**S3 — Course research:** Student opens a floating AI chat, asks about a selected course or requirement, sees a source-grounded answer with an official NYU link when available, and can propose adding or moving a course.

**S4 — Advisor review:** Student opens a shared review workspace, advisor comments on a semester, AI proposes an adjustment, and the student explicitly accepts or rejects it. In MVP this can be a clearly labeled local simulated advisor role.

## 3. MVP scope and priorities

### P0 — Must actually work
- Demo profile selection and manual profile editing.
- Academic progress: completed courses, counted credits, requirements remaining, pending/unverified entries.
- Structured semester plan with courses, credits, statuses, warnings, and target graduation term.
- Deterministic rules checks and plan generation for a small *configured* illustrative dataset.
- Interactive low-poly continuous map with year regions and modular semester tiles; camera pan/zoom, select semester/course, zoom-to-selection.
- Map and schedule views driven by the same plan state.
- Floating AI chat interface with demo fallback; optional real LLM if configured.
- Official NYU source retrieval from an allowlisted, curated source collection; citations when sources exist; honest unavailable response when they do not.
- Chat-to-plan proposal → diff preview → validation → explicit Apply/Reject.
- Local persistence, undo/revert via saved plan versions.
- Responsive desktop layout, keyboard navigation for essential actions, reduced-motion support, and graceful 3D fallback.

### P1 — Build after P0 is stable
- Basic advisor review: shareable local/demo workspace, role switch, comments on semesters/courses, proposal review.
- Side-by-side plan comparison.
- Selected Summer/J-Term scenarios and tentative transfer-credit tracking.
- More polished environmental animations, onboarding guidance, richer asset variations.

### P2 — Future only
- Real NYU authentication, verified advisor identities, live multi-user sync, Albert/transcript integration, automated live catalog ingestion, real-time course offerings, course registration, historical peer schedules, other majors.

## 4. Recommended technical stack

**Default when starting from scratch:**
- Next.js (App Router), TypeScript, React.
- Tailwind CSS and a small accessible UI component system (e.g., shadcn/ui or equivalent).
- Three.js + React Three Fiber + Drei for 3D world, with reusable low-poly geometry.
- Zustand for UI/plan editing state; TanStack Query or equivalent for server data.
- Zod for validating data structures, tool inputs, and API responses.
- Prisma + SQLite for local MVP development, with a migration path to Postgres if needed.
- Vitest for rules and planner unit tests; Playwright for end-to-end flows.
- Optional AI provider adapter (OpenAI-compatible API or selected provider), with a deterministic demo adapter.

**Architecture:** UI and 3D renderer consume the same normalized domain state. Server-side academic rules/planner validate all plan proposals. AI may interpret intent but cannot bypass validators. Source retrieval is separate from model generation.

**Do not overengineer:** No microservices, background workers, vector database, or authentication platform is required for the first working slice. A curated JSON/SQLite source index with full-text matching is sufficient initially.

## 5. Visual and interaction direction

### 5.1 Art direction
Reference mood: calm miniature low-poly garden/valley, angled isometric-like view, soft sage/olive terrain, muted blue distance hills, warm beige stone paths, little trees, greenhouses, studios, bridges, subtle atmospheric motion. Avoid copying the reference website's distinctive layout or assets. Create original reusable geometry/assets.

**Palette (starting tokens, adjustable):**
- `terrain.base`: `#91A18B`
- `terrain.dark`: `#72856F`
- `terrain.light`: `#B3BEA7`
- `path`: `#D8CCB5`
- `water`: `#8CAFB0`
- `building.wood`: `#A98765`
- `building.glass`: `#C5D6D0`
- `ui.paper`: `#F7F5EF`
- `ui.ink`: `#25302A`
- `ui.accent`: `#456D58`
- `warning`: `#B6793F`
- `error`: `#B45C57`

Use high-contrast labels/panels; palette is not the sole carrier of status.

### 5.2 Spatial model
- The **entire degree journey** is one continuous valley with a winding main path from entry to graduation.
- Each **academic year** is a recognizable large landscape region with a subtle region label.
- Each **semester** is a modular tile/clearing embedded in the region; its shape and spacing follow a deterministic layout algorithm, not hand-placed positions tied to a single demo student.
- Each **course** is a selectable miniature building or landmark within its semester tile. Use a limited library of 3–5 object types based on academic category (IMA major, core, elective, other), not a unique 3D model for every course.
- The **graduation milestone** is a destination landmark at the end of the currently planned timeline.
- Optional **Summer/J-Term** tiles appear only when the student includes them or when a plan proposes them.
- Show past/completed semesters as settled/developed; future planned semesters as lighter/under construction; unplanned requirements as visible open objectives in the interface, not randomly scattered course buildings.
- A junior starting today still sees a complete-to-date journey and only generates future semesters as needed.

### 5.3 Map states
`completed`, `in_progress`, `planned`, `proposed`, `unplanned`, `needs_confirmation`, `conflict`.

Every state has a readable text label, a consistent icon/shape treatment, and a corresponding status in the schedule view. **Never represent a plan as academically approved solely by visual completion.**

### 5.4 Map interaction contract
- Initial camera: framed full academic journey with current semester highlighted.
- Pan: mouse drag / touch drag; zoom: wheel/pinch or controls; keyboard: arrow keys and +/- when map focused.
- Click year: smoothly frame that region; click semester: open right detail drawer and focus camera; click course: open course details and source information.
- Breadcrumbs: `Journey / Year 3 / Fall / Course` and `Back to overview`.
- On plan revision preview: highlight affected tiles and course objects; show a textual change list. Do **not** animate or commit changes to persisted active plan until confirmation.
- Reduced motion: disable decorative movement and use instant camera transitions.
- WebGL unavailable: show a fully functional 2D illustrated semester map or schedule view with an explanatory notice.
- Camera controls must not interfere with clicking chat, drawers, or forms.

### 5.5 Screen composition (desktop)
- **Top left:** PlanIMA logo, student name/demo badge, graduation goal.
- **Top center:** `Journey Map | Schedule` view toggle and year/semester quick navigation.
- **Top right:** Profile, Settings, advisor review (when enabled).
- **Main:** 3D world fills available space; minimal overlays.
- **Left floating compact panel:** progress summary (credits, remaining requirements, unresolved warnings).
- **Right slide-out drawer:** selected semester/course details; never covers the entire map on desktop.
- **Bottom right:** persistent `Ask PlanIMA` chat launcher. Chat opens a resizable panel with source chips and plan-action cards; map remains visible.
- **Mobile/tablet:** default to schedule view and simplified 2D map; chat becomes a bottom sheet. Full 3D not required on small screens.

### 5.6 Visual acceptance
- World is visibly continuous, not six disconnected dashboard cards.
- Semester tiles repeat in a recognizable modular system.
- At least one selectable course building per populated demo semester.
- Labels remain readable at useful zoom levels; distant labels can collapse into summary badges.
- No text overlaps, camera clipping, unreadable controls, or inaccessible information.
- Initial load and camera movement should feel responsive on a typical laptop; optimize meshes and cap pixel ratio as needed.

## 6. User journeys and detailed flows

### 6.1 Onboarding → first plan
1. User selects a fictional demo student or creates a local profile.
2. Enters academic program, applicable bulletin year (required for verified checks), completed courses, credits, transfer credits and intended graduation term.
3. Reviews progress audit; unknown courses are flagged rather than silently counted.
4. Selects preferences: desired workload, include Summer/J-Term, course priorities.
5. Clicks **Generate my journey**.
6. Planner returns candidate semester allocations plus unresolved constraints.
7. User sees map, structured plan, and warnings; saves the plan.

### 6.2 Explore course
1. User selects a course building or row.
2. Course drawer shows code/title, credits, category, prerequisites, source/status, term placement.
3. User clicks **Ask AI about this course**.
4. Chat opens with course context (never invents details not in data).
5. Answer includes source links where grounded; otherwise explicit uncertainty.

### 6.3 Chat → proposed plan change
1. User asks: “Can I move this course to next Spring?”
2. AI returns a structured intent with course ID and target term (or asks for clarification).
3. Server checks course existence, plan ownership, prerequisite order, credit bounds and term support.
4. UI displays **Proposed changes** with before/after diff and warning badges.
5. User clicks **Apply changes** or **Discard**.
6. On apply, new plan version is saved; map and schedule update together; undo remains available.
7. If infeasible, show concrete reasons and optionally an alternative proposal. Never silently drop requirements.

### 6.4 Search official source
1. User asks a course/policy question.
2. Server searches only configured, allowlisted official NYU sources.
3. Relevant excerpts are returned with title, URL, source type, retrieval timestamp and applicable year where known.
4. AI summarizes *only supported content*, distinguishing quote/source from interpretation.
5. If evidence is missing or conflicting, show **Could not verify from configured official sources** and suggest contacting the relevant NYU advisor/office.
6. Search alone does not mutate the plan.

### 6.5 Advisor review (P1)
1. Student enables sharing of a selected plan in demo mode.
2. Advisor role can inspect plan, add comments anchored to a semester/course, and request a proposal.
3. Advisor edits are suggestions; student receives a review state and must approve plan mutations.
4. Advisor cannot impersonate institutional approval.

## 7. Data model (minimum entities)

Use stable UUIDs; validate with Zod; add `createdAt`, `updatedAt` where appropriate.

### StudentProfile
`id`, `displayName`, `programId`, `bulletinYear`, `currentAcademicTermId`, `targetGraduationTermId`, `maxPreferredCreditsPerTerm`, `allowSummer`, `allowJTerm`, `consentToAI`, `isDemo`.

### AcademicTerm
`id`, `academicYearLabel`, `season` (`fall|jterm|spring|summer`), `startDate?`, `endDate?`, `sortIndex`, `isOptional`.

### Course
`id`, `code`, `title`, `credits`, `category`, `description?`, `prerequisiteRule?`, `sourceId?`, `verificationStatus`, `applicableBulletinYears?`, `offeredTermIds?` (unknown ≠ not offered).

### Requirement
`id`, `programId`, `bulletinYear`, `name`, `type` (`required_course|course_group|credit_minimum|elective_group|other`), `ruleJson`, `sourceId?`, `verificationStatus`.

### CourseRecord
`id`, `studentId`, `courseId?`, `externalCourseLabel?`, `termId?`, `status` (`completed|in_progress|transfer_pending|transfer_approved`), `credits`, `grade?`, `countsTowardRequirementIds[]`, `verificationStatus`.

### AcademicPlan
`id`, `studentId`, `name`, `targetGraduationTermId`, `activeVersionId`, `status` (`draft|active|archived`).

### PlanVersion
`id`, `planId`, `versionNumber`, `createdBy` (`student|advisor|ai_proposal`), `reason`, `createdAt`, `validationSummary`, `isActive`.

### PlanCourseAssignment
`id`, `planVersionId`, `courseId`, `termId`, `status` (`planned|proposed`), `notes?`.

### OfficialSource
`id`, `title`, `url`, `domain`, `contentExcerpt`, `retrievedAt`, `publishedAt?`, `applicableBulletinYear?`, `sourceType`, `verificationStatus`.

### ChatThread / ChatMessage
Thread: `id`, `studentId`, `planId?`, `scope` (`private|shared_demo`); Message: `id`, `threadId`, `role`, `text`, `sourceIds[]`, `createdAt`, `relatedProposalId?`.

### PlanChangeProposal
`id`, `planId`, `baseVersionId`, `requestedBy`, `intent`, `operations[]`, `validation`, `diff`, `status` (`pending|applied|rejected|expired`), `createdAt`.

### AdvisorComment (P1)
`id`, `planId`, `planVersionId`, `authorRole`, `targetType`, `targetId`, `text`, `createdAt`, `resolvedAt?`.

**Academic correctness:** Requirements and their matching logic must support course substitutions, group rules and exceptions as explicit configured cases. If the MVP rule engine does not support a rule type, mark it unresolved; do not pretend the degree audit is complete.

## 8. Rules engine and planning engine

### 8.1 Deterministic functions
Implement pure, testable functions:
- `calculateEarnedCredits(records)` — exclude pending transfer credits unless explicitly approved.
- `evaluateRequirements(profile, records, rules)` — return met, unmet, pending, unresolved, with evidence.
- `validateTermLoad(assignments, constraints)` — count credits, identify warnings/violations.
- `validatePrerequisites(assignments, records, courses)` — require completion in prior terms when the configured rule requires it.
- `validatePlan(plan, data)` — return `valid | valid_with_warnings | invalid | insufficient_data`, plus structured issues.
- `generateCandidatePlan(input)` — allocate known remaining courses across supported future terms, respecting hard constraints and preferences where possible.
- `proposePlanChange(baseVersion, operations)` — create a diff without persisting changes.
- `applyValidatedProposal(proposalId, expectedBaseVersionId)` — atomic save; reject stale proposals.

### 8.2 Constraint classes
**Hard:** configured degree requirement rules, known prerequisites, duplicate course prevention, chronological term order, approved credit accounting, configured hard credit limits.

**Soft:** preferred course workload, balanced credits, target graduation timing when not feasible, preferred semester, avoiding Summer/J-Term.

**Unknown:** future availability, unverified equivalencies, advisor exceptions, rules missing from dataset. These become explicit warnings, not assumptions of success.

### 8.3 Planner algorithm (MVP)
A transparent heuristic/backtracking planner is sufficient; do not require optimization infrastructure.
1. Derive unmet supported requirements.
2. Generate eligible candidate courses for each requirement from configured dataset.
3. Order by prerequisite dependencies and limited term eligibility.
4. Allocate to future terms under hard constraints.
5. Score candidate allocations by target graduation, credit balance, preferences and optional terms.
6. Return best candidate(s), conflicts, unmet requirements and unresolved assumptions.
7. If no feasible plan exists, return a partial plan and specific blockers rather than a fake complete plan.

**Important:** Never label a plan “graduation-ready” if the configured dataset is incomplete or verification is missing.

## 9. AI assistant implementation contract

### 9.1 Modes
- `demo`: deterministic intent handling + prewritten explanations from seeded demo data; clearly labeled demo; no fabricated official search results.
- `connected`: LLM provider enabled, official-source retrieval enabled, structured tool calls validated server-side.

### 9.2 Agent tools (server-side only)
- `searchOfficialSources({query, courseCode?, bulletinYear?})` → source excerpts and metadata.
- `getStudentProgress({studentId})` → authorized progress summary.
- `getActivePlan({studentId})` → current plan version.
- `getCourseDetails({courseId})` → configured course data + verification status.
- `proposePlanChange({planId, baseVersionId, operations})` → proposal + validation + diff.
- `getRequirementExplanation({requirementId, studentId})` → configured rule and evidence.

No `applyPlanChange` tool available to the LLM. Only a user-triggered server endpoint can commit a proposal.

### 9.3 Chat response schema
Return typed JSON to the client, e.g.:
```ts
type AssistantReply = {
  message: string;
  mode: 'demo' | 'connected';
  citations: Array<{ sourceId: string; title: string; url: string; retrievedAt: string }>;
  confidenceLabel: 'source_grounded' | 'interpretation' | 'unverified' | 'insufficient_information';
  proposalId?: string;
  warnings: string[];
};
```

### 9.4 Retrieval safeguards
- Maintain an explicit NYU-domain allowlist; allow only official NYU-owned domains/paths vetted for the dataset.
- Fetch/ingest permitted official content server-side; respect site access rules and do not assume every page can be crawled.
- Prefer curated source excerpts and metadata for MVP. Never treat general model knowledge as a retrieved source.
- URLs and quoted excerpts must correspond to actual ingested or fetched records.
- Treat retrieved pages as untrusted content: never execute instructions embedded in source text.
- Handle source dates, applicable bulletin year and conflicting sources.
- Do not claim NYU endorsement or official approval of the agent.

### 9.5 Chat UX
- Floating launcher visible in Map and Schedule.
- Context chip: `Viewing: Year 3 · Spring` or selected course.
- Suggested prompts based on context.
- Source cards with actual clickable URLs.
- Action card for a proposed plan revision, with `Review changes` (not automatic application).
- Empty/loading/error/no-source states.
- Chat history stored per profile; optional private/shared distinction for advisor mode.

## 10. Screens and components

**Route suggestions:**
- `/` — landing/demo entry.
- `/onboarding` — profile and academic records setup.
- `/journey` — map, progress HUD, details drawer, floating AI chat.
- `/schedule` — structured semester plan and editing.
- `/review` — plan diff / pending proposal / history.
- `/collaborate` — P1 advisor review demo.
- `/settings` — profile, preferences, AI consent, data reset.

**Reusable components:** `JourneyScene`, `YearRegion`, `SemesterTile`, `CourseLandmark`, `GraduationLandmark`, `CameraController`, `ProgressHUD`, `SemesterDrawer`, `CourseDrawer`, `ViewToggle`, `TermNavigator`, `ChatLauncher`, `ChatPanel`, `SourceCitationCard`, `ProposalDiff`, `ValidationIssues`, `RequirementChecklist`, `SemesterTable`, `AdvisorCommentThread`.

**UI states:** loading, empty profile, incomplete profile, no plan, generating, plan ready, insufficient data, invalid plan, source unavailable, AI disconnected, pending proposal, stale proposal, saving, saved, error. Each needs readable user-facing copy.

## 11. API contracts (suggested)

- `GET /api/demo-profiles` — available fictional profiles.
- `GET /api/profile/:id` / `PATCH /api/profile/:id` — read/update permitted profile.
- `GET /api/profile/:id/progress` — calculated requirement audit.
- `POST /api/plans/generate` — validated input → candidate plan and warnings.
- `GET /api/plans/:id` — active plan + versions.
- `POST /api/plans/:id/proposals` — operations → proposal, diff, validation.
- `POST /api/proposals/:id/apply` — user-confirmed atomic commit; version check.
- `POST /api/proposals/:id/reject` — reject.
- `POST /api/chat` — contextual response with citations and optional proposal.
- `GET /api/sources/search?q=` — allowlisted official-source search.
- `POST /api/demo/reset` — restore demo data.
- `GET/POST /api/plans/:id/comments` — P1 advisor review.

Validate all inputs with Zod; return structured errors (`code`, `message`, `details`). Keep API keys on server only. Never trust client-supplied `studentId` for authorization in a real multi-user deployment; demo mode must be clearly segregated.

## 12. Seed data and verification

Seed **two or three fictional students**:
1. Junior seeking a 3.5-year path.
2. First-year planning a conventional multi-year path.
3. Student with tentative transfer credits and an unresolved prerequisite.

Seed a small illustrative catalog and requirement set with explicit `verificationStatus: 'demo_unverified'`. This allows full interaction testing without inventing current NYU policy. Include 8–15 courses and enough prerequisites/requirements to exercise the planner. Use clearly fictional course identifiers (e.g. `DEMO-IMA-101`) until verified real records are added.

Create `data/sources/` with a schema and instructions for entering **real, verified** NYU pages: title, URL, excerpt, applicable year, retrieved date. Do not add made-up URLs. Provide a UI indicator: `Demo academic data — not an official NYU degree audit` until verification is complete.

## 13. Performance, accessibility, privacy

- Desktop-first; 3D runs at acceptable interactive frame rates on a typical laptop. Reuse geometries/materials, minimize draw calls, cap pixel ratio, avoid heavy textures.
- Lazy-load the 3D scene; show a useful skeleton or 2D fallback while loading.
- Support keyboard navigation to years, semesters, course details, plan revisions, and chat.
- Use semantic labels for all course objects via accessible DOM list/overlay; 3D canvas alone is insufficient.
- Respect `prefers-reduced-motion` and offer reduced graphics.
- Persist demo data locally or in local DB; include reset control. Do not use real private student records in demo.
- AI consent must be explicit before transmitting student profile data to external model APIs.
- No real sharing links or real advisor identity claims without authorization/security infrastructure.

## 14. Acceptance tests (definition of done)

**A. Mid-degree onboarding:** Given junior demo profile, after setup progress shows completed coursework, remaining requirements, and a future-only candidate plan; map shows past + remaining journey.

**B. Map/schedule sync:** Moving a course via approved proposal updates its term in both views; refreshing preserves the change.

**C. Prerequisite violation:** A proposed move before a required prerequisite returns an invalid proposal with an understandable explanation; active plan unchanged.

**D. Early graduation:** Earlier target either yields a validated alternative or clearly identifies infeasibility; never silently omits required courses.

**E. Optional terms:** Enabling Summer/J-Term exposes optional term tiles and planner eligibility only when configured data supports them; unknown offering stays flagged.

**F. Source search:** Searching a known ingested official source returns its real title/URL and retrieval timestamp; unknown question returns an honest no-source result, not a fabricated citation.

**G. Chat proposal:** Chat can produce a structured proposal; preview appears before Apply; Reject leaves current version intact.

**H. Versioning:** Applying a proposal creates a new plan version; stale base-version proposals cannot overwrite newer changes.

**I. WebGL fallback:** When 3D is unavailable, user can still view and edit schedule and use chat.

**J. Accessibility:** Main planning actions are keyboard-operable and readable with reduced motion.

**K. Advisor demo (P1):** Advisor comment appears attached to correct semester/course; student retains final Apply control.

**L. Honest demo:** Every fictional rule/source is labeled; no UI claims official NYU validation or live registration access.

## 15. Development sequence — deliver in vertical slices

### Phase 0 — Scaffold and design system
Initialize app, TypeScript, UI tokens, layout shell, database/seed scripts, `.env.example`, README, tests. Show functioning route navigation. **Exit:** app runs locally with seeded demo profiles.

### Phase 1 — Academic core (no 3D yet)
Implement data model, manual profile, progress audit, deterministic validation, basic planner, schedule view. **Exit:** junior demo can generate a plan and receive meaningful warnings.

### Phase 2 — Map experience
Build original low-poly continuous valley with modular semester tiles, course landmarks, camera controls, detail drawers, status legend, and schedule synchronization. **Exit:** selecting any course/semester works and data matches schedule.

### Phase 3 — Plan changes and versions
Implement proposal diff, validation, Apply/Reject, persistence, version history, map preview. **Exit:** moving a course is safe, testable and reversible.

### Phase 4 — AI chat and official-source search
Build floating chat UI, demo fallback, curated source search, optional LLM adapter, structured intent-to-proposal pipeline, citation cards. **Exit:** user can ask about a course, see honest sources/limitations, and request a plan change.

### Phase 5 — Advisor demo + polish (P1)
Add role-switch review, anchored comments, responsive and accessible improvements, subtle environment motion, final E2E tests. **Exit:** full demo story is smooth and documented.

**After every phase:** run lint/typecheck/tests, inspect actual UI, fix regressions, update README and checklist. Do not begin expensive visual polish before the academic core works.

## 16. Suggested repository layout

```text
src/
  app/
    (pages)/
    api/
  components/
    map/
    planner/
    chat/
    collaboration/
    ui/
  domain/
    academic/
      types.ts
      requirements.ts
      prerequisites.ts
      planner.ts
      validation.ts
      proposal.ts
    sources/
      search.ts
      allowlist.ts
    ai/
      provider.ts
      demo-provider.ts
      tools.ts
  state/
  lib/
  styles/
prisma/
  schema.prisma
  seed.ts
data/
  demo/
  sources/
tests/
  unit/
  e2e/
public/
  assets/
README.md
.env.example
```

## 17. Demo walkthrough to optimize for

1. Open PlanIMA: an original low-poly continuous valley representing a student's academic journey.
2. Select junior fictional profile; show completed regions and current academic position.
3. Click a future semester and inspect planned course buildings and credits.
4. Switch to Schedule; show exact same data.
5. Open floating chat; ask about a course. Show grounded source if one exists, or honest demo/unverified status.
6. Ask to move a course or graduate earlier; show diff + prerequisite/credit warnings.
7. Apply a valid proposal; map animates changed course placement and schedule updates.
8. Open advisor review (P1), add a comment, and demonstrate a student-controlled revision.

## 18. Explicit design tradeoffs

- **Visual metaphor:** Continuous landscape for orientation; modular tiles for programmatic changes. Do not implement a completely procedural infinite world.
- **Academic correctness:** Structured engine before AI prose.
- **Course availability:** Unknown by default unless a specific term offering is sourced; do not infer future availability from historic patterns.
- **Map density:** Aggregate at far zoom, reveal individual courses on closer zoom; never render every label at once.
- **MVP collaboration:** Local/simulated roles instead of unsecured real sharing.
- **Demo vs production:** A polished fictional demonstration is acceptable, but must not masquerade as verified NYU advising.

## 19. Codex kickoff prompt

> Read `PlanIMA_Codex_Build_PRD_v3.md` completely and treat it as the product contract. Inspect the repository before changing files. First provide a concise implementation plan and identify any conflicting existing architecture. Then implement Phase 0 and Phase 1 as a working vertical slice: typed academic data, fictional seeded junior profile, deterministic requirement/credit/prerequisite checks, a functional schedule view, and a candidate-plan generator. Add unit tests and a README with run instructions. Do not implement the 3D scene yet. Keep academic demo data visibly labeled unverified and do not invent official NYU rules or links. Run typecheck, lint, and tests, fix failures, and report exactly what works and what remains. After that, proceed through the PRD phases in order, keeping the app runnable after each phase.

---

**End of specification.**
