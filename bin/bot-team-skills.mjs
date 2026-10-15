#!/usr/bin/env node
// CLI: copy the bot-team templates into a folder.
import { resolve } from "node:path";
import { init, listTemplates } from "../lib/init.mjs";

const USAGE = "Usage: bot-team-skills init [folder] [--force]   copy templates (existing files are kept unless --force)\n       bot-team-skills list                    list templates";
const args = process.argv.slice(2);
const cmd = args[0];
if (!cmd || cmd === "--help" || cmd === "-h" || cmd === "help") { console.log(USAGE); process.exit(0); }
if (cmd !== "init" && cmd !== "list") { console.error(`bot-team-skills: unknown command "${cmd}".\n${USAGE}`); process.exit(1); }
const flags = args.slice(1).filter((a) => a.startsWith("-"));
const bad = flags.filter((f) => f !== "--force");
if (bad.length) { console.error(`bot-team-skills: unknown option ${bad.join(", ")} (only --force is supported).`); process.exit(1); }
if (cmd === "list") console.log((await listTemplates()).join("\n"));
else {
  const given = args.slice(1).find((a) => !a.startsWith("-")) || "bot-team";
  // A Windows path such as C:\team or a\b on Linux/macOS would become one oddly named folder.
  if (process.platform !== "win32" && (/^[A-Za-z]:[\\/]/.test(given) || given.includes("\\"))) {
    console.error(`bot-team-skills: "${given}" looks like a Windows path. On this system use forward slashes, e.g. docs/team.`);
    process.exit(1);
  }
  const dest = resolve(given);
  let r;
  try { r = await init(dest, { force: flags.includes("--force") }); }
  catch (e) { console.error(`bot-team-skills: ${e.message}`); process.exit(1); }
  console.log(`Templates in ${dest}\n  copied: ${r.copied.join(", ") || "none"}\n  kept existing: ${r.skipped.join(", ") || "none"}${r.skipped.length ? "\n  (use --force to replace kept files)" : ""}\nNext: fill in ROLES.md, then PRIORITIES.md.`);
}
