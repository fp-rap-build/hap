import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import AdminNav from './adminNav';
import ProgramMgrForm from './ProgramMgrForm';
import RequestsTable from './RequestsTable';
import ArchivedRequests from './ArchivedRequests';
import IncompleteRequests from './IncompleteRequests';
import UsersTable from './UsersTable';
import Analytics from './Analytics';
import Notifications from './Notifications';
import styles from '../../../../styles/pages/admin.module.css';

import { Typography, Layout, Badge } from 'antd';

import Organizations from './Organizations';
const { Title } = Typography;
const { Content, Header, Footer } = Layout;

const Dash = () => {
  const history = useHistory();

  const currentUser = useSelector(state => state.user.currentUser);

  const notifications = useSelector(state => state.notifications.notifications);

  const unseen = notifications.filter(notif => notif.seen === false).length;

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
        </div>
      </Header>
      <Content className={styles.dashboard}>
        {activeComponent.current === 'requests' && <RequestsTable />}
        {activeComponent.current === 'user' && <UsersTable />}
        {activeComponent.current === 'prgMgr' && <ProgramMgrForm />}
        {activeComponent.current === 'analytics' && <Analytics />}
        {activeComponent.current === 'organizations' && <Organizations />}
        {activeComponent.current === 'notifications' && <Notifications />}
        {activeComponent.current === 'archive' && <ArchivedRequests />}
        {activeComponent.current === 'incomplete' && <IncompleteRequests />}
      </Content>
      <Footer className={styles.footer} />
    </Layout>
  );
};

export default Dash;
