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
    alert('error');
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

  subscriptions.forEach(sub => {
    socket.emit('leaveRequest', sub.requestId);
  });

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

  if (requestValues.role === 'tenant') {
    tenantEmail = requestValues.email;
    tenantNumber = requestValues.phoneNumber;
    landlordName = requestValues.landlordName;
    landlordEmail = requestValues.landlordEmail;
    landlordNumber = requestValues.landlordNumber;
  } else {
    landlordEmail = requestValues.email;
    landlordNumber = requestValues.phoneNumber;
    tenantEmail = requestValues.tenantEmail;
    tenantNumber = requestValues.tenantNumber;
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

  // request and address information
  const request = {
    familySize: requestValues.familySize,
    monthlyIncome: Number(requestValues.monthlyIncome),
    monthlyRent: Number(requestValues.monthlyRent),
    owed: Number(requestValues.owed),
    unEmp90: requestValues.unEmp90,
    foodWrkr: requestValues.foodWrkr,
    totalChildren: requestValues.totalChildren,
    amountRequested: requestValues.amountRequested,
    amountApproved: requestValues.amountApproved,
    budget: requestValues.budget,
    advocate: requestValues.advocate,
    hispanic: requestValues.hispanic,
    asian: requestValues.asian,
    black: requestValues.black,
    pacific: requestValues.pacific,
    white: requestValues.white,
    native: requestValues.native,
    beds: requestValues.beds,
    hispanicHOH: requestValues.hispanicHOH,
    asianHOH: requestValues.asianHOH,
    blackHOH: requestValues.blackHOH,
    pacificHOH: requestValues.pacificHOH,
    whiteHOH: requestValues.whiteHOH,
    nativeHOH: requestValues.nativeHOH,
    demoNotSayHOH: requestValues.demoNotSayHOH,

    covidFH: requestValues.covidFH,
    qualifiedForUnemployment: requestValues.qualifiedForUnemployment,
    proofOfRisk: requestValues.proofOfRisk,

    demoNotSay: requestValues.demoNotSay,
    incomplete: requestValues.incomplete,
    tenantEmail,
    tenantNumber,
    landlordName,
    landlordEmail,
    childrenAges: requestValues.childrenAges,
    landlordNumber,
    landlordAddress: requestValues.landlordAddress,
    landlordAddress2: requestValues.landlordAddress2,
    landlordCity: requestValues.landlordCity,
    landlordState: requestValues.landlordState,
    landlordZip: requestValues.landlordZip,

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
    let newRequest = await axiosWithAuth()
      .post('/requests', request)
      .then(res => res.data);

    socket.emit('postRequest', {
      orgId: newRequest.orgId,
      requestId: newRequest.id,
      message: 'A new request was submitted',
    });

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
