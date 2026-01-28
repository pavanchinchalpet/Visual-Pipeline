import { useEffect } from 'react';
import { useStore } from './store';
import { showToast } from './ToastManager';

export const useKeyboardShortcuts = () => {
  const undo = useStore(state => state.undo);
  const redo = useStore(state => state.redo);
  const canUndo = useStore(state => state.canUndo);
  const canRedo = useStore(state => state.canRedo);

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Check if we're in an input field
      const isInputField = event.target.tagName === 'INPUT' || 
                          event.target.tagName === 'TEXTAREA' || 
                          event.target.contentEditable === 'true';
      
      // Don't trigger shortcuts when typing in input fields
      if (isInputField) return;

      // Handle Ctrl+Z (Undo)
      if (event.ctrlKey && event.key === 'z' && !event.shiftKey) {
        event.preventDefault();
        if (canUndo()) {
          undo();
          showToast('Action undone', 'info', 1500);
        }
      }
      
      // Handle Ctrl+Y or Ctrl+Shift+Z (Redo)
      if ((event.ctrlKey && event.key === 'y') || 
          (event.ctrlKey && event.shiftKey && event.key === 'Z')) {
        event.preventDefault();
        if (canRedo()) {
          redo();
          showToast('Action redone', 'info', 1500);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [undo, redo, canUndo, canRedo]);
};