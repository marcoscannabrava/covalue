import React, { Component } from 'react'
import logo from '../../assets/images/covalue/marca_co_amarela.png';

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
            observer.unobserve(trackedItem);
          }
        });
      });
  
      tracked.forEach(function(trackedItem) {
        observer.observe(trackedItem);
      });
    }
  }

  render() {
    let circle_right = {
      top: 0,
      right: 0,
      transform: 'translate(50%, -50%)'
    }
    let circle_left = {
      bottom: 0,
      left: 0,
      transform: 'translate(-50%, 50%)'
    }
    return (
      <div className="home-background">
        <section className="banner">
          <div className="banner left"></div>
          <div className="banner right"><img src={logo} alt="covalue"/></div>
        </section>
        <section className="section-intro">
          <div className="circles circle" style={circle_right}>
            <div className="circles circle__half"></div>
            <div className="circles circle__half circle__half--right"></div>
          </div>
          <div className="circles circle" style={circle_left}>
            <div className="circles circle__half"></div>
            <div className="circles circle__half circle__half--right"></div>
          </div>
          <h3 className="tracker">
            Estamos aqui para melhorar negócios.<br />
            Com total integridade e transparência, representamos um upgrade estratégico
            que gera valor para a sua empresa onde você não sabia que existia.
          </h3>
        </section>
        <section className="section-process">
          
        </section>
      </div>
    )
  }
}

export default HomePage
