import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { useHistory } from 'react-router-dom';

import socket from '../../../../config/socket';

import { axiosWithAuth } from '../../../../api/axiosWithAuth';

import {
  addSubscription,
  deleteSubscription,
} from '../../../../redux/users/userActions';

import sortRequests from '../utils/sortRequests';
import doesHouseholdContainPoc from '../../../../utils/general/doesHouseholdContainPoc';
import calculateAmi from '../../../../utils/general/calculateAmi';

import MaterialTable from '@material-table/core';

import { ExportCsv, ExportPdf } from '@material-table/exporters';

import { tableIcons } from '../../../../utils/tableIcons';

import GavelIcon from '@material-ui/icons/Gavel';
import MailIcon from '@material-ui/icons/Mail';
import UnsubscribeIcon from '@material-ui/icons/Unsubscribe';
import ArchiveIcon from '@material-ui/icons/Archive';
import WarningFilled from '@material-ui/icons/Warning';

import { message, Modal, Tooltip } from 'antd';

import AttachmentViewer from './components/AttachmentViewer';

import StatusCircle from './components/Requests/StatusCircle';

import RenderDocumentStatusCell from './components/Requests/RenderDocumentStatusCell';

import UploadDocModal from '../../../common/DocumentUploaderModal';

import styles from '../../../../styles/pages/admin.module.css';

export default function ManagedRequestsTable() {
  const history = useHistory();
  const dispatch = useDispatch();

  const currentUser = useSelector(state => state.user.currentUser);

  const subscriptions = formatSubscriptions(currentUser.subscriptions);

  const [isFetching, setIsFetching] = useState(false);

  const [data, setData] = useState([]);

  const [visible, setVisible] = useState(false);

  const [category, setSelectedCategory] = useState(false);

  const [request, setRequest] = useState({});

  const [docModalVisible, setDocModalVisible] = useState(false);

  const [documents, setDocuments] = useState({});

  const fetchRequests = async () => {
    setIsFetching(true);
    try {
      let requests = await axiosWithAuth()
        .get('/requests/table', {
          params: {
            archived: false,
            managerId: currentUser.id,
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

        request['manager'] = request['managerFirstName']
          ? request['managerFirstName'] + ' ' + request['managerLastName']
          : 'Nobody';

        request['tenantDifference'] =
          (new Date() - new Date(request.latestTenantActivity)) / 3600000;

        request['staffDifference'] =
          (new Date() - new Date(request.latestStaffActivity)) / 3600000;

        request['other'] = [];

        request['income'] = [];

        request['residency'] = [];

        request['housingInstability'] = [];

        request['covid'] = [];

        request['childrenOrPregnancy'] = [];

        request['identity'] = [];

        request['documents'].forEach(doc => {
          if (doc.category) {
            request[doc.category].unshift(doc);
          }
        });

        return request;
      });

      let sortedRequests = sortRequests(requests);

      setData(sortedRequests);
    } catch (error) {
      alert('error fetching requests');
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  };

  const [columns, setColumns] = useState([
    {
      title: 'HAP ID',
      field: 'id',
    },
    {
      title: 'Manager',
      field: 'manager',
    },
    { title: 'First', field: 'firstName' },
    { title: 'Last ', field: 'lastName' },
    {
      title: 'email',
      field: 'email',
    },
    {
      title: 'Applicant Activity',
      field: 'tenantDifference',
      render: rowData => {
        return <RenderActivityCell timeDifference={rowData.tenantDifference} />;
      },
    },
    {
      title: 'FP Activity',
      field: 'staffDifference',
      render: rowData => {
        return <RenderActivityCell timeDifference={rowData.staffDifference} />;
      },
    },
    {
      title: 'RES',
      field: 'residency',
      render: rowData => {
        return (
          <RenderDocumentStatusCell
            docs={rowData.residency}
            openDocument={() =>
              openDocument(rowData.residency, 'residency', rowData)
            }
          />
        );
      },
    },
    {
      title: 'INC',
      field: 'income',
      render: rowData => {
        return (
          <RenderDocumentStatusCell
            category="income"
            docs={rowData.income}
            openDocument={() => openDocument(rowData.income, 'income', rowData)}
          />
        );
      },
    },

    {
      title: 'COV',
      field: 'covid',
      render: rowData => {
        return (
          <RenderDocumentStatusCell
            category="covid"
            docs={rowData.covid}
            openDocument={() => openDocument(rowData.covid, 'covid', rowData)}
          />
        );
      },
    },

    {
      title: 'CHI',
      field: 'childrenOrPregnancy',
      render: rowData => {
        return (
          <RenderDocumentStatusCell
            category="childrenOrPregnancy"
            docs={rowData.childrenOrPregnancy}
            openDocument={() =>
              openDocument(
                rowData.childrenOrPregnancy,
                'childrenOrPregnancy',
                rowData
              )
            }
          />
        );
      },
    },

    {
      title: 'HI',
      field: 'housingInstability',
      render: rowData => {
        return (
          <RenderDocumentStatusCell
            category="housingInstability"
            docs={rowData.housingInstability}
            openDocument={() =>
              openDocument(
                rowData.housingInstability,
                'housingInstability',
                rowData
              )
            }
          />
        );
      },
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

  useEffect(() => {
    fetchRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openDocument = (docs, category, currentRequest) => {
    let noDocumentsSubmitted = docs.length === 0;

    setRequest(currentRequest);
    setSelectedCategory(category);

    if (noDocumentsSubmitted) {
      setDocModalVisible(true);
    } else {
      setDocuments(docs);

      setVisible(true);
    }
  };

  return (
    <div>
      <div className={styles.container}>
        <UploadDocModal
          isOpen={docModalVisible}
          setIsOpen={setDocModalVisible}
          category={category}
          request={request}
          setRequests={setData}
        />
        <AttachmentViewer
          visible={visible}
          setVisible={setVisible}
          documents={documents}
          setDocuments={documents}
          setRequests={setData}
          requests={data}
        />
        <MaterialTable
          style={{ width: '100%' }}
          isLoading={isFetching}
          options={{
            pageSize: 10,
            pageSizeOptions: [5, 10, 20, 30, 50, 75, 100, 500, 1000],

            // Allows users to export the data as a CSV file
            exportMenu: [
              {
                label: 'Export PDF',
                exportFunc: (cols, datas) => ExportPdf(cols, datas, 'requests'),
              },
              {
                label: 'Export CSV',
                exportFunc: (cols, datas) => ExportCsv(cols, datas, 'requests'),
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
                              message.error(
                                'Unable to unsubscribe from request'
                              )
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
              icon: ArchiveIcon,
              tooltip: 'Archive',
              onClick: async (event, rowData) => {
                // Update the users request to be in review

                try {
                  setData(requests =>
                    requests.filter(request => {
                      if (request.id !== rowData.id) return request;
                    })
                  );

                  await axiosWithAuth().put(`/requests/${rowData.id}`, {
                    archived: true,
                  });

                  message.success('Successfully archived request');
                } catch (error) {
                  message.error('Unable to archive request');
                }
              },
            },

            {
              icon: WarningFilled,
              tooltip: 'Mark Incomplete',
              onClick: async (event, rowData) => {
                // Update the users request to be in review
                try {
                  setData(requests =>
                    requests.filter(request => {
                      if (request.id !== rowData.id) return request;
                    })
                  );

                  await axiosWithAuth().put(`/requests/${rowData.id}`, {
                    incomplete: true,
                  });

                  message.success('Successfully marked request incomplete');
                } catch (error) {
                  message.error('Unable to mark request as incomplete');
                }
              },
            },
          ]}
          icons={tableIcons}
          title="Your Managed Requests for Rental Assistance"
          columns={columns}
          data={data}
        />
      </div>
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

const RenderActivityCell = ({ timeDifference }) => {
  //timeDifference is measured in hours
  if (!timeDifference) {
    return <StatusCircle color="#AAAAAA" />;
  } else if (timeDifference <= 24) {
    return <StatusCircle color="#B1EEC6" />;
  } else if (timeDifference <= 48) {
    return <StatusCircle color="#EDE988" />;
  } else {
    return <StatusCircle color="#F0B0AE" />;
  }
};
