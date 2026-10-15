// Fresh-install check: runs the published package through npx in a temp folder.
// SPEC=github:liminal-photonics/bot-team-skills#<sha>
import { execFileSync } from "node:child_process";
import { mkdtemp, readdir, writeFile, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
const spec = process.env.SPEC || "github:liminal-photonics/bot-team-skills";
const d = await mkdtemp(join(tmpdir(), "bts-live-"));
const run = (...a) => execFileSync("npx", ["-y", spec, ...a], { cwd: d, encoding: "utf8" });
console.log("LIST\n" + run("list"));
console.log("INIT", run("init"));
await writeFile(join(d, "bot-team", "ROLES.md"), "edited");
console.log("REINIT", run("init"));
console.log("KEPT", (await readFile(join(d, "bot-team", "ROLES.md"), "utf8")) === "edited");
console.log("FILES", (await readdir(join(d, "bot-team"))).join(", "));
try { run("bogus"); } catch (e) { console.log("BAD_CMD exit", e.status); }
