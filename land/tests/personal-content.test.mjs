import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import {
  creativeProjects,
  featuredProjects,
  publications,
  travelArchive,
  writing,
} from "../src/personal-content.js";

const readJson = (path) => JSON.parse(readFileSync(new URL(path, import.meta.url), "utf8"));
const inventory = readJson("../docs/content-inventory.json");
const travelSource = readJson("../docs/travel-import/travel-data.json");
const allProjects = [...featuredProjects, ...publications, ...creativeProjects, ...writing];

test("the personal site keeps the selected 15 destinations and featured trio", () => {
  assert.deepEqual(featuredProjects.map(({ id }) => id), [
    "drawn", "neurodiverse-guide", "dating-bounty",
  ]);
  assert.deepEqual(publications.map(({ id }) => id), ["neurodiverse-guide", "principles"]);
  assert.deepEqual(creativeProjects.map(({ id }) => id), [
    "drawn", "easter-creatures", "las-chicas", "spa-date", "obscure-parody-vids",
  ]);
  const scopedIds = new Set([...allProjects.map(({ id }) => id), "travels"]);
  assert.equal(scopedIds.size, 15);
  assert.deepEqual(scopedIds, new Set([
    "drawn", "neurodiverse-guide", "dating-bounty", "principles",
    "easter-creatures", "las-chicas", "spa-date", "obscure-parody-vids",
    "getting-back-to-love", "energy-cords", "focus-on-negative",
    "rejection-breakups", "boredom-bipolar", "dota-consciousness", "travels",
  ]));
  assert.equal(publications[0], featuredProjects[1], "Guide placements must share one destination");
  assert.equal(creativeProjects[0], featuredProjects[0], "Drawn placements must share one destination");
});

test("all six essays retain their original titles and direct Medium destinations", () => {
  const originalWriting = inventory.filter(({ kingdom }) => kingdom === "writing");
  assert.equal(writing.length, 6);
  assert.deepEqual(
    writing.map(({ id, title, href }) => ({ id, title, url: href })),
    originalWriting.map(({ id, title, url }) => ({ id, title, url })),
  );
  for (const { href } of writing) assert.equal(new URL(href).hostname, "tolicodes.medium.com");
});

test("travel list preserves the original import and user additions while excluding London", () => {
  assert.equal(travelArchive.countries.length, 18);
  assert.equal(new Set(travelArchive.countries.map(({ id }) => id)).size, 18);
  assert.deepEqual(travelArchive.countries.find(({ id }) => id === "es"), {
    id: "es", name: "Spain", group: "Europe", places: ["Granada"],
  });
  assert.deepEqual(
    travelArchive.countries.filter(({ id }) => !["es", "mx", "ch", "ke"].includes(id)).map(({ id, name, group }) => ({ id, name, group })),
    travelSource.visitedCountries.map(({ id, name, group }) => ({ id, name, group })),
  );
  assert.equal(travelArchive.sourceUrl, travelSource.source.url);
  assert.deepEqual(travelArchive.countries.filter(({ id }) => ["mx", "ch", "ke"].includes(id)), [
    { id: "mx", name: "Mexico", group: "Americas", places: ["Tulum", "Cabo San Lucas"] },
    { id: "ch", name: "Switzerland", group: "Europe", places: ["Zürich"] },
    { id: "ke", name: "Kenya", group: "Africa", places: ["Pridelands"] },
  ]);
  assert.ok(!travelArchive.countries.some(({ id }) => id === "gb"));
  assert.ok(travelSource.visitedCountries.every(({ status, dates }) => status === "visited" && dates === null));
});

test("project links are named, direct HTTPS destinations without credentials", () => {
  for (const project of allProjects) {
    for (const key of ["id", "title", "description", "cta"]) {
      assert.ok(project[key]?.trim(), `${project.id} needs ${key}`);
    }
    const url = new URL(project.href);
    assert.equal(url.protocol, "https:", `${project.id} must use HTTPS`);
    assert.equal(url.username, "");
    assert.equal(url.password, "");
  }
  assert.equal(publications.find(({ id }) => id === "principles").href, "https://principles.toli.me");
});

test("every selected illustration has descriptive text and a real WebP asset", () => {
  for (const project of new Map(allProjects.map((project) => [project.id, project])).values()) {
    if (!project.image) continue;
    assert.ok(project.imageAlt?.trim(), `${project.id} needs image alternative text`);
    assert.match(project.image, /^\/assets\/personal\/[a-z0-9-]+\.webp$/);
    const bytes = readFileSync(new URL(`../public${project.image}`, import.meta.url));
    assert.ok(bytes.length > 12, `${project.image} must not be empty`);
    assert.equal(bytes.toString("ascii", 0, 4), "RIFF");
    assert.equal(bytes.toString("ascii", 8, 12), "WEBP");
  }
});
