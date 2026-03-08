import React, { useState } from 'react';
import './App.css';
import logo from './assets/imagens/logo.png';
import balde from './assets/imagens/balde.jpg';
import banner from './assets/imagens/banner.png';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="App">
      <header className="App-header">
        <nav className="navbar">
          <div className="logo">
            <img src={logo} alt="Logo" className="logo-image" />
          </div>
          <div className="hamburger" onClick={toggleMenu}>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            <li className="active">Início</li>
            <li>Empresa</li>
            <li>Sustentabilidade</li>
            <li>Contato</li>
          </ul>
          <button className="quote-button">Solicitar Orçamento</button>
        </nav>
        <div className="hero">
          <h1>EcoApack</h1>
          <p>Embalagens plásticas sustentáveis para indústria</p>
          <p>Potes 900ml | 1kg | 1,2kg</p>
          <div className="hero-buttons">
            <button className="whatsapp-button">Falar no WhatsApp</button>
          </div>
        </div>
      </header>
      <section className="products">
        <h2>Nossos Produtos</h2>
        <div className="product-list">
          <div className="product-item">
            <img src={balde} alt="Pote 900ml" />
            <h3>Pote 900ml</h3>
            <button>Ver Detalhes</button>
          </div>
          <div className="product-item">
            <img src={balde} alt="Pote 1kg" />
            <h3>Pote 1kg</h3>
            <button>Ver Detalhes</button>
          </div>
          <div className="product-item">
            <img src={balde} alt="Pote 1,2kg" />
            <h3>Pote 1,2kg</h3>
            <button>Ver Detalhes</button>
          </div>
        </div>
      </section>
      <section className="about">
        <div className="about-container">
          <img src={banner} alt="Sobre a EcoApack" className="about-image" />
          <div className="about-text">
            <h2>Sobre a EcoApack</h2>
            <p>
              A <strong>EcoApack</strong> fornece potes plásticos industriais para os setores de
              <strong> alimentos</strong>, <strong>químicos</strong> e <strong>nutrição animal</strong>.
            </p>
            <p>Qualidade, sustentabilidade e fornecimento confiável.</p>
          </div>
        </div>
      </section>
      <section className="contact">
        <h2>Solicite um Orçamento</h2>
        <div className="contact-container">
          <form className="contact-form">
            <input type="text" placeholder="Nome" />
            <input type="text" placeholder="Empresa" />
            <input type="text" placeholder="Telefone" />
            <input type="text" placeholder="Quantidade" />
            <button type="submit">Enviar</button>
          </form>
          <div className="whatsapp-contact">
            <p>Horário de atendimento: das 8:00 às 20:00, de segunda a sexta</p>
            <p>Entre em contato pelo WhatsApp para mais informações!</p>
          </div>
        </div>
      </section>
      <button className="floating-whatsapp-button">
        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" style={{ width: '30px', height: '30px' }} />
      </button>
    </div>
  );
}

export default App;
