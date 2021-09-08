import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { useHistory } from 'react-router-dom';

import MaterialTable from '@material-table/core';

import { XGrid } from '@material-ui/x-grid';

import { ExportCsv, ExportPdf } from '@material-table/exporters';

import { tableIcons } from '../../../../utils/tableIcons';

import Container from '../../../pages/Admin/components/components/Requests/Actions/Container';

import { FolderOpenOutlined } from '@ant-design/icons';

export default function ActiveRequestsTable() {
  const history = useHistory();

  const requests = useSelector(state => state.requests.requests);
  //Update Requests for activity and manager info
  const tableData = modifyRequests(requests);

  const columns = [
    {
      field: 'Click here to review',
      width: 240,
      renderCell: params => (
        <ReviewRequest requestId={params.row.id} history={history} />
      ),
    },
    { title: 'First Name', field: 'firstName', flex: 1 },
    { title: 'Last Name', field: 'lastName', flex: 1 },
    { title: 'Address', field: 'address', flex: 1 },
    {
      title: 'Submission Date',
      field: 'requestDate',
      flex: 1,
      renderCell: rowData => {
        const date = rowData.row.requestDate.split('T')[0];
        return <p>{date}</p>;
      },
    },
    { title: 'Status', field: 'requestStatus', flex: 1 },
  ];

  return (
    <div>
      <h2>
        These tenants were matched to you based on the email address they
        provided for you in their application.
      </h2>

      <XGrid style={{ height: 700 }} rows={tableData} columns={columns} />
    </div>
  );
}

const ReviewRequest = ({ requestId, history }) => {
  return (
    <Container onClick={() => history.push(`/landlord/request/${requestId}`)}>
      <FolderOpenOutlined />
    </Container>
  );
};

const modifyRequests = requests => {
  const res = requests.map(request => {
    request['manager'] = request['managerFirstName']
      ? request['managerFirstName'] + ' ' + request['managerLastName']
      : 'Nobody';

    request['tenantDifference'] =
      (new Date() - new Date(request.latestTenantActivity)) / 3600000;

    request['staffDifference'] =
      (new Date() - new Date(request.latestStaffActivity)) / 3600000;

    return request;
  });

  return res;
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
    </svg>
  );
};
