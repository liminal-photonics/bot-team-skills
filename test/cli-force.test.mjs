// Runs the real CLI. --force must not overwrite anything without a preview and an explicit --yes.
import { test } from "node:test";
import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { mkdtempSync, writeFileSync, readFileSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
const CLI = fileURLToPath(new URL("../bin/bot-team-skills.mjs", import.meta.url));
const run = (...a) => spawnSync(process.execPath, [CLI, ...a], { encoding: "utf8" });

test("init --force alone previews and changes nothing", () => {
  const d = mkdtempSync(join(tmpdir(), "bts-"));
  writeFileSync(join(d, "DECISIONS.md"), "my own log\n");
  const r = run("init", d, "--force");
  assert.notEqual(r.status, 0);
  assert.match(r.stdout + r.stderr, /would replace: DECISIONS\.md/);
  assert.match(r.stdout + r.stderr, /--force --yes/);
  assert.equal(readFileSync(join(d, "DECISIONS.md"), "utf8"), "my own log\n");
});

test("init --dry-run lists what would happen and writes nothing", () => {
  const d = join(mkdtempSync(join(tmpdir(), "bts-")), "new");
  const r = run("init", d, "--dry-run");
  assert.equal(r.status, 0);
  assert.match(r.stdout, /would copy: .*ROLES\.md/);
  assert.equal(existsSync(d), false);
});

test("init --force --yes replaces after the explicit confirmation", () => {
  const d = mkdtempSync(join(tmpdir(), "bts-"));
  writeFileSync(join(d, "DECISIONS.md"), "my own log\n");
  const r = run("init", d, "--force", "--yes");
  assert.equal(r.status, 0, r.stderr);
  assert.notEqual(readFileSync(join(d, "DECISIONS.md"), "utf8"), "my own log\n");
  assert.match(r.stdout, /replaced: DECISIONS\.md/);
});
