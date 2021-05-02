import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

import { useHistory } from 'react-router-dom';

import MaterialTable from '@material-table/core';

import styles from '../../../../styles/pages/admin.module.css';

import { tableIcons } from '../../../../utils/tableIcons';
import { axiosWithAuth } from '../../../../api/axiosWithAuth';

import GavelIcon from '@material-ui/icons/Gavel';
import MailIcon from '@material-ui/icons/Mail';

import { message, Modal } from 'antd';

export default function RequestsTable() {
  const history = useHistory();
  const currentUser = useSelector(state => state.user.currentUser);
  // const [isOpen, setIsOpen] = useState(false);
  // const [requestBeingReviewed, setRequestBeingReviewed] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const [state, setState] = useState({
    columns: [
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
          approved: 'Approved',
          denied: 'Denied',
        },
      },
      { title: 'date', field: 'requestDate', type: 'date' },
    ],
    data: [],
  });

  const fetchUsers = async () => {
    setIsFetching(true);
    try {
      let res = await axiosWithAuth().get('/requests/table');
      setState({ ...state, data: res.data });
    } catch (error) {
      console.error(error.response);
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
                  setState({
                    ...state,
                    data: state.data.filter(row => row.id !== oldData.id),
                  });
                })
                .catch(err => message.error('Unable to delete request'))
                .finally(() => resolve());
            }),
        }}
        actions={[
          {
            icon: GavelIcon,
            tooltip: 'Review',
            onClick: async (event, rowData) => {
              // Update the users request to be in review

              history.push(`/requests/${rowData.id}`);
            },
          },
          {
            icon: MailIcon,
            tooltip: 'Subscribe',
            onClick: async (event, rowData) => {
              // Update the users request to be in review
              subscribeToRequest(rowData.id);
            },
          },
        ]}
        icons={tableIcons}
        title="Requests for Rental Assistance"
        columns={state.columns}
        data={state.data}
      />
    </div>
  );
}

const subscribeToRequest = async requestId => {
  try {
    await axiosWithAuth().post('/subscriptions', { requestId });
    message.success('successfully subscribed to request');
  } catch (error) {
    message.error('Unable to subscribe to request');
  }
};
