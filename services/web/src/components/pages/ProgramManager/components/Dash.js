import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import ProgramMgrNav from './programMgrNav';
import RequestsTable from '../../Admin/components/RequestsTable';
import ManagedRequestsTable from '../../Admin/components/ManagedRequestsTable';
import ArchivedRequests from '../../Admin/components/ArchivedRequests';

import Analytics from '../../Admin/components/Analytics';
import PaymentsTable from '../../Admin/components/PaymentsTable';

import styles from '../../../../styles/pages/admin.module.css';

import { Typography, Layout } from 'antd';
const { Title } = Typography;
const { Content, Header, Footer } = Layout;

const Dash = () => {
  const currentUser = useSelector(state => state.user.currentUser);

  const [activeComponent, setActiveComponent] = useState({
    current: 'requests',
  });

  const handleClick = e => {
    localStorage.setItem('lastVisitedPage', e.key);

    setActiveComponent({ current: e.key });
  };

  useEffect(() => {
    const lastVisitiedPage = localStorage.getItem('lastVisitedPage');

    const validPages = {
      requests: 1,
      payments: 1,
      yourRequests: 1,
      archive: 1,
      incomplete: 1,
      analytics: 1,
    };

    if (lastVisitiedPage in validPages) {
      setActiveComponent({ current: lastVisitiedPage });
    }
  }, []);

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
        <ProgramMgrNav
          activeComponent={activeComponent}
          handleClick={handleClick}
        />
      </Header>
      <Content className={styles.dashboard}>
        {activeComponent.current === 'requests' && <RequestsTable />}
        {activeComponent.current === 'payments' && <PaymentsTable />}
        {activeComponent.current === 'yourRequests' && <ManagedRequestsTable />}
        {activeComponent.current === 'archive' && <ArchivedRequests />}

        {activeComponent.current === 'analytics' && <Analytics />}
      </Content>
      <Footer className={styles.footer} />
    </Layout>
  );
};

export default Dash;
