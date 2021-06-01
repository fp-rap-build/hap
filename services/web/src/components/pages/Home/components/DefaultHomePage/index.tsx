import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

//Migrate styles to less so it will all be in one place
import '../../../../../styles/overrides.less';
import '../../../../../styles/pages/Home/home.less';

import StatusBar from './StatusBar';
import CommentsContainer from './CommentsContainer';
import UserInfo from './UserInfo/index';
import Documents from './Documents/index';

import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';

import { Typography, Layout, Menu } from 'antd';

const { Header, Content, Sider, Footer } = Layout;
const { SubMenu } = Menu;
const { Title } = Typography;

const initialStatuses = {
  residency: 'missing',
  income: 'missing',
  housingInstability: 'missing',
  covid: 'missing',
};

export default function Index() {
  const currentUser = useSelector(state => state.user.currentUser);

  const request = currentUser.requests[0];

  const [collapsed, setCollapsed] = useState(false);

  const [currentContent, setCurrentContent] = useState('status');

  //Prepare document Info
  const [documentStatuses, setDocumentStatuses] = useState(initialStatuses);

  const documents = useSelector(state => state.requests.documents);

  const sortDocuments = documents => {
    documents.forEach(document => {
      if (document.category) {
        setDocumentStatuses({
          ...documentStatuses,
          [document.category]: document.status,
        });
      }
    });
  };

  useEffect(() => {
    sortDocuments(documents);
  }, [documents]);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const onContentChange = ({ key }) => {
    setCurrentContent(key);

    if (key !== 'userInfo' && collapsed) {
      setCollapsed(false);
    }
  };

  const props = {
    currentContent,
    request,
    documentStatuses,
    setDocumentStatuses,
  };

  return (
    <div className="homeContainer">
      <Layout style={{ height: '90vh' }} className="user-dash-container">
        <Header className="header">
          <Title
            level={2}
            // className={styles.heading}
            style={{ color: '#FFFFFF' }}
          >
            {' '}
            Hello {currentUser.firstName}, Welcome to your Housing Assistance
            Portal.
          </Title>
        </Header>
        <Layout className="sidebar-content-container">
          <Sider collapsible collapsed={collapsed} onCollapse={toggleCollapse}>
            <Menu
              theme="dark"
              defaultSelectedKeys={['status']}
              mode="inline"
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
                onClick={e => {
                  setCollapsed(true);
                  onContentChange(e);
                }}
              >
                User
              </Menu.Item>
              <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
                <Menu.Item key="6">Team 1</Menu.Item>
                <Menu.Item key="8">Team 2</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Content
            className="homeContent"
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
        <Footer style={{ textAlign: 'center' }}>
          <a href="http://www.familypromiseofspokane.org/" target="_blank">
            Powered by Family Promise of Spokane
          </a>
        </Footer>
      </Layout>
    </div>
  );
}

const renderContent = props => {
  switch (props.currentContent) {
    case 'status':
      return <StatusBar request={props.request} />;
    case 'comments':
      return <CommentsContainer request={props.request} />;
    case 'documents':
      return <Documents {...props} />;
    case 'userInfo':
      return <UserInfo />;
  }
};
