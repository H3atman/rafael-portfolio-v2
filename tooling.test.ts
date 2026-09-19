import { describe, expect, it } from "vitest";
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

// This project installs and runs with Bun. These are repo-level guards rather
// than unit tests: a stray package-lock.json changes which package manager
// Vercel picks at deploy time, and stale `npm run` instructions send both
// humans and agents down a path that no longer matches the lockfile.
//
// It lives at the repo root rather than in scripts/, which eslint.config.mjs
// ignores, so that `bun run lint` covers it like every other source file.

const root = import.meta.dirname;
const read = (file: string) => readFileSync(join(root, file), "utf8");
const pkg = JSON.parse(read("package.json"));

const trackedFiles = execFileSync("git", ["ls-files"], {
  cwd: root,
  encoding: "utf8",
})
  .split("\n")
  .filter(Boolean);

describe("package manager", () => {
  it("tracks bun.lock as the lockfile", () => {
    expect(trackedFiles).toContain("bun.lock");
  });

  it("has no competing lockfile from another package manager", () => {
    for (const lockfile of ["package-lock.json", "yarn.lock", "pnpm-lock.yaml"]) {
      expect(existsSync(join(root, lockfile))).toBe(false);
      expect(trackedFiles).not.toContain(lockfile);
    }
  });

  it("pins the package manager in package.json", () => {
    expect(pkg.packageManager).toMatch(/^bun@\d+\.\d+\.\d+$/);
  });
});

describe("vercel deployment", () => {
  // The Vercel project's dashboard Framework Preset is still "Next.js" from
  // before the Vite migration, which fails every build with "No Next.js
  // version detected" because `next` is no longer a dependency. Declaring the
  // framework here overrides that stale dashboard setting, so the preset lives
  // in version control rather than in project state nobody can see or review.
  it("pins the framework preset, overriding the stale dashboard setting", () => {
    const vercel = JSON.parse(read("vercel.json"));
    expect(vercel.framework).toBe("react-router");
  });
});

describe("script binaries", () => {
  // npm auto-installs optional peer dependencies; bun does not. A binary that
  // a script shells out to therefore has to come from a *declared* dependency,
  // not from a transitive peer that npm happened to drop into node_modules/.bin
  // (@react-router/serve is declared for exactly that reason).
  const declared = Object.keys({
    ...pkg.dependencies,
    ...pkg.devDependencies,
  });

  // binary name -> the declared package that provides it
  const provided = new Map<string, string>();
  for (const name of declared) {
    const manifest = join(root, "node_modules", name, "package.json");
    if (!existsSync(manifest)) continue;
    const bin = JSON.parse(readFileSync(manifest, "utf8")).bin;
    if (typeof bin === "string") provided.set(name.split("/").pop()!, name);
    else if (bin) for (const binary of Object.keys(bin)) provided.set(binary, name);
  }

  const binaries = [
    ...new Set(
      Object.values(pkg.scripts as Record<string, string>)
        .flatMap((script) => script.split("&&"))
        .map((command) => command.trim().split(/\s+/)[0])
        // `node` is the runtime itself, not an installable dependency.
        .filter((binary) => binary && binary !== "node"),
    ),
  ];

  it.each(binaries)("%s comes from a declared dependency", (binary) => {
    expect([...provided.keys()]).toContain(binary);
  });

  it.each(binaries)("%s is installed in node_modules/.bin", (binary) => {
    expect(existsSync(join(root, "node_modules/.bin", binary))).toBe(true);
  });
});

describe("documented commands", () => {
  // Every tracked Markdown doc, so a doc added later cannot quietly escape the
  // guard. Two exemptions, both because rewriting them would make them false:
  // PORTFOLIO.md is a case study of a separate Next.js + Convex app, and
  // plans/ holds superseded plan documents describing work as it was done at
  // the time, under Next.js and npm. (`.gitignore` lists /plans, but that only
  // stops new files being added; the existing ones stay tracked.)
  const docs = trackedFiles.filter(
    (file) =>
      file.endsWith(".md") &&
      file !== "PORTFOLIO.md" &&
      !file.startsWith("plans/"),
  );

  it.each(docs)("%s invokes bun rather than npm", (doc) => {
    const text = read(doc);
    expect(text).not.toMatch(/\bnpm (run|install|ci|start|test)\b/);
    expect(text).not.toMatch(/\bnpx /);
    expect(text).not.toMatch(/\b(yarn|pnpm) (install|dev|build)\b/);
  });
});
