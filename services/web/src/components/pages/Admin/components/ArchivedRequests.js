import React, { useState, useEffect } from 'react';

import styles from '../../../../styles/pages/admin.module.css';

import { axiosWithAuth } from '../../../../api/axiosWithAuth';

import createHAPid from '../../../../utils/general/displayHAPid';

import {
  Review,
  Delete,
  UnArchive,
  Organizations,
} from './components/Requests/Actions';

import { XGrid } from '@material-ui/x-grid';
import ExportCsv from './components/ExportCsv';

export default function RequestsTable() {
  const [isFetching, setIsFetching] = useState(false);

  const [data, setData] = useState([]);

  const [columns] = useState([
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

    //    {
    //      field: 'Delete',
    //      width: 50,
    //     renderCell: params => {
    //       return <Delete setRequests={setData} requestId={params.row.id} />;
    //   },
    //  },

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
      width: 300,
    },
    { headerName: 'First', field: 'firstName', width: 150 },
    { headerName: 'Last ', field: 'lastName', width: 150 },
    {
      headerName: 'email',
      field: 'email',
      width: 300,
    },

    {
      headerName: 'Request Status',
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

    { headerName: 'date', field: 'requestDate', type: 'date', width: 300 },
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

      // create HAP ID from the request ID
      requests = requests.map(request => {
        request['HAP ID'] = createHAPid(request.id);

        return request;
      });

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
      <h2>Archived Requests</h2>
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
