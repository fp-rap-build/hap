import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { useHistory } from 'react-router-dom';

import { axiosWithAuth } from '../../../../api/axiosWithAuth';

import sortRequests from '../utils/sortRequests';
import doesHouseholdContainPoc from '../../../../utils/general/doesHouseholdContainPoc';
import calculateAmi from '../../../../utils/general/calculateAmi';

import AttachmentViewer from './components/AttachmentViewer';

import StatusCircle from './components/Requests/StatusCircle';

import RenderDocumentStatusCell from './components/Requests/RenderDocumentStatusCell';

import UploadDocModal from '../../../common/DocumentUploaderModal';

import styles from '../../../../styles/pages/admin.module.css';

import EmailedLLCheckbox from './components/Requests/EmailedLLCheckbox';
import { formatDate } from '../../../../utils/dates/date';
import { formatUTC } from '../../../../utils/dates';

import ExportCsv from './components/ExportCsv';

import {
  Review,
  Archive,
  Delete,
  Subscribe,
  MarkIncomplete,
} from './components/Requests/Actions';

import { XGrid, GridRowsProp } from '@material-ui/x-grid';

export default function ManagedRequestsTable() {
  const history = useHistory();

  const currentUser = useSelector(state => state.user.currentUser);

  const subscriptions = formatSubscriptions(currentUser.subscriptions);

  const [isFetching, setIsFetching] = useState(false);

  const [data, setData] = useState([]);

  const [visible, setVisible] = useState(false);

  const [category, setSelectedCategory] = useState(false);

  const [request, setRequest] = useState({});

  const [docModalVisible, setDocModalVisible] = useState(false);

  const [documents, setDocuments] = useState({});

  const redirectToReview = id => history.push(`/requests/${id}`);

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

        request['lastAction'] = formatUTC(request.latestTenantActivity);

        request['other'] = [];

        request['rpaf'] = [];

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
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  };

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
      field: 'Archive',
      width: 50,
      renderCell: params => {
        return <Archive setRequests={setData} requestId={params.row.id} />;
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
      width: 150,
    },
    { title: 'First', field: 'firstName', width: 150 },
    { title: 'Last ', field: 'lastName', width: 150 },
    {
      title: 'email',
      field: 'email',
      width: 150,
    },
    {
      title: 'Applicant Activity',
      field: 'tenantDifference',
      width: 200,
      renderCell: rowData => {
        return (
          <RenderActivityCell timeDifference={rowData.row.tenantDifference} />
        );
      },
    },
    {
      title: 'FP Activity',
      field: 'staffDifference',
      width: 200,
      renderCell: rowData => {
        return (
          <RenderActivityCell timeDifference={rowData.row.staffDifference} />
        );
      },
    },
    {
      title: 'RES',
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
      title: 'INC',
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
      title: 'COV',
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
      title: 'ID',
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
      title: 'CHI',
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
      title: 'LEASE',
      field: 'lease',
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
      title: 'LLW9',
      field: 'landlordW9',
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
      title: 'LATE',
      field: 'lateNotice',
      renderCell: rowData => {
        return (
          <RenderDocumentStatusCell
            category="lateNotice"
            docs={rowData.row.lateNotice}
            openDocument={() =>
              openDocument(rowData.row.lateNotice, 'lateNotice', rowData.row)
            }
          />
        );
      },
    },

    {
      title: 'RPAF',
      field: 'rpaf',
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
      title: 'HI',
      field: 'housingInstability',
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
      title: 'EMLL',
      field: 'emailedLandlord',
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
      title: 'Last Action',
      field: 'lastAction',
      width: 150,
    },

    {
      title: 'AMI',
      field: 'ami',
      width: 150,
    },
    {
      title: 'unEmp90',
      field: 'unEmp90',
      width: 150,
    },
    {
      title: 'BIPOC',
      field: 'poc',
      width: 150,
    },
    {
      title: 'Amount',
      field: 'amountRequested',
      width: 150,
    },
    {
      title: 'Address',
      field: 'address',
      width: 150,
    },
    {
      title: 'City',
      field: 'cityName',
      width: 150,
    },
    {
      title: 'hello',
      field: 'hello',
      width: 150,
    },
    {
      title: 'LN',
      field: 'landlordName',
      width: 200,
    },
    {
      title: 'Request Status',
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

    { title: 'date', field: 'requestDate', type: 'date' },
  ]);

  useEffect(() => {
    fetchRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openDocument = (docs, category, currentRequest) => {
    setRequest(currentRequest);

    setSelectedCategory(category);

    setDocuments(docs);

    setVisible(true);
  };

  const rows = [
    { id: 1, col1: 'Hello', col2: 'World' },
    { id: 2, col1: 'XGrid', col2: 'is Awesome' },
    { id: 3, col1: 'Material-UI', col2: 'is Amazing' },
  ];

  return (
    <div>
      <div className={styles.container}>
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
          style={{ height: 700 }}
          rows={data}
          columns={columns}
          loading={isFetching}
          components={{
            Toolbar: ExportCsv,
          }}
        />
      </div>
    </div>
  );
}

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
