import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { showToast } from './ToastManager';
import './ActionButtons.css';

const selector = (state) => ({
  undo: state.undo,
  redo: state.redo,
  clearCanvas: state.clearCanvas,
  canUndo: state.canUndo,
  canRedo: state.canRedo,
});

export const ActionButtons = () => {
  const { undo, redo, clearCanvas, canUndo, canRedo } = useStore(selector, shallow);

  const handleUndo = () => {
    if (canUndo()) {
      undo();
      showToast('Action undone', 'info', 1500);
    }
  };

  const handleRedo = () => {
    if (canRedo()) {
      redo();
      showToast('Action redone', 'info', 1500);
    }
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear the entire canvas? This action cannot be undone.')) {
      clearCanvas();
      showToast('Canvas cleared', 'success', 2000);
    }
  };

  return (
    <div className="action-buttons">
      <button
        className={`action-btn ${!canUndo() ? 'disabled' : ''}`}
        onClick={handleUndo}
        disabled={!canUndo()}
        title="Undo (Ctrl+Z)"
        aria-label="Undo last action"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 7v6h6"/>
          <path d="M21 17a9 9 0 00-9-9 9 9 0 00-6 2.3L3 13"/>
        </svg>
      </button>

      <button
        className={`action-btn ${!canRedo() ? 'disabled' : ''}`}
        onClick={handleRedo}
        disabled={!canRedo()}
        title="Redo (Ctrl+Y)"
        aria-label="Redo last action"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 7v6h-6"/>
          <path d="M3 17a9 9 0 019-9 9 9 0 016 2.3l3-2.3"/>
        </svg>
      </button>

      <button
        className="action-btn clear-btn"
        onClick={handleClear}
        title="Clear Canvas"
        aria-label="Clear entire canvas"
      >
        <span className="clear-text">Clear Canvas</span>
      </button>
    </div>
  );
};