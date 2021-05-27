import axios from 'axios';
import { axiosWithAuth } from '../../api/axiosWithAuth';
import { setLoading } from '../global/globalActions';

export const setCurrentRequest = currentRequest => {
  return { type: 'SET_REQUEST', payload: currentRequest };
};

export const setCurrentAddress = currentAddress => {
  return { type: 'SET_ADDRESS', payload: currentAddress };
};

export const setIncomes = incomes => {
  return { type: 'SET_INCOMES', payload: incomes };
};

export const fetchRequestAndAddr = () => async dispatch => {
  dispatch(setLoading(true));

  try {
    //Need current user to pull their requests
    let currentUser = await axiosWithAuth()
      .get('/users/me')
      .then(res => res.data.user);

    const { id } = currentUser.requests[0];

    //Fetch request and dispatch
    let request = await axiosWithAuth()
      .get(`requests/reqOnly/${id}`)
      .then(res => res.data);

    dispatch(setCurrentRequest(request));

    //Fetch address and dispatch
    const { addressId } = request;

    let address = await axiosWithAuth()
      .get(`/addrs/${addressId}`)
      .then(res => res.data);

    dispatch(setCurrentAddress(address));
  } catch (error) {
    alert('DEV REDUX ERROR');
    console.log(error);
  } finally {
    dispatch(setLoading(false));
  }
};

export const updateAddress = updatedAddress => async dispatch => {
  dispatch(setLoading(true));

  try {
    await axiosWithAuth().put(`/addrs/${updatedAddress.id}`, updatedAddress);
    dispatch(setCurrentAddress(updateAddress));
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(setLoading(false));
  }
};

export const updateRequest = updatedRequest => async dispatch => {
  dispatch(setLoading(true));

  const { id } = updatedRequest;

  try {
    await axiosWithAuth().put(`/requests/${id}`, updatedRequest);
    dispatch(setCurrentRequest(updatedRequest));
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(setLoading(false));
  }
};

//INCOMES
export const fetchIncomes = requestId => async dispatch => {
  try {
    const incomes = await axiosWithAuth()
      .get(`/incomes/${requestId}`)
      .then(res => res.data);
    dispatch(setIncomes(incomes));
  } catch (error) {
    alert('DEV REDUX ERROR');
    console.log(error);
  }
};

export const addIncome = newIncome => async dispatch => {
  const { requestId } = newIncome[0];

  try {
    await axiosWithAuth().post('/incomes', newIncome);
    const updatedIncomes = await axiosWithAuth().get(`/incomes/${requestId}`);
    dispatch(setIncomes(updatedIncomes));
  } catch (error) {
    alert('DEV REDUX ERROR');
    console.log(error);
  }
};
