import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import geography from "./world-geography.json";
import { travelGeographyIds } from "./travel-map.js";
import { travelArchive } from "./personal-content.js";
import { travelPlaceDetails, placeSummary } from "./travel-place-details.js";
import { createTravelMarkers } from "./travel-map-markers.js";
import "./us-travel-map.css";

export function TravelMap() {
  const container = useRef(null);
  const controller = useRef(null);
  useEffect(() => {
    const map = L.map(container.current, { center: [20, 0], zoom: 1.5, minZoom: 1, maxZoom: 12,
      zoomSnap: .1, zoomDelta: .5, scrollWheelZoom: false, attributionControl: false,
      zoomControl: false, zoomAnimation: false, fadeAnimation: false, markerZoomAnimation: false });
    L.control.zoom({ position: "topright" }).addTo(map);
    const visited = new Set(travelArchive.countries.map(({ id }) => travelGeographyIds[id]));
    L.geoJSON(geography, { interactive: false, style: ({ id }) => ({
      className: `world-map-country${visited.has(id) ? " is-visited" : ""}`,
      fillColor: visited.has(id) ? "#527550" : "#dddccc", fillOpacity: 1,
      color: "#fcfaf1", weight: .8,
    }) }).addTo(map);
    const markers = createTravelMarkers(map, travelPlaceDetails.map((place) => ({
      ...place, key: place.id, label: `${place.name}, ${place.country}`,
    })));
    const reset = () => { map.closePopup(); map.fitBounds([[-55, -175], [78, 180]], { padding: [12, 12], animate: false }); };
    const observer = new ResizeObserver(() => { map.invalidateSize(); reset(); });
    observer.observe(container.current);
    reset();
    controller.current = { reset, select(id) {
      markers.select(id);
      container.current.scrollIntoView({ block: "center", behavior: "instant" });
    } };
    return () => { observer.disconnect(); controller.current = null; map.remove(); };
  }, []);
  return <section className="personal-world-travels" aria-labelledby="world-travel-heading">
    <div className="us-travel-heading"><div><h2 id="world-travel-heading">Around the world</h2><p>Tap a group to zoom in, or choose a place below.</p></div><button className="us-map-reset" onClick={() => controller.current?.reset()}>Reset view</button></div>
    <figure className="personal-travel-map">
      <div ref={container} className="world-map-panel" role="region" aria-label={`World map highlighting ${travelArchive.countries.length} countries with eight dated places`} />
      <figcaption><span className="personal-travel-map-key"><span aria-hidden="true" />Places I’ve been</span><a href="https://www.naturalearthdata.com/" target="_blank" rel="noopener noreferrer">Map: Natural Earth / Leaflet<span className="personal-sr-only"> (opens in a new tab)</span></a></figcaption>
    </figure>
    <div className="world-travel-places">{travelPlaceDetails.map((place) => <article key={place.id}>
      <button onClick={() => controller.current?.select(place.id)}>{place.name}</button><p className="travel-place-region">{place.region}, {place.country}</p><p className="travel-place-data">{placeSummary(place)}</p>
    </article>)}</div>
    <p className="personal-archive-note">Dates mark photos and videos in my archive, rather than the length of a stay. Pins mark approximate place centers, rounded from <a href="https://www.geonames.org/" target="_blank" rel="noopener noreferrer">GeoNames</a> (<a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer">CC BY 4.0</a>).</p>
  </section>;
}
