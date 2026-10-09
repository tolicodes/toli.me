import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { geoBounds, geoContains } from "d3-geo";
import { getUsMapFeatures, usTravel } from "../src/us-travel.js";

const geography = JSON.parse(readFileSync(new URL("../src/us-geography.json", import.meta.url), "utf8"));

test("the mainland viewport excludes remote territories and keeps all lower 48 states", () => {
  const mainland = getUsMapFeatures(geography.features);
  assert.equal(mainland.length, 49, "48 states plus Washington, D.C.");
  const [[west, south], [east, north]] = geoBounds({ type: "FeatureCollection", features: mainland });
  assert.ok(west > -126 && east < -66 && south > 24 && north < 50);
  assert.deepEqual(getUsMapFeatures(geography.features, true).map(({ id }) => id), ["15"]);
});

test("the U.S. map includes Toli’s 18 selected states, D.C. and 26 places", () => {
  assert.deepEqual(Object.fromEntries(usTravel.map(({ name, places }) => [name, places.map(({ name }) => name)])), {
    Florida: ["Miami", "Orlando"], "New York": ["New York City"],
    California: ["Los Angeles", "San Francisco", "San Diego", "Palm Springs", "Goleta", "Santa Barbara area"],
    Nevada: ["Las Vegas"], Hawaii: ["Honolulu", "Kauai"],
    Washington: ["Seattle"], Massachusetts: ["Boston"], Arizona: ["Sedona"],
    Oregon: ["Portland"], Texas: ["Fort Worth"], Utah: ["Springdale / Zion National Park"],
    "New Jersey": ["Jersey City"], Connecticut: ["New Haven"], Pennsylvania: ["Philadelphia"],
    Illinois: ["Pontoon Beach"], Vermont: ["Killington"], "North Carolina": ["Charlotte"],
    Maryland: ["Rising Sun area"],
    "District of Columbia": ["Washington, D.C."],
  });
  assert.equal(usTravel.filter(({ kind }) => kind !== "district").length, 18);
  assert.deepEqual(usTravel.filter(({ kind }) => kind === "district").map(({ id }) => id), ["11"]);
  assert.equal(usTravel.reduce((total, { places }) => total + places.length, 0), 26);
  assert.equal(usTravel.find(({ name }) => name === "Hawaii").places.find(({ name }) => name === "Kauai").kind, "island");
});

test("each selected pin lies inside the correct complete state geometry", () => {
  assert.equal(new Set(usTravel.map(({ id }) => id)).size, 19);
  for (const state of usTravel) {
    const boundary = geography.features.find(({ id }) => id === state.id);
    assert.equal(boundary?.properties.name, state.name);
    for (const { name, lat, lng } of state.places) {
      assert.ok(Number.isFinite(lat) && Number.isFinite(lng));
      assert.ok(geoContains(boundary, [lng, lat]), `${name} must be in ${state.name}`);
    }
  }
});
