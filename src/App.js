import React, { useState, useRef } from 'react';
import emailjs from 'emailjs-com';
import './App.css';
import logo from './assets/imagens/logo.png';
import balde from './assets/imagens/balde.jpg';
import banner from './assets/imagens/banner.png';

function App() {
  const [activePage, setActivePage] = useState('inicio');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const orcamentoFormRef = useRef(null);
  const contatoFormRef = useRef(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleNavClick = (page) => {
    setActivePage(page);
    setIsMenuOpen(false);
  };

  const handleSendOrcamento = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_k48nzyk',
        'template_x6cmgy9', // template do orçamento com {{name}}, {{company}}, {{phone}}, {{email}}, {{title}}, {{quantity}}
        orcamentoFormRef.current,
        'XA3bPgeE4kBEMLL_X'
      )
      .then(
        () => {
          alert('Orçamento enviado com sucesso!');
          e.target.reset();
        },
        (error) => {
          console.error('Erro ao enviar orçamento:', error);
          alert('Ocorreu um erro ao enviar o orçamento. Tente novamente mais tarde.');
        }
      );
  };

  const handleSendContato = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_k48nzyk',
        'template_g099qkk', // template de contato (com {{name}} e {{title}})
        contatoFormRef.current,
        'XA3bPgeE4kBEMLL_X'
      )
      .then(
        () => {
          alert('Mensagem enviada com sucesso!');
          e.target.reset();
        },
        (error) => {
          console.error('Erro ao enviar mensagem:', error);
          alert('Ocorreu um erro ao enviar. Tente novamente mais tarde.');
        }
      );
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
                <li className={`nav-item ${activePage === 'inicio' ? 'active' : ''}`}>
                  <span className="nav-link" onClick={() => handleNavClick('inicio')}>Início</span>
                </li>
                <li className={`nav-item ${activePage === 'empresa' ? 'active' : ''}`}>
                  <span className="nav-link" onClick={() => handleNavClick('empresa')}>Empresa</span>
                </li>
                <li className={`nav-item ${activePage === 'sustentabilidade' ? 'active' : ''}`}>
                  <span className="nav-link" onClick={() => handleNavClick('sustentabilidade')}>Sustentabilidade</span>
                </li>
                <li className={`nav-item ${activePage === 'contato' ? 'active' : ''}`}>
                  <span className="nav-link" onClick={() => handleNavClick('contato')}>Contato</span>
                </li>
              </ul>

              <button className="btn btn-warning rounded-pill quote-button">
                Solicitar Orçamento
              </button>
            </div>
          </div>
        </nav>

        {activePage === 'inicio' && (
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
        )}
      </header>

      {activePage === 'inicio' && (
        <>
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
                  <form
                    ref={orcamentoFormRef}
                    className="contact-form d-flex flex-column gap-2"
                    onSubmit={handleSendOrcamento}
                  >
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Nome"
                      required
                    />
                    <input
                      type="text"
                      name="company"
                      className="form-control"
                      placeholder="Empresa"
                    />
                    <input
                      type="text"
                      name="phone"
                      className="form-control"
                      placeholder="Telefone"
                    />
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="E-mail"
                      required
                    />
                    <input
                      type="text"
                      name="title"
                      className="form-control"
                      placeholder="Assunto / Produto de interesse"
                      required
                    />
                    <input
                      type="text"
                      name="quantity"
                      className="form-control"
                      placeholder="Quantidade"
                    />
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
        </>
      )}

      {activePage === 'empresa' && (
        <main className="empresa-page py-4 py-md-5">
          <div className="container">
            <h2 className="empresa-title mb-4">Sobre a Empresa</h2>
            <div className="row g-4 align-items-start">
              <div className="col-12 col-md-6">
                <p className="empresa-text">
                  A <strong>EcoApack</strong> é uma empresa especializada na produção de potes e embalagens plásticas
                  industriais, atendendo os setores de alimentos, químicos e nutrição animal. Nosso foco é oferecer
                  soluções seguras, resistentes e alinhadas às melhores práticas de sustentabilidade.
                </p>
                <p className="empresa-text">
                  Com equipe técnica experiente e um parque fabril moderno, garantimos qualidade constante,
                  prazos confiáveis e suporte próximo ao cliente em todas as etapas, do projeto à entrega.
                </p>
                <p className="empresa-text">
                  Trabalhamos com matérias-primas selecionadas, processos controlados e buscamos sempre reduzir o
                  impacto ambiental através de reciclagem, otimização de recursos e inovação em embalagens.
                </p>
              </div>
              <div className="col-12 col-md-6">
                <div className="empresa-box p-3 p-md-4">
                  <h3>Nosso Compromisso</h3>
                  <ul>
                    <li>Fornecimento contínuo e confiável para a sua produção.</li>
                    <li>Embalagens com excelente vedação e resistência mecânica.</li>
                    <li>Parceria de longo prazo, com atendimento dedicado.</li>
                    <li>Busca constante por soluções mais sustentáveis.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {activePage === 'sustentabilidade' && (
        <main className="sustentabilidade-page py-4 py-md-5">
          <div className="container">
            <h2 className="mb-4 sustentabilidade-title">Sustentabilidade</h2>
            <div className="row g-4 align-items-start">
              <div className="col-12 col-md-6">
                <p className="sustentabilidade-text">
                  Na <strong>EcoApack</strong>, a sustentabilidade faz parte do dia a dia. Buscamos reduzir o impacto
                  ambiental em toda a cadeia produtiva, desde a escolha de matérias-primas até a destinação das embalagens
                  após o uso.
                </p>
                <p className="sustentabilidade-text">
                  Investimos em processos mais eficientes, reaproveitamento de resíduos plásticos e parcerias com
                  recicladores, contribuindo para a economia circular e para o uso responsável dos recursos naturais.
                </p>
                <p className="sustentabilidade-text">
                  Também apoiamos nossos clientes com orientações sobre o descarte correto e possibilidades de reutilização
                  das embalagens, alinhando performance, segurança de produto e responsabilidade ambiental.
                </p>
              </div>
              <div className="col-12 col-md-6">
                <div className="sustentabilidade-box p-3 p-md-4">
                  <h3>Nossas Ações Verdes</h3>
                  <ul>
                    <li>Uso otimizado de matéria-prima e redução de desperdícios.</li>
                    <li>Incorporação de material reciclado quando tecnicamente viável.</li>
                    <li>Parcerias com empresas de logística reversa e reciclagem.</li>
                    <li>Monitoramento contínuo de consumo de energia e água.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {activePage === 'contato' && (
        <main className="contato-page py-4 py-md-5">
          <div className="container">
            <h2 className="mb-4 contato-title">Contato</h2>
            <div className="row g-4">
              <div className="col-12 col-md-6">
                <form
                  ref={contatoFormRef}
                  className="contato-form d-flex flex-column gap-2"
                  onSubmit={handleSendContato}
                >
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Nome"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="E-mail"
                    required
                  />
                  <input
                    type="text"
                    name="phone"
                    className="form-control"
                    placeholder="Telefone"
                  />
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    placeholder="Assunto"
                    required
                  />
                  <textarea
                    name="message"
                    className="form-control"
                    rows="4"
                    placeholder="Mensagem"
                    required
                  ></textarea>
                  <button type="submit" className="btn btn-primary mt-2">Enviar Mensagem</button>
                </form>
              </div>
              <div className="col-12 col-md-6">
                <div className="contato-info p-3 p-md-4">
                  <h3>Fale Conosco</h3>
                  <p>E-mail: contato@ecoapack.com.br</p>
                  <p>Telefone: (11) 0000-0000</p>
                  <p>Horário de atendimento: das 8:00 às 20:00, de segunda a sexta.</p>
                  <p>
                    Você também pode falar diretamente pelo WhatsApp clicando no botão flutuante no canto inferior
                    direito da tela.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

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
