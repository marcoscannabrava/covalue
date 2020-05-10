import React, { Component,Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './user-pages/Home.jsx';

import Spinner from '../app/shared/Spinner';

const Dashboard = lazy(() => import('./components/dashboard/Dashboard.jsx'));
const FileUpload = lazy(() => import('./components/file_upload/FileUpload.jsx'));
const Login = lazy(() => import('./user-pages/Login'));
const Signup = lazy(() => import('./user-pages/SignUp'));
const Error404 = lazy(() => import('./user-pages/Error404'));
const Error500 = lazy(() => import('./user-pages/Error500'));
const BlankPage = lazy(() => import('./user-pages/BlankPage'));

// const Buttons = lazy(() => import('./components/basic-ui/Buttons'));
// const Dropdowns = lazy(() => import('./components/basic-ui/Dropdowns'));
// const Typography = lazy(() => import('./components/basic-ui/Typography'));
// const BasicElements = lazy(() => import('./components/form-elements/BasicElements'));
const BasicTable = lazy(() => import('./components/tables/BasicTable'));
const AccRecords = lazy(() => import('./components/tables/AccRecords'));
const FontAwesome = lazy(() => import('./icons/FontAwesome'));
// const ChartJs = lazy(() => import('./components/charts/ChartJs'));



class AppRoutes extends Component {
  render () {
    return (
      <Suspense fallback={<Spinner/>}>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route exact path="/dashboard" component={ Dashboard } />
          <Route exact path="/upload" component={ FileUpload } />
          <Route path="/tables/base" component={ AccRecords } />
          <Route path="/tables/examples" component={ BasicTable } />
          <Route path="/icons/font-awesome" component={ FontAwesome } />

          <Route path="/signin" component={ Login } />
          <Route path="/signup" component={ Signup } />
          <Route path="/user-pages/error-404" component={ Error404 } />
          <Route path="/user-pages/error-500" component={ Error500 } />
          <Route path="/user-pages/blank-page" component={ BlankPage } />
{/* 
          <Route path="/basic-ui/buttons" component={ Buttons } />
          <Route path="/basic-ui/dropdowns" component={ Dropdowns } />
          <Route path="/basic-ui/typography" component={ Typography } />
          <Route path="/form-Elements/basic-elements" component={ BasicElements } />
          <Route path="/icons/font-awesome" component={ FontAwesome } />
          <Route path="/charts/chart-js" component={ ChartJs } />
 */}
        </Switch>
      </Suspense>
    );
  }
}

export default AppRoutes;