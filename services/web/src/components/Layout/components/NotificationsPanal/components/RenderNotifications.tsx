import React from 'react';

import { useHistory } from 'react-router-dom';

import Notification from './Notifications';

export default function RenderNotifications({ notifications }) {
  const history = useHistory();

  return notifications.map(({ message, requestId }) => (
    <Notification message={message} requestId={requestId} history={history} />
  ));
}
