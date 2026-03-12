import React, { useState, useRef } from 'react';
import emailjs from 'emailjs-com';
import './App.css';
import logo from './assets/imagens/logo.png';
import balde from './assets/imagens/balde.jpg';
import banner from './assets/imagens/banner.png';

function App() {
  const [activePage, setActivePage] = useState('inicio');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedBucketColor, setSelectedBucketColor] = useState('Branco');
  const [selectedLidColor, setSelectedLidColor] = useState('Branco');
  const orcamentoFormRef = useRef(null);
  const contatoFormRef = useRef(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleNavClick = (page, scrollToOrcamento = false) => {
    setActivePage(page);
    setIsMenuOpen(false);

    // se já estivermos na página início e for para orçamento, rola para a seção
    if (scrollToOrcamento && page === 'inicio') {
      setTimeout(() => {
        const section = document.getElementById('orcamento-section');
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
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

  const openProductDetails = (product) => {
    setSelectedProduct(product);
    // reset cores padrão ao abrir detalhes
    setSelectedBucketColor('Branco');
    setSelectedLidColor('Branco');
  };

  const closeProductDetails = () => {
    setSelectedProduct(null);
  };

  const handleRequestQuoteFromModal = () => {
    // monta descrição amigável do produto
    let productName = '';
    if (selectedProduct === 'Balde900') productName = 'Balde 900ml';
    if (selectedProduct === 'Balde1kg') productName = 'Balde 1kg';
    if (selectedProduct === 'Balde12kg') productName = 'Balde 1,2kg';

    const subjectText = `${productName} - Balde: ${selectedBucketColor} | Tampa: ${selectedLidColor}`;

    // garante que estamos na página início e rola até o formulário
    setActivePage('inicio');
    setIsMenuOpen(false);

    setTimeout(() => {
      const section = document.getElementById('orcamento-section');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }

      // preenche o campo "title" do formulário de orçamento
      if (orcamentoFormRef.current) {
        const titleInput = orcamentoFormRef.current.querySelector('input[name="title"]');
        if (titleInput) {
          titleInput.value = subjectText;
        }
      }
    }, 200);

    closeProductDetails();
  };

  return (
    <div className="App">
      <header className="App-header">
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-3 px-md-4">
          <div className="container-fluid">
            {/* Logo como botão para "Início" */}
            <button
              type="button"
              className="navbar-brand d-flex align-items-center logo btn btn-link p-0 border-0 text-decoration-none"
              onClick={() => handleNavClick('inicio')}
            >
              <img src={logo} alt="Logo" className="logo-image me-2" />
            </button>

            {/* Botão hamburguer Bootstrap customizado */}
            <button
              className="navbar-toggler"
              type="button"
              aria-controls="navbarSupportedContent"
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation"
              onClick={toggleMenu}
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            {/* Menu colapsável (painel lateral em mobile) */}
            <div
              className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`}
              id="navbarSupportedContent"
            >
              {/* Botão X para fechar no mobile, posicionado no canto superior direito do painel */}
              <button
                type="button"
                className="close-menu-btn d-lg-none"
                onClick={toggleMenu}
              >
                ✕
              </button>

              {/* Links do menu – empilhados em mobile, em linha no desktop */}
              <ul className="navbar-nav mx-auto mb-2 mb-lg-0 nav-links">
                <li className={`nav-item ${activePage === 'inicio' ? 'active' : ''}`}>
                  <button
                    className="nav-link btn btn-link"
                    onClick={() => handleNavClick('inicio')}
                  >
                    Início
                  </button>
                </li>
                <li className={`nav-item ${activePage === 'empresa' ? 'active' : ''}`}>
                  <button
                    className="nav-link btn btn-link"
                    onClick={() => handleNavClick('empresa')}
                  >
                    Empresa
                  </button>
                </li>
                <li className={`nav-item ${activePage === 'sustentabilidade' ? 'active' : ''}`}>
                  <button
                    className="nav-link btn btn-link"
                    onClick={() => handleNavClick('sustentabilidade')}
                  >
                    Sustentabilidade
                  </button>
                </li>
                <li className={`nav-item ${activePage === 'contato' ? 'active' : ''}`}>
                  <button
                    className="nav-link btn btn-link"
                    onClick={() => handleNavClick('contato')}
                  >
                    Contato
                  </button>
                </li>
                {/* Link de orçamento no menu hambúrguer (mobile) */}
                <li className="nav-item d-lg-none">
                  <button
                    className="nav-link btn btn-link"
                    onClick={() => handleNavClick('inicio', true)}
                  >
                    Solicitar Orçamento
                  </button>
                </li>
              </ul>

              {/* Botão de orçamento separado, visível apenas em desktop */}
              <button
                className="btn btn-warning rounded-pill quote-button d-none d-lg-inline-block ms-lg-4"
                onClick={() => handleNavClick('inicio', true)}
              >
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
              <p>Balde 900ml | 1kg | 1,2kg</p>
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
          <section className="products py-4 py-md-5 fade-in-once">
            <div className="container">
              <h2 className="mb-4">Nossos Produtos</h2>
              <div className="row product-list">
                <div className="col-12 col-md-4 mb-4 d-flex">
                  <div className="product-item w-100 text-center p-3">
                    <img src={balde} alt="Balde 900ml" className="img-fluid mb-2" />
                    <h3>Balde 900ml</h3>
                    <button
                      className="btn btn-primary mt-2"
                      type="button"
                      onClick={() => openProductDetails('Balde900')}
                    >
                      Ver Detalhes
                    </button>
                  </div>
                </div>
                <div className="col-12 col-md-4 mb-4 d-flex">
                  <div className="product-item w-100 text-center p-3">
                    <img src={balde} alt="Balde 1kg" className="img-fluid mb-2" />
                    <h3>Balde 1kg</h3>
                    <button
                      className="btn btn-primary mt-2"
                      type="button"
                      onClick={() => openProductDetails('Balde1kg')}
                    >
                      Ver Detalhes
                    </button>
                  </div>
                </div>
                <div className="col-12 col-md-4 mb-4 d-flex">
                  <div className="product-item w-100 text-center p-3">
                    <img src={balde} alt="Balde 1,2kg" className="img-fluid mb-2" />
                    <h3>Balde 1,2kg</h3>
                    <button
                      className="btn btn-primary mt-2"
                      type="button"
                      onClick={() => openProductDetails('Balde12kg')}
                    >
                      Ver Detalhes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Overlay/página sobreposta de detalhes de produto */}
          {selectedProduct && (
            <div className="product-modal-backdrop" onClick={closeProductDetails}>
              <div
                className="product-modal"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  className="product-modal-close"
                  onClick={closeProductDetails}
                >
                  ✕
                </button>

                {selectedProduct === 'Balde900' && (
                  <>
                    <h3>Balde 900ml</h3>
                    <div className="product-modal-body">
                      {/* Coluna esquerda: miniaturas + imagem grande */}
                      <div className="product-modal-left">
                        <div className="product-modal-thumbs-column">
                          <div className="product-modal-thumb"><img src={balde} alt="Balde 900ml - vista 1" /></div>
                          <div className="product-modal-thumb"><img src={balde} alt="Balde 900ml - vista 2" /></div>
                          <div className="product-modal-thumb"><img src={balde} alt="Balde 900ml - vista 3" /></div>
                        </div>
                        <div className="product-modal-image-large">
                          <img src={balde} alt="Balde 900ml" />
                        </div>
                      </div>

                      {/* Coluna direita: informações + seleção de cores + botão de orçamento */}
                      <div className="product-modal-info">
                        <p><strong>Descrição:</strong> Balde plástico indicado para produtos em menores volumes, com excelente vedação e alta durabilidade.</p>
                        <p><strong>Tamanho externo aproximado:</strong> 12 cm (diâmetro) x 10 cm (altura).</p>
                        <p><strong>Peso do Balde (vazio):</strong> 80 g.</p>
                        <p><strong>Capacidade / quanto suporta:</strong> 900 ml (aprox. 0,9 kg para produtos de densidade próxima à água).</p>
                        <p><strong>Aplicações:</strong> Nutrição animal, suplementos, granulados, produtos em pó e pastosos em menor volume.</p>
                        <p><strong>Variação por cor:</strong> Tampa nas cores branco, preto, verde e azul; corpo em branco ou natural translúcido.</p>

                        {/* Seleção de cor do balde e tampa */}
                        <div className="product-color-select mt-3">
                          <div className="mb-2">
                            <label className="form-label mb-1"><strong>Cor do balde:</strong></label>
                            <select
                              className="form-select form-select-sm"
                              value={selectedBucketColor}
                              onChange={(e) => setSelectedBucketColor(e.target.value)}
                            >
                              <option>Branco</option>
                              <option>Natural translúcido</option>
                            </select>
                          </div>
                          <div>
                            <label className="form-label mb-1"><strong>Cor da tampa:</strong></label>
                            <select
                              className="form-select form-select-sm"
                              value={selectedLidColor}
                              onChange={(e) => setSelectedLidColor(e.target.value)}
                            >
                              <option>Branco</option>
                              <option>Preto</option>
                              <option>Verde</option>
                              <option>Azul</option>
                            </select>
                          </div>
                        </div>

                        <button
                          type="button"
                          className="btn btn-success mt-3"
                          onClick={handleRequestQuoteFromModal}
                        >
                          Solicitar Orçamento deste produto
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {selectedProduct === 'Balde1kg' && (
                  <>
                    <h3>Balde 1kg</h3>
                    <div className="product-modal-body">
                      <div className="product-modal-left">
                        <div className="product-modal-thumbs-column">
                          <div className="product-modal-thumb"><img src={balde} alt="Balde 1kg - vista 1" /></div>
                          <div className="product-modal-thumb"><img src={balde} alt="Balde 1kg - vista 2" /></div>
                          <div className="product-modal-thumb"><img src={balde} alt="Balde 1kg - vista 3" /></div>
                        </div>
                        <div className="product-modal-image-large">
                          <img src={balde} alt="Balde 1kg" />
                        </div>
                      </div>
                      <div className="product-modal-info">
                        <p><strong>Descrição:</strong> Balde robusto, ideal para produtos de maior volume, com fechamento seguro para transporte e empilhamento.</p>
                        <p><strong>Tamanho externo aproximado:</strong> 14 cm (diâmetro) x 12 cm (altura).</p>
                        <p><strong>Peso do Balde (vazio):</strong> 95 g.</p>
                        <p><strong>Capacidade / quanto suporta:</strong> 1 kg (para produtos sólidos ou em pó, variando conforme densidade).</p>
                        <p><strong>Aplicações:</strong> Rações, nutracêuticos, produtos químicos sólidos, fertilizantes e similares.</p>
                        <p><strong>Variação por cor:</strong> Tampas em branco, preto, vermelho e verde; corpo em branco ou natural.</p>

                        <div className="product-color-select mt-3">
                          <div className="mb-2">
                            <label className="form-label mb-1"><strong>Cor do balde:</strong></label>
                            <select
                              className="form-select form-select-sm"
                              value={selectedBucketColor}
                              onChange={(e) => setSelectedBucketColor(e.target.value)}
                            >
                              <option>Branco</option>
                              <option>Natural translúcido</option>
                            </select>
                          </div>
                          <div>
                            <label className="form-label mb-1"><strong>Cor da tampa:</strong></label>
                            <select
                              className="form-select form-select-sm"
                              value={selectedLidColor}
                              onChange={(e) => setSelectedLidColor(e.target.value)}
                            >
                              <option>Branco</option>
                              <option>Preto</option>
                              <option>Vermelho</option>
                              <option>Verde</option>
                            </select>
                          </div>
                        </div>

                        <button
                          type="button"
                          className="btn btn-success mt-3"
                          onClick={handleRequestQuoteFromModal}
                        >
                          Solicitar Orçamento deste produto
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {selectedProduct === 'Balde12kg' && (
                  <>
                    <h3>Balde 1,2kg</h3>
                    <div className="product-modal-body">
                      <div className="product-modal-left">
                        <div className="product-modal-thumbs-column">
                          <div className="product-modal-thumb"><img src={balde} alt="Balde 1,2kg - vista 1" /></div>
                          <div className="product-modal-thumb"><img src={balde} alt="Balde 1,2kg - vista 2" /></div>
                          <div className="product-modal-thumb"><img src={balde} alt="Balde 1,2kg - vista 3" /></div>
                        </div>
                        <div className="product-modal-image-large">
                          <img src={balde} alt="Balde 1,2kg" />
                        </div>
                      </div>
                      <div className="product-modal-info">
                        <p><strong>Descrição:</strong> Balde com volume intermediário, indicado para linhas premium ou embalagens econômicas.</p>
                        <p><strong>Tamanho externo aproximado:</strong> 15 cm (diâmetro) x 13 cm (altura).</p>
                        <p><strong>Peso do Balde (vazio):</strong> 105 g.</p>
                        <p><strong>Capacidade / quanto suporta:</strong> 1,2 kg (aprox., conforme densidade do produto).</p>
                        <p><strong>Aplicações:</strong> Nutrição animal premium, suplementos, produtos alimentícios e químicos sólidos.</p>
                        <p><strong>Variação por cor:</strong> Tampas em branco, azul, verde e amarelo; corpo em branco ou translúcido.</p>

                        <div className="product-color-select mt-3">
                          <div className="mb-2">
                            <label className="form-label mb-1"><strong>Cor do balde:</strong></label>
                            <select
                              className="form-select form-select-sm"
                              value={selectedBucketColor}
                              onChange={(e) => setSelectedBucketColor(e.target.value)}
                            >
                              <option>Branco</option>
                              <option>Natural translúcido</option>
                            </select>
                          </div>
                          <div>
                            <label className="form-label mb-1"><strong>Cor da tampa:</strong></label>
                            <select
                              className="form-select form-select-sm"
                              value={selectedLidColor}
                              onChange={(e) => setSelectedLidColor(e.target.value)}
                            >
                              <option>Branco</option>
                              <option>Azul</option>
                              <option>Verde</option>
                              <option>Amarelo</option>
                            </select>
                          </div>
                        </div>

                        <button
                          type="button"
                          className="btn btn-success mt-3"
                          onClick={handleRequestQuoteFromModal}
                        >
                          Solicitar Orçamento deste produto
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          <section className="about py-4 py-md-5 fade-in-once">
            <div className="container">
              <h2>
                Sobre a{' '}
                <span>Eco</span>
                <span className="about-title-green">Aparck</span>
              </h2>
              <div className="row align-items-stretch mt-3">
                <div className="col-12 col-md-6 mb-3 mb-md-0">
                  <img src={banner} alt="Linha de produção EcoApack" className="about-image" />
                </div>
                <div className="col-12 col-md-6 d-flex">
                  <div className="about-text-box p-3 p-md-4 w-100">
                    <p>
                      A <strong className="about-title-green">EcoApack</strong> fornece Balde plásticos industriais
                      para os setores de <strong>alimentos</strong>, <strong>químicos</strong> e
                      <strong> nutrição animal</strong>.
                    </p>
                    <p className="mb-0">
                      Qualidade, sustentabilidade e fornecimento confiável.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="orcamento-section" className="contact py-4 py-md-5 fade-in-once">
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
                  A <strong>EcoApack</strong> é uma empresa especializada na produção de Balde e embalagens plásticas
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

      {/* Footer */}
      <footer className="site-footer mt-4">
        <div className="container py-4 py-md-5">
          <div className="row gy-3 gy-md-4 align-items-start">
            {/* Coluna 1: marca e descrição curta */}
            <div className="col-12 col-md-4 text-center text-md-start">
              <span className="footer-brand d-block mb-2">EcoApack</span>
              <p className="footer-text mb-1">
                Embalagens plásticas industriais com foco em qualidade e sustentabilidade.
              </p>
              <p className="footer-text mb-0">
                Atendendo indústrias de alimentos, químicos e nutrição animal.
              </p>
            </div>

            {/* Coluna 2: contato e endereço */}
            <div className="col-12 col-md-4 text-center text-md-start footer-contact-col">
              <h6 className="footer-section-title mb-2">Contato</h6>
              <p className="footer-text mb-1">Telefone/WhatsApp: (11) 0000-0000</p>
              <p className="footer-text mb-1">E-mail: contato@ecoapack.com.br</p>
              <p className="footer-text mb-0">
                Endereço: Rua Exemplo, 123 - Bairro Industrial<br />
                Cidade - SC, Brasil
              </p>
            </div>

            {/* Coluna 3: redes sociais */}
            <div className="col-12 col-md-4 text-center text-md-start text-md-end">
              <h6 className="footer-section-title mb-2">Redes Sociais</h6>
              <div className="footer-social d-flex justify-content-center justify-content-md-end gap-3">
                <a
                  href="https://www.instagram.com/ecoapack"
                  className="footer-social-icon instagram"
                  aria-label="Instagram EcoApack"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fa-brands fa-instagram"></i>
                </a>
                <a
                  href="https://www.facebook.com/ecoapack"
                  className="footer-social-icon facebook"
                  aria-label="Facebook EcoApack"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fa-brands fa-facebook-f"></i>
                </a>
                <a
                  href="https://wa.me/1100000000"
                  className="footer-social-icon whatsapp"
                  aria-label="WhatsApp EcoApack"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fa-brands fa-whatsapp"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="footer-bottom text-center mt-3 pt-3 border-top">
            <span className="footer-text">
              &copy; {new Date().getFullYear()} EcoApack - Todos os direitos reservados.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
