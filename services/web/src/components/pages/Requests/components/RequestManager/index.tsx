import { useEffect } from 'react';

import { message, Select } from 'antd';
import { axiosWithAuth } from '../../../../../api/axiosWithAuth';

const { Option } = Select;

export default function Index({ users, request, setRequest }) {
  return (
    <div>
      <h2>Managed by:</h2>
      <UserList users={users} request={request} />
    </div>
  );
}

const UserList = ({ users, request }) => {
  const generateName = user => {
    return `${user.firstName} ${user.lastName} (${user.email})`;
  };

  const onUserChange = staffId => {
    updateRequestManager(request.id, staffId);
  };

  return (
    <Select
      style={{ width: 300 }}
      showSearch
      placeholder="Select a manager"
      onChange={onUserChange}
      defaultValue={request.managerId}
      optionFilterProp="children"
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      <Option value={null}>Nobody</Option>
      {users.map(user => (
        <Option value={user.id}>{generateName(user)}</Option>
      ))}
    </Select>
  );
};

const updateRequestManager = async (requestId, staffId) => {
  try {
    await axiosWithAuth().put(`/requests/${requestId}`, { managerId: staffId });
  } catch (error) {
    message.error('Unable to update manager');
  }
};
