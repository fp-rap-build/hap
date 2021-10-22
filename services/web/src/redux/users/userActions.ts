import { axiosWithAuth } from '../../api/axiosWithAuth';
import socket from '../../config/socket';
import { setLoading } from '../global/globalActions';

export const setCurrentUser = currentUser => {
  return { type: 'SET_CURRENT_USER', payload: currentUser };
};

export const setErrorMessage = message => {
  return { type: 'SET_ERROR_MESSAGE', payload: message };
};

export const setUserNameInformation = nameInformation => {
  return { type: 'SET_USER_NAME_INFO', payload: nameInformation };
};

export const clearErrorMessage = () => {
  return setErrorMessage('');
};

export const fetchCurrentUser = () => async dispatch => {
  dispatch(setLoading(true));

  try {
    let currentUser = await axiosWithAuth()
      .get('/users/me')
      .then(res => res.data.user);

    if (currentUser.organizationId) {
      socket.emit('joinOrganization', currentUser.organizationId);
    }

    currentUser.subscriptions.forEach(sub => {
      socket.emit('joinRequest', sub.requestId);
    });

    dispatch({ type: 'SET_CURRENT_USER', payload: currentUser });
  } catch (error) {

  } finally {
    dispatch(setLoading(false));
  }
};

export const logOut = (history, orgId, subscriptions) => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem('token');

  //Remove redux persist from localStorage
  localStorage.removeItem('persist:root');

  // Leave rooms
  socket.emit('leaveOrganization', { orgId });

  if (subscriptions) {
    subscriptions.forEach(sub => {
      socket.emit('leaveRequest', sub.requestId);
    });
  }

  // Logout
  dispatch({ type: 'LOG_OUT' });

  // Redirect to landing page
  history.push('/landing');
};

export const logIn = (user, history) => async dispatch => {
  dispatch(setLoading(true));

  try {
    // Login

    const res = await axiosWithAuth().post('/auth/login', user);

    // Store the token in localStorage

    const token = res.data.token;

    localStorage.setItem('token', token);

    // Set the user in state

    const currentUser = res.data.user;

    dispatch(setCurrentUser(currentUser));

    // Nothing went wrong, let's redirect the user to the homepage

    history.push('/');
  } catch (error) {
    // Set error into global state

    const message = error?.response?.data?.message || 'Internal server error';

    dispatch(setErrorMessage(message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const registerAndApply = (requestValues, history) => async dispatch => {
  let tenantEmail, tenantNumber, landlordName, landlordEmail, landlordNumber;

  // Trim whitespace off strings
  for (let key in requestValues) {
    let value = requestValues[key];
    if (typeof value === 'string') {
      requestValues[key] = requestValues[key].trim();
    }
  }

  // Values directly attached to their account
  const user = {
    firstName: requestValues.firstName,
    lastName: requestValues.lastName,
    email: requestValues.email,
    password: requestValues.password,
    role: requestValues.role,
    dob: requestValues.dob,
    gender: requestValues.gender,
  };

  dispatch(setLoading(true));
  try {
    // Register an account
    let res = await axiosWithAuth().post('/auth/register', user);

    // Login
    const token = res.data.token;
    const currentUser = res.data.user;

    localStorage.setItem('token', token);

    dispatch(setCurrentUser(currentUser));

    // Submit am empty request
    let newRequest = await axiosWithAuth()
      .post('/requests')
      .then(res => res.data);

    // Redirect to the homepage
  } catch (error) {
    // #TODO: Better error handling
    const message = error?.response?.data?.message || 'Internal server error';

    dispatch(setErrorMessage(message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const register = (userInfo, history) => async dispatch => {
  if (userInfo.confirmPassword) {
    delete userInfo.confirmPassword;
  }
  //trim white space
  for (let key in userInfo) {
    let value = userInfo[key];
    if (typeof value === 'string') {
      userInfo[key] = userInfo[key].trim();
    }
  }

  dispatch(setLoading(true));

  try {
    // Register an account
    let res = await axiosWithAuth().post('/auth/register', userInfo);

    // Login
    const token = res.data.token;
    const currentUser = res.data.user;

    localStorage.setItem('token', token);

    dispatch(setCurrentUser(currentUser));

    // Redirect to the homepage
    history.push('/');
  } catch (error) {
    const message =
      error?.response?.data?.message || 'Internal Server Error - Register';

    dispatch(setErrorMessage(message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const setCurrentUserStatic = (user, history) => {
  history.push('/');
  return { type: 'SET_CURRENT_USER', payload: user };
};

export const addSubscription = subscription => {
  return { type: 'ADD_SUBSCRIPTION', payload: subscription };
};

export const deleteSubscription = subscriptionId => {
  return { type: 'DELETE_SUBSCRIPTION', payload: subscriptionId };
};

export const updateUserNameInfo = userInfo => async dispatch => {
  try {
    const resUserInfo = await axiosWithAuth()
      .put(`/user/${userInfo.id}`, userInfo)
      .then(res => res.data.user);

    dispatch(setUserNameInformation(resUserInfo));
  } catch (error) {
    const message = error?.response?.data?.message || 'Internal server error';

    dispatch(setErrorMessage(message));
  }
};
