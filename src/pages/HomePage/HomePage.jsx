import styles from "@/pages/HomePage/HomePage.module.css";
import heroImage from "@/assets/images/img.png";
import Header from "@/components/Header/Header.jsx";
import ButtonPrimary from '@/components/Button/ButtonPrimary.jsx';
import ButtonSecondary from '@/components/Button/ButtonSecondary.jsx';


function HomePage() {


  return (
    <>
    
      <Header />

      <main className={styles.mainContent}>
        <section className={styles.heroSection}>
          <div className={styles.heroText}>
            <h1>ECOSCAN</h1>
            <p>Sua atitude inteligente para um futuro mais sustentável.</p>
           <ButtonSecondary>
                Conheça o Dashboard
              </ButtonSecondary>
              <ButtonPrimary>
                Adicionar Resíduo
              </ButtonPrimary>
          </div>

          <div className={styles.heroImage}>
            <img src={heroImage} alt="Imagem Direita" />
          </div>
        </section>
      </main>
    </>
  );
}

export default HomePage;
