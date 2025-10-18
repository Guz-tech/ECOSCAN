import React from 'react';
import './SuccessModal.css';
import { FaCheckCircle } from 'react-icons/fa';
import ButtonPrimary from '../Button/ButtonPrimary';

function SuccessModal({ isOpen, onClose, title, message }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="success-modal-overlay" onClick={onClose}>
      <div className="success-modal-content" onClick={(e) => e.stopPropagation()}>
        <FaCheckCircle className="success-modal-icon" />
        <h2>{title}</h2>
        <p>{message}</p>
        <div className="success-modal-buttons">
          <ButtonPrimary onClick={onClose}>
            Ok
          </ButtonPrimary>
        </div>
      </div>
    </div>
  );
}

export default SuccessModal;