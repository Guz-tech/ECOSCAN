
import './Footer.css';
import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebookF, FaTwitter } from 'react-icons/fa';

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container footer-content">

                <div className="footer-section about">
                    <h2 className="footer-logo">EcoScan</h2>
                    <p>
                        Sua atitude inteligente <br /> para um futuro mais sustentável.
                    </p>
                </div>

                <div className="footer-section links">
                    <h3>Navegação</h3>
                    <ul>
                        <li><Link to="/">Início</Link></li>
                        <li><Link to="/sobre">Sobre</Link></li>
                        <li><Link to="/adicionar-residuo">Analisar Resíduo</Link></li>
                    </ul>
                </div>

                <div className="footer-section social">
                    <h3>Siga-nos</h3>
                    <div className="social-icons">
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebookF /></a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><FaTwitter /></a>
                    </div>
                </div>

            </div>
            
            <div className="footer-bottom">
                &copy; {currentYear} EcoScan | Todos os direitos reservados.
            </div>
        </footer>
    );
}

export default Footer;