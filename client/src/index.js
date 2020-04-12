import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './app/App';
import Home from './app/user-pages/Home.jsx';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/home" component={ Home } />
      <Route path="/*" component={ App } />
    </Switch>
  </BrowserRouter>
, document.getElementById('root'));

serviceWorker.unregister();