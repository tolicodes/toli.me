import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { mapHash, parseRoute, projectHash } from "../src/routing.js";

const contentUrl = new URL("../src/content.js", import.meta.url);
const readJson = (url) => JSON.parse(readFileSync(url, "utf8"));
const inventory = readJson(
  new URL("../docs/content-inventory.json", import.meta.url),
);

// Run the production content module, adapting only Vite's JSON imports for Node 20.
const contentSource = readFileSync(contentUrl, "utf8").replace(
  /^import (\w+) from ['"]([^'"]+\.json)['"];?$/gm,
  (_, name, path) =>
    `const ${name} = ${JSON.stringify(readJson(new URL(path, contentUrl)))};`,
);
const { featuredIds, getMapSpots, kingdomIds, maps, projectById, projects } =
  await import(
    `data:text/javascript;base64,${Buffer.from(contentSource).toString("base64")}`
  );

test("every source entry has one project and a discoverable home landmark", () => {
  assert.equal(
    new Set(inventory.map((entry) => entry.id)).size,
    inventory.length,
    "Source IDs must be unique",
  );
  assert.deepEqual(
    new Set(projects.map((project) => project.id)),
    new Set(inventory.map((entry) => entry.id)),
  );
  assert.equal(
    projects.length,
    inventory.length,
    "Source entries must not be duplicated",
  );
  for (const project of projects) {
    assert.equal(
      projectById[project.id],
      project,
      `${project.id} must be addressable by ID`,
    );
    assert.ok(
      kingdomIds.includes(project.kingdom),
      `${project.id} needs a known category kingdom`,
    );
    assert.ok(project.title?.trim(), `${project.id} needs a visible title`);
    assert.ok(project.landmark, `${project.id} must appear on its home map`);
    assert.equal(project.landmark.id, project.id);
  }
});

test("the world reaches every kingdom and the Capital reaches every featured project", () => {
  assert.deepEqual(
    new Set(maps.world.spots.map((spot) => spot.id)),
    new Set(Object.keys(maps).filter((id) => id !== "world")),
  );
  assert.deepEqual(
    new Set(kingdomIds),
    new Set(inventory.map((entry) => entry.kingdom)),
  );
  assert.equal(
    new Set(featuredIds).size,
    featuredIds.length,
    "Featured IDs must be unique",
  );
  assert.deepEqual(
    new Set(maps.capital.spots.map((spot) => spot.id)),
    new Set(featuredIds),
  );
  for (const id of featuredIds)
    assert.ok(
      projectById[id]?.featured,
      `${id} must be an existing featured project`,
    );
});

test("every illustrated destination has a valid route and usable hotspot", () => {
  for (const [id, map] of Object.entries(maps)) {
    assert.equal(map.id, id);
    assert.deepEqual(parseRoute(mapHash(id)), { type: "map", id });
    assert.equal(
      new Set(map.spots.map((spot) => spot.id)).size,
      map.spots.length,
      `${id} has duplicate destinations`,
    );
    for (const spot of getMapSpots(id)) {
      for (const field of ["x", "y", "w", "h"])
        assert.ok(
          Number.isFinite(spot[field]),
          `${id}/${spot.id} needs a finite ${field}`,
        );
      assert.ok(
        spot.x >= 0 && spot.x <= 100 && spot.y >= 0 && spot.y <= 100,
        `${id}/${spot.id} must be centered on the map`,
      );
      assert.ok(
        spot.w > 0 && spot.h > 0,
        `${id}/${spot.id} must have a nonempty hit area`,
      );
      assert.ok(
        spot.title?.trim(),
        `${id}/${spot.id} needs an accessible name`,
      );
      if (spot.destination === "map") {
        assert.ok(maps[spot.id], `${id}/${spot.id} points to a missing map`);
        assert.deepEqual(parseRoute(mapHash(spot.id)), {
          type: "map",
          id: spot.id,
        });
      } else {
        assert.equal(spot.destination, "project");
        assert.ok(
          projectById[spot.id],
          `${id}/${spot.id} points to a missing project`,
        );
        assert.deepEqual(parseRoute(projectHash(spot.id, id)), {
          type: "project",
          id: spot.id,
          from: id,
        });
      }
    }
  }
});

test("project destinations and source references use safe URL protocols", () => {
  for (const project of projects) {
    const urls = [
      project.url,
      project.sourceUrl,
      ...(project.evidenceUrls || []),
      ...project.links.map((link) => link.url),
      ...project.chapters.map((chapter) => chapter.sourceUrl),
    ].filter(Boolean);
    for (const value of urls) {
      const url = new URL(value);
      assert.ok(
        ["https:", "http:", "mailto:"].includes(url.protocol),
        `${project.id} has an unsafe URL: ${value}`,
      );
      assert.equal(
        url.username,
        "",
        `${project.id} URL must not contain credentials`,
      );
      assert.equal(
        url.password,
        "",
        `${project.id} URL must not contain credentials`,
      );
    }
    for (const link of project.links)
      assert.ok(
        link.label?.trim(),
        `${project.id} has an unnamed external link`,
      );
  }
});

test("every map and project illustration exists as a nonempty WebP asset", () => {
  const assets = new Set([
    ...Object.keys(maps).map((id) => `/assets/maps/${id}.webp`),
    ...projects.map((project) => project.artwork),
  ]);
  for (const asset of assets) {
    assert.match(
      asset,
      /^\/assets\/(maps|projects)\/[a-z0-9-]+\.webp$/,
      `Unexpected illustration path: ${asset}`,
    );
    const bytes = readFileSync(new URL(`../public${asset}`, import.meta.url));
    assert.ok(bytes.length > 12, `${asset} is empty`);
    assert.equal(
      bytes.toString("ascii", 0, 4),
      "RIFF",
      `${asset} is not a WebP container`,
    );
    assert.equal(
      bytes.toString("ascii", 8, 12),
      "WEBP",
      `${asset} does not contain WebP data`,
    );
  }
});
