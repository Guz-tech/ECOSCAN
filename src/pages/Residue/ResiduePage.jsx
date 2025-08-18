import ButtonPrimary from "@/components/Button/ButtonPrimary.jsx";
import ButtonSecondary from "@/components/Button/ButtonSecondary.jsx";
import "./Residue.css";


function ResiduePage() {
  return (
    <main>
      <section className="heroSection">
        <div className="container heroContent">
    
          <div className="heroText">
            <h1>O que vamos reciclar hoje?</h1>
            <p>
                Aponte a câmera paara um item ou escolha uma imagem da galeria para a análise.
            </p>

            <div className="heroButtons">
              <ButtonSecondary>Usar câmera</ButtonSecondary>

              <ButtonPrimary>Escolher da galeria</ButtonPrimary>
            </div>
          </div>
          
        </div>
      </section>
    </main>
  );
}

export default ResiduePage;
