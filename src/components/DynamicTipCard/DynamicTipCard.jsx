import React from 'react';
import './DynamicTipCard.css';
import { FaLightbulb, FaRecycle } from 'react-icons/fa';

function DynamicTipCard({ material, tip, binInfo }) {
  if (!material || !tip) {
    return null;
  }

  return (
    <div className="tip-card-section">
      <div className="tip-card-icon">
        <FaLightbulb />
      </div>
      <div className="tip-card-content">
        <h3>Dica do Dia</h3>
        <p>
          Você tem escaneado bastante <strong>{material}</strong>! Lembre-se que a melhor forma de descartar é:
        </p>
        <span>{tip}</span>
        {binInfo && (
          <div className="tip-card-bin-info">
            <FaRecycle style={{ color: binInfo.color }} />
            <span>Lixeira Correta: <strong>{binInfo.name}</strong></span>
          </div>
        )}
      </div>
    </div>
  );
}

export default DynamicTipCard;