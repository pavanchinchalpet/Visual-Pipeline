import { useReactFlow } from 'reactflow';
import { useState } from 'react';
import { useStore } from './store';
import { showToast } from './ToastManager';
import './ActionButtons.css';

export const ActionButtons = () => {
  const { zoomIn, zoomOut, fitView } = useReactFlow();
  const [isLocked, setIsLocked] = useState(false);
  const clearCanvas = useStore(state => state.clearCanvas);

  const handleZoomIn = () => {
    zoomIn();
    showToast('Zoomed in', 'info', 1000);
  };

  const handleZoomOut = () => {
    zoomOut();
    showToast('Zoomed out', 'info', 1000);
  };

  const handleLockToggle = () => {
    setIsLocked(!isLocked);
    showToast(isLocked ? 'Canvas unlocked' : 'Canvas locked', 'info', 1500);
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear the entire canvas?')) {
      clearCanvas();
      showToast('Canvas cleared', 'success', 2000);
    }
  };

  return (
    <div className="action-buttons">
      <button
        className="action-btn"
        onClick={handleZoomIn}
        title="Zoom In (+)"
        aria-label="Zoom in"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/>
          <path d="M21 21l-4.35-4.35"/>
          <line x1="11" y1="8" x2="11" y2="14"/>
          <line x1="8" y1="11" x2="14" y2="11"/>
        </svg>
      </button>

      <button
        className="action-btn"
        onClick={handleZoomOut}
        title="Zoom Out (-)"
        aria-label="Zoom out"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/>
          <path d="M21 21l-4.35-4.35"/>
          <line x1="8" y1="11" x2="14" y2="11"/>
        </svg>
      </button>

      <button
        className={`action-btn ${isLocked ? 'locked' : ''}`}
        onClick={handleLockToggle}
        title={isLocked ? "Unlock Canvas" : "Lock Canvas"}
        aria-label={isLocked ? "Unlock canvas" : "Lock canvas"}
      >
        {isLocked ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 9.9-1"/>
          </svg>
        )}
      </button>

      <button
        className="action-btn clear-btn"
        onClick={handleClear}
        title="Clear Canvas"
        aria-label="Clear entire canvas"
      >
        <span className="clear-text">Clear</span>
      </button>
    </div>
  );
};