import { useState } from 'react';

import { useDispatch } from 'react-redux';

import { Button, Card } from 'antd';

import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import {
  deleteNotification,
  readNotification,
} from '../../../../../redux/notifications/notificationActions';

import styles from '../../../../../styles/Layout/notificationspanal.module.css';

export default function Notification({
  message,
  seen,
  id,
  requestId,
  history,
}) {
  const dispatch = useDispatch();

  const [isDeleteVisible, setIsDeleteVisible] = useState(false);

  const showDelete = () => setIsDeleteVisible(true);

  const hideDelete = () => setIsDeleteVisible(false);

  const handleDelete = () => dispatch(deleteNotification(id));

  const handleClick = () => {
    dispatch(readNotification(id));

    history.push(`/requests/${requestId}`);
  };

  return (
    <Card onMouseOver={showDelete} onMouseLeave={hideDelete}>
      <RenderDelete onClick={handleDelete} isDeleteVisible={isDeleteVisible} />
      <h3>{message}</h3>
      <Button type={seen ? 'ghost' : 'primary'} onClick={handleClick}>
        View Request
      </Button>
    </Card>
  );
}

const RenderDelete = ({ onClick, isDeleteVisible }) => (
  <div>
    {isDeleteVisible && (
      <div className={styles.deleteNotification} onClick={onClick}>
        <HighlightOffIcon style={{ fontSize: '17px' }} />
      </div>
    )}
  </div>
);
