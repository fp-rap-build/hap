import { useState } from 'react';
import { useSelector } from 'react-redux';

import styles from '../../../../../styles/pages/home.module.css';

import StatusBar from './components/StatusBar';
import DocumentUploader from './components/DocumentUploader';
import CommentsContainer from './components/CommentsContainer';
import UserInfo from './components/UserInfo/index';

import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';

import { Typography, Layout, Menu, Button } from 'antd';

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;
const { Title } = Typography;

export default function Index() {
  const currentUser = useSelector(state => state.user.currentUser);

  const request = currentUser.requests[0];

  const [collapsed, setCollapsed] = useState(false);

  const [currentContent, setCurrentContent] = useState('status');

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const onContentChange = ({ key }) => {
    setCurrentContent(key);
  };

  const props = {
    currentContent,
    request,
  };

  return (
    <>
      <Layout>
        <Header className="header">
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
          <Sider collapsible collapsed={collapsed} onCollapse={toggleCollapse}>
            <Menu
              theme="dark"
              defaultSelectedKeys={['1']}
              mode="inline"
              style={{ height: '100%' }}
              inlineCollapsed={collapsed}
            >
              <Menu.Item
                key="status"
                icon={<PieChartOutlined />}
                onClick={onContentChange}
              >
                Request Status
              </Menu.Item>
              <Menu.Item
                key="comments"
                icon={<DesktopOutlined />}
                onClick={onContentChange}
              >
                Comments
              </Menu.Item>
              <Menu.Item
                key="documents"
                icon={<FileOutlined />}
                onClick={onContentChange}
              >
                Documents
              </Menu.Item>
              <Menu.Item
                key="userInfo"
                icon={<UserOutlined />}
                onClick={onContentChange}
              >
                User
              </Menu.Item>
              <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
                <Menu.Item key="6">Team 1</Menu.Item>
                <Menu.Item key="8">Team 2</Menu.Item>
              </SubMenu>
              <Button
                type="primary"
                onClick={toggleCollapse}
                style={{ marginBottom: 16 }}
              >
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              </Button>
            </Menu>
          </Sider>
          <Layout>
            <Content
              className="site-layout-background"
              style={{
                margin: 0,
                minHeight: 280,
                border: '1px solid black',
                background: 'white',
              }}
            >
              {renderContent(props)}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
}

const renderContent = props => {
  switch (props.currentContent) {
    case 'status':
      return <StatusBar request={props.request} />;
    case 'comments':
      return <CommentsContainer request={props.request} />;
    case 'documents':
      return <DocumentUploader request={props.request} />;
    case 'userInfo':
      return <UserInfo />;
  }
};
