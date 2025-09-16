import React from 'react';
import './SobrePage.css';
import { FaBullseye, FaExclamationTriangle, FaCogs } from 'react-icons/fa'; 
function SobrePage() {
  return (
    <div className="sobre-page">
      <div className="sobre-hero">
        <div className="container">
          <h1>Sobre o EcoScan</h1>
          <p className="hero-subtitle">Entenda nossa missão e como estamos usando a tecnologia para promover um futuro mais sustentável.</p>
        </div>
      </div>

      <div className="container sobre-content">
        <section className="sobre-section">
          <div className="section-icon"><FaBullseye /></div>
          <h2>Nossa Missão</h2>
          <p>
            Nossa missão é simplificar e incentivar a reciclagem para todos. Acreditamos que, com a ferramenta certa, cada pessoa pode se tornar um agente ativo na luta contra a poluição, transformando atitudes diárias em um grande impacto positivo para o planeta.
          </p>
        </section>

        <hr className="section-divider" />

        <section className="sobre-section">
          <div className="section-icon"><FaExclamationTriangle /></div>
          <h2>O Problema</h2>
          <p>
            A contaminação por descarte incorreto de resíduos é um dos maiores desafios ambientais do nosso tempo. Muitos materiais recicláveis acabam em aterros sanitários por falta de informação, contaminando o solo e a água e desperdiçando recursos valiosos que poderiam ser reaproveitados.
          </p>
        </section>

        <hr className="section-divider" />

        <section className="sobre-section">
          <div className="section-icon"><FaCogs /></div>
          <h2>Como Funciona</h2>
          <p>
            O EcoScan utiliza inteligência artificial para identificar e classificar diferentes tipos de resíduos a partir de uma simples foto. Com nossa plataforma, você pode rapidamente saber se um item é reciclável, qual o seu tipo e encontrar informações sobre o descarte correto, tudo na palma da sua mão.
          </p>
        </section>
      </div>
    </div>
  );
}

export default SobrePage;