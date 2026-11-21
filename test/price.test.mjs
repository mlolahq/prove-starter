import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { subtotal } from "../src/price.mjs";

describe("subtotal", () => {
  it("adds up the items", () => assert.equal(subtotal(["mug", "mug"]), 200));
  it("is 0 for an empty cart", () => assert.equal(subtotal([]), 0));
});
