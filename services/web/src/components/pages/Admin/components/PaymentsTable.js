import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../../../../api/axiosWithAuth';
import { message, Modal } from 'antd';
import calculateAmi from '../../../../utils/general/calculateAmi';

import Container from './components/Requests/Actions/Container';

import DeleteIcon from '@material-ui/icons/Delete';

import { XGrid } from '@material-ui/x-grid';
import ExportCsv from './components/ExportCsv';

export default function PaymentsTable() {
  const [isFetching, setIsFetching] = useState(false);

  const [data, setData] = useState([]);

  const [columns, setColumns] = useState([
    {
      title: 'Delete',
      field: 'delete',
      renderCell: params => (
        <DeletePayment row={params.row} setData={setData} />
      ),
    },

    {
      title: 'HAP ID',
      field: 'requestId',
      width: 170,
    },
    { title: 'First', field: 'firstName', width: 170 },
    { title: 'Last ', field: 'lastName', width: 170 },
    {
      title: 'Email',
      field: 'email',
      type: 'string',

      width: 170,
    },
    { title: 'Gender', field: 'gender', width: 170 },
    { title: 'Race', field: 'race', width: 170 },
    { title: 'Ethnicity', field: 'ethnicity', width: 170 },
    {
      title: 'Household Size',
      field: 'familySize',

      width: 170,
    },
    {
      title: 'Total Children',
      field: 'totalChildren',

      width: 170,
    },
    {
      title: 'Children Ages',
      field: 'childrenAges',

      width: 170,
    },
    {
      title: 'Monthly Income',
      field: 'monthlyIncome',

      width: 170,
    },
    { title: 'Monthly Rent', field: 'monthlyRent', width: 170 },
    { title: 'AMI', field: 'ami', width: 170 },

    {
      title: 'Program',
      field: 'program',
      type: 'string',

      width: 170,
    },

    {
      title: 'Amount',
      field: 'amount',
      width: 170,
      editable: true,
    },

    {
      title: 'Date Requested',
      field: 'requestDate',
      type: 'date',
      width: 170,
    },

    {
      title: 'Date Approved',
      field: 'approveDate',
      type: 'date',
      width: 170,
    },
  ]);

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
      <XGrid
        style={{ height: 700 }}
        rows={data}
        columns={columns}
        loading={isFetching}
        onCellEditCommit={e => updatePayment(e)}
        components={{
          Toolbar: ExportCsv,
        }}
      />
    </>
  );
}

const DeletePayment = ({ row, setData }) => {
  const onPaymentDelete = (row, setData) => {
    const deletedRowId = row.id;

    setData(data => data.filter(row => row.id !== deletedRowId));

    axiosWithAuth()
      .delete(`/payments/${row.id}`)
      .then(() => {
        setData(data => data.filter(row => row.id !== deletedRowId));
      })
      .catch(err => message.error('Unable to delete payment'));
  };

  const Confirm = () =>
    Modal.confirm({
      title: 'Delete payment',
      content: 'Are you sure you want to delete this payment',
      onOk: () => onPaymentDelete(row, setData),
    });

  return (
    <Container onClick={Confirm}>
      <DeleteIcon />
    </Container>
  );
};

const updatePayment = e => {
  if (isNaN(e.value)) return message.error('Please input a valid number');

  const updatedPayment = {
    amount: e.value,
  };

  axiosWithAuth()
    .put(`/payments/${e.id}`, updatedPayment)
    .catch(err => alert('Failed to update payment'));
};
