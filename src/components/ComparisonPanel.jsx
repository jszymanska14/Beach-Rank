import './ComparisonPanel.css'

function ComparisonPanel({ beaches, onClear }) {
  if (beaches.length === 0) return null

  return (
    <div className="comparison-panel">
      <div className="comparison-header">
        <h2>Porównanie plaż ({beaches.length})</h2>
        <button className="clear-btn" onClick={onClear}>Wyczyść</button>
      </div>

      <div className="comparison-grid">
        {beaches.map(beach => (
          <div key={beach.id} className="comparison-card">
            <h3>{beach.name}</h3>
            <p className="beach-location">{beach.city}</p>
            
            <div className="comparison-stats">
              <div className="comparison-stat">
                <span className="label">Temp. powietrza</span>
                <span className="value">{beach.temperature}°C</span>
              </div>
              <div className="comparison-stat">
                <span className="label">Temp. wody</span>
                <span className="value">{beach.waterTemperature}°C</span>
              </div>
              <div className="comparison-stat">
                <span className="label">Wiatr</span>
                <span className="value">{beach.windSpeed} km/h</span>
              </div>
              <div className="comparison-stat">
                <span className="label">Sinice</span>
                <span className={`value ${beach.cyanobacteria ? 'bad' : 'good'}`}>
                  {beach.cyanobacteria ? 'Tak' : 'Nie'}
                </span>
              </div>
              <div className="comparison-stat">
                <span className="label">Jakość powietrza</span>
                <span className="value">{beach.airQuality}%</span>
              </div>
              <div className="comparison-stat">
                <span className="label">Zatłoczenie</span>
                <span className="value">{beach.crowding}%</span>
              </div>
              {(beach.surfing || beach.windsurfing || beach.kitesurfing) && (
                <div className="comparison-stat sport-comparison">
                  <span className="label">Sporty wodne</span>
                  <div className="sport-icons">
                    {beach.surfing && <span title="Surfing">🏄</span>}
                    {beach.windsurfing && <span title="Windsurfing">🏄‍♂️</span>}
                    {beach.kitesurfing && <span title="Kitesurfing">🪁</span>}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ComparisonPanel

