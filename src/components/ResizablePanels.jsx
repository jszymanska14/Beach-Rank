import { useState, useRef, useEffect } from 'react'
import './ResizablePanels.css'

function ResizablePanels({ leftPanel, rightPanel }) {
  const [leftWidth, setLeftWidth] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef(null)

  const handleMouseDown = (e) => {
    setIsDragging(true)
    e.preventDefault()
  }

  useEffect(() => {
    if (!isDragging) return

    const handleMouseMove = (e) => {
      if (!containerRef.current) return

      const containerRect = containerRef.current.getBoundingClientRect()
      const offsetX = e.clientX - containerRect.left
      const newLeftWidth = (offsetX / containerRect.width) * 100

      if (newLeftWidth >= 20 && newLeftWidth <= 80) {
        setLeftWidth(newLeftWidth)
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging])

  return (
    <div
      className={`resizable-container ${isDragging ? 'resizing' : ''}`}
      ref={containerRef}
    >
      <div className="resizable-panel left" style={{ width: `${leftWidth}%` }}>
        {leftPanel}
      </div>

      <div
        className="resizable-divider"
        onMouseDown={handleMouseDown}
      >
        <div className="divider-handle"></div>
      </div>

      <div className="resizable-panel right" style={{ width: `${100 - leftWidth}%` }}>
        {rightPanel}
      </div>
    </div>
  )
}

export default ResizablePanels

