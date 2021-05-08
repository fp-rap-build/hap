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
    await axiosWithAuth().post('/users/me/notifications/read');

    dispatch({ type: 'READ_ALL_NOTIFICATIONS' });
  } catch (error) {
    console.log('Unable to read all notifications');
  }
};

export const openPanal = () => {
  return { type: 'OPEN_PANAL' };
};

export const closePanal = () => {
  return { type: 'CLOSE_PANAL' };
};

export const deleteNotification = notifId => async dispatch => {
  dispatch({ type: 'DELETE_NOTIFICATION', payload: { id: notifId } });
};
