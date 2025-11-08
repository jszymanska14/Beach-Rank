import './FilterSidebar.css'

function FilterSidebar({ isOpen, onToggle, filters, onFilterChange }) {
  const regions = ['Pomorskie', 'Zachodniopomorskie']

  const updateFilter = (key, value) => {
    onFilterChange({ ...filters, [key]: value })
  }

  const toggleRegion = (region) => {
    const newRegions = filters.regions.includes(region)
      ? filters.regions.filter(r => r !== region)
      : [...filters.regions, region]
    updateFilter('regions', newRegions)
  }

  const resetFilters = () => {
    onFilterChange({
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
  }

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onToggle} />}
      <aside className={`filter-sidebar ${isOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h2>Filtry</h2>
          <button className="reset-btn" onClick={resetFilters}>Resetuj</button>
        </div>

        <div className="filters-content">
          <div className="filter-group">
            <label>Temperatura powietrza (°C)</label>
            <div className="range-inputs">
              <input
                type="number"
                value={filters.minTemp}
                onChange={(e) => updateFilter('minTemp', Number(e.target.value))}
                placeholder="Min"
              />
              <span>-</span>
              <input
                type="number"
                value={filters.maxTemp}
                onChange={(e) => updateFilter('maxTemp', Number(e.target.value))}
                placeholder="Max"
              />
            </div>
          </div>

          <div className="filter-group">
            <label>Temperatura wody (°C)</label>
            <div className="range-inputs">
              <input
                type="number"
                value={filters.minWaterTemp}
                onChange={(e) => updateFilter('minWaterTemp', Number(e.target.value))}
                placeholder="Min"
              />
              <span>-</span>
              <input
                type="number"
                value={filters.maxWaterTemp}
                onChange={(e) => updateFilter('maxWaterTemp', Number(e.target.value))}
                placeholder="Max"
              />
            </div>
          </div>

          <div className="filter-group">
            <label>Max siła wiatru (km/h): {filters.maxWindSpeed}</label>
            <input
              type="range"
              min="0"
              max="50"
              value={filters.maxWindSpeed}
              onChange={(e) => updateFilter('maxWindSpeed', Number(e.target.value))}
              className="slider"
            />
          </div>

          <div className="filter-group">
            <label>Min jakość powietrza: {filters.minAirQuality}%</label>
            <input
              type="range"
              min="0"
              max="100"
              value={filters.minAirQuality}
              onChange={(e) => updateFilter('minAirQuality', Number(e.target.value))}
              className="slider"
            />
          </div>

          <div className="filter-group">
            <label>Max zatłoczenie: {filters.maxCrowding}%</label>
            <input
              type="range"
              min="0"
              max="100"
              value={filters.maxCrowding}
              onChange={(e) => updateFilter('maxCrowding', Number(e.target.value))}
              className="slider"
            />
          </div>

          <div className="filter-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={filters.noCyanobacteria}
                onChange={(e) => updateFilter('noCyanobacteria', e.target.checked)}
              />
              <span>Bez sinic</span>
            </label>
          </div>

          <div className="filter-group">
            <label>Sporty wodne</label>
            <div className="checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={filters.showSurfing}
                  onChange={(e) => updateFilter('showSurfing', e.target.checked)}
                />
                <span>🏄 Surfing</span>
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={filters.showWindsurfing}
                  onChange={(e) => updateFilter('showWindsurfing', e.target.checked)}
                />
                <span>🏄‍♂️ Windsurfing</span>
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={filters.showKitesurfing}
                  onChange={(e) => updateFilter('showKitesurfing', e.target.checked)}
                />
                <span>🪁 Kitesurfing</span>
              </label>
            </div>
          </div>

          <div className="filter-group">
            <label>Region</label>
            <div className="checkbox-group">
              {regions.map(region => (
                <label key={region} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={filters.regions.includes(region)}
                    onChange={() => toggleRegion(region)}
                  />
                  <span>{region}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </aside>

      <button
        className={`sidebar-toggle ${isOpen ? 'open' : 'closed'}`}
        onClick={onToggle}
        aria-label="Toggle filters"
      >
        {isOpen ? '◀' : '▶'}
      </button>
    </>
  )
}

export default FilterSidebar

