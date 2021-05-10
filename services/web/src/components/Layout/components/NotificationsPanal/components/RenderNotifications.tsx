import React from 'react';

import { useHistory } from 'react-router-dom';

import Notification from './Notifications';

export default function RenderNotifications({ notifications }) {
  const history = useHistory();

  return notifications.map(({ id, message, seen, requestId, createdAt }) => (
    <Notification
      key={id}
      id={id}
      createdAt={createdAt}
      message={message}
      seen={seen}
      requestId={requestId}
      history={history}
    />
  ));
}
