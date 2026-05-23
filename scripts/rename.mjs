#!/usr/bin/env node
/**
 * Renames the @template scope across the entire monorepo.
 *
 * Usage:
 *   bun run rename miapp
 *   bun run rename          ← prompts for the name interactively
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { join, extname } from "path";
import { createInterface } from "readline";

const EXTENSIONS = new Set([".ts", ".tsx", ".js", ".mjs", ".json", ".css"]);
const SKIP_DIRS = new Set([
  "node_modules",
  ".next",
  ".git",
  ".turbo",
  "dist",
  "out",
  "drizzle",
]);

async function ask(question) {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

function walk(dir, cb) {
  for (const entry of readdirSync(dir)) {
    if (SKIP_DIRS.has(entry)) continue;
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) walk(full, cb);
    else if (stat.isFile() && EXTENSIONS.has(extname(entry))) cb(full);
  }
}

// ── resolve new scope name ─────────────────────────────────────────────────
let raw = process.argv[2];
if (!raw) raw = await ask("Nuevo nombre de scope (sin @): ");
const newScope = raw.replace(/^@/, "").trim();

// must start with a letter, only lowercase letters, numbers and hyphens
if (!newScope || !/^[a-z][a-z0-9-]*$/.test(newScope)) {
  console.error(
    "❌  Nombre inválido. Debe empezar con letra y contener solo letras minúsculas, números y guiones.",
  );
  process.exit(1);
}

const FROM = "@template";
const TO = `@${newScope}`;
const ROOT = new URL("..", import.meta.url).pathname;

console.log(`\n  ${FROM}  →  ${TO}\n`);

// ── replace ────────────────────────────────────────────────────────────────
let changed = 0;
walk(ROOT, (file) => {
  const src = readFileSync(file, "utf-8");
  if (!src.includes(FROM)) return;
  writeFileSync(file, src.replaceAll(FROM, TO));
  console.log(`  ✓  ${file.replace(ROOT, "")}`);
  changed++;
});

console.log(`\n  ${changed} archivo(s) actualizados.`);

// ── verify no leftovers ────────────────────────────────────────────────────
const leftovers = [];
walk(ROOT, (file) => {
  if (readFileSync(file, "utf-8").includes(FROM)) {
    leftovers.push(file.replace(ROOT, ""));
  }
});

if (leftovers.length > 0) {
  console.warn(`\n⚠️   Todavía contienen "${FROM}":`);
  leftovers.forEach((f) => console.warn(`     ${f}`));
  console.warn("\n  Revísalos manualmente.\n");
} else {
  console.log(`\n✅  No quedan referencias a "${FROM}".\n`);
}
