import { axiosWithAuth } from '../../api/axiosWithAuth';
import { setLoading } from '../global/globalActions';

export const setCurrentUser = currentUser => {
  return { type: 'SET_CURRENT_USER', payload: currentUser };
};

export const setErrorMessage = message => {
  return { type: 'SET_ERROR_MESSAGE', payload: message };
};

export const clearErrorMessage = () => {
  return setErrorMessage('');
};

export const fetchCurrentUser = () => async dispatch => {
  dispatch(setLoading(true));

  try {
    let res = await axiosWithAuth().get('/users/me');

    let currentUser = res.data.user;

    dispatch({ type: 'SET_CURRENT_USER', payload: currentUser });
  } catch (error) {
    alert('error');
  } finally {
    dispatch(setLoading(false));
  }
};

export const logOut = history => dispatch => {
  // Remove token from localStorage

  localStorage.removeItem('token');

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
  };

  // request and address information
  const request = {
    familySize: requestValues.familySize,
    monthlyIncome: Number(requestValues.monthlyIncome),
    unEmp90: requestValues.unEmp90,
    foodWrkr: requestValues.foodWrkr,
    totalChildren: requestValues.totalChildren,
    amountRequested: requestValues.amountRequested,
    hispanic: requestValues.hispanic,
    asian: requestValues.asian,
    black: requestValues.black,
    pacific: requestValues.pacific,
    white: requestValues.white,
    native: requestValues.native,
    demoNotSay: requestValues.demoNotSay,
    address: {
      address: requestValues.address,
      addressLine2: requestValues.addressLine2,
      cityName: requestValues.cityName,
      zipCode: requestValues.zipCode,
      state: requestValues.state,
    },
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

    // Submit a request
    await axiosWithAuth().post('/requests', request);

    // Redirect to the homepage
    history.push('/');
  } catch (error) {
    // #TODO: Better error handling
    const message = error?.response?.data?.message || 'Internal server error';

    dispatch(setErrorMessage(message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const setCurrentUserStatic = (user, history) => {
  history.push('/');
  return { type: 'SET_CURRENT_USER', payload: user };
};
