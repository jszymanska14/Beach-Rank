import BeachCard from './BeachCard'
import './BeachList.css'

function BeachList({ beaches, selectedBeaches, onToggleSelection }) {
  return (
    <div className="beach-list">
      <div className="beach-list-header">
        <h2>Znalezione plaże ({beaches.length})</h2>
        {selectedBeaches.length > 0 && (
          <span className="selected-count">
            {selectedBeaches.length} zaznaczonych
          </span>
        )}
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
              isSelected={selectedBeaches.includes(beach.id)}
              onToggleSelection={() => onToggleSelection(beach.id)}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default BeachList

