import React, { useId } from "react";
import geography from "./travel-geography.json";
import { travelGeographyIds } from "./travel-map.js";
import { travelArchive } from "./personal-content.js";

export function TravelMap() {
  const titleId = useId();
  const descriptionId = useId();
  const visited = new Map(travelArchive.countries.map((country) => [travelGeographyIds[country.id], country.name]));
  return <figure className="personal-travel-map">
    <svg viewBox={`0 0 ${geography.width} ${geography.height}`} role="img" aria-labelledby={`${titleId} ${descriptionId}`}>
      <title id={titleId}>Places I’ve been, around the world</title>
      <desc id={descriptionId}>Green highlights the {visited.size} countries in my travel archive: {travelArchive.countries.map(({ name }) => name).join(", ")}. The country list follows below.</desc>
      {geography.countries.map(({ id, name, path }) => <path key={id || name} d={path} className={visited.has(id) ? "is-visited" : undefined} data-country-id={id}>
        <title>{visited.has(id) ? `${visited.get(id)} · visited` : name}</title>
      </path>)}
    </svg>
    <figcaption><span className="personal-travel-map-key"><span aria-hidden="true" />Places I’ve been</span><a href="https://www.naturalearthdata.com/" target="_blank" rel="noopener noreferrer">Map: Natural Earth<span className="personal-sr-only"> (opens in a new tab)</span></a></figcaption>
  </figure>;
}
