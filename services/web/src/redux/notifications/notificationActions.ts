import { axiosWithAuth } from '../../api/axiosWithAuth';

export const fetchNotifications = () => async dispatch => {
  try {
    let notifications = await axiosWithAuth()
      .get('/users/me/notifications')
      .then(res => res.data);
    dispatch({ type: 'SET_NOTIFICATIONS', payload: notifications });
  } catch (error) {
    console.log('Unable to fetch notifications');
  }
};
