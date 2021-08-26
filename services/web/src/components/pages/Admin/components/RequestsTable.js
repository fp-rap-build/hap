import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { useHistory } from 'react-router-dom';

import { axiosWithAuth } from '../../../../api/axiosWithAuth';

import { message, Tooltip } from 'antd';

import calculateAmi from '../../../../utils/general/calculateAmi';

import styles from '../../../../styles/pages/admin.module.css';
import sortRequests from '../utils/sortRequests';
import doesHouseholdContainPoc from '../../../../utils/general/doesHouseholdContainPoc';
import createHAPid from '../../../../utils/general/displayHAPid';

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
      headerName: 'HAP ID',
      field: 'id',
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
      width: 250,
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

    {
      headerName: 'date',
      field: 'requestDate',
      type: 'date',
      width: 200,
      renderCell: params => {
        return <p>{new Date(params.row.requestDate).toLocaleDateString()} </p>;
      },
    },
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

        request['HAP ID'] = createHAPid(request.id);

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
      <h2>Requests</h2>

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
