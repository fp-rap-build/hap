import { axiosWithAuth } from '../../api/axiosWithAuth';

export const fetchNotifications = () => async dispatch => {
  try {
    let notifications = await axiosWithAuth()
      .get('/users/me/notifications')
      .then(res => res.data.notifications);

    dispatch({ type: 'SET_NOTIFICATIONS', payload: notifications });
  } catch (error) {
    console.log('Unable to fetch notifications');
  }
};

export const readAllNotifications = () => async dispatch => {
  try {
    let notifications = await axiosWithAuth()
      .post('/users/me/notifications/read')
      .then(res => res.data.notifications);
    dispatch({ type: 'SET_NOTIFICATIONS', payload: notifications });
  } catch (error) {
    console.log('Unable to read all notifications');
  }
};
