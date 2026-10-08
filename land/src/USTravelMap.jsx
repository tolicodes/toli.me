import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import geography from "./us-geography.json";
import { getUsMapFeatures, usTravel } from "./us-travel.js";
import "./us-travel-map.css";

function MapPanel({ hawaii = false, controller }) {
  const container = useRef(null);
  useEffect(() => {
    const map = L.map(container.current, {
      center: hawaii ? [21.5, -157.5] : [38, -96], zoom: hawaii ? 6 : 4,
      scrollWheelZoom: false, zoomSnap: .1, zoomDelta: .5, minZoom: hawaii ? 5 : 2,
      maxZoom: 10, zoomAnimation: false, fadeAnimation: false, markerZoomAnimation: false,
      attributionControl: false, zoomControl: false,
    });
    L.control.zoom({ position: "topright" }).addTo(map);
    const states = getUsMapFeatures(geography.features, hawaii);
    const selected = new Set(usTravel.map(({ id }) => id));
    const outlines = L.geoJSON(states, { interactive: false, style: ({ id }) => ({
      className: `us-map-state${selected.has(id) ? " is-visited" : ""}`,
      fillColor: selected.has(id) ? "#527550" : "#dddccc", fillOpacity: 1,
      color: "#fcfaf1", weight: 1.2,
    }) }).addTo(map);
    const pins = new Map();
    const icon = L.divIcon({ className: "us-map-pin", html: '<span class="us-map-pin-shape"></span>', iconSize: [28, 36], iconAnchor: [14, 32], popupAnchor: [0, -30] });
    for (const state of usTravel.filter(({ id }) => hawaii ? id === "15" : id !== "15")) {
      for (const place of state.places) {
        const label = `${place.name}, ${state.name}${place.kind === "island" ? " (island)" : ""}`;
        const popup = document.createElement("p");
        popup.textContent = label;
        const pin = L.marker([place.lat, place.lng], { icon, title: label, alt: label, keyboard: true })
          .bindTooltip(label, { direction: "top", offset: [0, -26] })
          .bindPopup(popup, { autoPanPadding: [28, 28] }).addTo(map);
        pin.getElement().setAttribute("aria-label", label);
        pins.set(place.name, pin);
      }
    }
    const reset = () => { map.closePopup(); map.fitBounds(outlines.getBounds(), { padding: hawaii ? [24, 24] : [22, 30], animate: false }); };
    const fitOnResize = () => { map.invalidateSize(); reset(); };
    const observer = new ResizeObserver(fitOnResize);
    observer.observe(container.current);
    reset();
    controller.current = { reset, select(name) {
      const pin = pins.get(name);
      if (!pin) return;
      map.setView(pin.getLatLng(), Math.max(map.getZoom(), hawaii ? 7 : 6), { animate: false });
      pin.openPopup();
      container.current.scrollIntoView({ block: "center", behavior: "instant" });
    } };
    return () => { observer.disconnect(); controller.current = null; map.remove(); };
  }, [hawaii, controller]);
  return <div ref={container} className={`us-map-panel${hawaii ? " us-map-panel--hawaii" : ""}`} role="region" aria-label={hawaii ? "Hawaii map with Honolulu and Kauai pins" : "United States mainland map with city pins"} />;
}

export default function USTravelMap() {
  const mainland = useRef(null);
  const hawaii = useRef(null);
  const stateCount = usTravel.filter(({ kind }) => kind !== "district").length;
  const placeCount = usTravel.reduce((total, { places }) => total + places.length, 0);
  return <section className="personal-us-travels" aria-labelledby="us-travel-heading">
    <div className="us-travel-heading"><div><h2 id="us-travel-heading">Around the United States</h2><p>{stateCount} states{usTravel.some(({ kind }) => kind === "district") ? " + D.C." : ""}, {placeCount} places along the way.</p></div><button className="us-map-reset" onClick={() => { mainland.current?.reset(); hawaii.current?.reset(); }}>Reset view</button></div>
    <div className="us-map-layout"><MapPanel controller={mainland} /><aside className="us-hawaii-inset"><h3>Hawaii</h3><MapPanel hawaii controller={hawaii} /></aside></div>
    <div className="us-map-caption"><span><i className="us-state-key" aria-hidden="true" />States & D.C. I’ve visited <i className="us-pin-key" aria-hidden="true" />Places I’ve been</span><a href="https://github.com/topojson/us-atlas" target="_blank" rel="noopener noreferrer">Map: U.S. Census / Leaflet<span className="personal-sr-only"> (opens in a new tab)</span></a></div>
    <p className="us-map-hint">Tap a pin or a place below. Zoom in to explore.</p>
    <div className="us-travel-list">{usTravel.map((state) => <section key={state.id}><h3>{state.name}</h3><ul>{state.places.map((place) => <li key={place.name}><button onClick={() => (state.id === "15" ? hawaii : mainland).current?.select(place.name)}>{place.name}{place.kind === "island" && <span> · island</span>}</button></li>)}</ul></section>)}</div>
  </section>;
}
