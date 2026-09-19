import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { links } from "./root";

describe("root links()", () => {
  // Regression: root.tsx declared /favicon.ico while public/ had no such file,
  // so every page load fell through the static handler into the React Router
  // document handler and logged `No route matches URL "/favicon.ico"`.
  it("points every absolute href at a file that exists in public/", () => {
    const missing = links()
      .map((link) => link.href)
      .filter((href) => href.startsWith("/"))
      .filter((href) => !fs.existsSync(path.join(process.cwd(), "public", href)));

    expect(missing).toEqual([]);
  });
});
