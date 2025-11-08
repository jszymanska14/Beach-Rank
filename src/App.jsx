import { useState } from 'react'
import FilterSidebar from './components/FilterSidebar'
import BeachList from './components/BeachList'
import BeachMap from './components/BeachMap'
import ComparisonPanel from './components/ComparisonPanel'
import { beaches } from './data/beaches'
import './App.css'

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768)
  const [isMapFullscreen, setIsMapFullscreen] = useState(false)
  const [showMap, setShowMap] = useState(false)
  const [filters, setFilters] = useState({
    minTemp: 0,
    maxTemp: 40,
    maxWindSpeed: 30,
    noCyanobacteria: false,
    minWaterTemp: 0,
    maxWaterTemp: 30,
    minAirQuality: 0,
    maxCrowding: 100,
    regions: [],
    showSurfing: false,
    showWindsurfing: false,
    showKitesurfing: false
  })
  const [selectedBeaches, setSelectedBeaches] = useState([])

  const filteredBeaches = filterBeaches(beaches, filters)

  const toggleBeachSelection = (beachId) => {
    setSelectedBeaches(prev => 
      prev.includes(beachId)
        ? prev.filter(id => id !== beachId)
        : [...prev, beachId]
    )
  }

  const clearComparison = () => {
    setSelectedBeaches([])
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🏖️ Beach Rank</h1>
        <p>Porównaj najlepsze plaże w Polsce</p>
      </header>

      <div className="app-content">
        <FilterSidebar
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          filters={filters}
          onFilterChange={setFilters}
        />

        <main className={`main-content ${!isSidebarOpen ? 'sidebar-closed' : ''}`}>
          <div className="mobile-view-toggle">
            <button
              className={`view-btn ${!showMap ? 'active' : ''}`}
              onClick={() => setShowMap(false)}
            >
              📋 Lista
            </button>
            <button
              className={`view-btn ${showMap ? 'active' : ''}`}
              onClick={() => setShowMap(true)}
            >
              🗺️ Mapa
            </button>
          </div>

          <div className={`content-wrapper ${showMap ? 'show-map' : 'show-list'}`}>
            {!isMapFullscreen && (
              <BeachList
                beaches={filteredBeaches}
                selectedBeaches={selectedBeaches}
                onToggleSelection={toggleBeachSelection}
              />
            )}

            <BeachMap
              beaches={filteredBeaches}
              selectedBeaches={selectedBeaches}
              isFullscreen={isMapFullscreen}
              onToggleFullscreen={() => setIsMapFullscreen(!isMapFullscreen)}
            />
          </div>
        </main>
      </div>

      {selectedBeaches.length > 0 && (
        <ComparisonPanel
          beaches={beaches.filter(b => selectedBeaches.includes(b.id))}
          onClear={clearComparison}
        />
      )}
    </div>
  )
}

function filterBeaches(beaches, filters) {
  return beaches.filter(beach => {
    if (beach.temperature < filters.minTemp || beach.temperature > filters.maxTemp) return false
    if (beach.windSpeed > filters.maxWindSpeed) return false
    if (filters.noCyanobacteria && beach.cyanobacteria) return false
    if (beach.waterTemperature < filters.minWaterTemp || beach.waterTemperature > filters.maxWaterTemp) return false
    if (beach.airQuality < filters.minAirQuality) return false
    if (beach.crowding > filters.maxCrowding) return false
    if (filters.regions.length > 0 && !filters.regions.includes(beach.region)) return false
    
    const hasAnySportFilter = filters.showSurfing || filters.showWindsurfing || filters.showKitesurfing
    if (hasAnySportFilter) {
      const matchesSports = 
        (filters.showSurfing && beach.surfing) ||
        (filters.showWindsurfing && beach.windsurfing) ||
        (filters.showKitesurfing && beach.kitesurfing)
      if (!matchesSports) return false
    }
    
    return true
  })
}

export default App

