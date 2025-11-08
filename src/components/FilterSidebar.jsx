import './FilterSidebar.css'

function DualRange({ min, max, step = 1, values, onChange, formatValue }) {
  const [currentMin, currentMax] = values
  const handleMinChange = value => {
    const parsed = Math.min(Number(value), currentMax)
    onChange([parsed, currentMax])
  }
  const handleMaxChange = value => {
    const parsed = Math.max(Number(value), currentMin)
    onChange([currentMin, parsed])
  }
  const rangeStart = ((currentMin - min) / (max - min)) * 100
  const rangeEnd = ((currentMax - min) / (max - min)) * 100

  return (
    <div className="dual-slider">
      <div className="dual-slider-values">
        <span>{formatValue(currentMin)}</span>
        <span>{formatValue(currentMax)}</span>
      </div>
      <div className="dual-slider-track">
        <div
          className="dual-slider-range"
          style={{ left: `${rangeStart}%`, right: `${100 - rangeEnd}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={currentMin}
          onChange={(e) => handleMinChange(e.target.value)}
          className="dual-slider-input"
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={currentMax}
          onChange={(e) => handleMaxChange(e.target.value)}
          className="dual-slider-input"
        />
      </div>
    </div>
  )
}

function FilterSidebar({ isOpen, onToggle, onClose, filters, onFilterChange }) {
  const regions = ['Pomorskie', 'Zachodniopomorskie']
  const handleClose = () => {
    if (onClose) {
      onClose()
      return
    }
    if (onToggle) {
      onToggle()
    }
  }

  const updateFilter = (key, value) => {
    onFilterChange({ ...filters, [key]: value })
  }

  const updateRange = (minKey, maxKey, [minValue, maxValue]) => {
    onFilterChange({ ...filters, [minKey]: minValue, [maxKey]: maxValue })
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
      maxCrowding: 100,
      regions: []
    })
  }

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={handleClose} />}
      <aside className={`filter-sidebar ${isOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h2>Filtry</h2>
          <div className="sidebar-header-actions">
            <button className="reset-btn" onClick={resetFilters}>Resetuj</button>
            <button className="sidebar-close" onClick={handleClose} aria-label="Zamknij filtry">✕</button>
          </div>
        </div>

        <div className="filters-content">
          <div className="filter-group">
            <label>Temperatura powietrza (°C)</label>
            <DualRange
              min={0}
              max={40}
              values={[filters.minTemp, filters.maxTemp]}
              onChange={(values) => updateRange('minTemp', 'maxTemp', values)}
              formatValue={(value) => `${value}°C`}
              />
          </div>

          <div className="filter-group">
            <label>Temperatura wody (°C)</label>
            <DualRange
              min={0}
              max={30}
              values={[filters.minWaterTemp, filters.maxWaterTemp]}
              onChange={(values) => updateRange('minWaterTemp', 'maxWaterTemp', values)}
              formatValue={(value) => `${value}°C`}
              />
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

