// Approved public summaries, October 8, 2026. Public place centers only.
// Capture months do not imply arrivals, departures or continuous stays.
export const travelPlaceDetails = [
  { id: "goleta", name: "Goleta", countryId: "us", country: "United States", stateId: "06", region: "California", lat: 34.4358, lng: -119.8276, months: ["2019-11"], photos: 29, videos: 0 },
  { id: "cabo-san-lucas", name: "Cabo San Lucas", countryId: "mx", country: "Mexico", region: "Baja California Sur", lat: 22.8909, lng: -109.9124, months: ["2024-11", "2025-05"], photos: 15, videos: 3 },
  { id: "santa-barbara", name: "Santa Barbara area", countryId: "us", country: "United States", stateId: "06", region: "California", lat: 34.4508, lng: -119.7129, months: ["2023-05"], photos: 16, videos: 1 },
  { id: "granada-nicaragua", name: "Granada", countryId: "ni", country: "Nicaragua", region: "Granada", lat: 11.9306, lng: -85.9537, months: ["2022-06"], photos: 13, videos: 2 },
  { id: "zanzibar", name: "Kiwengwa / Zanzibar", countryId: "tz", country: "Tanzania", region: "Zanzibar", lat: -5.9896, lng: 39.3768, months: ["2019-12"], photos: 12, videos: 1 },
  { id: "rising-sun", name: "Rising Sun area", countryId: "us", country: "United States", stateId: "24", region: "Maryland", lat: 39.6979, lng: -76.0627, months: ["2025-08", "2026-07"], photos: 12, videos: 0 },
  { id: "san-juan-del-sur", name: "San Juan del Sur", countryId: "ni", country: "Nicaragua", region: "Rivas", lat: 11.2529, lng: -85.8705, months: ["2025-01", "2025-02"], photos: 6, videos: 0 },
  { id: "granada-spain", name: "Granada", countryId: "es", country: "Spain", region: "Andalusia", lat: 37.1882, lng: -3.6067, months: ["2024-06"], photos: 5, videos: 0 },
];
export const formatCaptureMonths = (place) => place.months.map((month) =>
  new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(`${month}-01T12:00:00Z`))
).join(" · ");
export const formatMediaCount = ({ photos, videos }) => [
  photos ? `${photos} photo${photos === 1 ? "" : "s"}` : null,
  videos ? `${videos} video${videos === 1 ? "" : "s"}` : null,
].filter(Boolean).join(" · ");
export const placeSummary = (place) => `Recorded: ${formatCaptureMonths(place)}. ${formatMediaCount(place)}.`;
