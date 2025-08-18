import { useState } from 'react';
import './Header.css';
import logoImage from '@/assets/images/Logo.png';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="container headerContent">
        <a href="/" className="logo">
          <img src={logoImage} alt="Logo do site" />
        </a>

        <button className={`hamburger ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu} aria-label="Abrir menu" aria-expanded={isMenuOpen}>
          <div className="line" />
          <div className="line" />
          <div className="line" />
        </button>

        <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
          <ul className="navList">
            <li><a href="/sobre" onClick={toggleMenu}>Sobre</a></li>
            <li><a href="/cadastro" onClick={toggleMenu}>Cadastre-se</a></li>
            <li><a href="/contato" onClick={toggleMenu}>Login</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
