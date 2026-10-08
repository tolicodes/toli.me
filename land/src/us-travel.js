// Explicit selections from Toli, October 7, 2026. Coordinates are approximate
// city centers; Kauai is represented by an island-center pin, not a city.
export const getUsMapFeatures = (features, hawaii = false) => features.filter(({ id }) => hawaii ? id === "15" : Number(id) <= 56 && !["02", "15"].includes(id));

export const usTravel = [
  { id: "12", name: "Florida", places: [
    { name: "Miami", lat: 25.7617, lng: -80.1918 },
    { name: "Orlando", lat: 28.5383, lng: -81.3792 },
  ] },
  { id: "36", name: "New York", places: [{ name: "New York City", lat: 40.7128, lng: -74.0060 }] },
  { id: "06", name: "California", places: [
    { name: "Los Angeles", lat: 34.0522, lng: -118.2437 },
    { name: "San Francisco", lat: 37.7749, lng: -122.4194 },
    { name: "San Diego", lat: 32.7157, lng: -117.1611 },
    { name: "Palm Springs", lat: 33.8303, lng: -116.5453 },
  ] },
  { id: "32", name: "Nevada", places: [{ name: "Las Vegas", lat: 36.1699, lng: -115.1398 }] },
  { id: "15", name: "Hawaii", places: [
    { name: "Honolulu", lat: 21.3099, lng: -157.8581 },
    { name: "Kauai", lat: 22.0964, lng: -159.5261, kind: "island" },
  ] },
  { id: "53", name: "Washington", places: [{ name: "Seattle", lat: 47.6062, lng: -122.3321 }] },
  { id: "25", name: "Massachusetts", places: [{ name: "Boston", lat: 42.3601, lng: -71.0589 }] },
  { id: "04", name: "Arizona", places: [{ name: "Sedona", lat: 34.8697, lng: -111.7610 }] },
  { id: "41", name: "Oregon", places: [{ name: "Portland", lat: 45.5152, lng: -122.6784 }] },
  { id: "48", name: "Texas", places: [{ name: "Fort Worth", lat: 32.7555, lng: -97.3308 }] },
  { id: "49", name: "Utah", places: [{ name: "Springdale / Zion National Park", lat: 37.1889, lng: -112.9986 }] },
  { id: "34", name: "New Jersey", places: [{ name: "Jersey City", lat: 40.7178, lng: -74.0431 }] },
  { id: "09", name: "Connecticut", places: [{ name: "New Haven", lat: 41.3083, lng: -72.9279 }] },
  { id: "42", name: "Pennsylvania", places: [{ name: "Philadelphia", lat: 39.9526, lng: -75.1652 }] },
  { id: "17", name: "Illinois", places: [{ name: "Pontoon Beach", lat: 38.7317, lng: -90.0804 }] },
  { id: "50", name: "Vermont", places: [{ name: "Killington", lat: 43.6639, lng: -72.7906 }] },
  { id: "37", name: "North Carolina", places: [{ name: "Charlotte", lat: 35.2271, lng: -80.8431 }] },
  { id: "11", name: "District of Columbia", kind: "district", places: [{ name: "Washington, D.C.", lat: 38.9072, lng: -77.0369 }] },
];
