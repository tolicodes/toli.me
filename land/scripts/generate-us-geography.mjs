import { readFileSync, writeFileSync } from "node:fs";
import { feature } from "topojson-client";

const topology = JSON.parse(readFileSync(new URL("../node_modules/us-atlas/states-10m.json", import.meta.url), "utf8"));
const states = feature(topology, topology.objects.states);
// Census 2017 cartographic boundaries redistributed by us-atlas 3.0.1.
// Four decimal places retain roughly 11m coordinate precision while keeping
// the shipped map small; the underlying cartographic dataset is 1:10m scale.
writeFileSync(new URL("../src/us-geography.json", import.meta.url), JSON.stringify(states, (_key, value) => typeof value === "number" ? Number(value.toFixed(4)) : value) + "\n");
