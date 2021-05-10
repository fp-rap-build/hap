import { useState } from 'react';

import { formatUTC } from '../../../../../utils/dates';

import { useDispatch } from 'react-redux';

import { Button, Card, Typography } from 'antd';

import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import {
  deleteNotification,
  readNotification,
} from '../../../../../redux/notifications/notificationActions';

import styles from '../../../../../styles/Layout/notificationspanal.module.css';

const { Text } = Typography;

export default function Notification({
  createdAt,
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
    <Card
      onMouseOver={showDelete}
      onMouseLeave={hideDelete}
      style={{
        gap: '1rem',
      }}
    >
      <RenderDelete onClick={handleDelete} isDeleteVisible={isDeleteVisible} />
      <h3>{message}</h3>
      <Button
        type={seen ? 'ghost' : 'primary'}
        style={{ width: '30%', margin: 0, padding: 0 }}
        onClick={handleClick}
      >
        View Request
      </Button>
      <p style={{ marginTop: '0.5rem' }}>{formatUTC(createdAt)}</p>
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
