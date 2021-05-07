import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { closePanal } from '../../../redux/notifications/notificationActions';

import styles from '../../../styles/Layout/notificationspanal.module.css';

export default function NotificationsPanal() {
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
    </div>
  );
}
