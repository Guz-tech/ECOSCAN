
import styles from './Header.module.css'; 
import logoImage from '@/assets/images/Logo.png';

function Header() {
  return (
 
    <header className={styles.headerContainer}>
      
      <a href="/" className={styles.logo}>
      <img src={logoImage} alt="Logo do site" />
      </a>

      <nav>
        <ul className={styles.navList}>
          <li><a href="/sobre">Sobre</a></li>
          <li><a href="/Qcomo-funciona">Como Funciona</a></li>
          <li><a href="/contato">Contato</a></li>
        </ul>
      </nav>

    </header>
  );
}

export default Header;