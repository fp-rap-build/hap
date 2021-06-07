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

export const setDocuments = documents => {
  return { type: 'SET_DOCUMENTS', payload: documents };
};

export const setDocumentStatuses = statuses => {
  return { type: 'SET_DOCUMENT_STATUSES', payload: statuses };
};

export const setRequestAddressAndDocuments = () => async dispatch => {
  dispatch(setLoading(true));
  try {
    //Need current user to pull their requests
    let currentUser = await axiosWithAuth()
      .get('/users/me')
      .then(res => res.data.user);

    if (currentUser.role === 'tenant' || currentUser.role === 'landlord') {
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

      //Fetch Documents and dispatch
      let documents = await axiosWithAuth()
        .get(`/requests/${id}/documents`)
        .then(res => res.data.documents);

      dispatch(setDocuments(documents));
    }
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(setLoading(false));
  }
};

export const updateAddress = updatedAddress => async dispatch => {
  try {
    await axiosWithAuth().put(`/addrs/${updatedAddress.id}`, updatedAddress);
  } catch (error) {
    console.log(error);
  }
};

export const updateRequest = updatedRequest => async dispatch => {
  const { id } = updatedRequest;

  try {
    await axiosWithAuth().put(`/requests/${id}`, updatedRequest);
  } catch (error) {
    console.log(error);
  }
};

//----------------INCOMES--------------------

export const fetchIncomes = requestId => async dispatch => {
  try {
    const incomes = await axiosWithAuth()
      .get(`/incomes/${requestId}`)
      .then(res => res.data);
    dispatch(setIncomes(incomes));
  } catch (error) {
    console.log(error);
  }
};

export const createIncome = newIncome => async dispatch => {
  try {
    await axiosWithAuth().post('/incomes', newIncome);
  } catch (error) {
    console.log(error);
  }
};

export const updateIncome = updatedIncome => async dispatch => {
  try {
    await axiosWithAuth().put(`/incomes/${updatedIncome.id}`, updatedIncome);
  } catch (error) {
    console.log(error);
  }
};

export const deleteIncome = id => async dispatch => {
  try {
    await axiosWithAuth().delete(`/incomes/${id}`);
  } catch (error) {
    console.log(error);
  }
};

//---------------DOCUMENTS---------------
export const fetchDocuments = requestId => async dispatch => {
  try {
    const documents = await axiosWithAuth()
      .get(`/requests/${requestId}/documents`)
      .then(res => res.data.documents);
    dispatch(setDocuments(documents));
  } catch (error) {
    console.log(error);
  }
};

export const buildDocumentStatuses = documents => async dispatch => {
  const statuses = {
    residency: 'missing',
    income: 'missing',
    housingInstability: 'missing',
    covid: 'missing',
  };

  console.log(documents);

  if (documents) {
    documents.forEach(doc => {
      statuses[doc.category] = doc.status;
    });
  }

  dispatch(setDocumentStatuses(statuses));
};
