import 'antd/dist/antd.less';
import React, { useEffect, useState, useRef } from 'react';

import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';

import { Provider, useSelector, useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from 'react-router-dom';
import Layout from './components/Layout';
import Admin from './components/pages/Admin';
import Apply from './components/pages/Apply';
import Landlord from './components/pages/Landlord';
import { HomePage } from './components/pages/Home';
import LandingPage from './components/pages/Landing';
import LoginPage from './components/pages/Login';
import ForgotPassword from './components/pages/ForgotPassword';
import ResetPassword from './components/pages/ResetPassword';
import LandlordRequest from './components/pages/LandlordRequest';
import LandlordLogin from './components/pages/LandLordLogin';
import ApplyV2 from './components/pages/ApplyV2';

import { NotFoundPage } from './components/pages/NotFound';
import ProgramManager from './components/pages/ProgramManager';

import Programs from './components/pages/Programs';

import Requests from './components/pages/Requests';
import { store, persistor } from './redux/store';
import './styles/global.css';
import PrivateRoute from './utils/auth/PrivateRoute';

import socket from './config/socket';

import { Button, notification, Modal } from 'antd';

import { fetchNotifications } from './redux/notifications/notificationActions';

import Profile from './components/pages/Profile';

import { LicenseInfo } from '@material-ui/x-grid';

const TRACKING_ID = 'G-ZDW3ENHWE7'; // YOUR_OWN_TRACKING_ID
ReactGA.initialize(TRACKING_ID);

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RAP />
        </PersistGate>
      </Provider>
    </React.StrictMode>
  </Router>,
  document.getElementById('root')
);

function RAP() {
  const [isTimeout, setIsTimeout] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();

  const { isLoggedIn, currentUser } = useSelector(state => state.user);

  const userRef = useRef(currentUser);

  const showNotification = options => {
    const redirectToRequest = requestId =>
      history.push(`/requests/${requestId}`);

    const btn = (
      <Button onClick={() => redirectToRequest(options.requestId)}>
        View Request
      </Button>
    );

    notification.info({ message: options.message, btn });
  };

  useEffect(() => {
    LicenseInfo.setLicenseKey(process.env.REACT_APP_TABLE_KEY);
  }, []);

  useEffect(() => {
    socket.on('requestChange', options => {
      // Only show notifications made by other users

      if (options.senderId !== userRef.current.id) {
        showNotification(options);
      }

      dispatch(fetchNotifications());
    });
  }, []);

  useEffect(() => {
    userRef.current = currentUser;
  }, [currentUser]);

  return (
    <Layout>
      <Switch>
        <Route path="/landing" component={LandingPage} />

        <Route exact path="/login" component={LoginPage} />

        <Route path="/register/landlord" component={LandlordLogin} />

        <Route path="/forgot" exact component={ForgotPassword} />

        <Route path="/reset/:resetToken" exact component={ResetPassword} />

        <Route path="/apply" exact component={Apply} />

        <Route path="/applyv2" exact component={ApplyV2} />

        {/* Any routes you need secured by role should be registered as PrivateRoutes */}

        <PrivateRoute exact path="/" component={HomePage} />
        <PrivateRoute exact path="/requests/:id" component={Requests} />
        <PrivateRoute exact path="/requests/:id/profile" component={Profile} />

        <PrivateRoute
          path="/admin"
          roles={['admin', 'orgAdmin']}
          component={Admin}
        />
        <PrivateRoute
          path="/program_manager"
          roles={['programManager', 'assistantProgramManager']}
          component={ProgramManager}
        />
        <PrivateRoute
          exact
          path="/landlord"
          roles={['landlord']}
          component={Landlord}
        />
        <PrivateRoute
          path="/landlord/request/:id"
          roles={['landlord']}
          component={LandlordRequest}
        />
        <PrivateRoute path="/organizations/:id/programs" component={Programs} />
        <Route component={NotFoundPage} />
      </Switch>
    </Layout>
  );
}
