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
        <nav className="navbar navbar-expand-lg bg-white shadow-sm px-3 px-md-4">
          <div className="container-fluid">
            <div className="d-flex align-items-center logo">
              <img src={logo} alt="Logo" className="logo-image me-2" />
            </div>

            <button
              className="navbar-toggler"
              type="button"
              onClick={toggleMenu}
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`}>
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 nav-links">
                <li className="nav-item active">
                  <span className="nav-link">Início</span>
                </li>
                <li className="nav-item">
                  <span className="nav-link">Empresa</span>
                </li>
                <li className="nav-item">
                  <span className="nav-link">Sustentabilidade</span>
                </li>
                <li className="nav-item">
                  <span className="nav-link">Contato</span>
                </li>
              </ul>

              <button className="btn btn-warning rounded-pill quote-button">
                Solicitar Orçamento
              </button>
            </div>
          </div>
        </nav>

        <div className="hero d-flex flex-column justify-content-center">
          <div className="container">
            <h1 className="fw-bold">EcoApack</h1>
            <p>Embalagens plásticas sustentáveis para indústria</p>
            <p>Potes 900ml | 1kg | 1,2kg</p>
            <div className="hero-buttons d-flex flex-wrap gap-2">
              <button className="btn btn-success whatsapp-button">
                Falar no WhatsApp
              </button>
            </div>
          </div>
        </div>
      </header>

      <section className="products py-4 py-md-5">
        <div className="container">
          <h2 className="mb-4">Nossos Produtos</h2>
          <div className="row product-list">
            <div className="col-12 col-md-4 mb-4 d-flex">
              <div className="product-item w-100 text-center p-3">
                <img src={balde} alt="Pote 900ml" className="img-fluid mb-2" />
                <h3>Pote 900ml</h3>
                <button className="btn btn-primary mt-2">Ver Detalhes</button>
              </div>
            </div>
            <div className="col-12 col-md-4 mb-4 d-flex">
              <div className="product-item w-100 text-center p-3">
                <img src={balde} alt="Pote 1kg" className="img-fluid mb-2" />
                <h3>Pote 1kg</h3>
                <button className="btn btn-primary mt-2">Ver Detalhes</button>
              </div>
            </div>
            <div className="col-12 col-md-4 mb-4 d-flex">
              <div className="product-item w-100 text-center p-3">
                <img src={balde} alt="Pote 1,2kg" className="img-fluid mb-2" />
                <h3>Pote 1,2kg</h3>
                <button className="btn btn-primary mt-2">Ver Detalhes</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about py-4 py-md-5">
        <div className="container">
          <div className="row about-container align-items-center g-4">
            <div className="col-12 col-lg-6 d-flex justify-content-center">
              <img src={banner} alt="Sobre a EcoApack" className="about-image img-fluid" />
            </div>
            <div className="col-12 col-lg-6">
              <div className="about-text">
                <h2>Sobre a EcoApack</h2>
                <p>
                  A <strong>EcoApack</strong> fornece potes plásticos industriais para os setores de
                  <strong> alimentos</strong>, <strong>químicos</strong> e <strong>nutrição animal</strong>.
                </p>
                <p>Qualidade, sustentabilidade e fornecimento confiável.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact py-4 py-md-5">
        <div className="container">
          <h2>Solicite um Orçamento</h2>
          <div className="row contact-container mt-4 g-4">
            <div className="col-12 col-md-6">
              <form className="contact-form d-flex flex-column gap-2">
                <input type="text" className="form-control" placeholder="Nome" />
                <input type="text" className="form-control" placeholder="Empresa" />
                <input type="text" className="form-control" placeholder="Telefone" />
                <input type="text" className="form-control" placeholder="Quantidade" />
                <button type="submit" className="btn btn-primary mt-2">Enviar</button>
              </form>
            </div>
            <div className="col-12 col-md-6">
              <div className="whatsapp-contact h-100 d-flex flex-column justify-content-center">
                <p>Horário de atendimento: das 8:00 às 20:00, de segunda a sexta</p>
                <p>Entre em contato pelo WhatsApp para mais informações!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <button className="floating-whatsapp-button d-flex align-items-center justify-content-center">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp"
          style={{ width: '30px', height: '30px' }}
        />
      </button>
    </div>
  );
}

export default App;
