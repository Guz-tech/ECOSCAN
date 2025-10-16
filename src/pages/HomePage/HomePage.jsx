import "./HomePage.css";
import heroImage1 from "@/assets/images/img.png";
import heroImage2 from "@/assets/images/img2.png"; 
import heroImage3 from "@/assets/images/img3.png"; 

import ButtonPrimary from "@/components/Button/ButtonPrimary.jsx";
import ButtonSecondary from "@/components/Button/ButtonSecondary.jsx";
import WelcomeBanner from "@/components/WelcomeBanner/WelcomeBanner.jsx";
import { useNavigate } from "react-router-dom";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const heroImages = [
  { src: heroImage1, alt: "Planta brotando em musgo" },
  { src: heroImage2, alt: "Floresta vista de cima" }, 
  { src: heroImage3, alt: "Pessoa plantando uma muda" } 
];

const carouselData = [
  {
    title: "Separe o Lixo Seco do Orgânico",
    text: "Facilita a triagem e aumenta o potencial de reciclagem dos materiais. Lembre-se: recicláveis devem estar limpos e secos!"
  },
  {
    title: "Reduza o Uso de Plástico",
    text: "Opte por sacolas reutilizáveis, canudos de metal ou vidro e evite produtos com excesso de embalagens plásticas."
  },
  {
    title: "Composte o Lixo Orgânico",
    text: "Restos de frutas, verduras e cascas de ovos podem virar um adubo rico em nutrientes para suas plantas e horta."
  },
  {
    title: "Descarte Correto de Eletrônicos",
    text: "Pilhas, baterias e eletrônicos contêm metais tóxicos. Nunca os jogue no lixo comum. Procure pontos de coleta específicos em sua cidade."
  },
  {
    title: "Não Jogue Óleo de Cozinha na Pia",
    text: "Um litro de óleo pode contaminar milhares de litros de água. Guarde o óleo usado em uma garrafa PET e leve a um ponto de coleta para reciclagem."
  },
  {
    title: "O Que Fazer com Medicamentos Vencidos",
    text: "Não descarte remédios no lixo ou no vaso sanitário. Eles contaminam o solo e a água. Leve-os a farmácias que possuem programas de coleta."
  },
  {
    title: "Reutilize Embalagens e Potes",
    text: "Potes de vidro e embalagens plásticas resistentes podem ter uma nova vida! Use-os para guardar alimentos, organizar objetos ou como vasos para plantas."
  },
  {
    title: "Cuidado com Papéis Contaminados",
    text: "Caixas de pizza engorduradas, guardanapos usados e papéis com restos de comida não podem ser reciclados. Descarte-os no lixo orgânico ou comum."
  }
];

function HomePage() {
  const navigate = useNavigate();

  const handleAdicionarClick = () => navigate("/adicionar-residuo");
  const handleDashboardClick = () => navigate("/dashboard");

  return (
    <>
      <WelcomeBanner />
      <section className="heroSection">
        <div className="hero-columns-container container">
          <div className="heroLeft">
            <Swiper
              className="heroSwiper"
              modules={[Navigation, Pagination, A11y, Autoplay, EffectFade]}
              effect="fade"
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              loop={true}
              pagination={{ clickable: true }}
              navigation
            >
              {heroImages.map((image, index) => (
                <SwiperSlide key={index}>
                  <img src={image.src} alt={image.alt} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="heroRight">
            <div className="heroTextContent">
              <h1>ECOSCAN</h1>
              <p>Sua atitude inteligente para um futuro mais sustentável.</p>
              <div className="heroButtons">
                <ButtonSecondary onClick={handleDashboardClick}>
                  Conheça o Dashboard
                </ButtonSecondary>
                <ButtonPrimary onClick={handleAdicionarClick}>
                  Adicionar Resíduo
                </ButtonPrimary>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="carouselSection">
        <div className="container">
          <h2 className="carouselTitle">Dicas para um Planeta Mais Saudável</h2>
          <Swiper
            modules={[Navigation, Pagination, A11y]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {carouselData.map((item, index) => (
              <SwiperSlide key={index} className="tip-card">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
}

export default HomePage;