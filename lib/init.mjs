// Copies the bot-team templates into a folder. Never overwrites existing files.
import { readdir, copyFile, mkdir, access } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const SRC = join(dirname(fileURLToPath(import.meta.url)), "..", "templates");
export async function init(dest, { force = false } = {}) {
  await mkdir(dest, { recursive: true });
  const copied = [], skipped = [];
  for (const f of (await readdir(SRC)).filter((f) => f.endsWith(".md")).sort()) {
    const to = join(dest, f);
    let exists = true;
    try { await access(to); } catch { exists = false; }
    if (exists && !force) { skipped.push(f); continue; }
    await copyFile(SRC + "/" + f, to);
    copied.push(f);
  }
  return { copied, skipped };
}

export async function listTemplates() {
  return (await readdir(SRC)).filter((f) => f.endsWith(".md")).sort();
}
