import { useState } from 'react';

import { Button, Card } from 'antd';

import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import styles from '../../../../../styles/Layout/notificationspanal.module.css';

export default function Notification({ message, requestId, history }) {
  const [isDeleteVisible, setIsDeleteVisible] = useState(false);

  const showDelete = () => setIsDeleteVisible(true);

  const hideDelete = () => setIsDeleteVisible(false);

  return (
    <Card onMouseOver={showDelete} onMouseLeave={hideDelete}>
      {isDeleteVisible && (
        <div className={styles.deleteNotification}>
          <HighlightOffIcon style={{ fontSize: '17px' }} />
        </div>
      )}

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
