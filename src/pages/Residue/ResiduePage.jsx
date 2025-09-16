import ButtonPrimary from "@/components/Button/ButtonPrimary.jsx";
import ButtonSecondary from "@/components/Button/ButtonSecondary.jsx";
import "./Residue.css";

function ResiduePage() {
  return (
    <main>
  
      <section className="upload-section">
        <div className="container upload-content">
          <div className="upload-text">
            <h1>O que vamos reciclar hoje?</h1>
            <p>
              Aponte a câmera para um item ou escolha uma imagem da galeria para a análise.
            </p>
          </div>
          <div className="upload-buttons">
            <ButtonSecondary>Usar câmera</ButtonSecondary>
            <ButtonPrimary>Escolher da galeria</ButtonPrimary>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ResiduePage;