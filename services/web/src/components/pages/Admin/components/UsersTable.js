import React, { useState, useEffect } from 'react';

import MaterialTable from '@material-table/core';

import { tableIcons } from '../../../../utils/tableIcons';
import { axiosWithAuth } from '../../../../api/axiosWithAuth';

export default function UsersTable() {
  const [isFetching, setIsFetching] = useState(false);
  const [state, setState] = useState({
    columns: [
      { title: 'First', field: 'firstName' },
      { title: 'Last ', field: 'lastName' },
      { title: 'email', field: 'email', type: 'string', editable: 'never' },
      {
        title: 'Minors',
        field: 'minorGuest',
        type: 'string',
        editable: 'never',
      },
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
      },
    ],
    data: [],
  });

  const fetchUsers = async () => {
    setIsFetching(true);
    try {
      let res = await axiosWithAuth().get('/users');
      setState({ ...state, data: res.data });
    } catch (error) {
      console.error(error);
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

              setState({
                ...state,
                data: state.data.map(row => {
                  if (row.id === oldData.id) {
                    return newData;
                  }
                  return row;
                }),
              });

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
        }}
        icons={tableIcons}
        title="Users"
        columns={state.columns}
        data={state.data}
      />
    </>
  );
}
