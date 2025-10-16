import { useState } from 'react';
import './Header.css';
import logoImage from '@/assets/images/Logo.png';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContex.jsx';
import { FaUserCircle } from 'react-icons/fa';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    toggleMenu();
  };

  return (
    <header className="header">
      <div className="container headerContent">
        <Link to="/" className="logo">
          <img src={logoImage} alt="Logo do site" />
        </Link>

        <button className={`hamburger ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu} aria-label="Abrir menu" aria-expanded={isMenuOpen}>
          <div className="line" />
          <div className="line" />
          <div className="line" />
        </button>

        <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
          <ul className="navList">
            {user ? (
              <>
                <li><Link to="/sobre" onClick={toggleMenu}>Sobre</Link></li>
                <li><Link to="/dashboard" onClick={toggleMenu}>Dashboard</Link></li>
                <li className="user-profile">
                  <FaUserCircle className="user-icon" />
                  <span className="user-name">{user.name}</span>
                </li>
                <li><button onClick={handleLogout} className="logout-button">Sair</button></li>
              </>
            ) : (
              <>
                <li><Link to="/sobre" onClick={toggleMenu}>Sobre</Link></li>
                <li><Link to="/register" onClick={toggleMenu}>Cadastre-se</Link></li>
                <li><Link to="/login" onClick={toggleMenu}>Login</Link></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;