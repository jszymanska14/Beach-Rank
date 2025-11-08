import './BeachCard.css'

function BeachCard({ beach, isSelected, onToggleSelection }) {
  const getQualityColor = (value, isReverse = false) => {
    if (isReverse) {
      if (value < 30) return '#10b981'
      if (value < 60) return '#f59e0b'
      return '#ef4444'
    }
    if (value >= 90) return '#10b981'
    if (value >= 70) return '#f59e0b'
    return '#ef4444'
  }

  return (
    <div className={`beach-card ${isSelected ? 'selected' : ''}`}>
      <div className="card-header">
        <div>
          <h3>{beach.name}</h3>
          <p className="location">{beach.city}, {beach.region}</p>
        </div>
        <button
          className={`select-btn ${isSelected ? 'selected' : ''}`}
          onClick={onToggleSelection}
        >
          {isSelected ? '✓' : '+'}
        </button>
      </div>

      <div className="card-stats">
        <div className="stat">
          <span className="stat-icon">🌡️</span>
          <div className="stat-info">
            <span className="stat-label">Temp. powietrza</span>
            <span className="stat-value">{beach.temperature}°C</span>
          </div>
        </div>

        <div className="stat">
          <span className="stat-icon">💧</span>
          <div className="stat-info">
            <span className="stat-label">Temp. wody</span>
            <span className="stat-value">{beach.waterTemperature}°C</span>
          </div>
        </div>

        <div className="stat">
          <span className="stat-icon">💨</span>
          <div className="stat-info">
            <span className="stat-label">Wiatr</span>
            <span className="stat-value">{beach.windSpeed} km/h</span>
          </div>
        </div>

        <div className="stat">
          <span className="stat-icon">🫧</span>
          <div className="stat-info">
            <span className="stat-label">Sinice</span>
            <span className={`stat-value ${beach.cyanobacteria ? 'warning' : 'good'}`}>
              {beach.cyanobacteria ? 'Tak' : 'Nie'}
            </span>
          </div>
        </div>

        <div className="stat">
          <span className="stat-icon">🌬️</span>
          <div className="stat-info">
            <span className="stat-label">Jakość powietrza</span>
            <span className="stat-value" style={{ color: getQualityColor(beach.airQuality) }}>
              {beach.airQuality}%
            </span>
          </div>
        </div>

        <div className="stat">
          <span className="stat-icon">👥</span>
          <div className="stat-info">
            <span className="stat-label">Zatłoczenie</span>
            <span className="stat-value" style={{ color: getQualityColor(beach.crowding, true) }}>
              {beach.crowding}%
            </span>
          </div>
        </div>

        {(beach.surfing || beach.windsurfing || beach.kitesurfing) && (
          <div className="stat sport-stat">
            <span className="stat-icon">🌊</span>
            <div className="stat-info">
              <span className="stat-label">Sporty wodne</span>
              <div className="sport-tags">
                {beach.surfing && <span className="sport-tag">🏄 Surfing</span>}
                {beach.windsurfing && <span className="sport-tag">🏄‍♂️ Windsurfing</span>}
                {beach.kitesurfing && <span className="sport-tag">🪁 Kitesurfing</span>}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default BeachCard

