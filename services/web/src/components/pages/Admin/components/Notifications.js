import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import { useHistory } from 'react-router-dom';

import { Button, Card } from 'antd';

import styles from '../../../../styles/pages/admin.module.css';

export default function Notifications() {
  const { notifications } = useSelector(state => state.notifications);
  const [loading, setLoading] = useState(false);

  return (
    <div className={styles.notifications}>
      <RenderNotifications notifications={notifications} />
    </div>
  );
}

const RenderNotifications = ({ notifications }) => {
  const history = useHistory();
  return (
    <>
      {notifications.reverse().map(notif => {
        return (
          <Card style={{ width: '40%' }}>
            <h1>{notif.message}</h1>
            <Button
              type="primary"
              onClick={() => history.push(`/requests/${notif.requestId}`)}
            >
              View Request
            </Button>
          </Card>
        );
      })}
    </>
  );
};
