import { useState } from 'react';
import { useSelector } from 'react-redux';

import AddressInfo from './AddressInfo';

import { Layout, Menu } from 'antd';

const { Sider, Content } = Layout;

const UserInfo = () => {
  const currentUser = useSelector(state => state.user.currentUser);

  const { request, addressDetails } = useSelector(state => state.requests);

  console.log(request);

  const [currentContent, setCurrentContent] = useState('address');

  const onContentChange = ({ key }) => {
    setCurrentContent(key);
  };

  const props = { currentContent, request, addressDetails };

  return (
    <div>
      <Layout>
        <Sider>
          <Menu theme="light" defaultSelectedKeys={['address']} mode="inline">
            <Menu.Item key="address" onClick={onContentChange}>
              Address
            </Menu.Item>
            <Menu.Item key="household" onClick={onContentChange}>
              Household Information
            </Menu.Item>
            <Menu.Item key="landlord" onClick={onContentChange}>
              Landlord Information
            </Menu.Item>
          </Menu>
        </Sider>
        <Content>{renderContent(props)}</Content>
      </Layout>
    </div>
  );
};

const renderContent = props => {
  switch (props.currentContent) {
    case 'address':
      return <AddressInfo {...props} />;
    default:
      return <h3>Not Built Yet :/</h3>;
  }
};

export default UserInfo;
