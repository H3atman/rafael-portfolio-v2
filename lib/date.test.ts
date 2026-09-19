import { describe, expect, it } from "vitest";
import { parseDate } from "@/lib/date";

describe("parseDate", () => {
  it("parses the ISO date format used in project frontmatter", () => {
    expect(parseDate("2025-12-15")?.toISOString()).toBe("2025-12-15T00:00:00.000Z");
  });

  it("returns null for an unparseable value", () => {
    expect(parseDate("not a date")).toBeNull();
    expect(parseDate("")).toBeNull();
  });
});
