import assert from "node:assert/strict";
import test from "node:test";
import { pageHref, pages, readPersonalRoute } from "../src/personal-routing.js";

test("every retained section has a shareable direct route that restores its page", () => {
  assert.deepEqual(pages, ["home", "publications", "creative", "writing", "travels"]);
  assert.equal(new Set(pages.map(pageHref)).size, pages.length);
  for (const page of pages) {
    assert.equal(readPersonalRoute(pageHref(page)), page);
    assert.equal(readPersonalRoute(`${pageHref(page)}/`), page);
  }
});

test("fresh visits and both home hash forms resolve to the homepage", () => {
  for (const hash of ["", "#", "#/", "#home", "#/home"]) {
    assert.equal(readPersonalRoute(hash), "home");
  }
});

test("retired map links and unknown hashes have a safe homepage fallback", () => {
  for (const hash of [
    "#/map/world", "#/kingdom/writing", "#/project/picklejs", "#/missing",
    "#%E0%A4%A", "#/writing/extra", "#personal-main",
  ]) {
    assert.equal(readPersonalRoute(hash), "home", hash);
  }
});
