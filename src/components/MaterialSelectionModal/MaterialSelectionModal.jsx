import React, { useState, useEffect } from 'react';
import './MaterialSelectionModal.css';
import ButtonPrimary from '../Button/ButtonPrimary';
import ButtonSecondary from '../Button/ButtonSecondary';

/**
 * @param {object} props
 * @param {boolean} props.isOpen - Se o modal está aberto.
 * @param {function} props.onClose - Função para fechar (Cancelar).
 * @param {function(string)} props.onConfirm - Função para confirmar (Salvar).
 * @param {string[]} props.categories - Lista de materiais possíveis (ex: ["Plástico", "Vidro", "Metal"]).
 * @param {string} props.detectedItemName - O nome do item detectado (ex: "Garrafa", "Banana").
 */
function MaterialSelectionModal({ isOpen, onClose, onConfirm, categories, detectedItemName }) { // <-- Prop Adicionada
  const [selectedMaterial, setSelectedMaterial] = useState('');

  useEffect(() => {
    if (categories && categories.length > 0) {
      setSelectedMaterial(categories[0]);
    }
  }, [categories, isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleConfirmClick = () => {
    onConfirm(selectedMaterial);
  };

  return (
    <div className="material-modal-overlay" onClick={onClose}>
      <div className="material-modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Qual o material?</h2>

        <p>
          O item detectado foi <strong>{detectedItemName || 'desconhecido'}</strong>. 
          Qual o material correto para salvar?
        </p>
        
        <div className="input-group">
          <select
            value={selectedMaterial}
            onChange={(e) => setSelectedMaterial(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        
        <div className="material-modal-buttons">
          <ButtonSecondary onClick={onClose}>
            Cancelar
          </ButtonSecondary>
          <ButtonPrimary onClick={handleConfirmClick}>
            Salvar
          </ButtonPrimary>
        </div>
      </div>
    </div>
  );
}

export default MaterialSelectionModal;