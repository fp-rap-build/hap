import { useState } from 'react';

import { message, Select, Spin } from 'antd';
import { axiosWithAuth } from '../../../../../../../api/axiosWithAuth';

import { useSelector } from 'react-redux';

const { Option } = Select;

const Organizations = ({ request }) => {
  const [orgs, setOrgs] = useState([]);

  const [isFetching, setIsFetching] = useState(false);

  const currentUserRole = useSelector(state => state.user.currentUser.role);

  const fetchOrganizations = async () => {
    setIsFetching(true);
    try {
      let res = await axiosWithAuth().get('/orgs');

      setOrgs(res.data);
    } catch (error) {
      message.error('unable to fetch orgnanizations');
    } finally {
      setIsFetching(false);
    }
  };

  const transferRequestToOrganization = async orgId => {
    try {
      await axiosWithAuth().put(`/requests/${request.id}`, { orgId });
    } catch (error) {
      message.error('unable to update organization');
    }
  };

  return (
    <Select
      disabled={currentUserRole !== 'admin'}
      style={{ width: 120, marginBottom: '1rem' }}
      defaultValue={request.orgId}
      onFocus={fetchOrganizations}
      onChange={orgId => transferRequestToOrganization(orgId)}
      notFoundContent={isFetching ? <Spin size="small" /> : null}
    >
      {orgs.map(org => (
        <Option value={org.id}>{org.organization}</Option>
      ))}
    </Select>
  );
};

export default Organizations;
