import { useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import "./ScientificCharts.css";

const siteData = {
  "Atacama Desert": {
    elevation: [
      { distance: "0 km", value: 1200 },
      { distance: "2 km", value: 1450 },
      { distance: "4 km", value: 1380 },
      { distance: "6 km", value: 1650 },
      { distance: "8 km", value: 1520 },
    ],
    temperature: [
      { period: "Morning", value: 12 },
      { period: "Noon", value: 28 },
      { period: "Afternoon", value: 35 },
      { period: "Evening", value: 19 },
    ],
    geology: [
      { parameter: "Rock", value: 55 },
      { parameter: "Sand", value: 30 },
      { parameter: "Soil", value: 15 },
    ],
  },
  "Death Valley": {
    elevation: [
      { distance: "0 km", value: -80 },
      { distance: "2 km", value: -65 },
      { distance: "4 km", value: -40 },
      { distance: "6 km", value: 150 },
      { distance: "8 km", value: 300 },
    ],
    temperature: [
      { period: "Morning", value: 24 },
      { period: "Noon", value: 39 },
      { period: "Afternoon", value: 46 },
      { period: "Evening", value: 30 },
    ],
    geology: [
      { parameter: "Rock", value: 35 },
      { parameter: "Sand", value: 45 },
      { parameter: "Soil", value: 20 },
    ],
  },
  Iceland: {
    elevation: [
      { distance: "0 km", value: 200 },
      { distance: "2 km", value: 450 },
      { distance: "4 km", value: 700 },
      { distance: "6 km", value: 580 },
      { distance: "8 km", value: 900 },
    ],
    temperature: [
      { period: "Morning", value: 2 },
      { period: "Noon", value: 8 },
      { period: "Afternoon", value: 10 },
      { period: "Evening", value: 4 },
    ],
    geology: [
      { parameter: "Rock", value: 70 },
      { parameter: "Sand", value: 15 },
      { parameter: "Soil", value: 15 },
    ],
  },
  "Antarctic Dry Valleys": {
    elevation: [
      { distance: "0 km", value: 500 },
      { distance: "2 km", value: 620 },
      { distance: "4 km", value: 780 },
      { distance: "6 km", value: 720 },
      { distance: "8 km", value: 950 },
    ],
    temperature: [
      { period: "Morning", value: -25 },
      { period: "Noon", value: -15 },
      { period: "Afternoon", value: -12 },
      { period: "Evening", value: -23 },
    ],
    geology: [
      { parameter: "Rock", value: 65 },
      { parameter: "Sand", value: 20 },
      { parameter: "Soil", value: 15 },
    ],
  },
};

export default function ScientificCharts() {
  const [location, setLocation] = useState("Atacama Desert");
  const data = siteData[location];

  return (
    <section className="scientific-section" id="scientific-visualization">
      <div className="scientific-heading">
        <small>SCIENTIFIC DATA ANALYTICS</small>
        <h2>Scientific Data Visualization</h2>
        <p>
          Explore illustrative terrain, thermal and geological parameters
          for selected terrestrial research locations.
        </p>
      </div>

      <div className="scientific-toolbar">
        <div>
          <label htmlFor="scientific-location">SELECT RESEARCH LOCATION</label>
          <select
            id="scientific-location"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
          >
            {Object.keys(siteData).map((site) => (
              <option key={site} value={site}>
                {site}
              </option>
            ))}
          </select>
        </div>

        <span className="demo-indicator">
          DEMONSTRATION DATA
        </span>
      </div>

      <div className="scientific-grid">
        <article className="scientific-chart-card">
          <div className="chart-card-heading">
            <div>
              <small>01 / TERRAIN ANALYSIS</small>
              <h3>Elevation Profile</h3>
            </div>
            <span className="chart-icon">⌁</span>
          </div>

          <p className="chart-description">
            Illustrative elevation changes across a sample profile.
          </p>

          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.elevation}>
                <CartesianGrid stroke="#263b54" strokeDasharray="3 3" />
                <XAxis
                  dataKey="distance"
                  stroke="#8ba2bd"
                  tick={{ fontSize: 10 }}
                />
                <YAxis
                  stroke="#8ba2bd"
                  tick={{ fontSize: 10 }}
                  width={48}
                />
                <Tooltip
                  contentStyle={{
                    background: "#10243a",
                    border: "1px solid #42617e",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  name="Elevation"
                  stroke="#72c5ff"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#72c5ff" }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <span className="chart-unit">Elevation · metres (m)</span>
        </article>

        <article className="scientific-chart-card">
          <div className="chart-card-heading">
            <div>
              <small>02 / THERMAL ANALYSIS</small>
              <h3>Temperature Profile</h3>
            </div>
            <span className="chart-icon">◉</span>
          </div>

          <p className="chart-description">
            Illustrative temperature variation throughout the day.
          </p>

          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.temperature}>
                <CartesianGrid stroke="#263b54" strokeDasharray="3 3" />
                <XAxis
                  dataKey="period"
                  stroke="#8ba2bd"
                  tick={{ fontSize: 10 }}
                />
                <YAxis
                  stroke="#8ba2bd"
                  tick={{ fontSize: 10 }}
                  width={42}
                />
                <Tooltip
                  contentStyle={{
                    background: "#10243a",
                    border: "1px solid #42617e",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                  formatter={(value) => [`${value} °C`, "Temperature"]}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  name="Temperature"
                  stroke="#ffad70"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#ffad70" }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <span className="chart-unit">Temperature · degrees Celsius (°C)</span>
        </article>

        <article className="scientific-chart-card geological-card">
          <div className="chart-card-heading">
            <div>
              <small>03 / GEOLOGICAL ANALYSIS</small>
              <h3>Surface Composition</h3>
            </div>
            <span className="chart-icon">◇</span>
          </div>

          <p className="chart-description">
            Illustrative distribution of surface material categories.
          </p>

          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.geology}>
                <CartesianGrid stroke="#263b54" strokeDasharray="3 3" />
                <XAxis
                  dataKey="parameter"
                  stroke="#8ba2bd"
                  tick={{ fontSize: 11 }}
                />
                <YAxis
                  stroke="#8ba2bd"
                  tick={{ fontSize: 10 }}
                  domain={[0, 100]}
                />
                <Tooltip
                  contentStyle={{
                    background: "#10243a",
                    border: "1px solid #42617e",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                  formatter={(value) => [`${value}%`, "Illustrative share"]}
                />
                <Legend />
                <Bar
                  dataKey="value"
                  name="Material share"
                  fill="#72d6b2"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <span className="chart-unit">Illustrative material share · percentage (%)</span>
        </article>
      </div>

      <div className="scientific-note">
        <span>ⓘ</span>
        <p>
          These values are simulated frontend demonstration data. They are
          not measured NASA observations. Replace them with validated
          scientific datasets during team integration.
        </p>
      </div>
    </section>
  );
}