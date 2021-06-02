import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import useWindowDimensions from '../../../../../utils/useWindowDimensions';

import { fetchRequestAndAddr } from '../../../../../redux/requests/requestActions';

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
  UserOutlined,
} from '@ant-design/icons';

import { Typography, Layout, Menu } from 'antd';

const { Header, Content, Sider, Footer } = Layout;
const { SubMenu } = Menu;
const { Title } = Typography;

export default function Index() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRequestAndAddr());
  }, []);

  const currentUser = useSelector(state => state.user.currentUser);

  const request = currentUser.requests[0];

  //Pull window dimensions for responsive layout
  const { height, width } = useWindowDimensions();

  const [collapsed, setCollapsed] = useState(false);

  const [currentContent, setCurrentContent] = useState('status');

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
  };

  return (
    <div className="homeContainer">
      <Layout style={{ minHeight: '90vh' }}>
        <Sider
          collapsible
          collapsed={width < 700 ? true : collapsed}
          onCollapse={toggleCollapse}
          collapsedWidth={60}
          width="10rem"
        >
          <div className="spacer" />
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
          </Menu>
        </Sider>
        <Layout className="sidebar-content-container">
          <Header className="header">
            <Title level={width > 490 ? 2 : 3} style={{ color: '#FFFFFF' }}>
              {currentUser.firstName}'s Housing Assistance Portal.
            </Title>
          </Header>
          <Content
            className="homeContent"
            style={{
              minHeight: 280,
            }}
          >
            {renderContent(props)}
          </Content>
          <Footer className="dashFooter">
            <a href="http://www.familypromiseofspokane.org/" target="_blank">
              Powered by Family Promise of Spokane
            </a>
          </Footer>
        </Layout>
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
