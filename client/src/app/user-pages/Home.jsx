import React, { Component } from 'react'
import logo from '../../assets/images/covalue/marca_co_amarela.png';
import { Link } from 'react-router-dom';

export class HomePage extends Component {
  
  componentDidMount() {
    // Load animations when trackedItems enter viewport
    let tracked = [].slice.call(document.querySelectorAll(".tracker"));
    let circles = [].slice.call(document.querySelectorAll(".circles"));

    if ("IntersectionObserver" in window) {
      let observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            let trackedItem = entry.target;
            circles.forEach(circle => circle.classList.add("on"));
            trackedItem.classList.add("fadeInBottom")
            observer.unobserve(trackedItem);
          }
        });
      });
  
      tracked.forEach((trackedItem) => observer.observe(trackedItem));
    }
  }

  render() {
    return (
      <div className="home-background">
        <section className="banner">
          <div className="banner left"></div>
          <div className="banner right"><img src={logo} alt="covalue"/></div>
        </section>
        <section className="section-intro">
          <div className="circles circle circle-right">
            <div className="circles circle__half"></div>
          </div>
          <div className="circles circle circle-left">
            <div className="circles circle__half circle__half--right"></div>
          </div>
          <div className="tracker intro-tag">
            <h3>
              Estamos aqui para melhorar negócios.<br />
              Com total integridade e transparência, representamos um upgrade estratégico
              que gera valor para a sua empresa onde você não sabia que existia.
            </h3>
            <Link to="/dashboard"><button className="btn-cv">Clientes</button></Link>
          </div>
        </section>
        <section className="section-process">
          <div className="link-institucional">
            <Link to="/institucional"><button className="btn-cv">Nossos Serviços</button></Link>
          </div>
          <div className="process-intro">
            <div className="text-blurb tracker">
              <div className="circles circle circles-process-left">
                <div className="circles circle__half circle__half--right"></div>
              </div>
              <h3>PROCESSO CONSULTIVO</h3>
              <h4>Assessoria de negócios que identifica problemas e encontra as melhores soluções para estruturar e evidenciar o potencial da empresa.</h4>
            </div>
            <div className="text-blurb tracker">
              <img src="https://res.cloudinary.com/mpc-cloud/image/upload/v1586873152/CoValue/meric-dagli-kZTYGpoeQO0-unsplash_pk5kvn.jpg" alt="Office Buildings"/>
              <p>Organizamos negócios e planejamos negociações que geram benefícios mútuos. <br />
                Nossa atuação vai do processo consultivo ao estratégico.
              </p>
            </div>
            <div className="text-blurb tracker">
              <div className="circles circle circles-process-right">
                <div className="circles circle__half"></div>
              </div>
              <h3>PROCESSO ESTRATÉGICO</h3>
              <h4>Planejar e mediar a negociação de fusão ou aquisição mais positiva para gerar verdadeiros ganhos para todos os envolvidos.</h4>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default HomePage
