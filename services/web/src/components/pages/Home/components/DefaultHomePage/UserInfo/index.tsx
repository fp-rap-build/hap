import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchIncomes } from '../../../../../../redux/requests/requestActions';

import AddressInfo from './AddressInfo';
import LandlordContact from './LandlordContact';
import DemoInfo from './DemoInfo';
import Household from './Household';
import Income from './Income';

import { Layout, Menu } from 'antd';

const { Sider, Content } = Layout;

const UserInfo = () => {
  const request = useSelector(state => state.requests);

  const [currentContent, setCurrentContent] = useState('address');
  const [requestData, setRequestData] = useState(request.request);
  const [addressData, setAddressData] = useState(request.addressDetails);

  const dispatch = useDispatch();

  //updating incomes here b/c we have access to the request ID
  //Some good changes could be made to consolidate these into one piece of middleware
  //and dispatch one action in defaultHomePage

  useEffect(() => {
    dispatch(fetchIncomes(requestData.id));
  }, []);

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

    const { name, checked, type, value } = e.target;

    if (type === 'checkbox') {
      setRequestData({ ...requestData, [name]: checked });
    } else {
      setRequestData({ ...requestData, [name]: value });
    }
  };

  const handleNumChange = (name, setState, state) => value => {
    setState({ ...state, [name]: value });
  };
  const props = {
    currentContent,
    requestData,
    addressData,
    handleAddressChange,
    handleNumChange,
    handleRequestChange,
    setRequestData,
    setAddressData,
  };

  return (
    <div>
      <Layout>
        <Sider>
          <Menu
            theme="light"
            defaultSelectedKeys={['address']}
            mode="inline"
            className="userSidebar"
          >
            <Menu.Item key="address" onClick={onContentChange}>
              Address
            </Menu.Item>
            <Menu.Item key="landlordContact" onClick={onContentChange}>
              Landlord Contact
            </Menu.Item>
            <Menu.Item key="household" onClick={onContentChange}>
              Household Information
            </Menu.Item>
            <Menu.Item key="demographic" onClick={onContentChange}>
              Demographic
            </Menu.Item>
            <Menu.Item key="income" onClick={onContentChange}>
              Income
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
    case 'household':
      return <Household {...props} />;
    case 'landlordContact':
      return <LandlordContact {...props} />;
    case 'demographic':
      return <DemoInfo {...props} />;
    case 'income':
      return <Income {...props} />;
    default:
      return <h3>Not Built Yet :/</h3>;
  }
};

export default UserInfo;
