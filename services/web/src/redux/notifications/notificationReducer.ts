const INITIAL_STATE = {
  notifications: [],
  isPanalOpen: false,
};

const notificationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATIONS':
      return { ...state, notifications: action.payload };
    case 'READ_ALL_NOTIFICATIONS':
      return {
        ...state,
        notifications: state.notifications.map(notif => {
          notif.seen = true;
          return notif;
        }),
      };
    case 'READ_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.map(notif => {
          if (notif.id === action.payload.id) {
            notif.seen = true;
          }

          return notif;
        }),
      };
    case 'DELETE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(notif => {
          if (notif.id !== action.payload.id) return notif;
        }),
      };
    case 'OPEN_PANAL':
      return { ...state, isPanalOpen: true };
    case 'CLOSE_PANAL':
      return { ...state, isPanalOpen: false };
    default:
      return state;
  }
};

export default notificationReducer;
