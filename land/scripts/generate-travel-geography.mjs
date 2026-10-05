// Build-time only: real Natural Earth boundaries, without runtime map libraries.
import { readFileSync, writeFileSync } from "node:fs";
import { geoNaturalEarth1, geoPath } from "d3-geo";
import { feature } from "topojson-client";

const world = JSON.parse(readFileSync(new URL("../node_modules/world-atlas/countries-110m.json", import.meta.url), "utf8"));
const countries = feature(world, world.objects.countries).features.filter(({ id }) => id !== "010");
const projection = geoNaturalEarth1().fitExtent([[16, 16], [984, 476]], { type: "FeatureCollection", features: countries });
const path = geoPath(projection).digits(2);
writeFileSync(new URL("../src/travel-geography.json", import.meta.url), JSON.stringify({
  width: 1000,
  height: 492,
  countries: countries.map((country) => ({ id: country.id, name: country.properties.name, path: path(country) })),
}) + "\n");
