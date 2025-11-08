import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import './BeachMap.css'

const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

const surfingIcon = L.divIcon({
  html: '<div class="surfing-marker">🏄</div>',
  className: 'custom-div-icon',
  iconSize: [30, 30],
  iconAnchor: [15, 15],
  popupAnchor: [0, -15]
})

const windsurfingIcon = L.divIcon({
  html: '<div class="surfing-marker">🏄‍♂️</div>',
  className: 'custom-div-icon',
  iconSize: [30, 30],
  iconAnchor: [15, 15],
  popupAnchor: [0, -15]
})

const kitesurfingIcon = L.divIcon({
  html: '<div class="surfing-marker">🪁</div>',
  className: 'custom-div-icon',
  iconSize: [30, 30],
  iconAnchor: [15, 15],
  popupAnchor: [0, -15]
})

const multiSportIcon = L.divIcon({
  html: '<div class="surfing-marker">🌊</div>',
  className: 'custom-div-icon',
  iconSize: [30, 30],
  iconAnchor: [15, 15],
  popupAnchor: [0, -15]
})

L.Marker.prototype.options.icon = defaultIcon

function getBeachIcon(beach) {
  const sportsCount = [beach.surfing, beach.windsurfing, beach.kitesurfing].filter(Boolean).length
  
  if (sportsCount === 0) return defaultIcon
  if (sportsCount > 1) return multiSportIcon
  if (beach.surfing) return surfingIcon
  if (beach.windsurfing) return windsurfingIcon
  if (beach.kitesurfing) return kitesurfingIcon
  return defaultIcon
}

function BeachMap({ beaches, selectedBeaches, isFullscreen, onToggleFullscreen }) {
  const center = [54.3520, 17.0466]

  return (
    <div className={`map-container ${isFullscreen ? 'fullscreen' : ''}`}>
      <button
        className="fullscreen-btn"
        onClick={onToggleFullscreen}
        title={isFullscreen ? 'Zamknij fullscreen' : 'Fullscreen'}
      >
        {isFullscreen ? '✕' : '⛶'}
      </button>

      <MapContainer
        center={center}
        zoom={7}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {beaches.map(beach => (
          <Marker
            key={beach.id}
            position={[beach.lat, beach.lng]}
            icon={getBeachIcon(beach)}
          >
            <Popup>
              <div className="map-popup">
                <h3>{beach.name}</h3>
                <p><strong>{beach.city}</strong></p>
                <div className="popup-stats">
                  <p>🌡️ {beach.temperature}°C</p>
                  <p>💧 {beach.waterTemperature}°C</p>
                  <p>💨 {beach.windSpeed} km/h</p>
                  <p>🫧 {beach.cyanobacteria ? 'Sinice: Tak' : 'Sinice: Nie'}</p>
                  <p>🌬️ Jakość: {beach.airQuality}%</p>
                  <p>👥 Zatłoczenie: {beach.crowding}%</p>
                  {(beach.surfing || beach.windsurfing || beach.kitesurfing) && (
                    <p className="sports-list">
                      <strong>Sporty wodne:</strong><br/>
                      {beach.surfing && '🏄 Surfing '}
                      {beach.windsurfing && '🏄‍♂️ Windsurfing '}
                      {beach.kitesurfing && '🪁 Kitesurfing'}
                    </p>
                  )}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

export default BeachMap

