import React, { useState, useEffect } from 'react';

import MaterialTable from '@material-table/core';

import { tableIcons } from '../../../../utils/tableIcons';
import { axiosWithAuth } from '../../../../api/axiosWithAuth';
import { message } from 'antd';

export default function PaymentsTable() {
  const [isFetching, setIsFetching] = useState(false);

  const [columns, setColumns] = useState([
    { title: 'First', field: 'firstName', editable: 'never' },
    { title: 'Last ', field: 'lastName', editable: 'never' },
    { title: 'Email', field: 'email', type: 'string', editable: 'never' },
    {
      title: 'Amount',
      field: 'amount',
      type: 'integer',
    },
  ]);

  const [data, setData] = useState([]);

  const fetchPayments = async () => {
    setIsFetching(true);
    try {
      let res = await axiosWithAuth().get('/payments/table');
      setData(res.data.payments);
    } catch (error) {
      alert('Unable to fetch payments');
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchPayments();
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

              if (isNaN(newData.amount))
                return message.error('Please input a valid number');

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

              const updatedPayment = {
                amount: newData.amount,
              };

              axiosWithAuth()
                .put(`/payments/${oldData.id}`, updatedPayment)
                .catch(err => alert('Failed to update payment'));
            }),
        }}
        icons={tableIcons}
        title="Payments"
        columns={columns}
        data={data}
      />
    </>
  );
}
