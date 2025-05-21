import { describe, it, expect } from "vitest";
import { translateError } from "../src/index";

describe("translateError", () => {
  it("translates known error", async () => {
    const explanation = await translateError("TypeError: undefined is not a function");
    expect(explanation).toContain("isn't a function");
  });

  it("returns fallback for unknown errors", async () => {
    const explanation = await translateError("Unusual error here");
    expect(explanation).toContain("No explanation found");
  });
});
