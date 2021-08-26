import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { useHistory } from 'react-router-dom';

import styles from '../../../../styles/pages/admin.module.css';

import { tableIcons } from '../../../../utils/tableIcons';
import { axiosWithAuth } from '../../../../api/axiosWithAuth';

import socket from '../../../../config/socket';
import calculateAmi from '../../../../utils/general/calculateAmi';
import sortRequests from '../utils/sortRequests';
import doesHouseholdContainPoc from '../../../../utils/general/doesHouseholdContainPoc';
import createHAPid from '../../../../utils/general/displayHAPid';

import {
  Review,
  Delete,
  Subscribe,
  MarkComplete,
  Organizations,
} from './components/Requests/Actions';

import { XGrid } from '@material-ui/x-grid';
import ExportCsv from './components/ExportCsv';

export default function RequestsTable() {
  const history = useHistory();
  const dispatch = useDispatch();

  const currentUser = useSelector(state => state.user.currentUser);

  const subscriptions = formatSubscriptions(currentUser.subscriptions);

  // const [isOpen, setIsOpen] = useState(false);
  // const [requestBeingReviewed, setRequestBeingReviewed] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [data, setData] = useState([]);

  const [columns, setColumns] = useState([
    {
      field: 'Review',
      width: 50,
      renderCell: params => {
        return <Review requestId={params.row.id} />;
      },
    },
    {
      field: 'Subscribe',
      width: 50,
      renderCell: params => {
        return <Subscribe setRequests={setData} currentRequest={params.row} />;
      },
    },

    {
      field: 'MarkComplete',
      width: 50,
      renderCell: params => {
        return (
          <MarkComplete
            setRequests={setData}
            requestId={params.row.id}
            hideRequest
          />
        );
      },
    },

    {
      field: 'Delete',
      width: 50,
      renderCell: params => {
        return <Delete setRequests={setData} requestId={params.row.id} />;
      },
    },

    {
      field: 'Organization',
      width: 200,
      renderCell: params => {
        return <Organizations request={params.row} />;
      },
    },

    {
      headerName: 'HAP ID',
      field: 'HAP ID',
      width: 150,
    },
    {
      headerName: 'Manager',
      field: 'manager',
      width: 150,
    },
    { headerName: 'First', field: 'firstName', width: 150 },
    { headerName: 'Last ', field: 'lastName', width: 150 },
    {
      headerName: 'email',
      field: 'email',
      width: 150,
    },

    {
      headerName: 'Last Action',
      field: 'lastAction',
      width: 150,
    },

    {
      headerName: 'AMI',
      field: 'ami',
      width: 150,
    },
    {
      headerName: 'unEmp90',
      field: 'unEmp90',
      width: 150,
    },
    {
      headerName: 'BIPOC',
      field: 'poc',
      width: 150,
    },
    {
      headerName: 'Amount',
      field: 'amountRequested',
      width: 150,
    },
    {
      headerName: 'Address',
      field: 'address',
      width: 150,
    },
    {
      headerName: 'City',
      field: 'cityName',
      width: 150,
    },
    {
      headerName: 'LN',
      field: 'landlordName',
      width: 200,
    },
    {
      headerName: 'Request Status',
      field: 'requestStatus',
      width: 200,

      lookup: {
        received: 'Received',
        inReview: 'In Review',
        documentsNeeded: 'documentsNeeded',
        verifyingDocuments: 'verifyingDocuments',
        notResponding: 'Not Responding',
        readyForReview: 'Ready For Review',
        approved: 'Approved',
        denied: 'Denied',
      },
    },

    { headerName: 'date', field: 'requestDate', type: 'date', width: 150 },
  ]);

  const fetchIncompleteRequests = async () => {
    setIsFetching(true);
    try {
      let requests = await axiosWithAuth()
        .get('/requests/table', {
          params: {
            incomplete: true,
          },
        })
        .then(res => res.data);

      requests = requests.map(request => {
        request['isSubscribed'] = request.id in subscriptions;
        request['HAP ID'] = createHAPid(request.id);
        request['ami'] = calculateAmi(
          request.monthlyIncome,
          request.familySize
        );
        request['poc'] = doesHouseholdContainPoc(request);

        return request;
      });

      let sortedRequests = sortRequests(requests);

      setData(sortedRequests);
    } catch (error) {
      console.error(error.response);
      alert('error');
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchIncompleteRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.container}>
      <h2>Incomplete Requests</h2>

      <XGrid
        style={{ height: 700 }}
        rows={data}
        columns={columns}
        loading={isFetching}
        components={{
          Toolbar: ExportCsv,
        }}
      />
    </div>
  );
}

const formatSubscriptions = subscriptions => {
  let result = {};

  if (subscriptions) {
    subscriptions.forEach(sub => {
      result[sub.requestId] = true;
    });
  }

  return result;
};
