import 'antd/dist/antd.less';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from './components/Layout';
import Admin from './components/pages/Admin';
import Apply from './components/pages/Apply';
import { HomePage } from './components/pages/Home';
import LandingPage from './components/pages/Landing';
import LoginPage from './components/pages/Login';
import { NotFoundPage } from './components/pages/NotFound';
import ProgramManager from './components/pages/ProgramManager';

import Programs from './components/pages/Programs';

import Requests from './components/pages/Requests';
import store from './redux/store';
import './styles/global.css';
import PrivateRoute from './utils/auth/PrivateRoute';

const TRACKING_ID = 'G-ZDW3ENHWE7'; // YOUR_OWN_TRACKING_ID
ReactGA.initialize(TRACKING_ID);

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <Provider store={store}>
        <RAP />
      </Provider>
    </React.StrictMode>
  </Router>,
  document.getElementById('root')
);

function RAP() {
  // The reason to declare App this way is so that we can use any helper functions we'd need for business logic, in our case auth.
  // React Router has a nifty useHistory hook we can use at this level to ensure we have security around our routes.

  return (
    <Layout>
      <Switch>
        <Route path="/landing" component={LandingPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/apply" exact component={Apply} />
        {/* Any routes you need secured by role should be registered as PrivateRoutes */}
        <PrivateRoute exact path="/" component={HomePage} />
        <PrivateRoute path="/requests/:id" component={Requests} />
        <PrivateRoute
          path="/admin"
          roles={['admin', 'orgAdmin']}
          component={Admin}
        />
        <PrivateRoute
          path="/program_manager"
          roles={['programManager']}
          component={ProgramManager}
        />
        <PrivateRoute path="/organizations/:id/programs" component={Programs} />
        <Route component={NotFoundPage} />
      </Switch>
    </Layout>
  );
}
