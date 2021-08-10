import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { useHistory } from 'react-router-dom';

import styles from '../../../../styles/pages/admin.module.css';

import { axiosWithAuth } from '../../../../api/axiosWithAuth';

import {
  Review,
  Archive,
  Delete,
  Subscribe,
  MarkIncomplete,
  UnArchive,
} from './components/Requests/Actions';

import { XGrid } from '@material-ui/x-grid';

export default function RequestsTable() {
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
      field: 'Archive',
      width: 50,
      renderCell: params => {
        return <UnArchive setRequests={setData} requestId={params.row.id} />;
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
      title: 'HAP ID',
      field: 'id',
    },
    {
      title: 'Manager',
      field: 'manager',
      width: 300,
    },
    { title: 'First', field: 'firstName', width: 150 },
    { title: 'Last ', field: 'lastName', width: 150 },
    {
      title: 'email',
      field: 'email',
      width: 300,
    },
    {
      title: 'Request Status',
      field: 'requestStatus',
      width: 300,

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

    { title: 'date', field: 'requestDate', type: 'date', width: 300 },
  ]);

  const fetchArchivedRequests = async () => {
    setIsFetching(true);
    try {
      let requests = await axiosWithAuth()
        .get('/requests/table', {
          params: {
            archived: true,
          },
        })
        .then(res => res.data);

      setData(requests);
    } catch (error) {
      console.error(error.response);
      alert('error');
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchArchivedRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.container}>
      <XGrid
        style={{ height: 700 }}
        rows={data}
        columns={columns}
        loading={isFetching}
      />
    </div>
  );
}
