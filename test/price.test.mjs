import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { subtotal } from "../src/price.mjs";

describe("subtotal", () => {
  it("adds up the items", () => assert.equal(subtotal(["mug", "mug"]), 200));
  it("is 0 for an empty cart", () => assert.equal(subtotal([]), 0));
});

describe("discount", async () => {
  const { discount } = await import("../src/price.mjs");
  it("SAVE10 takes 10% off", () => assert.equal(discount(100, "SAVE10"), 90));
  it("an unknown code changes nothing", () => assert.equal(discount(100, "NOPE"), 100));
});
