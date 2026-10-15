#!/usr/bin/env node
// CLI: copy the bot-team templates into a folder.
import { resolve } from "node:path";
import { init, listTemplates } from "../lib/init.mjs";

const args = process.argv.slice(2);
const cmd = args[0];
if (cmd !== "init" && cmd !== "list") {
  console.log("Usage: bot-team-skills init [folder] [--force]   copy templates (existing files are kept unless --force)\n       bot-team-skills list                    list templates");
  process.exit(cmd ? 1 : 0);
}
if (cmd === "list") console.log((await listTemplates()).join("\n"));
else {
  const dest = resolve(args.find((a, i) => i > 0 && !a.startsWith("--")) || "bot-team");
  let r;
  try { r = await init(dest, { force: args.includes("--force") }); }
  catch (e) { console.error(`bot-team-skills: ${e.message}`); process.exit(1); }
  console.log(`Templates in ${dest}\n  copied: ${r.copied.join(", ") || "none"}\n  kept existing: ${r.skipped.join(", ") || "none"}`);
}
