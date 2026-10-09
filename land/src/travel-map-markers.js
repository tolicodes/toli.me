import L from "leaflet";
import "leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import { placeSummary } from "./travel-place-details.js";

export function createTravelMarkers(map, places) {
  const group = L.markerClusterGroup({ animate: false, showCoverageOnHover: false,
    maxClusterRadius: 45, spiderfyOnMaxZoom: true,
    iconCreateFunction(cluster) {
      const count = cluster.getChildCount();
      return L.divIcon({ className: "travel-map-cluster", html: `<span aria-label="${count} places; zoom to explore">${count}</span>`, iconSize: [44, 44] });
    },
  });
  const icon = L.divIcon({ className: "us-map-pin", html: '<span class="us-map-pin-shape"></span>', iconSize: [28, 36], iconAnchor: [14, 32], popupAnchor: [0, -30] });
  const pins = new Map();
  for (const { key, label, ...place } of places) {
    const popup = document.createElement("p");
    popup.textContent = `${label}${place.months ? ` — ${placeSummary(place)}` : ""}`;
    const pin = L.marker([place.lat, place.lng], { icon, title: label, alt: label, keyboard: true })
      .bindTooltip(label, { direction: "top", offset: [0, -26] }).bindPopup(popup, {
        maxWidth: 230, autoPanPaddingTopLeft: [16, 16], autoPanPaddingBottomRight: [52, 16],
      });
    pin.on("add", () => pin.getElement()?.setAttribute("aria-label", label));
    group.addLayer(pin);
    pins.set(key, pin);
  }
  group.addTo(map);
  return { select(key) {
    const pin = pins.get(key);
    if (!pin) return;
    map.setView(pin.getLatLng(), Math.max(map.getZoom(), 7), { animate: false });
    group.zoomToShowLayer(pin, () => pin.openPopup());
  } };
}
