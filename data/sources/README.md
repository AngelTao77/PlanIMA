# Curated NYU source index

`official.json` contains two manually checked records from NYU Bulletins, ingested during the November 5–6, 2026 build. The UI exposes the source title, real URL, concise excerpt, summary, retrieval timestamp, source type and bulletin year. `src/domain/sources.ts` supplies the Zod schema and domain allowlist.

To add a source:
1. Open the actual official NYU page and verify its ownership and applicable bulletin year.
2. Add a concise excerpt and a supported summary, recording the real ingestion time.
3. Keep source verification separate from student applicability, future availability and equivalency. None of these follows automatically from a catalog listing.
4. Add narrowly scoped search keywords and a retrieval test. Do not add URLs inferred from course names.
5. Run `npm test`, `npm run typecheck` and `npm run build`.

The current allowlist is exactly `bulletins.nyu.edu`. Do not expand it without reviewing the specific official site. The app searches the local curated index, not the live web, and does not execute source text. Policy, equivalency and seat-availability questions return no evidence. No official course record is automatically imported into the fictional planning catalog.
