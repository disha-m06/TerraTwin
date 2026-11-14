
import { useState } from "react";
import "./SimilarityRanking.css";

const rankingData = {
  Mars: [
    { name: "Atacama Desert", country: "Chile", score: 92, terrain: 95, thermal: 89, geology: 91 },
    { name: "Antarctic Dry Valleys", country: "Antarctica", score: 85, terrain: 88, thermal: 90, geology: 77 },
    { name: "Death Valley", country: "United States", score: 79, terrain: 82, thermal: 91, geology: 64 },
    { name: "Iceland", country: "Iceland", score: 68, terrain: 75, thermal: 55, geology: 81 },
  ],
  Moon: [
    { name: "Antarctic Dry Valleys", country: "Antarctica", score: 89, terrain: 91, thermal: 87, geology: 88 },
    { name: "Atacama Desert", country: "Chile", score: 81, terrain: 85, thermal: 78, geology: 80 },
    { name: "Iceland", country: "Iceland", score: 73, terrain: 79, thermal: 62, geology: 84 },
    { name: "Death Valley", country: "United States", score: 66, terrain: 72, thermal: 76, geology: 55 },
  ],
};

function ScoreBar({ label, value }) {
  return (
    <div className="score-metric">
      <div className="score-metric-label">
        <span>{label}</span>
        <strong>{value}%</strong>
      </div>
      <div className="score-track">
        <div className="score-fill" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

export default function SimilarityRanking() {
  const [target, setTarget] = useState("Mars");
  const [selected, setSelected] = useState(0);

  const results = rankingData[target];
  const selectedResult = results[selected];

  const changeTarget = (value) => {
    setTarget(value);
    setSelected(0);
  };

  return (
    <section className="similarity-section" id="similarity-ranking">
      <div className="similarity-heading">
        <small>PLANETARY ANALOG MATCH ENGINE</small>
        <h2>Similarity Ranking Dashboard</h2>
        <p>
          Explore sample Earth analog rankings against planetary
          environmental reference conditions.
        </p>
      </div>

      <div className="similarity-toolbar">
        <div>
          <label htmlFor="target-planet">SELECT TARGET PLANET</label>
          <select
            id="target-planet"
            value={target}
            onChange={(event) => changeTarget(event.target.value)}
          >
            <option value="Mars">Mars</option>
            <option value="Moon">Moon</option>
          </select>
        </div>

        <span className="similarity-demo">ILLUSTRATIVE SAMPLE SCORES</span>
      </div>

      <div className="ranking-layout">
        <div className="ranking-list-panel">
          <div className="ranking-panel-heading">
            <div>
              <small>RANKED EARTH LOCATIONS</small>
              <h3>Top Analog Matches</h3>
            </div>
            <span>04 SITES</span>
          </div>

          {results.map((item, index) => (
            <button
              key={item.name}
              className={`ranking-item ${selected === index ? "active" : ""}`}
              onClick={() => setSelected(index)}
            >
              <span className="ranking-number">
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className="ranking-name">
                <strong>{item.name}</strong>
                <small>{item.country}</small>
              </span>

              <span className="ranking-score">{item.score}%</span>
            </button>
          ))}
        </div>

        <div className="ranking-detail-panel">
          <small className="detail-eyebrow">SELECTED ANALOG MATCH</small>

          <h3>{selectedResult.name}</h3>
          <p className="ranking-country">{selectedResult.country}</p>

          <div className="overall-score">
            <div>
              <span>OVERALL SIMILARITY</span>
              <strong>{selectedResult.score}%</strong>
            </div>
            <div className="score-circle">
              {selectedResult.score}
            </div>
          </div>

          <div className="parameter-scores">
            <h4>PARAMETER COMPARISON</h4>
            <ScoreBar label="Terrain similarity" value={selectedResult.terrain} />
            <ScoreBar label="Thermal similarity" value={selectedResult.thermal} />
            <ScoreBar label="Geological similarity" value={selectedResult.geology} />
          </div>

          <div className="ranking-disclaimer">
            <span>ⓘ</span>
            <p>
              Demonstration scores only. These are not calculated by
              Member 3's algorithm or validated scientific results.
              Actual scores will be connected after algorithm integration.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
