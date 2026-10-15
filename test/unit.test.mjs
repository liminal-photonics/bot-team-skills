import { test } from "node:test";
import assert from "node:assert/strict";

test("round 3: CLI help exits 0, unknown options and Windows paths on POSIX are clear errors", async () => {
  const { spawnSync } = await import("node:child_process");
  const { mkdtempSync } = await import("node:fs");
  const { tmpdir } = await import("node:os");
  const { join } = await import("node:path");
  const cli = new URL("../bin/bot-team-skills.mjs", import.meta.url).pathname;
  const cwd = mkdtempSync(join(tmpdir(), "bts-"));
  const run = (...a) => spawnSync(process.execPath, [cli, ...a], { cwd, encoding: "utf8" });
  assert.equal(run("--help").status, 0);
  const typo = run("init", "--forse"); assert.equal(typo.status, 1); assert.match(typo.stderr, /unknown option --forse/);
  if (process.platform !== "win32") { const w = run("init", "C:\\team"); assert.equal(w.status, 1); assert.match(w.stderr, /Windows path/); }
  const ok = run("init", "a/b"); assert.equal(ok.status, 0); assert.match(ok.stdout, /Next: fill in ROLES.md/);
});
