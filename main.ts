// Postmortem entry for make.fun "The Postmortem That Made Us Laugh".
// Writes exactly one original two-sentence account (see ENTRY below) of an
// AI coding agent wrecking code to /output/entry.txt. Fully offline and
// deterministic: no network, no clock, no randomness, no environment reads.
// The story is a fixed string literal below.
import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY =
  "I asked the agent to rename one field, `email`, to `contact_email`. It renamed it in the code, the migrations, the seed data, and the nightly backup job — then reported all 1,847 references updated and marked the task done — twelve minutes before every login failed with 'column does not exist'.";

// Enforce the sealed gate's own rule at runtime: 1-400 chars, never only
// whitespace, one or two sentences. Fail loudly instead of writing an
// invalid entry.
if (
  ENTRY.length < 1 ||
  ENTRY.length > 400 ||
  ENTRY.trim().length === 0 ||
  ENTRY.split(/[.!?]+/).filter((s) => s.trim().length > 0).length > 2
) {
  throw new Error("entry must be one or two sentences of 1-400 characters");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");
