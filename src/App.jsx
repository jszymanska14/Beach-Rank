import { useState } from 'react'
import FilterSidebar from './components/FilterSidebar'
import BeachList from './components/BeachList'
import BeachMap from './components/BeachMap'
import ResizablePanels from './components/ResizablePanels'
import { beaches } from './data/beaches'
import logo from './assets/logo.jpeg'
import './App.css'

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768)
  const [isMapFullscreen, setIsMapFullscreen] = useState(false)
  const [selectedBeach, setSelectedBeach] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState({
    minTemp: 0,
    maxTemp: 40,
    maxWindSpeed: 30,
    noCyanobacteria: false,
    minWaterTemp: 0,
    maxWaterTemp: 30,
    maxCrowding: 100,
    regions: []
  })

  const filteredBeaches = filterBeaches(beaches, filters, searchQuery)
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)
  const openSidebar = () => setIsSidebarOpen(true)
  const closeSidebar = () => setIsSidebarOpen(false)
  const openMapFullscreen = () => setIsMapFullscreen(true)

  const handleBeachClick = (beach) => {
    setSelectedBeach(current => deriveSelectedBeach(beach, current))
    if (window.innerWidth <= 768) {
      setIsMapFullscreen(true)
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1><img src={logo} alt="Beach Rank Logo" className="logo" /> Beach Rank</h1>
      </header>

      <div className="app-content">
        <FilterSidebar
          isOpen={isSidebarOpen}
          onToggle={toggleSidebar}
          onClose={closeSidebar}
          filters={filters}
          onFilterChange={setFilters}
        />

        <main className={`main-content ${!isSidebarOpen ? 'sidebar-closed' : ''}`}>
          <div className="content-wrapper">
            {isMapFullscreen ? (
              <BeachMap
                beaches={filteredBeaches}
                isFullscreen={isMapFullscreen}
                onToggleFullscreen={() => setIsMapFullscreen(!isMapFullscreen)}
                selectedBeach={selectedBeach}
              />
            ) : (
              <ResizablePanels
                leftPanel={
                  <BeachList
                    beaches={filteredBeaches}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    onOpenFilters={openSidebar}
                    onOpenMap={openMapFullscreen}
                    onBeachClick={handleBeachClick}
                  />
                }
                rightPanel={
                  <BeachMap
                    beaches={filteredBeaches}
                    isFullscreen={isMapFullscreen}
                    onToggleFullscreen={() => setIsMapFullscreen(!isMapFullscreen)}
                    selectedBeach={selectedBeach}
                  />
                }
              />
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

function filterBeaches(beaches, filters, searchQuery) {
  return beaches.filter(beach => {
    if (searchQuery && !beach.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
    if (beach.temperature < filters.minTemp || beach.temperature > filters.maxTemp) return false
    if (beach.windSpeed > filters.maxWindSpeed) return false
    if (filters.noCyanobacteria && beach.cyanobacteria) return false
    if (beach.waterTemperature < filters.minWaterTemp || beach.waterTemperature > filters.maxWaterTemp) return false
    if (beach.crowding > filters.maxCrowding) return false
    if (filters.regions.length > 0 && !filters.regions.includes(beach.region)) return false
    
    return true
  })
}

function deriveSelectedBeach(nextBeach, currentBeach) {
  if (currentBeach && currentBeach.id === nextBeach.id) {
    return { ...nextBeach }
  }
  return nextBeach
}

export default App

