import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../../../../api/axiosWithAuth';
import { message, Modal } from 'antd';

// Helper function to pull family size and monthly income from current
// request to calculate and display the ami (Average Median Income)
// AMI is used later to generate a new column on payments table
// that indicates which AMI range the household is in
import calculateAmi from '../../../../utils/general/calculateAmi';

import Container from './components/Requests/Actions/Container';

import DeleteIcon from '@material-ui/icons/Delete';

import { XGrid } from '@material-ui/x-grid';
import ExportCsv from './components/ExportCsv';

// helper function to insert "HAP" before every request id prior to
// displaying it in the table
import createHAPid from '../../../../utils/general/displayHAPid';

// Helper function to pull dob from request to calculate age then create a new
// column that indicates if the head of household is a youth or not
import YouthHOH from '../../../../utils/general/youthHOH';

export default function PaymentsTable() {
  const [isFetching, setIsFetching] = useState(false);

  const [data, setData] = useState([]);

  const [columns, setColumns] = useState([
    {
      headerName: 'Delete',
      field: 'delete',
      renderCell: params => (
        <DeletePayment row={params.row} setData={setData} />
      ),
    },

    {
      headerName: 'HAP ID',
      field: 'HAP ID',
      width: 170,
    },

    { headerName: 'HoH is 18-24', field: 'youth', width: 170 },
    { headerName: 'First', field: 'firstName', width: 170 },
    { headerName: 'Last ', field: 'lastName', width: 170 },
    {
      headerName: 'Email',
      field: 'email',
      type: 'string',
      width: 170,
    },
    { headerName: 'Gender', field: 'gender', width: 170 },
    { headerName: 'Race', field: 'race', width: 170 },
    { headerName: 'Tenant Zipcode', field: 'zipCode', width: 170 },
    { headerName: 'Ethnicity', field: 'ethnicity', width: 170 },
    { headerName: 'Household Size', field: 'familySize', width: 170 },
    { headerName: 'Total Children', field: 'totalChildren', width: 170 },
    {
      headerName: 'Children Ages',
      field: 'childrenAges',
      width: 170,
    },
    {
      headerName: 'Monthly Income',
      field: 'monthlyIncome',
      width: 170,
    },
    { title: 'First', field: 'firstName', editable: 'never' },
    { title: 'Last ', field: 'lastName', editable: 'never' },
    { title: 'Email', field: 'email', type: 'string', editable: 'never' },
    { title: 'Gender', field: 'gender', editable: 'always' },
    { title: 'Race', field: 'race', editable: 'always' },
    { title: 'Tenant Zip', field: 'zipCode', editable: 'never' },
    { title: 'Ethnicity', field: 'ethnicity', editable: 'always' },
    { title: 'Household Size', field: 'familySize', editable: 'always' },
    { title: 'Total Children', field: 'totalChildren', editable: 'always' },
    { title: 'Children Ages', field: 'childrenAges', editable: 'never' },
    { title: 'Monthly Income', field: 'monthlyIncome', editable: 'always' },
    { title: 'Monthly Rent', field: 'monthlyRent', editable: 'always' },
    { title: 'AMI', field: 'ami', editable: 'never' },
    { title: 'AMI Range', field: 'AMI range', editable: 'never' },
    {
      headerName: 'Program',
      field: 'program',
      type: 'string',
      width: 170,
    },
    {
      headerName: 'Amount',
      field: 'amount',
      width: 170,
      editable: 'always',
    },
    {
      headerName: 'Date Requested',
      field: 'requestDate',
      type: 'date',
      width: 170,
    },
    {
      headerName: 'Date Approved',
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
        payment['race_count'] = 0;
        payment['ethnicity'] = '';
        payment['HAP ID'] = createHAPid(payment.requestId);
        payment['youth'] = YouthHOH(payment.dob);

        let races = {
          'Black or African American': payment.black,
          'American Indian or Alaska Native': payment.native,
          Asian: payment.asian,
          'Client refused': payment.demoNotSay,
          White: payment.white,
          'Native Hawaiian or Other Pacific Islander': payment.pacific,
        };

        if (payment['hispanic']) {
          payment['ethnicity'] = 'Hispanic / Latinx';
        } else {
          payment['ethnicity'] = 'Non-Hispanic / Non-Latinx';
        }

        for (let race in races) {
          if (races[race]) {
            payment['race_count'] += 1;
          }
        }

        if (payment['race_count'] > 1) {
          payment['race'] = 'Multi-Racial';
        } else {
          payment['race'] = payment.race;

          for (let race in races) {
            if (races[race]) {
              payment['race'] = race;
            }
          }
        }

        payment['ami'] = calculateAmi(
          payment.monthlyIncome,
          payment.familySize
        );

        if (payment['ami'] < 30) {
          payment['AMI range'] = `30% AMI or less`;
        } else if (payment['ami'] <= 50 && payment['ami'] >= 30) {
          payment['AMI range'] = `Between 31% AMI and 50% AMI`;
        } else if (payment['ami'] >= 51) {
          payment['AMI range'] = `Between 51% AMI and 80% AMI`;
        }

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
      <h2>Payments</h2>

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
