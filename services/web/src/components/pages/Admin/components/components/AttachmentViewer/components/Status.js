import { useState } from 'react';

import { Menu, Dropdown, Button, message } from 'antd';
import { axiosWithAuth } from '../../../../../../../api/axiosWithAuth';

export default function Status({ docStatus, docId, setRequests }) {
  const [status, setStatus] = useState(docStatus);

  const handleButtonClick = () => {
    axiosWithAuth()
      .put(`/documents/${docId}`, { status })
      .then(() => {
        console.log('success');
      })
      .catch(() => message.error('Unable to update status'));
  };

  const handleMenuClick = e => {
    setStatus(e.key);
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="verified">Verified (Ok)</Menu.Item>
      <Menu.Item key="actionsRequired">Actions Required</Menu.Item>
      <Menu.Item key="denied">
        {<p style={{ color: 'red' }}>Denied</p>}
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown.Button onClick={handleButtonClick} overlay={menu}>
      {camelCaseToSentenceCase(status)}
    </Dropdown.Button>
  );
}

const camelCaseToSentenceCase = text => {
  const result = text.replace(/([A-Z])/g, ' $1');
  const finalResult = result.charAt(0).toUpperCase() + result.slice(1);

  return finalResult;
};
