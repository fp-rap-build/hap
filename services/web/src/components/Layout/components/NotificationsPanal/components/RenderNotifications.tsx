import React from 'react';

import { useHistory } from 'react-router-dom';

import Notification from './Notifications';

export default function RenderNotifications({ notifications }) {
  const history = useHistory();

  return notifications.map(({ id, message, requestId }) => (
    <Notification
      key={id}
      id={id}
      message={message}
      requestId={requestId}
      history={history}
    />
  ));
}
