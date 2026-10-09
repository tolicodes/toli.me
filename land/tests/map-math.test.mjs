import test from "node:test";
import assert from "node:assert/strict";
import {
  ART_WIDTH,
  ART_HEIGHT,
  fitScale,
  initialView,
  constrainView,
  zoomAt,
} from "../src/map-math.js";
import { mapHash, parseRoute, projectHash } from "../src/routing.js";

test("desktop overview fits all landmarks with room for controls", () => {
  const size = { width: 1440, height: 900 };
  const view = initialView(size);
  assert.ok(view.x >= 0 && view.y >= 0);
  assert.ok(ART_WIDTH * view.scale <= size.width);
  assert.ok(ART_HEIGHT * view.scale <= size.height - 100);
});

test("mobile begins at readable scale and can zoom out to the full world", () => {
  const size = { width: 390, height: 844 };
  const initial = initialView(size);
  const overview = initialView(size, [0.5, 0.5], true);
  assert.ok(initial.scale > overview.scale * 2);
  assert.equal(overview.scale, fitScale(390, 844));
});

test("pinch zoom keeps its focal map point stationary away from bounds", () => {
  const size = { width: 390, height: 844 };
  const before = { scale: 1, x: -400, y: -120 };
  const pointer = { x: 200, y: 420 };
  const after = zoomAt(before, 1.4, pointer, size);
  assert.ok(
    Math.abs(
      (pointer.x - before.x) / before.scale -
        (pointer.x - after.x) / after.scale,
    ) < 0.001,
  );
  assert.ok(
    Math.abs(
      (pointer.y - before.y) / before.scale -
        (pointer.y - after.y) / after.scale,
    ) < 0.001,
  );
});

test("show whole map centers asymmetric mobile starting positions", () => {
  const size = { width: 390, height: 844 };
  const overview = initialView(size, [0.29, 0.48], true);
  assert.equal(overview.x, 0);
  assert.equal(ART_WIDTH * overview.scale, size.width);
});

test("malformed share URLs recover to the world", () => {
  assert.deepEqual(parseRoute("#/project/%E0%A4%A"), {
    type: "map",
    id: "world",
  });
});

test("repeated extreme panning or zooming never loses the map", () => {
  const size = { width: 390, height: 844 };
  for (const scale of [0.0001, 1, 5, 100]) {
    const view = constrainView({ x: 1e6, y: -1e6, scale }, size);
    assert.ok(view.scale > 0 && view.scale <= 3);
    assert.ok(view.x <= 195);
    if (ART_HEIGHT * view.scale >= size.height - 80)
      assert.ok(view.y >= size.height - ART_HEIGHT * view.scale - 90);
    else assert.ok(view.y > 0 && view.y < size.height / 2);
  }
});

test("deep links preserve the originating map and round-trip route identifiers", () => {
  assert.deepEqual(
    parseRoute(projectHash("frontend-infra-book", "publications")),
    { type: "project", id: "frontend-infra-book", from: "publications" },
  );
  for (const id of ["world", "capital", "creative", "publications"])
    assert.deepEqual(parseRoute(mapHash(id)), { type: "map", id });
});
