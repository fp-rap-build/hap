import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { useHistory } from 'react-router-dom';

import { axiosWithAuth } from '../../../../api/axiosWithAuth';

import { message, Tooltip } from 'antd';

import calculateAmi from '../../../../utils/general/calculateAmi';

import styles from '../../../../styles/pages/admin.module.css';
import sortRequests from '../utils/sortRequests';
import doesHouseholdContainPoc from '../../../../utils/general/doesHouseholdContainPoc';

import {
  Review,
  Archive,
  Delete,
  Subscribe,
  MarkIncomplete,
} from './components/Requests/Actions';

import { XGrid } from '@material-ui/x-grid';
import ExportCsv from './components/ExportCsv';

export default function RequestsTable() {
  const history = useHistory();
  const dispatch = useDispatch();

  const currentUser = useSelector(state => state.user.currentUser);

  const subscriptions = formatSubscriptions(currentUser.subscriptions);

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
          <MarkIncomplete
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

  const fetchRequests = async () => {
    setIsFetching(true);
    try {
      let requests = await axiosWithAuth()
        .get('/requests/table', {
          params: {
            archived: false,
            incomplete: false,
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

        return request;
      });

      let sortedRequests = sortRequests(requests);

      setData(sortedRequests);
    } catch (error) {
      console.error(error);
      alert('error');
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.container}>
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

const StatusCircle = ({ color, tooltip, clickable, onClick }) => {
  return (
    <Tooltip title={tooltip}>
      <svg
        onClick={onClick}
        viewBox="0 0 100 100"
        height="30px"
        xmlns="http://www.w3.org/2000/svg"
        style={{ marginLeft: '10px', cursor: clickable ? 'pointer' : '' }}
      >
        <circle
          cx="50"
          cy="50"
          r="48"
          fill={color}
          stroke="grey"
          strokeWidth="4"
        />
        {/* colors: #B1EEC6 #EDE988 #F0B0AE */}
      </svg>
    </Tooltip>
  );
};
