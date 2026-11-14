
import React, { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  useMap,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "./AnalogMap.css";

const analogLocations = [
  {
    id: 1,
    name: "Atacama Desert",
    country: "Chile",
    planet: "Mars",
    lat: -23.86,
    lng: -69.13,
    description: "Extremely dry desert with Mars-like soil and conditions.",
  },
  {
    id: 2,
    name: "Death Valley",
    country: "United States",
    planet: "Mars",
    lat: 36.24,
    lng: -116.82,
    description: "Arid landscape with extreme temperatures.",
  },
  {
    id: 3,
    name: "Iceland",
    country: "Iceland",
    planet: "Mars",
    lat: 64.96,
    lng: -19.02,
    description: "Volcanic terrain with glaciers and unusual geological features.",
  },
  {
    id: 4,
    name: "Antarctic Dry Valleys",
    country: "Antarctica",
    planet: "Mars",
    lat: -77.5,
    lng: 161.5,
    description: "Cold, dry landscape used for planetary analog research.",
  },
];

function MapController({ selectedAnalog }) {
  const map = useMap();

  useEffect(() => {
    if (!selectedAnalog) return;

    const location = analogLocations.find(
      (item) => item.id === selectedAnalog.id
    );

    if (location) {
      map.flyTo([location.lat, location.lng], 5, {
        duration: 1.5,
      });
    }
  }, [selectedAnalog, map]);

  return null;
}

function AnalogMap({ selectedAnalog, onSelectLocation }) {
  return (
    <section className="analog-map-section" id="analog-map">
      <div className="analog-map-heading">
        <span>GEOSPATIAL EXPLORATION</span>
        <h2>Earth Analog Locations</h2>
        <p>
          Explore Earth environments that help researchers understand
          planetary conditions.
        </p>
      </div>

      <div className="analog-map-container">
        <MapContainer
          center={[15, 0]}
          zoom={2}
          scrollWheelZoom={true}
          className="analog-leaflet-map"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MapController selectedAnalog={selectedAnalog} />

          {analogLocations.map((location) => (
            <CircleMarker
              key={location.id}
              center={[location.lat, location.lng]}
              radius={selectedAnalog?.id === location.id ? 12 : 8}
              pathOptions={{
                color:
                  selectedAnalog?.id === location.id
                    ? "#ffffff"
                    : "#38bdf8",
                fillColor:
                  selectedAnalog?.id === location.id
                    ? "#f59e0b"
                    : "#0ea5e9",
                fillOpacity: 0.9,
                weight: 3,
              }}
              eventHandlers={{
                click: () => onSelectLocation?.(location),
              }}
            >
              <Popup>
                <strong>{location.name}</strong>
                <br />
                {location.country}
                <br />
                Planetary analog: {location.planet}
                <br />
                {location.description}
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>
    </section>
  );
}

export default AnalogMap;
