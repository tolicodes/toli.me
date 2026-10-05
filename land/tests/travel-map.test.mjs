import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { travelArchive } from "../src/personal-content.js";
import { travelGeographyIds } from "../src/travel-map.js";

const geography = JSON.parse(readFileSync(new URL("../src/travel-geography.json", import.meta.url), "utf8"));

test("every archived country maps to its real country boundary", () => {
  const expectedNames = { us: "United States of America" };
  const highlighted = new Set();
  for (const country of travelArchive.countries) {
    const id = travelGeographyIds[country.id];
    assert.ok(id, `Missing geographic identifier for ${country.name}`);
    assert.ok(!highlighted.has(id), "Countries must map to different boundaries");
    highlighted.add(id);
    const boundary = geography.countries.find((entry) => entry.id === id);
    assert.equal(boundary?.name, expectedNames[country.id] || country.name);
    assert.match(boundary.path, /^M/);
    assert.ok(!/NaN|Infinity/.test(boundary.path));
  }
  assert.equal(highlighted.size, travelArchive.countries.length);
  // Small neighboring countries must not be filled with Nicaragua/Costa Rica.
  for (const id of ["084", "320", "340", "591", "620"]) assert.ok(!highlighted.has(id));
});
