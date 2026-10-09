// Build-time only: real Natural Earth boundaries, without runtime map libraries.
import { readFileSync, writeFileSync } from "node:fs";
import { geoNaturalEarth1, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import polygonClipping from "polygon-clipping";

const world = JSON.parse(readFileSync(new URL("../node_modules/world-atlas/countries-110m.json", import.meta.url), "utf8"));
const countries = feature(world, world.objects.countries).features.filter(({ id }) => id !== "010");
const projection = geoNaturalEarth1().fitExtent([[16, 16], [984, 476]], { type: "FeatureCollection", features: countries });
const path = geoPath(projection).digits(2);
// Leaflet draws planar rings; split dateline crossings before displaying them.
// Unwrap longitude locally, then delegate polygon/hole clipping to the package.
const worldBox = [[[-180, -90], [180, -90], [180, 90], [-180, 90], [-180, -90]]];
const unwrap = (ring) => ring.reduce((points, [longitude, latitude]) => {
  let lng = longitude;
  if (points.length) {
    while (lng - points.at(-1)[0] > 180) lng -= 360;
    while (lng - points.at(-1)[0] < -180) lng += 360;
  }
  points.push([lng, latitude]);
  return points;
}, []);
const leafletCountries = countries.map((country) => {
  const polygons = country.geometry.type === "Polygon" ? [country.geometry.coordinates] : country.geometry.coordinates;
  const coordinates = polygons.flatMap((polygon) => {
    const rings = polygon.map(unwrap);
    const anchor = rings[0][0][0];
    for (const hole of rings.slice(1)) {
      const shift = Math.round((anchor - hole[0][0]) / 360) * 360;
      for (const point of hole) point[0] += shift;
    }
    return [-360, 0, 360].flatMap((shift) => polygonClipping.intersection(
      rings.map((ring) => ring.map(([lng, lat]) => [lng + shift, lat])), worldBox,
    ));
  });
  return { ...country, geometry: { type: "MultiPolygon", coordinates } };
});
writeFileSync(new URL("../src/world-geography.json", import.meta.url), JSON.stringify({ type: "FeatureCollection", features: leafletCountries }) + "\n");
writeFileSync(new URL("../src/travel-geography.json", import.meta.url), JSON.stringify({
  width: 1000,
  height: 492,
  countries: countries.map((country) => ({ id: country.id, name: country.properties.name, path: path(country) })),
}) + "\n");
