import React, { useState, useEffect } from 'react';
import './DetectionConfirmationModal.css';
import ButtonPrimary from '../Button/ButtonPrimary';
import ButtonSecondary from '../Button/ButtonSecondary';

/**
 * Um modal para confirmar a detecção da IA antes de salvar no histórico.
 *
 * @param {object} props
 * @param {boolean} props.isOpen - Se o modal está aberto ou não.
 * @param {function} props.onClose - Função chamada ao fechar (botão 'Cancelar').
 * @param {function(string)} props.onConfirm - Função chamada ao confirmar (botão 'Salvar'). Retorna o material selecionado.
 * @param {string} props.detectedItemName - O nome traduzido do item detectado (ex: "Garrafa").
 * @param {string[]} props.categories - A lista de materiais possíveis para esse item (ex: ["Plástico", "Vidro"]).
 */
function DetectionConfirmationModal({ isOpen, onClose, onConfirm, detectedItemName, categories }) {
  const [selectedMaterial, setSelectedMaterial] = useState('');

  useEffect(() => {
    // Quando as categorias mudam (ou seja, um novo item é detectado),
    // define o material padrão como o primeiro da lista.
    if (categories && categories.length > 0) {
      setSelectedMaterial(categories[0]);
    } else {
      setSelectedMaterial('Outro/Rejeito');
    }
  }, [categories, isOpen]); // Resetar quando abrir

  if (!isOpen) {
    return null;
  }

  const handleConfirmClick = () => {
    onConfirm(selectedMaterial);
  };

  return (
    <div className="detection-modal-overlay" onClick={onClose}>
      <div className="detection-modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Confirmar Resíduo</h2>
        <p>Detectamos: <strong>{detectedItemName}</strong></p>
        <p className="modal-question">Qual é o material principal deste item?</p>
        
        <div className="input-group">
          <select
            value={selectedMaterial}
            onChange={(e) => setSelectedMaterial(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
            {/* Adiciona "Outro" caso a IA erre completamente o objeto */}
            {!categories.includes('Orgânico') && <option value="Orgânico">Orgânico</option>}
            {!categories.includes('Eletrônico') && <option value="Eletrônico">Eletrônico</option>}
            <option value="Outro/Rejeito">Outro / Rejeito</option>
          </select>
        </div>
        
        <div className="detection-modal-buttons">
          <ButtonSecondary onClick={onClose}>
            Cancelar
          </ButtonSecondary>
          <ButtonPrimary onClick={handleConfirmClick}>
            Salvar no Dashboard
          </ButtonPrimary>
        </div>
      </div>
    </div>
  );
}

export default DetectionConfirmationModal;