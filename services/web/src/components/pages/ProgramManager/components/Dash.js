import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import ProgramMgrNav from './programMgrNav';
import RequestsTable from '../../Admin/components/RequestsTable';
import Analytics from '../../Admin/components/Analytics';
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
        <ProgramMgrNav
          activeComponent={activeComponent}
          handleClick={handleClick}
        />
      </Header>
      <Content className={styles.dashboard}>
        {activeComponent.current === 'requests' && <RequestsTable />}
        {activeComponent.current === 'analytics' && <Analytics />}
      </Content>
      <Footer className={styles.footer} />
    </Layout>
  );
};

export default Dash;
