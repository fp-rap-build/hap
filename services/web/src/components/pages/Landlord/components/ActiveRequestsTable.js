import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { useHistory } from 'react-router-dom';

import MaterialTable from '@material-table/core';

import { ExportCsv, ExportPdf } from '@material-table/exporters';

import { tableIcons } from '../../../../utils/tableIcons';
import { axiosWithAuth } from '../../../../api/axiosWithAuth';

import GavelIcon from '@material-ui/icons/Gavel';
import MailIcon from '@material-ui/icons/Mail';
import UnsubscribeIcon from '@material-ui/icons/Unsubscribe';
import ArchiveIcon from '@material-ui/icons/Archive';
import WarningFilled from '@material-ui/icons/Warning';

import { message, Modal } from 'antd';

export default function ActiveRequestsTable() {
  const history = useHistory();

  const dispatch = useDispatch();

  const currentUser = useSelector(state => state.user.currentUser);

  const requests = useSelector(state => state.requests.requests);
  //Update Requests for activity and manager info
  const tableData = modifyRequests(requests);

  const columns = [
    { title: 'First Name', field: 'firstName' },
    { title: 'Last Name', field: 'lastName' },
    { title: 'Address', field: 'address' },
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
  ];

  return (
    <div>
      <MaterialTable
        style={{ width: '100%' }}
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
        actions={[
          {
            icon: GavelIcon,
            tooltip: 'Review',
            onClick: async (event, rowData) => {
              // Update the users request to be in review

              history.push(`/requests/${rowData.id}`);
            },
          },
        ]}
        icons={tableIcons}
        title="Your Tenants Active Requests"
        columns={columns}
        data={tableData}
      />
    </div>
  );
}

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
