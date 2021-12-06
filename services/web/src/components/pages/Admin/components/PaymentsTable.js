import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../../../../api/axiosWithAuth';
import { message, Modal } from 'antd';

// Helper function to pull family size and monthly income from current
// request to calculate and display the ami (Average Median Income)
// AMI is used later to generate a new column on payments table
// that indicates which AMI range the household is in
import calculateAmi from '../../../../utils/general/calculateAmi';

import Container from './components/Requests/Actions/Container';

import CheckIcon from '@material-ui/icons/Check';

import CancelIcon from '@material-ui/icons/Cancel';

import DeleteIcon from '@material-ui/icons/Delete';

import { XGrid, GridToolbar } from '@material-ui/x-grid';
//import ExportCsv from './components/ExportCsv';

// helper function to insert "HAP" before every request id prior to
// displaying it in the table
import createHAPid from '../../../../utils/general/displayHAPid';

// Helper function to pull dob from request to calculate age then create a new
// column that indicates if the head of household is a youth or not
import YouthHOH from '../../../../utils/general/youthHOH';

import ProcessedUtilityCheckbox from './components/Payments/ProcessedUtilityCheckbox';

import {
  updateTableWithConfig,
  onColumnVisibilityChange,
  onFilterModelChange,
  updateFilters,
} from './components/Requests/PersistTableSettings';
import addCustomOperators from './components/Requests/addCustomOperators';

import { formatDate } from '../../../../utils/dates/date';

export default function PaymentsTable() {
  const [isFetching, setIsFetching] = useState(false);

  const [data, setData] = useState([]);

  const [filterModel, setFilterModel] = useState({ items: [] });

  const [columns, setColumns] = useState([
    {
      headerName: 'Approve',
      field: 'approve',
      renderCell: params => (
        <ApprovePayment row={params.row} setData={setData} />
      ),
    },

    {
      headerName: 'deny',
      field: 'deny',
      renderCell: params => <DenyPayment row={params.row} setData={setData} />,
    },

    {
      headerName: 'HAP ID',
      field: 'HAP ID',
      width: 170,
    },

    {
      headerName: 'Status',
      field: 'status',
      width: 170,
    },

    {
      headerName: 'Manager',
      field: 'manager',
      width: 150,
    },

    {
      headerName: 'Type',
      field: 'type',
      width: 170,
    },

    {
      headerName: 'Account',
      field: 'accountNumber',
      width: 170,
    },

    {
      headerName: 'Renter Or Owner',
      field: 'renterOrOwner',
      width: 170,
    },

    { headerName: 'HoH is 18-24', field: 'youth', width: 170 },
    { headerName: 'First', field: 'firstName', width: 170 },
    { headerName: 'Last ', field: 'lastName', width: 170 },
    { headerName: 'Address', field: 'address', width: 170 },
    { headerName: 'Address Line 2', field: 'addressLine2', width: 170 },
    { headerName: 'City', field: 'cityName', width: 170 },
    { headerName: 'State', field: 'state', width: 170 },
    { headerName: 'Zip', field: 'zipCode', width: 170 },
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
      headerName: 'Landlord Name',
      field: 'landlordName',
      type: 'string',
      width: 170,
      editable: 'always',
    },
    {
      headerName: 'Landlord Email',
      field: 'landlordEmail',
      type: 'string',
      width: 170,
      editable: 'always',
    },
    {
      headerName: 'Total Outstanding Arrears',
      field: 'totalArrears',
      defaultValue: 'amountRequested',
      type: 'string',
      width: 170,
      editable: 'always',
    },
    {
      headerName: 'Amount Back Paid',
      field: 'amountBack',
      type: 'string',
      width: 170,
      editable: 'always',
    },
    {
      headerName: 'Amount Forward Paid',
      field: 'amountForward',
      type: 'string',
      width: 170,
      editable: 'always',
    },
    {
      headerName: 'Total Amount Paid',
      field: 'amount',
      width: 170,
      editable: 'always',
    },
    {
      headerName: 'Difference',
      field: 'difference',
      width: 170,
      editable: 'never',
    },
    {
      headerName: 'Months Back',
      field: 'monthsBack',
      width: 170,
      editable: 'always',
    },
    {
      headerName: 'Months Forward',
      field: 'monthsForward',
      width: 170,
      editable: 'always',
    },
    {
      headerName: 'Date Requested',
      field: 'requestDate',
      type: 'date',
      width: 170,
      renderCell: rowData => <p>{formatDate(rowData.row.requestDate)}</p>,
    },
    {
      headerName: 'Date Approved',
      field: 'approveDate',
      type: 'date',
      width: 170,
      renderCell: rowData => <p>{formatDate(rowData.row.approveDate)}</p>,
    },
    {
      headerName: 'Processed?',
      field: 'processed',
      width: 150,
      renderCell: rowData => {
        return (
          <ProcessedUtilityCheckbox
            processed={rowData.row.processed}
            id={rowData.row.id}
          />
        );
      },
    },
  ]);

  const fetchPayments = async () => {
    setIsFetching(true);
    try {
      let res = await axiosWithAuth().get('/payments/table');

      let payments = res.data.payments.map(payment => {
        payment['race'] = '';
        payment['difference'] =
          payment['amountForward'] + payment['amountBack'] - payment['amount'];
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

        payment['manager'] = payment['managerFirstName']
          ? payment['managerFirstName'] + ' ' + payment['managerLastName']
          : 'Nobody';

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

  useEffect(() => {
    updateTableWithConfig(setColumns, 'paymentsTable');

    updateFilters(setFilterModel, 'paymentsFilters');
  }, []);

  useEffect(() => {
    addCustomOperators(setColumns);
  }, []);

  return (
    <>
      <h2>Payments</h2>

      <XGrid
        style={{ height: 700 }}
        filterModel={filterModel}
        onColumnVisibilityChange={e =>
          onColumnVisibilityChange(e, 'paymentsTable')
        }
        onColumnWidthChange={e => onColumnVisibilityChange(e, 'paymentsTable')}
        onFilterModelChange={e => {
          onFilterModelChange(e, setFilterModel, 'paymentsFilters');
        }}
        rows={data}
        columns={columns}
        loading={isFetching}
        onCellEditCommit={payment => editPayment(payment)}
        components={{
          Toolbar: GridToolbar,
        }}
      />
    </>
  );
}

const editPayment = async row => {
  const { id, field, value } = row;

  const payload = {};

  payload[field] = value;

  try {
    await axiosWithAuth().put(`/payments/${id}`, payload);
  } catch (error) {
    message.error(
      'Unable to update the payment, please wait a moment and then try again.'
    );
  }
};

const ApprovePayment = ({ row, setData }) => {
  const onPaymentApprove = (row, setData) => {
    const approvedPaymentId = row.id;

    axiosWithAuth()
      .post(`/payments/${row.id}/approve`)
      .then(() => {
        setData(data =>
          data.map(row => {
            if (row.id === approvedPaymentId) {
              row['status'] = 'approved';
            }

            return row;
          })
        );
      })
      .catch(err => message.error('Unable to approve payment'));
  };

  const Confirm = () => {
    if (row.status === 'approved') {
      return message.error('Payment has already been approved');
    }

    return Modal.confirm({
      title: 'Approve payment',
      content: 'Are you sure you want to approve this payment',
      onOk: () => onPaymentApprove(row, setData),
    });
  };

  return (
    <Container onClick={Confirm}>
      <CheckIcon />
    </Container>
  );
};

const DenyPayment = ({ row, setData }) => {
  const onPaymentDenied = (row, setData) => {
    const deniedPaymentID = row.id;

    axiosWithAuth()
      .post(`/payments/${row.id}/deny`)
      .then(() => {
        setData(data =>
          data.map(row => {
            if (row.id === deniedPaymentID) {
              row['status'] = 'denied';
            }

            return row;
          })
        );
      })
      .catch(err => message.error('Unable to deny payment'));
  };

  const Confirm = () => {
    if (row.status === 'approved') {
      return message.error('Payment has already been approved');
    }

    return Modal.confirm({
      title: 'Deny payment',
      content: 'Are you sure you want to deny this payment?',
      onOk: () => onPaymentDenied(row, setData),
    });
  };

  return (
    <Container onClick={Confirm}>
      <CancelIcon />
    </Container>
  );
};

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
