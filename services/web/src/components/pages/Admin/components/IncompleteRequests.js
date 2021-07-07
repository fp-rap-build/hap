import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { useHistory } from 'react-router-dom';

import MaterialTable from '@material-table/core';

import { ExportCsv, ExportPdf } from '@material-table/exporters';

import styles from '../../../../styles/pages/admin.module.css';

import { tableIcons } from '../../../../utils/tableIcons';
import { axiosWithAuth } from '../../../../api/axiosWithAuth';

import CheckSquareFilled from '@material-ui/icons/CheckBoxOutlined';
import GavelIcon from '@material-ui/icons/Gavel';
import MailIcon from '@material-ui/icons/Mail';
import UnsubscribeIcon from '@material-ui/icons/Unsubscribe';
import ArchiveIcon from '@material-ui/icons/Archive';
import UnarchiveIcon from '@material-ui/icons/Unarchive';

import { message, Modal } from 'antd';

import {
  deleteSubscription,
  addSubscription,
} from '../../../../redux/users/userActions';

import socket from '../../../../config/socket';
import calculateAmi from '../../../../utils/general/calculateAmi';
import sortRequests from '../utils/sortRequests';
import doesHouseholdContainPoc from '../../../../utils/general/doesHouseholdContainPoc';

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
      title: 'HAP ID',
      field: 'id',
    },
    { title: 'First', field: 'firstName' },
    { title: 'Last ', field: 'lastName' },
    {
      title: 'email',
      field: 'email',
    },
    {
      title: 'AMI',
      field: 'ami',
    },
    {
      title: 'unEmp90',
      field: 'unEmp90',
    },
    {
      title: 'BIPOC',
      field: 'poc',
    },
    {
      title: 'Amount',
      field: 'amountRequested',
    },
    {
      title: 'Address',
      field: 'address',
    },
    {
      title: 'City',
      field: 'cityName',
    },
    {
      title: 'LN',
      field: 'landlordName',
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

      requests = requests.map(request => {
        request['isSubscribed'] = request.id in subscriptions;
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
      <MaterialTable
        style={{ width: '100%' }}
        isLoading={isFetching}
        options={{
          pageSize: 10,
          pageSizeOptions: [5, 10, 20, 30, 50, 75, 100, 1000],
          // Allows users to export the data as a CSV file
          exportMenu: [
            {
              label: 'Export PDF',
              exportFunc: (cols, datas) => ExportPdf(cols, datas, 'incomplete'),
            },
            {
              label: 'Export CSV',
              exportFunc: (cols, datas) => ExportCsv(cols, datas, 'incomplete'),
            },
          ],
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
            icon: GavelIcon,
            tooltip: 'Review',
            onClick: async (event, rowData) => {
              // Update the users request to be in review

              history.push(`/requests/${rowData.id}`);
            },
          },

          rowData =>
            rowData.isSubscribed
              ? {
                  icon: UnsubscribeIcon,
                  tooltip: 'Unsubscribe',
                  onClick: () => {
                    Modal.confirm({
                      title:
                        'Are you sure you want to unsubscribe from this request?',
                      content: 'You will stop receiving notifications',
                      onOk: () => {
                        setData(prevState =>
                          prevState.filter(request => {
                            if (request.id === rowData.id) {
                              request['isSubscribed'] = false;
                            }

                            return request;
                          })
                        );

                        let subscription = currentUser.subscriptions.find(
                          sub => sub.requestId === rowData.id
                        );

                        axiosWithAuth()
                          .delete(`/subscriptions/${subscription.id}`)
                          .then(res => console.log(res.data))
                          .catch(err =>
                            message.error('Unable to unsubscribe from request')
                          );

                        socket.emit('leaveRequest', rowData.id);
                        dispatch(deleteSubscription(subscription.id));
                      },
                    });
                  },
                }
              : {
                  icon: MailIcon,
                  tooltip: 'Subscribe',
                  onClick: (event, rowData) => {
                    subscribeToRequest(rowData.id, setData, dispatch);
                  },
                },
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

const subscribeToRequest = async (requestId, setData, dispatch) => {
  try {
    // Update table
    setData(prevState =>
      prevState.map(request => {
        if (requestId === request.id) {
          request['isSubscribed'] = true;
        }
        return request;
      })
    );

    // Persist new subscription
    let subscription = await axiosWithAuth()
      .post('/subscriptions', { requestId })
      .then(res => res.data.subscription);

    // Join request to receive notifications
    socket.emit('joinRequest', requestId);

    // Lastly, update current users state
    dispatch(addSubscription(subscription));
  } catch (error) {
    console.log(error.response);
    message.error('Unable to subscribe to request');
  }
};

const formatSubscriptions = subscriptions => {
  let result = {};

  subscriptions.forEach(sub => {
    result[sub.requestId] = true;
  });

  return result;
};
