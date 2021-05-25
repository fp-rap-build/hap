import { UserOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, message, Space } from 'antd';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { axiosWithAuth } from '../../../../../../api/axiosWithAuth';

export default function TopActions({
  handleReviewSubmit,
  request,
  setRequest,
}) {
  const history = useHistory();

  const returnToDash = e => {
    e.stopPropagation();
    history.push('/');
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '15%',
        alignItems: 'center',
        gap: '10px',
      }}
    >
      <Button onClick={returnToDash}>Return To Dash</Button>
      <ChangeStatusDropdown request={request} setRequest={setRequest} />
      <JudgeDropdown handleReviewSubmit={handleReviewSubmit} />
    </div>
  );
}

const JudgeDropdown = ({ handleReviewSubmit }) => {
  const [status, setStatus] = useState('approved');

  function handleMenuClick(e) {
    setStatus(e.key);
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="approved" icon={<UserOutlined />}>
        Approve
      </Menu.Item>
      <Menu.Item key="denied" icon={<UserOutlined />}>
        Deny
      </Menu.Item>
    </Menu>
  );

  return (
    <Space>
      <Dropdown.Button
        type="primary"
        onClick={() => handleReviewSubmit(status)}
        overlay={menu}
      >
        {status === 'approved' ? 'Approve' : 'Deny'}
      </Dropdown.Button>
    </Space>
  );
};

const ChangeStatusDropdown = ({ request, setRequest }) => {
  const [status, setStatus] = useState(request.requestStatus);

  const handleStatusChange = e => {
    const newStatus = e.key;

    setStatus(newStatus);
  };

  const changeStatus = async () => {
    console.log(status);
    try {
      await axiosWithAuth().put(`/requests/${request.id}`, { status });
    } catch (error) {
      message.error('Unable to change status');
    }
  };

  const StatusMenu = (
    <Menu onClick={handleStatusChange}>
      <Menu.Item key="documentsNeeded" icon={<UserOutlined />}>
        Documents Needed
      </Menu.Item>
      <Menu.Item key="verifyingDocuments" icon={<UserOutlined />}>
        Verifying documents
      </Menu.Item>
      <Menu.Item key="readyForReview" icon={<UserOutlined />}>
        Ready for Review
      </Menu.Item>
    </Menu>
  );

  return (
    <Space>
      <Dropdown.Button
        onClick={changeStatus}
        type="primary"
        overlay={StatusMenu}
      >
        {status}
      </Dropdown.Button>
    </Space>
  );
};
