import BeachCard from './BeachCard'
import './BeachList.css'

function BeachList({ beaches, searchQuery, onSearchChange, onOpenFilters, onOpenMap, onBeachClick }) {
  return (
    <div className="beach-list">
      <div className="beach-list-header">
        <div className="beach-list-heading">
          <h2>Znalezione plaże ({beaches.length})</h2>
          <div className="mobile-buttons">
            {onOpenFilters && (
              <button
                type="button"
                className="filters-button"
                onClick={onOpenFilters}
              >
                Filtry
              </button>
            )}
            {onOpenMap && (
              <button
                type="button"
                className="map-button"
                onClick={onOpenMap}
              >
                🗺️ Mapa
              </button>
            )}
          </div>
        </div>
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="🔍 Wyszukaj plażę po nazwie..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          {searchQuery && (
            <button
              className="search-clear"
              onClick={() => onSearchChange('')}
              title="Wyczyść wyszukiwanie"
            >
              ✕
            </button>
          )}
        </div>
      </div>
      <div className="beach-cards">
        {beaches.length === 0 ? (
          <div className="no-results">
            <p>Brak plaż spełniających kryteria</p>
          </div>
        ) : (
          beaches.map(beach => (
            <BeachCard
              key={beach.id}
              beach={beach}
              onClick={onBeachClick}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default BeachList

