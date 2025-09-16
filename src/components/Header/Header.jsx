import { useState } from 'react';
import './Header.css';
import logoImage from '@/assets/images/Logo.png';
import { Link } from 'react-router-dom';

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
    <li><Link to="/sobre" onClick={toggleMenu}>Sobre</Link></li>
    <li><Link to="/register" onClick={toggleMenu}>Cadastre-se</Link></li> 
    <li><Link to="/login" onClick={toggleMenu}>Login</Link></li> 
  </ul>
</nav>
      </div>
    </header>
  );
}

export default Header;
