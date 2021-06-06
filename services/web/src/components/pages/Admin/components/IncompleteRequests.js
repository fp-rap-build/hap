import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { useHistory } from 'react-router-dom';

import MaterialTable from '@material-table/core';

import styles from '../../../../styles/pages/admin.module.css';

import { tableIcons } from '../../../../utils/tableIcons';
import { axiosWithAuth } from '../../../../api/axiosWithAuth';

import CheckSquareFilled from '@material-ui/icons/CheckBoxOutlined';
import UnarchiveIcon from '@material-ui/icons/Unarchive';

import { message, Modal } from 'antd';

export default function RequestsTable() {
  const history = useHistory();
  const dispatch = useDispatch();

  const currentUser = useSelector(state => state.user.currentUser);

  // const [isOpen, setIsOpen] = useState(false);
  // const [requestBeingReviewed, setRequestBeingReviewed] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([
    { title: 'First', field: 'firstName' },
    { title: 'Last ', field: 'lastName' },
    {
      title: 'email',
      field: 'email',
    },
    {
      title: 'Request Status',
      field: 'requestStatus',
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
    { title: 'date', field: 'requestDate', type: 'date' },
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

      setData(requests);
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
      <MaterialTable
        style={{ width: '100%' }}
        isLoading={isFetching}
        options={{
          // Allows users to export the data as a CSV file
          exportButton: true,
        }}
        editable={{
          isDeleteHidden: () => currentUser.role !== 'admin',
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              axiosWithAuth()
                .delete(`/requests/${oldData.id}`)
                .then(() => {
                  setData(data.filter(row => row.id !== oldData.id));
                })
                .catch(err => message.error('Unable to delete request'))
                .finally(() => resolve());
            }),
        }}
        actions={[
          {
            icon: CheckSquareFilled,
            tooltip: 'Mark Complete',
            onClick: async (event, rowData) => {
              // Update the users request to be in review

              try {
                setData(requests =>
                  requests.filter(request => {
                    if (request.id !== rowData.id) return request;
                  })
                );

                await axiosWithAuth().put(`/requests/${rowData.id}`, {
                  incomplete: false,
                });

                message.success('Successfully marked request as complete');
              } catch (error) {
                message.error('Unable to mark request as complete');
              }
            },
          },
        ]}
        icons={tableIcons}
        title="Incomplete Requests"
        columns={columns}
        data={data}
      />
    </div>
  );
}
