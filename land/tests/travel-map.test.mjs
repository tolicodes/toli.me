import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { travelArchive } from "../src/personal-content.js";
import { travelGeographyIds } from "../src/travel-map.js";

const geography = JSON.parse(readFileSync(new URL("../src/travel-geography.json", import.meta.url), "utf8"));

test("Leaflet world rings never draw dateline crossings through other countries", () => {
  const world = JSON.parse(readFileSync(new URL("../src/world-geography.json", import.meta.url), "utf8"));
  assert.equal(world.features.length, geography.countries.length);
  for (const country of world.features) {
    assert.ok(country.geometry.coordinates.length, country.properties.name);
    for (const polygon of country.geometry.coordinates) for (const ring of polygon) {
      assert.deepEqual(ring[0], ring.at(-1));
      for (let i = 1; i < ring.length; i++) {
        const [lng, lat] = ring[i];
        assert.ok(lng >= -180 && lng <= 180 && lat >= -90 && lat <= 90);
        assert.ok(Math.abs(lng - ring[i - 1][0]) <= 180, `${country.properties.name} crosses the viewport`);
      }
    }
  }
});

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
