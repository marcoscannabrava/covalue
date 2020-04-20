import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './app/App';
import Home from './app/user-pages/Home.jsx';
import * as serviceWorker from './serviceWorker';

import Firebase, { FirebaseContext } from './app/Firebase';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/home" component={ Home } />
      <Route path="/*">
        <FirebaseContext.Provider value={new Firebase()}>
          <App />
        </FirebaseContext.Provider>
        </Route>
    </Switch>
  </BrowserRouter>
, document.getElementById('root'));

serviceWorker.unregister();