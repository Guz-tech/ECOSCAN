import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthRedirectModal.css';
import { FaExclamationTriangle } from 'react-icons/fa';
import ButtonPrimary from '../Button/ButtonPrimary';
import ButtonSecondary from '../Button/ButtonSecondary';

function AuthRedirectModal({ isOpen, onClose }) {
  const navigate = useNavigate();

  if (!isOpen) {
    return null;
  }

  const handleLoginRedirect = () => {
    navigate('/login');
    onClose(); 
  };

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal-content" onClick={(e) => e.stopPropagation()}>
        <FaExclamationTriangle className="auth-modal-icon" />
        <h2>Acesso Restrito</h2>
        <p>Você precisa estar logado para utilizar esta funcionalidade.</p>
        <div className="auth-modal-buttons">
          <ButtonSecondary onClick={onClose}>
            Fechar
          </ButtonSecondary>
          <ButtonPrimary onClick={handleLoginRedirect}>
            Fazer Login
          </ButtonPrimary>
        </div>
      </div>
    </div>
  );
}

export default AuthRedirectModal;