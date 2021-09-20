import useWindowDimensions from '../../../../../../utils/useWindowDimensions';

import { DownOutlined } from '@ant-design/icons';

import { Layout, Menu, Dropdown, Button } from 'antd';

const { Sider } = Layout;

const RenderMenu = ({ onContentChange }) => {
  const { width } = useWindowDimensions();

  const menu = (
    <Menu
      theme="light"
      defaultSelectedKeys={['applicant']}
      mode="inline"
      className="userSidebar"
      style={width < 800 ? { width: '10rem', height: '13rem' } : {}}
    >
      <Menu.Item key="applicant" onClick={onContentChange}>
        Applicant
      </Menu.Item>
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
    </Menu>
  );

  return (
    <>
      {width < 800 ? (
        <Dropdown overlay={menu} trigger={['click']}>
          <Button type="primary">
            Navigate <DownOutlined />
          </Button>
        </Dropdown>
      ) : (
        <Sider>{menu}</Sider>
      )}
    </>
  );
};

export default RenderMenu;
