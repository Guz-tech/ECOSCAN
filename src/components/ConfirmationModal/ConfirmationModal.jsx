import React from 'react';
import './ConfirmationModal.css';

function ConfirmationModal({ isOpen, onClose, onConfirm, message }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <p>{message}</p>
        <div className="modal-buttons">
          <button className="modal-cancel-btn" onClick={onClose}>
            Não
          </button>
          <button className="modal-confirm-btn" onClick={onConfirm}>
            Sim
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;