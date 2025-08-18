import "./HomePage.css";
import heroImage from "@/assets/images/img.png";

import ButtonPrimary from "@/components/Button/ButtonPrimary.jsx";
import ButtonSecondary from "@/components/Button/ButtonSecondary.jsx";
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  const handleAdicionarClick = () => {
    
    console.log("Redirecionando para a página de adicionar resíduo...");
    navigate('/adicionar-residuo');
  };
  return (
    <>

      <main>
        <section className="heroSection">
          <div className="container heroContent">
            <div className="heroText">
              <h1>ECOSCAN</h1>
              <p>Sua atitude inteligente para um futuro mais sustentável.</p>
              <div className="heroButtons">
                <ButtonSecondary>Conheça o Dashboard</ButtonSecondary>
                <ButtonPrimary onClick={handleAdicionarClick}>Adicionar Resíduo</ButtonPrimary>
              </div>
            </div>

            <div className="heroImage">
              <img src={heroImage} alt="Pessoas reciclando lixo" />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default HomePage;
