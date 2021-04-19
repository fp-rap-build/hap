import React, { useState, useEffect } from 'react';

import { useHistory } from 'react-router-dom';

import MaterialTable from '@material-table/core';

import { tableIcons } from '../../../../utils/tableIcons';
import { axiosWithAuth } from '../../../../api/axiosWithAuth';
import { message } from 'antd';

import {
  FolderOpenOutlined,
  UserAddOutlined,
  UserOutlined,
  DownOutlined,
  LineChartOutlined,
} from '@ant-design/icons';

import AppsIcon from '@material-ui/icons/Apps';

import axios from 'axios';

export default function Organizations() {
  const history = useHistory();
  const [isFetching, setIsFetching] = useState(false);
  const [state, setState] = useState({
    columns: [
      { title: 'Organization', field: 'organization' },
      { title: 'Date', field: 'createdAt', type: 'date' },
    ],
    data: [],
  });

  const fetchOrganizations = async () => {
    setIsFetching(true);
    try {
      let res = await axiosWithAuth().get('/orgs');

      console.log(res.data);
      setState({ ...state, data: res.data });
    } catch (error) {
      message.error('unable to fetch orgnanizations');
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchOrganizations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const redirectToPrograms = orgId =>
    history.push(`/organizations/${orgId}/programs`);

  return (
    <>
      <MaterialTable
        isLoading={isFetching}
        editable={{
          // Disable deleting and editing if the user is an Admin

          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              axiosWithAuth()
                .post('/orgs', newData)
                .then(res => {
                  setState({
                    ...state,
                    data: [...state.data, res.data.organization],
                  });
                })
                .catch(err => message.error('unable to create organization'))
                .finally(() => resolve());
            }),

          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              axiosWithAuth()
                .put(`/orgs/${oldData.id}`, newData)
                .then(res => {
                  const dataUpdate = [...state.data];
                  const index = oldData.tableData.id;
                  dataUpdate[index] = newData;
                  setState({ ...state, data: [...dataUpdate] });
                })
                .catch(err => {
                  message.error('unable to update organization');
                })
                .finally(() => {
                  resolve();
                });
            }),
        }}
        actions={[
          {
            icon: LineChartOutlined,
            tooltip: 'Analytics',
            onClick: async (event, rowData) => {
              // Update the users request to be in review
            },
          },
          {
            icon: AppsIcon,
            tooltip: 'Programs',
            onClick: async (event, rowData) => {
              const { id } = rowData;
              redirectToPrograms(id);
            },
          },
        ]}
        icons={tableIcons}
        title="Organizations"
        columns={state.columns}
        data={state.data}
      />
    </>
  );
}
