# Dictionary backfill brief (M1)

Shared instructions for every dictionary research agent. Today is **2026-10-26**.

## Goal
Every term in `data/dictionary.ts` gains verified provenance, and the missing terms get written. You do **not** edit
`data/dictionary.ts`. You write one JSON patch file. The lead merges all the patches with a script and validates them.

## Read first
- `data/dictionary.ts`: the `DictionaryTerm` interface (top of the file) and the entries in your assigned categories.
- `app/lib/content/schema.ts`: the validation rules your output must pass.
- `docs/research/2026-10/*.md`: fact registers already verified this session. Reuse their URLs and facts; don't re-research them.
- `data/models.ts`: the model registry. Don't hardcode model versions in term text. Say "Anthropic's current models",
  not "Opus 5.5", unless the term is about a specific model.

## Output: `docs/research/2026-10/dict-<batch>.json`
```json
{
  "updates": {
    "<existing-id>": {
      "simple": "Plain-English explanation, 1-2 sentences, no jargon, at least 20 chars.",
      "sources": [{ "label": "Short human label", "url": "https://..." }],
      "lastVerified": "2026-10-26",
      "status": "current | emerging | deprecated",
      "supersededBy": "<id, only if deprecated>",
      "deprecationNote": "<only if deprecated>",
      "fix": { "definition": "...", "whyItMatters": "...", "example": "...", "analogy": "...", "reason": "why the old text was wrong, with source" }
    }
  },
  "newTerms": [
    {
      "id": "kebab-case", "term": "Display Name", "aliases": [], "category": "<one of the 7 DictCategory values>",
      "level": "Beginner | Intermediate | Advanced",
      "definition": "Precise, 1-2 sentences.",
      "simple": "Plain English.",
      "analogy": "Optional everyday comparison.",
      "whyItMatters": "Practical use case: when and why a builder or business uses this.",
      "example": "A concrete real-world example (automation, CRM, agent, or app context where natural).",
      "related": ["existing-or-new-ids"],
      "sources": [{ "label": "...", "url": "https://..." }],
      "lastVerified": "2026-10-26",
      "status": "current"
    }
  ],
  "notes": ["anything the lead should know: aliases instead of new pages, conflicts, things you couldn't source"]
}
```
- Include `fix` **only** when existing text is factually wrong or outdated. Give the `reason` and a source. Style rewrites are not fixes.
- Omit `status` when it's `current`. Use `emerging` for genuinely new or unsettled concepts. Use `deprecated` only when the
  concept itself is obsolete, not just because one vendor dropped it; in that case say so in a `fix`.

## Source rules (non-negotiable)
1. **Every term gets 1-3 sources, and you must open each URL** (WebFetch) to confirm it loads and actually covers the term.
   Never write a URL from memory.
2. Preference order:
   1. the official spec or standard (RFC, W3C, MCP spec, OWASP)
   2. vendor or project docs (Anthropic, OpenAI, Google, MDN, n8n, Zapier, Make, HighLevel help center)
   3. a well-known reference (Wikipedia) **only** when no primary source exists, and labelled e.g. "Wikipedia: Tokenization"
3. Use https only. No blogs or SEO content farms. No paywalled pages.
4. If you can't source a term, leave it out and list it in `notes`. **Never invent.**

## Writing rules
- Audience: builders learning AI and automation, beginner to advanced.
- `simple` is the version a non-technical business owner understands. `definition` stays precise.
- `whyItMatters` is the practical use case. `example` is concrete: name a realistic scenario, not "e.g. a company uses it".
- No hype or marketing words ("revolutionary", "game-changing"). No claims you can't source.
- Don't create a separate term when an alias on an existing term is the honest answer (e.g. "function calling" is an
  alias of `tool-calling`). Add the alias via `fix` with `"aliases": [...]`, and say so in `notes`.
- `related` may only list ids that exist in `data/dictionary.ts` or in your own `newTerms`.
- `id` must be kebab-case and must not collide with an existing id.

## Done means
- Every existing term in your categories appears in `updates`, with `simple`, `sources` and `lastVerified`.
- Every requested new term is either in `newTerms` or explained in `notes`.
- The JSON parses (check it with `node -e "JSON.parse(require('fs').readFileSync('<file>','utf8'))"`).
- Final reply to the lead: under 150 words. Give counts, any `fix` entries, and anything you couldn't source.
