import './BeachCard.css'
import { getCrowdingColor, getCrowdingLevel } from '../utils/crowding'

function BeachCard({ beach }) {
  const crowdingLevel = getCrowdingLevel(beach.crowding)
  
  return (
    <div className="beach-card">
      <div className="card-header">
        <div>
          <h3>{beach.name}</h3>
          <p className="location">{beach.city}, {beach.region}</p>
        </div>
      </div>

      <div className="card-stats">
        <div className="stat-highlight">
          <div className="stat-highlight-item cyanobacteria">
            <span className="stat-icon-large">🫧</span>
            <div className="stat-info-large">
              <span className="stat-label-large">Sinice</span>
              <span className={`stat-value-large ${beach.cyanobacteria ? 'warning' : 'good'}`}>
                {beach.cyanobacteria ? 'Tak' : 'Nie'}
              </span>
            </div>
          </div>

          <div className={`stat-highlight-item crowding ${crowdingLevel}`}>
            <span className="stat-icon-large">👥</span>
            <div className="stat-info-large">
              <span className="stat-label-large">Zatłoczenie</span>
              <span className="stat-value-large" style={{ color: getCrowdingColor(beach.crowding) }}>
                {beach.crowding}%
              </span>
            </div>
          </div>
        </div>

        <div className="stats-secondary">
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
        </div>
      </div>
    </div>
  )
}

export default BeachCard

