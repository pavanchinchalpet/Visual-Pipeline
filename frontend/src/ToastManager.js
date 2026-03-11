import { useState } from 'react';
import { Toast } from './Toast';

let toastId = 0;
let addToastFunction = null;

export const showToast = (message, type = 'info', duration = 2000) => {
  if (addToastFunction) {
    addToastFunction(message, type, duration);
  }
};

export const ToastManager = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type, duration) => {
    const id = ++toastId;
    const newToast = { id, message, type, duration };
    setToasts(prev => [...prev, newToast]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  // Set the global function reference
  addToastFunction = addToast;

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};