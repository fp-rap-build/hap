import { LicenseInfo } from '@material-ui/x-grid';
import { Button, notification } from 'antd';
import 'antd/dist/antd.less';
import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import { Provider, useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory
} from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import Layout from './components/Layout';
import Admin from './components/pages/Admin';
import Apply from './components/pages/Apply';
import ApplyV2 from './components/pages/ApplyV2';
import ForgotPassword from './components/pages/ForgotPassword';
import { HomePage } from './components/pages/Home';
import LandingPage from './components/pages/Landing';
import Landlord from './components/pages/Landlord';
import LandlordLogin from './components/pages/LandLordLogin';
import LandlordRequest from './components/pages/LandlordRequest';
import LoginPage from './components/pages/Login';
import { NotFoundPage } from './components/pages/NotFound';
import ProgramManager from './components/pages/ProgramManager';
import Programs from './components/pages/Programs';
import Requests from './components/pages/Requests';
import ResetPassword from './components/pages/ResetPassword';
import socket from './config/socket';
import { fetchNotifications } from './redux/notifications/notificationActions';
import { persistor, store } from './redux/store';
import './styles/global.css';
import PrivateRoute from './utils/auth/PrivateRoute';












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
        <PrivateRoute path="/requests/:id" component={Requests} />
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
