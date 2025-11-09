import { useCallback, useEffect, useMemo, useState, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet'
import L from 'leaflet'
import './BeachMap.css'
import { getCrowdingLevel } from '../utils/crowding'
import { advertisements } from '../data/advertisements'

const markerAssets = {
  low: {
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
    iconRetinaUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png'
  },
  medium: {
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png',
    iconRetinaUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png'
  },
  high: {
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    iconRetinaUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png'
  },
  default: {
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png'
  }
}

function createIcon(asset) {
  return L.icon({
    iconUrl: asset.iconUrl,
    iconRetinaUrl: asset.iconRetinaUrl,
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})
}

const markerIcons = {
  low: createIcon(markerAssets.low),
  medium: createIcon(markerAssets.medium),
  high: createIcon(markerAssets.high),
  default: createIcon(markerAssets.default)
}

const advertisementZoomThreshold = 13

const advertisementGraphics = {
  'fork-and-knife': '🍴',
  'beach-umbrella': '🏖️',
  coffee: '☕',
  surfboard: '🏄'
}

const advertisementIconCache = new Map()

function createAdvertisementIcon(graphicSymbol) {
  if (!advertisementIconCache.has(graphicSymbol)) {
    advertisementIconCache.set(
      graphicSymbol,
      L.divIcon({
        className: 'advertisement-icon',
        html: `<div class="advertisement-marker">${graphicSymbol}</div>`,
        iconSize: [36, 36],
        iconAnchor: [18, 36],
        popupAnchor: [0, -30]
      })
    )
  }
  return advertisementIconCache.get(graphicSymbol)
}

function resolveAdvertisementGraphic(graphicKey) {
  return advertisementGraphics[graphicKey] || '⭐'
}

const advertisementCategoryLabels = {
  restaurant: 'Restauracja',
  rental: 'Wypozyczalnia',
  cafe: 'Kawiarnia'
}

L.Marker.prototype.options.icon = markerIcons.default

function getCrowdingIcon(crowding) {
  const level = getCrowdingLevel(crowding)
  return markerIcons[level] || markerIcons.default
}

function ZoomWatcher({ onZoomChange }) {
  const map = useMapEvents({
    zoomend() {
      onZoomChange(map.getZoom())
    }
  })

  useEffect(() => {
    onZoomChange(map.getZoom())
  }, [map, onZoomChange])

  return null
}

function getFocusZoom(map) {
  return Math.max(map.getZoom(), 13)
}

function focusMapOnBeach(map, beach) {
  if (!beach) {
    return
  }
  map.flyTo([beach.lat, beach.lng], getFocusZoom(map), {
    animate: true,
    duration: 1
  })
}

function MapCenter({ selectedBeach, isFullscreen }) {
  const map = useMap()

  const focusSelectedBeach = useCallback(() => {
    focusMapOnBeach(map, selectedBeach)
  }, [map, selectedBeach])

  useEffect(() => {
    focusSelectedBeach()
  }, [focusSelectedBeach])

  useEffect(() => {
    const delay = isFullscreen ? 300 : 100
    const timeoutId = setTimeout(() => {
      map.invalidateSize()
      focusSelectedBeach()
    }, delay)
    return () => clearTimeout(timeoutId)
  }, [isFullscreen, map, focusSelectedBeach])

  return null
}

function BeachMarker({ beach, isSelected, crowdingLevel }) {
  const markerRef = useRef(null)

  useEffect(() => {
    if (isSelected && markerRef.current) {
      markerRef.current.openPopup()
    }
  }, [isSelected])

  return (
    <Marker
      ref={markerRef}
      position={[beach.lat, beach.lng]}
      icon={getCrowdingIcon(beach.crowding)}
    >
      <Popup>
        <div className="map-popup">
          <h3>{beach.name}</h3>
          
          <div className="popup-highlight">
            <div className={`popup-main-stat ${beach.cyanobacteria ? 'warning' : 'good'}`}>
              <span className="popup-icon">🦠</span>
              <div>
                <div className="popup-label">Sinice</div>
                <div className="popup-value">{beach.cyanobacteria ? 'Tak' : 'Nie'}</div>
              </div>
            </div>
            <div className={`popup-main-stat crowding ${crowdingLevel}`}>
              <span className="popup-icon">👥</span>
              <div>
                <div className="popup-label">Zatłoczenie</div>
                <div className="popup-value">{beach.crowding}%</div>
              </div>
            </div>
          </div>

          <div className="popup-stats">
            <p>🌡️ Temp. powietrza: {beach.temperature}°C</p>
            <p>💧 Temp. wody: {beach.waterTemperature}°C</p>
            <p>💨 Wiatr: {beach.windSpeed} km/h</p>
          </div>
        </div>
      </Popup>
    </Marker>
  )
}

function BeachMap({ beaches, isFullscreen, onToggleFullscreen, selectedBeach }) {
  const center = [54.3520, 17.0466]
  const [currentZoom, setCurrentZoom] = useState(7)
  const [openPopupId, setOpenPopupId] = useState(null)

  const handleZoomChange = useCallback(zoomValue => {
    setCurrentZoom(Math.round(zoomValue))
  }, [])

  const beachIds = useMemo(() => new Set(beaches.map(beach => beach.id)), [beaches])

  const filteredAdvertisements = useMemo(
    () => advertisements.filter(advertisement => beachIds.has(advertisement.beachId)),
    [beachIds]
  )

  const visibleAdvertisements = useMemo(
    () => (currentZoom >= advertisementZoomThreshold ? filteredAdvertisements : []),
    [currentZoom, filteredAdvertisements]
  )

  const advertisementMarkers = useMemo(
    () =>
      visibleAdvertisements.map(advertisement => ({
        ...advertisement,
        icon: createAdvertisementIcon(resolveAdvertisementGraphic(advertisement.graphic))
      })),
    [visibleAdvertisements]
  )

  useEffect(() => {
    if (selectedBeach) {
      setOpenPopupId(selectedBeach.id)
    }
  }, [selectedBeach])

  return (
    <div className={`map-container ${isFullscreen ? 'fullscreen' : ''}`}>
      <button
        className="fullscreen-btn"
        onClick={onToggleFullscreen}
        title={isFullscreen ? 'Zamknij fullscreen' : 'Fullscreen'}
      >
        {isFullscreen ? '✕' : '⤢'}
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
        <ZoomWatcher onZoomChange={handleZoomChange} />
        <MapCenter selectedBeach={selectedBeach} isFullscreen={isFullscreen} />
        {beaches.map(beach => {
          const crowdingLevel = getCrowdingLevel(beach.crowding)
          const isSelected = openPopupId === beach.id
          return (
            <BeachMarker
              key={beach.id}
              beach={beach}
              isSelected={isSelected}
              crowdingLevel={crowdingLevel}
            />
          )
        })}
        {advertisementMarkers.map(advertisement => (
          <Marker
            key={advertisement.id}
            position={[advertisement.lat, advertisement.lng]}
            icon={advertisement.icon}
          >
            <Popup>
              <div className="advertisement-popup">
                <h3>{advertisement.name}</h3>
                <p>{advertisementCategoryLabels[advertisement.category] || 'Oferta lokalna'}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

export default BeachMap

