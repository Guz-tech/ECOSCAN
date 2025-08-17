import "./HomePage.css";
import heroImage from "@/assets/images/img.png";
import Header from "@/components/Header/Header.jsx";
import ButtonPrimary from "@/components/Button/ButtonPrimary.jsx";
import ButtonSecondary from "@/components/Button/ButtonSecondary.jsx";

function HomePage() {
  return (
    <>
      <Header />

      <main>
        <section className="heroSection">
          <div className="container heroContent">
            <div className="heroText">
              <h1>ECOSCAN</h1>
              <p>Sua atitude inteligente para um futuro mais sustentável.</p>
              <div className="heroButtons">
                <ButtonSecondary>Conheça o Dashboard</ButtonSecondary>
                <ButtonPrimary>Adicionar Resíduo</ButtonPrimary>
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
