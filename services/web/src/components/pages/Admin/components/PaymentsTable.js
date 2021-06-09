import React, { useState, useEffect } from 'react';

import MaterialTable from '@material-table/core';

import { tableIcons } from '../../../../utils/tableIcons';
import { axiosWithAuth } from '../../../../api/axiosWithAuth';

export default function PaymentsTable() {
  const [isFetching, setIsFetching] = useState(false);

  const [columns, setColumns] = useState([
    { title: 'First', field: 'firstName', editable: 'never' },
    { title: 'Last ', field: 'lastName', editable: 'never' },
    { title: 'email', field: 'email', type: 'string', editable: 'never' },
    {
      title: 'Amount',
      field: 'amount',
      type: 'integer',
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
      <MaterialTable
        isLoading={isFetching}
        options={{
          // Allows users to export the data as a CSV file
          exportButton: true,
        }}
        editable={{
          // Disable deleting and editing if the user is an Admin

          isDeletable: rowData => rowData.role !== 'admin',
          isEditable: rowData => rowData.role !== 'admin',
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              resolve();
              // Set the state first to instantly update the table

              setData(
                data.map(row => {
                  if (row.id === oldData.id) {
                    return newData;
                  }
                  return row;
                })
              );

              // Persist those changes

              const updatedUser = {
                firstName: newData.firstName,
                lastName: newData.lastName,
                role: newData.role,
              };

              axiosWithAuth()
                .put(`/users/${oldData.id}`, updatedUser)
                .catch(err => alert('Failed to update user'));
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              axiosWithAuth()
                .delete(`/users/${oldData.id}`)
                .then(() => {
                  setData(data.filter(row => row.id !== oldData.id));
                })
                .catch(err => alert('Unable to delete user'))
                .finally(() => resolve());
            }),
        }}
        icons={tableIcons}
        title="Users"
        columns={columns}
        data={data}
      />
    </>
  );
}
