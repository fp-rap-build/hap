import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { closePanal } from '../../../../redux/notifications/notificationActions';

import { useHistory } from 'react-router-dom';

import { Button, Card } from 'antd';

import styles from '../../../../styles/Layout/notificationspanal.module.css';

export default function Index() {
  const dispatch = useDispatch();

  const { isPanalOpen, notifications } = useSelector(
    state => state.notifications
  );

  const close = () => dispatch(closePanal());

  if (!isPanalOpen) return <></>;

  return (
    <div className={styles.container}>
      <div className={styles.closePanal} onClick={close}>
        X
      </div>
      <RenderNotifications notifications={notifications} />
    </div>
  );
}

const RenderNotifications = ({ notifications }) => {
  const history = useHistory();

  return notifications.map(({ message, requestId }) => (
    <Notification message={message} requestId={requestId} history={history} />
  ));
};

const Notification = ({ message, requestId, history }) => {
  return (
    <Card>
      <h3>{message}</h3>
      <Button
        type="primary"
        onClick={() => history.push(`/requests/${requestId}`)}
      >
        View Request
      </Button>
    </Card>
  );
};
