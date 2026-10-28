import { existsSync, copyFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
const [major, minor, patch] = process.versions.node.split(".").map(Number);
if (major < 20 || (major === 20 && (minor < 19 || (minor === 19 && patch < 4)))) { console.error("Usa Node 22 para preparar las bases."); process.exit(1); }
const root = dirname(fileURLToPath(import.meta.url));
console.log("Preparación CON INTERNET. Instala dependencias; respeta los archivos que construyas en clase.");
for (let n = 1; n <= 6; n++) {
  const slug = "caso-" + String(n).padStart(2, "0");
  for (const part of ["backend", "frontend"]) {
    const cwd = join(root, slug, part);
    const result = spawnSync(process.platform === "win32" ? "npm.cmd" : "npm", ["ci", "--no-audit", "--no-fund"], { cwd, stdio: "inherit", shell: process.platform === "win32" });
    if (result.error || result.status !== 0) { console.error("No se pudo preparar", slug, part); process.exit(1); }
    if (part === "backend" && !existsSync(join(cwd, ".env"))) copyFileSync(join(cwd, ".env.example"), join(cwd, ".env"));
  }
}
console.log("Bases listas. Abre caso-01 y sigue las pestañas del cuaderno con el profesor. La solución la construyes en estos archivos.");
