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

import Container from './components/Requests/Actions/Container';

import AppsIcon from '@material-ui/icons/Apps';

import { XGrid } from '@material-ui/x-grid';
import ExportCsv from './components/ExportCsv';

export default function Organizations() {
  const history = useHistory();
  const [isFetching, setIsFetching] = useState(false);
  const [state, setState] = useState({
    columns: [
      {
        title: 'Programs',
        field: 'programs',
        renderCell: params => (
          <RedirectToPrograms orgId={params.row.id} history={history} />
        ),
      },
      { title: 'Organization', field: 'organization', flex: 1 },
      { title: 'Date', field: 'createdAt', type: Date, flex: 0.7 },
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
    <XGrid
      style={{ height: 700 }}
      rows={state.data}
      columns={state.columns}
      loading={isFetching}
    />
  );
}

const RedirectToPrograms = ({ orgId, history }) => {
  return (
    <Container onClick={() => history.push(`/organizations/${orgId}/programs`)}>
      <AppsIcon />
    </Container>
  );
};
