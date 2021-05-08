import { useState } from 'react';

import { useDispatch } from 'react-redux';

import { Button, Card } from 'antd';

import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import { deleteNotification } from '../../../../../redux/notifications/notificationActions';

import styles from '../../../../../styles/Layout/notificationspanal.module.css';

export default function Notification({ message, id, requestId, history }) {
  const dispatch = useDispatch();

  const [isDeleteVisible, setIsDeleteVisible] = useState(false);

  const showDelete = () => setIsDeleteVisible(true);

  const hideDelete = () => setIsDeleteVisible(false);

  const handleDelete = () => dispatch(deleteNotification(id));

  return (
    <Card onMouseOver={showDelete} onMouseLeave={hideDelete}>
      <RenderDelete onClick={handleDelete} isDeleteVisible={isDeleteVisible} />
      <h3>{message}</h3>
      <Button
        type="primary"
        onClick={() => history.push(`/requests/${requestId}`)}
      >
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
