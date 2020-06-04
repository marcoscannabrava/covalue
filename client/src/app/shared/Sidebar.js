import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';
// import { Dropdown } from 'react-bootstrap';

import * as ROUTES from '../../constants/routes';

class Sidebar extends Component {
  state = {};

  toggleMenuState(menuState) {
    if (this.state[menuState]) {
      this.setState({[menuState] : false});
    } else if(Object.keys(this.state).length === 0) {
      this.setState({[menuState] : true});
    } else {
      Object.keys(this.state).forEach(i => {
        this.setState({[i]: false});
      });
      this.setState({[menuState] : true});
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    document.querySelector('#sidebar').classList.remove('active');
    Object.keys(this.state).forEach(i => {
      this.setState({[i]: false});
    });

    const dropdownPaths = [
      {path:'/basic-ui', state: 'basicUiMenuOpen'},
      {path:'/form-elements', state: 'formElementsMenuOpen'},
      {path:'/tables', state: 'tablesMenuOpen'},
      {path:'/icons', state: 'iconsMenuOpen'},
      {path:'/charts', state: 'chartsMenuOpen'},
      {path:'/user-pages', state: 'userPagesMenuOpen'},
    ];

    dropdownPaths.forEach((obj => {
      if (this.isPathActive(obj.path)) {
        this.setState({[obj.state] : true})
      }
    }));
  }

  render () {
    return (
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <div className="text-center sidebar-brand-wrapper d-flex align-items-center">
          <a className="sidebar-brand brand-logo" href="/dashboard"><img src={require("../../assets/images/covalue/marca_co_azul_texto.png")} alt="logo" /></a>
          <a className="sidebar-brand brand-logo-mini pt-3" href="/dashboard"><img src={require("../../assets/images/covalue/marca_co_azul_small.png" )} alt="logo" /></a>
        </div>
        <ul className="nav">
          <li className="nav-item nav-profile not-navigation-link">
            <div className="nav-link">
              <button className="btn btn-success btn-block" onClick={e => this.props.history.push(ROUTES.UPLOAD)}>Upload Spreadsheet <i className="mdi mdi-plus"></i></button>
            </div>
          </li>
          <li className={ this.isPathActive('/tables/financials') ? 'nav-item active' : 'nav-item' }>
            <Link className="nav-link" to="/tables/financials">
              <i className="mdi mdi-table-large menu-icon"></i>
              <span className="menu-title">Módulo Financials</span>
            </Link>
          </li>
          <li className={ this.isPathActive('/charts') ? 'nav-item active' : 'nav-item' }>
            <Link className="nav-link" to="/charts/chart-js">
              <i className="mdi mdi-chart-line menu-icon"></i>
              <span className="menu-title">Charts Examples</span>
            </Link>
          </li>
          {/* <li className={ this.isPathActive('/icons') ? 'nav-item active' : 'nav-item' }>
            <Link className="nav-link" to="/icons/font-awesome">
              <i className="mdi mdi-account-box-outline menu-icon"></i>
              <span className="menu-title">Icons</span>
            </Link>
          </li> 
          <li className="nav-item">
            <a className="nav-link" href="http://www.bootstrapdash.com/demo/star-admin-free/react/documentation/documentation.html" rel="noopener noreferrer" target="_blank">
              <i className="mdi mdi-file-outline menu-icon"></i>
              <span className="menu-title">Documentation</span>
            </a>
          </li> */}
        </ul>
      </nav>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }

  componentDidMount() {
    this.onRouteChanged();
    // add className 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    const body = document.querySelector('body');
    document.querySelectorAll('.sidebar .nav-item').forEach((el) => {
      
      el.addEventListener('mouseover', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open');
        }
      });
      el.addEventListener('mouseout', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open');
        }
      });
    });
  }

}

export default withRouter(Sidebar);