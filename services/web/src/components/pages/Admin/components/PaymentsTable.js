import React, { useState, useEffect } from 'react';

import MaterialTable from '@material-table/core';

import { ExportCsv, ExportPdf } from '@material-table/exporters';

import { tableIcons } from '../../../../utils/tableIcons';
import { axiosWithAuth } from '../../../../api/axiosWithAuth';
import { message } from 'antd';
import calculateAmi from '../../../../utils/general/calculateAmi';

export default function PaymentsTable() {
  const [isFetching, setIsFetching] = useState(false);

  const [columns, setColumns] = useState([
    { title: 'First', field: 'firstName', editable: 'never' },
    { title: 'Last ', field: 'lastName', editable: 'never' },
    { title: 'Email', field: 'email', type: 'string', editable: 'never' },
    { title: 'Gender', field: 'gender', editable: 'never' },
    { title: 'Race', field: 'race', editable: 'never' },
    { title: 'Ethnicity', field: 'ethnicity', editable: 'never' },
    { title: 'Household Size', field: 'familySize', editable: 'never' },
    { title: 'Total Children', field: 'totalChildren', editable: 'never' },
    { title: 'Children Ages', field: 'childrenAges', editable: 'never' },
    { title: 'Monthly Income', field: 'monthlyIncome', editable: 'never' },
    { title: 'Monthly Rent', field: 'monthlyRent', editable: 'never' },
    { title: 'AMI', field: 'ami', editable: 'never' },

    {
      title: 'Program',
      field: 'program',
      type: 'string',
      editable: 'never',
    },
    {
      title: 'Amount',
      field: 'amount',
      type: 'integer',
    },
    {
      title: 'Date Requested',
      field: 'requestDate',
      type: 'date',
    },
    {
      title: 'Date Approved',
      field: 'approveDate',
      type: 'date',
    },
  ]);

  const [data, setData] = useState([]);

  const fetchPayments = async () => {
    setIsFetching(true);
    try {
      let res = await axiosWithAuth().get('/payments/table');

      let payments = res.data.payments.map(payment => {
        payment['race'] = '';
        payment['ethnicity'] = '';

        let races = {
          black: payment.black,
          white: payment.white,
          asian: payment.asian,
          pacific: payment.pacific,
        };

        if (payment['hispanic']) {
          payment['ethnicity'] = 'hispanic';
        }

        for (let race in races) {
          if (races[race]) {
            payment['race'] += ' ' + race;
          }
        }

        payment['ami'] = calculateAmi(
          payment.monthlyIncome,
          payment.familySize
        );

        return payment;
      });

      setData(res.data.payments);
    } catch (error) {
      console.log(error);
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
          pageSize: 10,
          pageSizeOptions: [5, 10, 20, 30, 50, 75, 100, 1000],
          // Allows users to export the data as a CSV file
          exportMenu: [
            {
              label: 'Export PDF',
              exportFunc: (cols, datas) => ExportPdf(cols, datas, 'payments'),
            },
            {
              label: 'Export CSV',
              exportFunc: (cols, datas) => ExportCsv(cols, datas, 'payments'),
            },
          ],
        }}
        editable={{
          // Disable deleting and editing if the user is an Admin

          isDeletable: rowData => rowData.role !== 'admin',
          isEditable: rowData => rowData.role !== 'admin',
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              axiosWithAuth()
                .delete(`/payments/${oldData.id}`)
                .then(() => {
                  setData(data.filter(row => row.id !== oldData.id));
                })
                .catch(err => message.error('Unable to delete request'))
                .finally(() => resolve());
            }),
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
