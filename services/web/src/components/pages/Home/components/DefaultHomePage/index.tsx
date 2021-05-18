import { useState } from 'react';
import { useSelector } from 'react-redux';

import styles from '../../../../../styles/pages/home.module.css';

import StatusBar from './components/StatusBar';
import DocumentUploader from './components/DocumentUploader';
import CommentsContainer from './components/CommentsContainer';

import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';

import { Typography, Layout, Menu } from 'antd';

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;
const { Title } = Typography;

export default function Index() {
  const currentUser = useSelector(state => state.user.currentUser);

  const request = currentUser.requests[0];

  const [state, setState] = useState({
    collapsed: false,
  });

  const onCollapse = collapsed => {
    setState(collapsed);
  };

  return (
    <>
      <Layout>
        <Header className="header">
          <div className="logo" />
          <Title
            level={2}
            // className={styles.heading}
            style={{ color: '#FFFFFF' }}
          >
            {' '}
            Hello {currentUser.firstName}, Welcome to the Housing Assistance
            Portal.
          </Title>
        </Header>
        <Layout>
          <Sider width={200} className="site-layout-background">
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
              <Menu.Item key="1" icon={<PieChartOutlined />}>
                Option 1
              </Menu.Item>
              <Menu.Item key="2" icon={<DesktopOutlined />}>
                Option 2
              </Menu.Item>
              <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                <Menu.Item key="3">Tom</Menu.Item>
                <Menu.Item key="4">Bill</Menu.Item>
                <Menu.Item key="5">Alex</Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
                <Menu.Item key="6">Team 1</Menu.Item>
                <Menu.Item key="8">Team 2</Menu.Item>
              </SubMenu>
              <Menu.Item key="9" icon={<FileOutlined />}>
                Files
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              Content
            </Content>
          </Layout>
        </Layout>
      </Layout>
      {/* <div className={styles.container}>
        <StatusBar request={request} />
        {request && <CommentsContainer request={request} />}
        <DocumentUploader request={request} />
      </div> */}
    </>
  );
}
