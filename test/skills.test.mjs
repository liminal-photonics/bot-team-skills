import { test } from "node:test";
import assert from "node:assert/strict";
import { readdir, readFile, mkdtemp, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { init } from "../lib/init.mjs";

const root = new URL("..", import.meta.url).pathname;
const skills = (await readdir(join(root, "skills"))).sort();

test("every skill has valid frontmatter with a matching name and a useful description", async () => {
  assert.ok(skills.length >= 9);
  for (const s of skills) {
    const t = await readFile(join(root, "skills", s, "SKILL.md"), "utf8");
    const m = t.match(/^---\nname: (.+)\ndescription: (.+)\n---\n/);
    assert.ok(m, `${s} frontmatter`);
    assert.equal(m[1], s);
    assert.ok(m[2].length > 60 && m[2].length < 1024, `${s} description length`);
    assert.match(m[2], /Use (when|before|whenever)/, `${s} says when to use it`);
  }
});

test("templates referenced by skills exist", async () => {
  const tpl = new Set(await readdir(join(root, "templates")));
  for (const s of skills) {
    const t = await readFile(join(root, "skills", s, "SKILL.md"), "utf8");
    for (const [, f] of t.matchAll(/templates\/([A-Z_]+\.md)/g)) assert.ok(tpl.has(f), `${s} -> ${f}`);
  }
});

test("skills cross-references point at real skills", async () => {
  for (const s of skills) {
    const t = await readFile(join(root, "skills", s, "SKILL.md"), "utf8");
    for (const [, ref] of t.matchAll(/see `([a-z-]+)`/gi)) assert.ok(skills.includes(ref), `${s} -> ${ref}`);
  }
});

test("plugin manifest is valid and points at real files", async () => {
  const p = JSON.parse(await readFile(join(root, ".cursor-plugin/plugin.json"), "utf8"));
  assert.equal(p.name, "bot-team-skills");
  assert.ok(p.description.length <= 600);
  await readFile(join(root, p.logo));
  assert.equal(p.mcpServers, undefined);
});

test("init copies templates and never overwrites without --force", async () => {
  const d = await mkdtemp(join(tmpdir(), "bts-"));
  await writeFile(join(d, "ROLES.md"), "mine");
  const r = await init(d);
  assert.deepEqual(r.skipped, ["ROLES.md"]);
  assert.ok(r.copied.includes("DECISIONS.md"));
  assert.equal(await readFile(join(d, "ROLES.md"), "utf8"), "mine");
  const f = await init(d, { force: true });
  assert.ok(f.replaced.includes("ROLES.md"));
});

test("init edge cases: destination is a file, existing files kept, force overwrites", async () => {
  const { init } = await import("../lib/init.mjs");
  const { mkdtemp, writeFile, readFile } = await import("node:fs/promises");
  const { tmpdir } = await import("node:os");
  const { join } = await import("node:path");
  const d = await mkdtemp(join(tmpdir(), "bts-"));
  await writeFile(join(d, "afile"), "x");
  await assert.rejects(init(join(d, "afile")), /not a folder/);
  await writeFile(join(d, "ROLES.md"), "mine");
  const r = await init(d);
  assert.ok(r.skipped.includes("ROLES.md")); assert.equal(await readFile(join(d, "ROLES.md"), "utf8"), "mine");
  const again = await init(d); assert.equal(again.copied.length, 0);
  const f = await init(d, { force: true }); assert.ok(f.replaced.includes("ROLES.md"));
});

test("mock 2-bot handoff: the HANDOFF template has every field the bot-handoff skill requires", async () => {
  const { readFile } = await import("node:fs/promises");
  const skill = await readFile(new URL("../skills/bot-handoff/SKILL.md", import.meta.url), "utf8");
  const tpl = await readFile(new URL("../templates/HANDOFF.md", import.meta.url), "utf8");
  for (const field of ["Ask", "Priority / why", "Context", "Done means", "By when", "Approvals", "Secrets"]) assert.ok(tpl.includes(`**${field}:**`), field);
  assert.match(skill, /secret/i);
  // a filled-in handoff leaves no placeholders for the receiver to ask about
  const filled = tpl.replace(/<!--[\s\S]*?-->/g, "").replace(/<[^>]+>/g, "x");
  assert.doesNotMatch(filled, /[<>]/);
});
