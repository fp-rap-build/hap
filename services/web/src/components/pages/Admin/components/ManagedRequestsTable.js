import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { useHistory } from 'react-router-dom';

import { axiosWithAuth } from '../../../../api/axiosWithAuth';

import calculateAmi from '../../../../utils/general/calculateAmi';
import doesHouseholdContainPoc from '../../../../utils/general/doesHouseholdContainPoc';
import sortRequests from '../utils/sortRequests';

import MaterialTable from '@material-table/core';

import { tableIcons } from '../../../../utils/tableIcons';
import GavelIcon from '@material-ui/icons/Gavel';
import MailIcon from '@material-ui/icons/Mail';
import UnsubscribeIcon from '@material-ui/icons/Unsubscribe';
import ArchiveIcon from '@material-ui/icons/Archive';
import WarningFilled from '@material-ui/icons/Warning';

import { Button } from 'antd';

export default function ManagedRequestsTable() {
  const history = useHistory();
  const dispatch = useDispatch();

  const currentUser = useSelector(state => state.user.currentUser);

  const subscriptions = formatSubscriptions(currentUser.subscriptions);

  const [isFetching, setIsFetching] = useState(false);

  const [data, setData] = useState([]);

  const fetchRequests = async () => {
    setIsFetching(true);
    try {
      let requests = await axiosWithAuth()
        .get(`/requests/table/${currentUser.id}`)
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

      console.log(requests);
      let sortedRequests = sortRequests(requests);
      console.log(sortedRequests);

      setData(sortedRequests);
    } catch (error) {
      console.error(error.response);
      alert('error');
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <div>
      <h1>Placeholder</h1>
      <Button onClick={fetchRequests}>Fetch Test</Button>
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

const StatusCircle = ({ color }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      height="30px"
      xmlns="http://www.w3.org/2000/svg"
      style={{ marginLeft: '10px' }}
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
  );
};
