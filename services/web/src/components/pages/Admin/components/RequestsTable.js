import { useState, useEffect } from 'react';

import { message } from 'antd';

import { useSelector } from 'react-redux';

import { useHistory } from 'react-router-dom';

import { axiosWithAuth } from '../../../../api/axiosWithAuth';

import sortRequests from '../utils/sortRequests';
// Helper function that pulls in requests then rearranges them to meet
// prioritization standards (lowest AMI, then 90+ days unemployed, then BIPOC)

import doesHouseholdContainPoc from '../../../../utils/general/doesHouseholdContainPoc';
// Helper function that returns true or false depending on whether the request's household contains a poc

import calculateAmi from '../../../../utils/general/calculateAmi';
// Helper function to pull family size and monthly income from current
// request to calculate and display the ami (Average Median Income)
// AMI is used later to generate a new column on payments table
// that indicates which AMI range the household is in

import createHAPid from '../../../../utils/general/displayHAPid';
// helper function to insert "HAP" before every request id prior to
// displaying it in the table

import AttachmentViewer from './components/AttachmentViewer';

import StatusCircle from './components/Requests/StatusCircle';

import RenderDocumentStatusCell from './components/Requests/RenderDocumentStatusCell';

import styles from '../../../../styles/pages/admin.module.css';

import EmailedLLCheckbox from './components/Requests/EmailedLLCheckbox';

import { formatUTC } from '../../../../utils/dates';

import {
  Review,
  Archive,
  UnArchive,
  Delete,
  Subscribe,
  MarkIncomplete,
  Organizations,
} from './components/Requests/Actions';

import {
  XGrid,
  GridToolbar,
  getGridNumericColumnOperators,
  getGridStringOperators,
  GridFilterForm,
} from '@material-ui/x-grid';

import {
  updateTableWithConfig,
  onColumnVisibilityChange,
  onFilterModelChange,
  updateFilters,
} from './components/Requests/PersistTableSettings';
import addCustomOperators from './components/Requests/addCustomOperators';

export default function ManagedRequestsTable() {
  const currentUser = useSelector(state => state.user.currentUser);

  const subscriptions = formatSubscriptions(currentUser.subscriptions);

  const [isFetching, setIsFetching] = useState(false);

  const [data, setData] = useState([]);

  const [filterModel, setFilterModel] = useState({ items: [] });

  const [visible, setVisible] = useState(false);

  const [category, setSelectedCategory] = useState(false);

  const [request, setRequest] = useState({});

  const [documents, setDocuments] = useState({});

  const editRequest = async row => {
    const { id, field, value } = row;

    const payload = {};

    payload[field] = value;

    try {
      await axiosWithAuth().put(`/requests/${id}`, payload);
    } catch (error) {
      message.error(
        'Unable to update the request, please wait a moment and then try again.'
      );
    }
  };

  const fetchRequests = async () => {
    setIsFetching(true);
    try {
      let requests = await axiosWithAuth()
        .get('/requests/table', {
          params: {},
        })
        .then(res => res.data);

      requests = requests.map(request => {
        request['isSubscribed'] = request.id in subscriptions;
        request['ami'] = calculateAmi(
          request.monthlyIncome,
          request.familySize
        );

        request['poc'] = doesHouseholdContainPoc(request);

        request['archived'] = request.archived ? 'Yes' : 'No';

        request['incomplete'] = request.incomplete ? 'No' : 'Yes';

        request['HAP ID'] = createHAPid(request.id);

        request['manager'] = request['managerFirstName']
          ? request['managerFirstName'] + ' ' + request['managerLastName']
          : 'Nobody';

        request['tenantDifference'] =
          (new Date() - new Date(request.latestTenantActivity)) / 3600000;

        request['staffDifference'] =
          (new Date() - new Date(request.latestStaffActivity)) / 3600000;

        request['lastAction'] = formatUTC(request.latestTenantActivity);

        request['other'] = [];

        request['rpaf'] = [];

        request['upaf'] = [];

        request['identity'] = [];

        request['lease'] = [];

        request['lateNotice'] = [];

        request['landlordW9'] = [];

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
    } finally {
      setIsFetching(false);
    }
  };

  const [columns, setColumns] = useState([
    {
      field: 'Review',
      description: 'Review',
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
      field: 'Archive',
      width: 50,
      renderCell: params => {
        return <Archive setRequests={setData} requestId={params.row.id} />;
      },
    },

    {
      field: 'Un-Archive',
      width: 50,
      renderCell: params => {
        return <UnArchive setRequests={setData} requestId={params.row.id} />;
      },
    },

    {
      field: 'MarkIncomplete',
      width: 50,
      renderCell: params => {
        return (
          <MarkIncomplete setRequests={setData} requestId={params.row.id} />
        );
      },
    },

    //{
    //    field: 'Delete',
    //    width: 50,
    //    renderCell: params => {
    //      return <Delete setRequests={setData} requestId={params.row.id} />;
    //    },
    //  },
    {
      field: 'Organization',
      width: 200,
      renderCell: params => {
        return <Organizations request={params.row} />;
      },
    },
    {
      headerName: 'Archived',
      field: 'archived',
      width: 150,
    },
    {
      headerName: 'Complete',
      field: 'incomplete',
      width: 150,
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
      headerName: 'Email Address',
      field: 'email',
      width: 150,
    },
    {
      headerName: 'Applicant Activity',
      field: 'tenantDifference',
      width: 200,
      renderCell: rowData => {
        return (
          <RenderActivityCell timeDifference={rowData.row.tenantDifference} />
        );
      },
    },
    {
      headerName: 'FP Activity',
      field: 'staffDifference',
      width: 200,
      renderCell: rowData => {
        return (
          <RenderActivityCell timeDifference={rowData.row.staffDifference} />
        );
      },
    },
    {
      headerName: 'RES',
      field: 'residency',
      width: 150,
      renderCell: rowData => {
        return (
          <RenderDocumentStatusCell
            docs={rowData.row.residency}
            openDocument={() =>
              openDocument(rowData.row.residency, 'residency', rowData.row)
            }
          />
        );
      },
    },
    {
      headerName: 'INC',
      field: 'income',
      width: 150,
      renderCell: rowData => {
        return (
          <RenderDocumentStatusCell
            category="income"
            docs={rowData.row.income}
            openDocument={() =>
              openDocument(rowData.row.income, 'income', rowData.row)
            }
          />
        );
      },
    },

    {
      headerName: 'COV',
      field: 'covid',
      width: 150,
      renderCell: rowData => {
        return (
          <RenderDocumentStatusCell
            category="covid"
            docs={rowData.row.covid}
            openDocument={() =>
              openDocument(rowData.row.covid, 'covid', rowData.row)
            }
          />
        );
      },
    },

    {
      headerName: 'ID',
      field: 'identity',
      width: 150,
      renderCell: rowData => {
        return (
          <RenderDocumentStatusCell
            category="identity"
            docs={rowData.row.identity}
            openDocument={() =>
              openDocument(rowData.row.identity, 'identity', rowData.row)
            }
          />
        );
      },
    },

    {
      headerName: 'CHI',
      field: 'childrenOrPregnancy',
      width: 150,
      renderCell: rowData => {
        return (
          <RenderDocumentStatusCell
            category="childrenOrPregnancy"
            docs={rowData.row.childrenOrPregnancy}
            openDocument={() =>
              openDocument(
                rowData.row.childrenOrPregnancy,
                'childrenOrPregnancy',
                rowData.row
              )
            }
          />
        );
      },
    },

    {
      headerName: 'LEASE',
      field: 'lease',
      width: 150,
      renderCell: rowData => {
        return (
          <RenderDocumentStatusCell
            category="lease"
            docs={rowData.row.lease}
            openDocument={() =>
              openDocument(rowData.row.lease, 'lease', rowData.row)
            }
          />
        );
      },
    },

    {
      headerName: 'LLW9',
      field: 'landlordW9',
      width: 150,
      renderCell: rowData => {
        return (
          <RenderDocumentStatusCell
            category="landlordW9"
            docs={rowData.row.landlordW9}
            openDocument={() =>
              openDocument(rowData.row.landlordW9, 'landlordW9', rowData.row)
            }
          />
        );
      },
    },

    {
      headerName: 'RPAF',
      field: 'rpaf',
      width: 150,
      renderCell: rowData => {
        return (
          <RenderDocumentStatusCell
            category="rpaf"
            docs={rowData.row.rpaf}
            openDocument={() =>
              openDocument(rowData.row.rpaf, 'rpaf', rowData.row)
            }
          />
        );
      },
    },

    {
      headerName: 'UPAF',
      field: 'upaf',
      width: 150,
      renderCell: rowData => {
        return (
          <RenderDocumentStatusCell
            category="upaf"
            docs={rowData.row.upaf}
            openDocument={() =>
              openDocument(rowData.row.upaf, 'upaf', rowData.row)
            }
          />
        );
      },
    },

    {
      headerName: 'HI',
      field: 'housingInstability',
      width: 150,
      renderCell: rowData => {
        return (
          <RenderDocumentStatusCell
            category="housingInstability"
            docs={rowData.row.housingInstability}
            openDocument={() =>
              openDocument(
                rowData.row.housingInstability,
                'housingInstability',
                rowData.row
              )
            }
          />
        );
      },
    },

    {
      headerName: 'Other',
      field: 'other',
      width: 150,
      renderCell: rowData => {
        return (
          <RenderDocumentStatusCell
            category="other"
            docs={rowData.row.other}
            openDocument={() =>
              openDocument(rowData.row.other, 'other', rowData.row)
            }
          />
        );
      },
    },

    {
      headerName: 'EMLL',
      field: 'emailedLandlord',
      width: 150,
      renderCell: rowData => {
        return (
          <EmailedLLCheckbox
            emailedLandlord={rowData.row.emailedLandlord}
            requestId={rowData.row.id}
          />
        );
      },
    },

    {
      headerName: 'Notes',
      field: 'notes',
      width: 150,
      editable: true,
      textEditor: true,
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
      headerName: 'Unemployed 90+ Days?',
      field: 'unEmp90',
      width: 150,
    },
    {
      headerName: 'BIPOC',
      field: 'poc',
      width: 150,
    },
    {
      headerName: 'Amount Requested',
      description: 'Amount Requested',
      field: 'amountRequested',
      width: 150,
    },
    {
      headerName: 'Address',
      description: 'Address',
      field: 'address',
      width: 150,
    },
    {
      headerName: 'City',
      description: 'City',
      field: 'cityName',
      width: 150,
    },

    {
      headerName: 'LN',
      description: 'LN',
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
        documentsNeeded: 'Documents Needed',
        verifyingDocuments: 'Verifying Documents',
        notResponding: 'Not Responding',
        readyForReview: 'Ready For Review',
        approved: 'Approved',
        denied: 'Denied',
      },
    },

    {
      headerName: 'Date of Request',
      field: 'requestDate',
      type: 'date',
      width: 150,
    },
    {
      headerName: 'Date of last approval',
      field: 'createdAt',
      type: 'date',
      width: 150,
    },
    {
      headerName: 'Amount Approved',
      field: 'amountApproved',
      width: 150,
    },
  ]);

  useEffect(() => {
    fetchRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    updateTableWithConfig(setColumns, 'requestsTable');

    updateFilters(setFilterModel, 'requestsFilters');
  }, []);

  const openDocument = (docs, category, currentRequest) => {
    setRequest(currentRequest);

    setSelectedCategory(category);

    setDocuments(docs);

    setVisible(true);
  };

  useEffect(() => {
    addCustomOperators(setColumns);
  }, []);

  return (
    <div>
      <div className={styles.container}>
        <h2>Manage All Requests</h2>

        <AttachmentViewer
          visible={visible}
          setVisible={setVisible}
          documents={documents}
          setDocuments={setDocuments}
          setRequests={setData}
          requests={data}
          request={request}
          category={category}
        />

        <XGrid
          onColumnVisibilityChange={e =>
            onColumnVisibilityChange(e, 'requestsTable')
          }
          onColumnWidthChange={e =>
            onColumnVisibilityChange(e, 'requestsTable')
          }
          filterModel={filterModel}
          onFilterModelChange={e => {
            onFilterModelChange(e, setFilterModel, 'requestsFilters');
          }}
          style={{ height: 700 }}
          onCellEditCommit={request => editRequest(request)}
          rows={data}
          columns={columns}
          loading={isFetching}
          components={{
            Toolbar: GridToolbar,
          }}
        />
      </div>
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
