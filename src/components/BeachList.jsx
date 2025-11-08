import BeachCard from './BeachCard'
import './BeachList.css'

function BeachList({ beaches, searchQuery, onSearchChange }) {
  return (
    <div className="beach-list">
      <div className="beach-list-header">
        <h2>Znalezione plaże ({beaches.length})</h2>
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
            />
          ))
        )}
      </div>
    </div>
  )
}

export default BeachList

