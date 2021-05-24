import { axiosWithAuth } from '../../api/axiosWithAuth';
import { setLoading } from '../global/globalActions';

export const setCurrentRequest = currentRequest => {
  return { type: 'SET_REQUEST', payload: currentRequest };
};

export const setRequest = id => async dispatch => {
  dispatch(setLoading(true));

  try {
    let request = await axiosWithAuth()
      .get(`requests/${id}`)
      .then(res => res.data.request);
    dispatch({ type: 'SET_REQUEST', payload: request });
  } catch (error) {
    alert('DEV REDUX ERROR');
  } finally {
    dispatch(setLoading(false));
  }
};

export const editCurrentRequest = change => async dispatch => {
  dispatch(setLoading(true));
};
