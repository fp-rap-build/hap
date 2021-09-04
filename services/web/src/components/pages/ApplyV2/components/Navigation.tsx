import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  UserOutlined,
} from '@ant-design/icons';

import { Typography, Layout, Menu } from 'antd';

import {
  Address,
  CreateAccount,
  Demographics,
  Documents,
  Household,
  Income,
  Landlord,
  Review,
  Submit,
  Status,
} from './forms';

import { INITIAL_VALUES } from '../utils/initialFormValues';

const { Header, Content, Sider, Footer } = Layout;
const { Title } = Typography;

export default function Index() {
  const dispatch = useDispatch();

  //UI State
  const [formValues, setFormValues] = useState(INITIAL_VALUES());
  const [errorMessage, setErrorMessage] = useState(null);
  const [collapsed, setCollapsed] = useState(true);
  const [currentContent, setCurrentContent] = useState('createAccount');

  //Event Handlers
  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const onContentChange = ({ key }) => {
    setCurrentContent(key);

    if (key !== 'userInfo' && collapsed) {
      setCollapsed(false);
    }
  };

  const handleChange = e => {
    // Clean up any error message after the user types
    if (errorMessage) {
      setErrorMessage(null);
    }

    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });

    console.log(formValues);
  };

  function onStateChange(value) {
    setFormValues({ ...formValues, state: value });
  }

  const handleDateChange = (value, dateString) => {
    setFormValues({
      ...formValues,
      dob: dateString,
    });
  };

  function onDateChange(value) {
    setFormValues({ ...formValues, dob: value });
  }

  function onGenderChange(value) {
    setFormValues({ ...formValues, gender: value });
  }

  const onRoleChange = value => {
    setFormValues({ ...formValues, role: value });
  };

  const handleCheckBoxChange = e => {
    e.stopPropagation();

    const { name, checked } = e.target;

    setFormValues({ ...formValues, [name]: checked });
  };

  const props = {
    currentContent,
    setCurrentContent,
    formValues,
    setFormValues,
    errorMessage,
    setErrorMessage,
    handleChange,
    onStateChange,
    onDateChange,
    onGenderChange,
    onRoleChange,
    handleCheckBoxChange,
  };

  return (
    <div className="homeContainer">
      <Layout style={{ minHeight: '90vh' }}>
        <Sider
          collapsible
          onCollapse={toggleCollapse}
          collapsedWidth={60}
          width="15rem"
          style={{ backgroundColor: 'white' }}
        >
          <Menu
            defaultSelectedKeys={['createAccount']}
            selectedKeys={[currentContent]}
            mode="inline"
            inlineCollapsed={collapsed}
          >
            <Menu.Item
              key="createAccount"
              icon={<UserOutlined />}
              onClick={e => {
                setCollapsed(true);
                onContentChange(e);
              }}
            >
              Create your Account
            </Menu.Item>
            <Menu.Item
              key="landlord"
              icon={<FileOutlined />}
              onClick={onContentChange}
            >
              Landlord / Property Manager
            </Menu.Item>
            <Menu.Item
              key="address"
              icon={<DesktopOutlined />}
              onClick={onContentChange}
            >
              Your Address
            </Menu.Item>
            <Menu.Item
              key="household"
              icon={<PieChartOutlined />}
              onClick={onContentChange}
            >
              Your Household info.
            </Menu.Item>
            <Menu.Item
              key="demographics"
              icon={<FileOutlined />}
              onClick={onContentChange}
            >
              Demographic info.
            </Menu.Item>
            <Menu.Item
              key="income"
              icon={<FileOutlined />}
              onClick={onContentChange}
            >
              Household Income
            </Menu.Item>
            <Menu.Item
              key="documents"
              icon={<FileOutlined />}
              onClick={onContentChange}
            >
              Your Documents
            </Menu.Item>
            <Menu.Item
              key="review"
              icon={<FileOutlined />}
              onClick={onContentChange}
            >
              Review your Application
            </Menu.Item>
            <Menu.Item
              key="submit"
              icon={<FileOutlined />}
              onClick={onContentChange}
            >
              Submit
            </Menu.Item>
            <Menu.Item
              key="status"
              icon={<FileOutlined />}
              onClick={onContentChange}
            >
              Your Application Status
            </Menu.Item>
          </Menu>
        </Sider>

        <Layout className="sidebar-content-container">
          <Content
            className="homeContent"
            style={{
              minHeight: 280,
            }}
          >
            {renderContent(props)}
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

const renderContent = props => {
  switch (props.currentContent) {
    case 'createAccount':
      return <CreateAccount {...props} />;
    case 'landlord':
      return <Landlord />;
    case 'address':
      return <Address />;
    case 'household':
      return <Household />;
    case 'demographics':
      return <Demographics />;
    case 'income':
      return <Income />;
    case 'documents':
      return <Documents />;
    case 'review':
      return <Review />;
    case 'submit':
      return <Submit />;
    case 'status':
      return <Status />;
    default:
      return <h1>Default</h1>;
  }
};
