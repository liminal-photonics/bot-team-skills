// Copies the bot-team templates into a folder. Never overwrites existing files.
import { readdir, copyFile, mkdir, stat } from "node:fs/promises";
import { constants } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const SRC = join(dirname(fileURLToPath(import.meta.url)), "..", "templates");
export async function init(dest, { force = false } = {}) {
  const st = await stat(dest).catch(() => null);
  if (st && !st.isDirectory()) throw new Error(`${dest} exists and is not a folder.`);
  await mkdir(dest, { recursive: true });
  const copied = [], skipped = [];
  for (const f of (await readdir(SRC)).filter((f) => f.endsWith(".md")).sort()) {
    const to = join(dest, f);
    // COPYFILE_EXCL makes "don't overwrite" atomic (no check-then-copy race)
    try { await copyFile(join(SRC, f), to, force ? 0 : constants.COPYFILE_EXCL); copied.push(f); }
    catch (e) { if (e.code === "EEXIST") skipped.push(f); else throw e; }
  }
  return { copied, skipped };
}

export async function listTemplates() {
  return (await readdir(SRC)).filter((f) => f.endsWith(".md")).sort();
}
