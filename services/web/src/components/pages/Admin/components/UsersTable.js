import { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

import { axiosWithAuth } from '../../../../api/axiosWithAuth';

import Container from './components/Requests/Actions/Container';

import DeleteIcon from '@material-ui/icons/Delete';

import { message, Modal } from 'antd';

import { XGrid } from '@material-ui/x-grid';

export default function UsersTable() {
  const currentUserRole = useSelector(state => state.user.currentUser.role);

  const [isFetching, setIsFetching] = useState(false);

  const [columns, setColumns] = useState([
    {
      title: 'Delete',
      field: 'delete',
      renderCell: params => <DeleteUser row={params.row} setData={setData} />,
    },

    { title: 'First', field: 'firstName', flex: 1, editable: true },
    { title: 'Last ', field: 'lastName', flex: 1, editable: true },
    { title: 'email', field: 'email', type: 'string', flex: 1 },

    {
      title: 'role',
      field: 'role',
      lookup: {
        admin: 'admin',
        programManager: 'program manager',
        tenant: 'tenant',
        landlord: 'landlord',
        pending: 'pending',
      },
      flex: 1,
      editable: true,
    },
  ]);

  const [data, setData] = useState([]);

  const fetchUsers = async () => {
    setIsFetching(true);
    try {
      let res = await axiosWithAuth().get('/users');
      setData(res.data);
    } catch (error) {
      alert('error');
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <XGrid
        style={{ height: 700 }}
        rows={data}
        onCellEditCommit={user => editUser(user)}
        columns={columns}
        isCellEditable={props => {
          return props.row.role !== 'admin';
        }}
        loading={isFetching}
      />
    </>
  );
}

const editUser = async row => {
  const { id, field, value } = row;

  const payload = {};

  payload[field] = value;

  try {
    await axiosWithAuth().put(`/users/${id}`, payload);
  } catch (error) {
    message.error('Unable to edit user');
  }
};

const DeleteUser = ({ row, setData }) => {
  const onUserDelete = (row, setData) => {
    const deletedRowId = row.id;

    setData(data => data.filter(row => row.id !== deletedRowId));

    axiosWithAuth()
      .delete(`/users/${row.id}`)
      .then(() => {
        setData(data => data.filter(row => row.id !== deletedRowId));
      })
      .catch(err => message.error('Unable to delete user'));
  };

  const Confirm = () =>
    Modal.confirm({
      title: 'Delete user',
      content: 'Are you sure you want to delete this user?',
      onOk: () => onUserDelete(row, setData),
    });

  return (
    <Container onClick={Confirm}>
      <DeleteIcon />
    </Container>
  );
};
