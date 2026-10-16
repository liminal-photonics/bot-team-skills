#!/usr/bin/env node
// CLI: copy the bot-team templates into a folder.
import { resolve } from "node:path";
import { init, listTemplates, plan } from "../lib/init.mjs";

const USAGE = "Usage: bot-team-skills init [folder] [--dry-run] [--force --yes]\n         copy templates; existing files are kept. --dry-run shows what would happen; --force previews which\n         files would be replaced and only replaces them together with --yes.\n       bot-team-skills list                    list templates";
const args = process.argv.slice(2);
const cmd = args[0];
if (!cmd || cmd === "--help" || cmd === "-h" || cmd === "help") { console.log(USAGE); process.exit(0); }
if (cmd !== "init" && cmd !== "list") { console.error(`bot-team-skills: unknown command "${cmd}".\n${USAGE}`); process.exit(1); }
const flags = args.slice(1).filter((a) => a.startsWith("-"));
const bad = flags.filter((f) => !["--force", "--yes", "--dry-run"].includes(f));
if (bad.length) { console.error(`bot-team-skills: unknown option ${bad.join(", ")} (supported: --dry-run, --force, --yes).`); process.exit(1); }
if (cmd === "list") console.log((await listTemplates()).join("\n"));
else {
  const given = args.slice(1).find((a) => !a.startsWith("-")) || "bot-team";
  // A Windows path such as C:\team or a\b on Linux/macOS would become one oddly named folder.
  if (process.platform !== "win32" && (/^[A-Za-z]:[\\/]/.test(given) || given.includes("\\"))) {
    console.error(`bot-team-skills: "${given}" looks like a Windows path. On this system use forward slashes, e.g. docs/team.`);
    process.exit(1);
  }
  const dest = resolve(given);
  const force = flags.includes("--force"), yes = flags.includes("--yes"), dry = flags.includes("--dry-run");
  if (yes && !force) { console.error("bot-team-skills: --yes only confirms --force."); process.exit(1); }
  if (dry || (force && !yes)) {
    let p;
    try { p = await plan(dest); } catch (e) { console.error(`bot-team-skills: ${e.message}`); process.exit(1); }
    console.log(`${dry ? "Dry run" : "Preview"} for ${dest}\n  would copy: ${p.wouldCopy.join(", ") || "none"}\n  ${force ? "would replace" : "would keep existing"}: ${p.wouldReplace.join(", ") || "none"}`);
    if (!dry) { console.log(p.wouldReplace.length ? `Nothing was changed. To replace those files, run again with --force --yes.` : "Nothing would be replaced; run without --force."); process.exit(2); }
    process.exit(0);
  }
  let r;
  try { r = await init(dest, { force }); }
  catch (e) { console.error(`bot-team-skills: ${e.message}`); process.exit(1); }
  console.log(`Templates in ${dest}\n  copied: ${r.copied.join(", ") || "none"}\n${r.replaced.length ? `  replaced: ${r.replaced.join(", ")}\n` : ""}  kept existing: ${r.skipped.join(", ") || "none"}${r.skipped.length ? "\n  (use --force to preview replacing kept files)" : ""}\nNext: fill in ROLES.md, then PRIORITIES.md.`);
}
