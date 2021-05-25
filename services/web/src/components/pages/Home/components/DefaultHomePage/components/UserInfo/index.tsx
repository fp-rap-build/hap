import { useState } from 'react';
import { useSelector } from 'react-redux';

import AddressInfo from './AddressInfo';

import { Layout, Menu } from 'antd';

const { Sider, Content } = Layout;

const UserInfo = () => {
  const currentUser = useSelector(state => state.user.currentUser);
  const request = useSelector(state => state.requests);

  const [currentContent, setCurrentContent] = useState('address');
  const [requestData, setRequestData] = useState(request.request);
  const [addressData, setAddressData] = useState(request.addressDetails);

  const onContentChange = ({ key }) => {
    setCurrentContent(key);
  };

  const handleAddressChange = e => {
    console.log(e);
    const { name, value, type } = e.target;
    setAddressData({ ...addressData, [name]: value });
  };

  const handleRequestChange = e => {
    e.stopPropagation();

    const { name, checked } = e.target;

    setRequestData({ ...requestData, [name]: checked });
  };

  const handleZipChange = value => {
    setAddressData({ ...addressData, zipCode: value });
  };
  const props = {
    currentContent,
    requestData,
    addressData,
    handleAddressChange,
    handleZipChange,
    handleRequestChange,
  };

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
