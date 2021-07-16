import React from 'react';
import {
  FolderOpenOutlined,
  FolderOutlined,
  DownOutlined,
  LineChartOutlined,
  WarningFilled,
} from '@ant-design/icons';
import { Menu, Dropdown, Button } from 'antd';

import styles from '../../../../styles/pages/admin.module.css';

const AdminNav = props => {
  const { activeComponent, handleClick } = props;

  const menu = (
    <Menu onClick={handleClick} selectedKeys={activeComponent.current}>
      <Menu.Item key="requests" icon={<FolderOpenOutlined />}>
        Manage Requests
      </Menu.Item>
      <Menu.Item key="yourRequests" icon={<FolderOutlined />}>
        Your Requests
      </Menu.Item>
      <Menu.Item key="archive" icon={<FolderOutlined />}>
        Archived Requests
      </Menu.Item>
      <Menu.Item key="incomplete" icon={<WarningFilled />}>
        Incomplete Requests
      </Menu.Item>
      <Menu.Item key="analytics" icon={<LineChartOutlined />}>
        Analytics
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']} className={styles.dropdown}>
      <Button type="primary">
        Navigate <DownOutlined />
      </Button>
    </Dropdown>
  );
};

export default AdminNav;
