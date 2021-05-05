import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import AdminNav from './adminNav';
import ProgramMgrForm from './ProgramMgrForm';
import RequestsTable from './RequestsTable';
import UsersTable from './UsersTable';
import Analytics from './Analytics';
import Notifications from './Notifications';
import styles from '../../../../styles/pages/admin.module.css';

import { Typography, Layout, Badge } from 'antd';

import NotificationsIcon from '@material-ui/icons/Notifications';

import Organizations from './Organizations';
const { Title } = Typography;
const { Content, Header, Footer } = Layout;

const Dash = () => {
  const history = useHistory();

  const currentUser = useSelector(state => state.user.currentUser);

  const notifications = useSelector(state => state.notifications.notifications);

  const unread = notifications.filter(notif => notif.read === false).length;

  const [activeComponent, setActiveComponent] = useState({
    current: 'requests',
  });

  const handleClick = e => {
    setActiveComponent({ current: e.key });
  };

  return (
    <Layout>
      <Header className={styles.headingNav}>
        <Title
          level={3}
          className={styles.headingText}
          style={{ color: '#FFFFFF' }}
        >
          Hello {currentUser.firstName}, welcome to your dashboard!
        </Title>
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            alignItems: 'center',
          }}
        >
          <AdminNav
            activeComponent={activeComponent}
            handleClick={handleClick}
          />

          <Badge
            onClick={() => setActiveComponent({ current: 'notifications' })}
            count={unread}
          >
            <NotificationsIcon style={{ color: 'white', cursor: 'pointer' }} />
          </Badge>
        </div>
      </Header>
      <Content className={styles.dashboard}>
        {activeComponent.current === 'requests' && <RequestsTable />}
        {activeComponent.current === 'user' && <UsersTable />}
        {activeComponent.current === 'prgMgr' && <ProgramMgrForm />}
        {activeComponent.current === 'analytics' && <Analytics />}
        {activeComponent.current === 'organizations' && <Organizations />}
        {activeComponent.current === 'notifications' && <Notifications />}
      </Content>
      <Footer className={styles.footer} />
    </Layout>
  );
};

export default Dash;
