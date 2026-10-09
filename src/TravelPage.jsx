import { useEffect, useMemo, useState } from "react";
import { geoGraticule10, geoNaturalEarth1, geoPath } from "d3-geo";
import { feature, mesh } from "topojson-client";
import world from "world-atlas/countries-110m.json";

const mapWidth = 1200;
const mapHeight = 620;

const visitedCountries = [
  { id: 124, name: "Canada", region: "North America" },
  { id: 188, name: "Costa Rica", region: "North America" },
  { id: 558, name: "Nicaragua", region: "North America" },
  { id: 840, name: "United States", region: "North America" },
  { id: 246, name: "Finland", region: "Europe" },
  { id: 250, name: "France", region: "Europe" },
  { id: 380, name: "Italy", region: "Europe" },
  { id: 643, name: "Russia", region: "Europe" },
  { id: 834, name: "Tanzania", region: "Africa" },
  { id: 376, name: "Israel", region: "Asia" },
  { id: 458, name: "Malaysia", region: "Asia" },
  { id: 764, name: "Thailand", region: "Asia" },
  { id: 704, name: "Vietnam", region: "Asia" },
  { id: 36, name: "Australia", region: "Oceania" },
];

const livedPlaces = [
  { name: "San Francisco", detail: "California, United States", coordinates: [-122.4194, 37.7749], offset: [-7, -6] },
  { name: "New York City", detail: "New York, United States", coordinates: [-74.006, 40.7128] },
  { name: "Hawaii", detail: "United States", coordinates: [-157.8583, 21.3069] },
  { name: "El Tránsito", detail: "León, Nicaragua", coordinates: [-86.70419, 12.05475] },
  { name: "Perth", detail: "Western Australia", coordinates: [115.86058, -31.9559] },
  { name: "Miami", detail: "Florida, United States", coordinates: [-80.1918, 25.7617] },
  { name: "Palo Alto", detail: "California, United States", coordinates: [-122.143, 37.4419], offset: [7, 6] },
  { name: "Nha Trang", detail: "Khánh Hòa, Vietnam", coordinates: [109.1833, 12.25] },
];

const regions = ["North America", "Europe", "Africa", "Asia", "Oceania"].map((region) => ({
  name: region,
  countries: visitedCountries.filter((country) => country.region === region),
}));

const visitedById = new Map(visitedCountries.map((country) => [country.id, country.name]));

/** Render the filled Natural Earth world map with visited and lived layers. */
function WorldMap() {
  const [activePlace, setActivePlace] = useState("Hover a country or a home");
  const paths = useMemo(() => {
    const countries = feature(world, world.objects.countries).features;
    const projection = geoNaturalEarth1().fitExtent(
      [
        [22, 22],
        [mapWidth - 22, mapHeight - 22],
      ],
      { type: "Sphere" },
    );
    const path = geoPath(projection);

    return {
      borders: path(mesh(world, world.objects.countries, (a, b) => a !== b)),
      countries: countries.map((country, index) => ({
        id: Number(country.id),
        key: country.id ?? `unnamed-${index}`,
        name: visitedById.get(Number(country.id)) ?? country.properties.name,
        path: path(country),
      })),
      graticule: path(geoGraticule10()),
      homes: livedPlaces.map((place) => {
        const [x, y] = projection(place.coordinates);
        const [offsetX = 0, offsetY = 0] = place.offset ?? [];

        return { ...place, x: x + offsetX, y: y + offsetY };
      }),
      sphere: path({ type: "Sphere" }),
    };
  }, []);

  const clearPlace = () => setActivePlace("Hover a country or a home");

  return (
    <div className="map-frame">
      <p className="map-readout" aria-live="polite">{activePlace}</p>
      <svg
        className="world-map"
        viewBox={`0 0 ${mapWidth} ${mapHeight}`}
        role="img"
        aria-labelledby="world-map-title world-map-description"
      >
        <title id="world-map-title">Countries Toli has visited</title>
        <desc id="world-map-description">
          A world map with fourteen visited countries filled in blue and eight
          lived-in places marked in coral.
        </desc>
        <path className="map-sphere" d={paths.sphere} />
        <path className="map-graticule" d={paths.graticule} />
        {paths.countries.map((country) => {
          const visited = visitedById.has(country.id);

          return (
            <path
              aria-label={visited ? `${country.name}, visited` : undefined}
              className={visited ? "map-country map-country--visited" : "map-country"}
              d={country.path}
              key={country.key}
              onBlur={visited ? clearPlace : undefined}
              onFocus={visited ? () => setActivePlace(country.name) : undefined}
              onMouseEnter={visited ? () => setActivePlace(country.name) : undefined}
              onMouseLeave={visited ? clearPlace : undefined}
              tabIndex={visited ? 0 : undefined}
            >
              <title>{visited ? `${country.name} — visited` : country.name}</title>
            </path>
          );
        })}
        <path className="map-borders" d={paths.borders} />
        {paths.homes.map((place) => (
          <g
            aria-label={`${place.name}, lived here`}
            className="map-home"
            key={place.name}
            onBlur={clearPlace}
            onFocus={() => setActivePlace(`${place.name} — lived here`)}
            onMouseEnter={() => setActivePlace(`${place.name} — lived here`)}
            onMouseLeave={clearPlace}
            tabIndex={0}
            transform={`translate(${place.x} ${place.y})`}
          >
            <circle className="map-home-pulse" r="12" />
            <circle className="map-home-dot" r="5" />
            <title>{place.name} — lived here</title>
          </g>
        ))}
      </svg>
      <div className="map-legend" aria-label="Map legend">
        <span><i className="swatch swatch--visited" /> Been there</span>
        <span><i className="swatch swatch--home" /> Lived there</span>
        <span><i className="swatch" /> Still curious</span>
      </div>
    </div>
  );
}

/** Render the dedicated places page. */
export function TravelPage() {
  useEffect(() => {
    document.title = "Places I’ve Been — Toli Zaslavskiy";
  }, []);

  return (
    <>
      <header className="site-head">
        <a className="brand" href="/">toli.me</a>
        <nav aria-label="Primary">
          <a href="/#build">Build</a>
          <a href="/#speaking">Speak</a>
          <a href="/#writing">Write</a>
          <a href="/#play">Play</a>
          <a href="/places" aria-current="page">Places</a>
        </nav>
        <a className="say-hi" href="mailto:toli@toli.me">Say hi</a>
      </header>

      <main>
        <section className="hero hero--places" aria-labelledby="places-title">
          <div className="hero-copy">
            <p className="hero-kicker">Places I’ve been</p>
            <h1 id="places-title">The world,<br />so far</h1>
            <p className="hero-deck">
              Fourteen countries across five continents, and eight places that
              turned into homes. More blank space means more reasons to go.
            </p>
            <div className="hero-facts" role="list">
              <span role="listitem"><strong>14</strong> countries</span>
              <span role="listitem"><strong>5</strong> continents</span>
              <span role="listitem"><strong>8</strong> homes</span>
            </div>
          </div>
        </section>

        <section className="index-section" aria-label="World map">
          <WorldMap />
        </section>

        <section className="index-section" id="stamps" aria-labelledby="stamps-title">
          <header className="index-section-head">
            <span className="section-number">01</span>
            <div>
              <h2 id="stamps-title">Every stamp, in plain text</h2>
              <p>The full list, by region.</p>
            </div>
          </header>
          {regions.map((region) => (
            <div className="ledger" key={region.name}>
              <p className="ledger-region">{region.name}</p>
              {region.countries.map((country, index) => (
                <p className="ledger-row ledger-row--static" key={country.name}>
                  <span className="ledger-index">{String(index + 1).padStart(2, "0")}</span>
                  <span className="ledger-label">{country.name}</span>
                </p>
              ))}
            </div>
          ))}
        </section>

        <section className="index-section" id="homes" aria-labelledby="homes-title">
          <header className="index-section-head">
            <span className="section-number">02</span>
            <div>
              <h2 id="homes-title">Places that felt like home</h2>
              <p>Where visiting turned into staying a while.</p>
            </div>
          </header>
          <div className="ledger">
            {livedPlaces.map((place, index) => (
              <p className="ledger-row ledger-row--static" key={place.name}>
                <span className="ledger-index">{String(index + 1).padStart(2, "0")}</span>
                <span className="ledger-label">{place.name}</span>
                <span className="ledger-note">{place.detail}</span>
              </p>
            ))}
          </div>
        </section>
      </main>

      <footer className="site-foot">
        <h2>Still curious. Still packing.</h2>
        <p><a href="/">← Back to the index</a></p>
        <a className="foot-email" href="mailto:toli@toli.me">toli@toli.me</a>
      </footer>
    </>
  );
}
