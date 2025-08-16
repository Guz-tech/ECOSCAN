
import styles from './Header.module.css'; 
function Header() {
  return (
 
    <header className={styles.headerContainer}>
      
      <a href="/" className={styles.logo}>
        <h1>EcoScan</h1> 
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