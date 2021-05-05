import React, { useEffect, useState } from 'react';

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNotifications = () => {
    alert('fetching..');
  };

  useEffect(() => {
    fetchNotifications();
  }, []);
  return (
    <div>
      <h1>Notifications</h1>
    </div>
  );
}
