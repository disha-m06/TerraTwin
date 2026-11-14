import { useMemo, useState } from "react";
import Planet3D from "../components/Planet3D";
import "./PlanetShowcase.css";
import ScientificCharts from "../charts/ScientificCharts";
import SimilarityRanking from "../components/SimilarityRanking";
import AnalogMap from "../maps/AnalogMap";

const planets = [
  {
    id: "earth",
    name: "Earth",
    number: "01",
    description:
      "Explore Earth's terrain, climate and environmental conditions.",
  },
  {
    id: "moon",
    name: "Moon",
    number: "02",
    description: "Explore lunar craters, elevation and polar regions.",
  },
  {
    id: "mars",
    name: "Mars",
    number: "03",
    description:
      "Explore Martian landscapes, topography and thermal patterns.",
  },
];

const analogLocations = [
  {
    id: 1,
    name: "Atacama Desert",
    country: "Chile",
    type: "Arid Desert",
    description:
      "One of the driest regions on Earth, useful for studying extremely dry environments.",
    terrain: "Rocky desert",
    climate: "Extremely dry",
    geology: "Volcanic formations",
    temperature: "High daytime variation",
    elevation: "High-altitude regions",
    planet: "Mars",
    score: null,
    color: "orange",
    coordinates: "23.86° S, 69.13° W",
  },
  {
    id: 2,
    name: "Death Valley",
    country: "United States",
    type: "Extreme Desert",
    description:
      "A hot desert environment with exposed rocks, dry basins and varied landforms.",
    terrain: "Rocky basins",
    climate: "Extremely hot and dry",
    geology: "Sedimentary formations",
    temperature: "Extreme heat",
    elevation: "Below sea level to mountain terrain",
    planet: "Mars",
    score: null,
    color: "red",
    coordinates: "36.24° N, 116.82° W",
  },
  {
    id: 3,
    name: "Iceland",
    country: "Iceland",
    type: "Volcanic Terrain",
    description:
      "A landscape shaped by volcanic activity, lava fields and geothermal processes.",
    terrain: "Lava fields",
    climate: "Cold and variable",
    geology: "Volcanic rock",
    temperature: "Cold conditions",
    elevation: "Volcanic highlands",
    planet: "Mars",
    score: null,
    color: "purple",
    coordinates: "64.96° N, 19.02° W",
  },
  {
    id: 4,
    name: "Antarctic Dry Valleys",
    country: "Antarctica",
    type: "Polar Desert",
    description:
      "A cold, extremely dry environment with exposed rocky terrain and limited ice cover.",
    terrain: "Exposed rocky valleys",
    climate: "Extremely cold and dry",
    geology: "Ancient exposed rocks",
    temperature: "Very low temperatures",
    elevation: "Polar valley terrain",
    planet: "Mars",
    score: null,
    color: "blue",
    coordinates: "77.50° S, 161.50° E",
  },
];

export default function PlanetShowcase() {
  const [selected, setSelected] = useState(0);
  const [search, setSearch] = useState("");
  const [selectedAnalog, setSelectedAnalog] = useState(analogLocations[0]);
  const [comparison, setComparison] = useState(analogLocations[0].id);

  const filteredLocations = useMemo(() => {
    return analogLocations.filter((location) => {
      const searchText =
        `${location.name} ${location.country} ${location.type}`.toLowerCase();

      return searchText.includes(search.toLowerCase());
    });
  }, [search]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="terra-dashboard">
      {/* NAVIGATION */}
      <header className="terra-nav">
        <div className="terra-brand">
          <div className="terra-logo">◎</div>
          <div>
            <h2>TERRATWIN</h2>
            <small>PLANETARY ANALOG RESEARCH</small>
          </div>
        </div>

        <nav className="terra-links">
          <button onClick={() => scrollTo("dashboard")}>Dashboard</button>
          <button onClick={() => scrollTo("earth-analogs")}>
            Earth Analogs
          </button>
          <button
            onClick={() => {
              setSelected(1);
              scrollTo("planet-explorer");
            }}
          >
            Moon Research
          </button>
          <button
            onClick={() => {
              setSelected(2);
              scrollTo("planet-explorer");
            }}
          >
            Mars Research
          </button>
          <button onClick={() => scrollTo("analog-comparison")}>
            Compare
          </button>
        </nav>
      </header>

      <main id="dashboard">
        {/* HERO SECTION */}
        <section className="terra-hero">
          <div className="hero-content">
            <div className="terra-label">
              <span className="status-dot"></span>
              PLANETARY RESEARCH PLATFORM
            </div>

            <h1>
              Explore. Discover.
              <br />
              <span>Find Earth's Planetary Twins.</span>
            </h1>

            <p>
              An interactive Earth–Moon–Mars environment for exploring
              planetary surfaces, comparing scientific parameters and
              discovering terrestrial analog locations.
            </p>

            <div className="terra-actions">
              <button
                className="primary-action"
                onClick={() => scrollTo("earth-analogs")}
              >
                EXPLORE EARTH ANALOGS ↗
              </button>

              <button
                className="secondary-action"
                onClick={() => scrollTo("planet-explorer")}
              >
                COMPARE PLANETS ◎
              </button>
            </div>
          </div>

          {/* PLANETARY VISUAL */}
          <div className="hero-space">
            <div className="space-stars"></div>

            <div className="hero-orbit orbit-one"></div>
            <div className="hero-orbit orbit-two"></div>
            <div className="hero-orbit orbit-three"></div>

            <div className="hero-earth">
              <Planet3D planet="earth" />
            </div>

            <div className="hero-moon">
              <Planet3D planet="moon" />
            </div>

            <div className="hero-mars">
              <Planet3D planet="mars" />
            </div>

            <div className="planet-tag earth-tag">
              <small>PRIMARY PLANET</small>
              <strong>EARTH</strong>
            </div>

            <div className="planet-tag moon-tag">
              <small>REFERENCE BODY</small>
              <strong>MOON</strong>
            </div>

            <div className="planet-tag mars-tag">
              <small>REFERENCE BODY</small>
              <strong>MARS</strong>
            </div>

            <div className="space-caption">EARTH · MOON · MARS</div>
          </div>
        </section>

        {/* RESEARCH STATUS PANELS */}
        <section className="terra-stats">
          <div className="stat-card">
            <div className="stat-icon blue-icon">◉</div>
            <small>PLANETARY BODIES</small>
            <h2>03</h2>
            <p>Earth · Moon · Mars</p>
          </div>

          <div className="stat-card">
            <div className="stat-icon purple-icon">▤</div>
            <small>DATA INTEGRATION</small>
            <h2>NASA</h2>
            <p>Scientific dataset workspace</p>
          </div>

          <div className="stat-card">
            <div className="stat-icon green-icon">⌁</div>
            <small>ANALYSIS MODULES</small>
            <h2>03</h2>
            <p>Terrain · Thermal · Geology</p>
          </div>

          <div className="stat-card">
            <div className="stat-icon orange-icon">⌖</div>
            <small>ANALOG EXPLORATION</small>
            <h2>04</h2>
            <p>Earth analog research locations</p>
          </div>
        </section>

        {/* EARTH ANALOG EXPLORER */}
        <section className="analog-section" id="earth-analogs">
          <div className="section-heading">
            <small>TERRESTRIAL RESEARCH DATABASE</small>
            <h2>Earth Analog Explorer</h2>
            <p>
              Explore terrestrial environments that can help researchers
              study planetary surface conditions.
            </p>
          </div>

          <div className="analog-toolbar">
            <div className="analog-search">
              <span>⌕</span>
              <input
                type="text"
                placeholder="Search locations, countries or terrain..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>

            <div className="analog-count">
              {filteredLocations.length} LOCATIONS FOUND
            </div>
          </div>

          <div className="analog-layout">
            <div className="analog-location-list">
              {filteredLocations.length === 0 ? (
                <div className="analog-empty">
                  No matching locations found.
                </div>
              ) : (
                filteredLocations.map((location) => (
                  <button
                    className={`analog-card ${
                      selectedAnalog.id === location.id ? "selected" : ""
                    }`}
                    key={location.id}
                    onClick={() => {
  setSelectedAnalog(location);
  setComparison(location.id);
}}
                  >
                    <div className={`analog-symbol ${location.color}`}>
                      {location.id.toString().padStart(2, "0")}
                    </div>

                    <div className="analog-card-content">
                      <h3>{location.name}</h3>
                      <p>{location.country}</p>
                      <span>{location.type}</span>
                    </div>

                    <div className="analog-arrow">↗</div>
                  </button>
                ))
              )}
            </div>

            <div className="analog-details">
              <div className="analog-detail-top">
                <div>
                  <small>SELECTED RESEARCH LOCATION</small>
                  <h3>{selectedAnalog.name}</h3>
                  <p>{selectedAnalog.country}</p>
                </div>

                <span className="analog-type">
                  {selectedAnalog.type}
                </span>
              </div>

              <p className="analog-description">
                {selectedAnalog.description}
              </p>

              <div className="analog-coordinate">
                <span>LOCATION COORDINATES</span>
                <strong>{selectedAnalog.coordinates}</strong>
              </div>

              <div className="analog-property-grid">
                <div className="analog-property">
                  <small>TERRAIN</small>
                  <strong>{selectedAnalog.terrain}</strong>
                </div>

                <div className="analog-property">
                  <small>CLIMATE</small>
                  <strong>{selectedAnalog.climate}</strong>
                </div>

                <div className="analog-property">
                  <small>GEOLOGY</small>
                  <strong>{selectedAnalog.geology}</strong>
                </div>

                <div className="analog-property">
                  <small>THERMAL CONDITIONS</small>
                  <strong>{selectedAnalog.temperature}</strong>
                </div>
              </div>

              <div className="analog-reference">
                <span>RESEARCH REFERENCE</span>
                <strong>{selectedAnalog.planet}</strong>
                <p>
                  Potential terrestrial environment for comparative
                  planetary research. This is not an algorithm-generated
                  match.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SIMILARITY COMPARISON */}
        <section className="comparison-section" id="analog-comparison">
          <div className="section-heading">
            <small>PLANETARY ANALYSIS WORKSPACE</small>
            <h2>Analog Comparison</h2>
            <p>
              Select a location to prepare its terrain, thermal and geological
              properties for comparison.
            </p>
          </div>

          <div className="comparison-panel">
            <div className="comparison-select">
              <label htmlFor="comparison-location">
                SELECT EARTH ANALOG
              </label>

              <select
                id="comparison-location"
                value={comparison}
                onChange={(event) => {
                  const location = analogLocations.find(
                    (item) => item.id === Number(event.target.value)
                  );

                  if (location) {
                    setComparison(location.id);
                    setSelectedAnalog(location);
                  }
                }}
              >
                {analogLocations.map((location) => (
                  <option key={location.id} value={location.id}>
                    {location.name} — {location.country}
                  </option>
                ))}
              </select>
            </div>

            <div className="comparison-target">
              <div>
                <small>EARTH REFERENCE</small>
                <h3>
                  {
                    analogLocations.find((item) => item.id === comparison)
                      ?.name
                  }
                </h3>
              </div>

              <div className="comparison-symbol">⇄</div>

              <div>
                <small>PLANETARY TARGET</small>
                <h3>Mars / Moon</h3>
              </div>
            </div>

            <div className="comparison-placeholder">
              <div className="comparison-placeholder-icon">◎</div>
              <h3>Similarity analysis awaiting integration</h3>
              <p>
                This workspace is ready to display the similarity score,
                parameter differences and ranked analog results from Member
                3's algorithm.
              </p>
              <span>DEMONSTRATION DATA · NO VERIFIED SCORE AVAILABLE</span>
            </div>
          </div>
        </section>
        {/* SCIENTIFIC DATA VISUALIZATION */}
<ScientificCharts />

<AnalogMap
  selectedAnalog={selectedAnalog}
  onSelectLocation={(location) => {
    const matchingLocation = analogLocations.find(
      (item) => item.id === location.id
    );

    if (matchingLocation) {
      setSelectedAnalog(matchingLocation);
      setComparison(matchingLocation.id);
    }
  }}
/>

<SimilarityRanking />

        {/* PLANET EXPLORER */}
        <section className="planet-explorer" id="planet-explorer">
          <div className="section-heading">
            <small>PLANETARY DATA EXPLORER</small>
            <h2>Explore the Three Worlds</h2>
            <p>Select a planetary body to explore its 3D surface.</p>
          </div>

          <div className="planet-tabs">
            {planets.map((item, index) => (
              <button
                key={item.id}
                className={selected === index ? "active" : ""}
                onClick={() => setSelected(index)}
              >
                {item.name}
              </button>
            ))}
          </div>

          <div className="selected-planet">
            <div className="planet-view">
              <Planet3D
                key={planets[selected].id}
                planet={planets[selected].id}
              />
            </div>

            <div className="selected-planet-info">
              <small>
                PLANETARY BODY {planets[selected].number}
              </small>

              <h3>{planets[selected].name}</h3>

              <p>{planets[selected].description}</p>

              <p>NASA planetary imagery and surface exploration.</p>

              <div className="explorer-status">
                <span className="status-dot"></span>
                3D SURFACE VIEW ACTIVE
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="terra-footer">
        TERRATWIN · EARTH–MOON–MARS ANALOG EXPLORATION PLATFORM
      </footer>
    </div>
  );
}