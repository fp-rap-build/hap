import { useState } from 'react';

import { useSelector } from 'react-redux';

import MaterialTable from '@material-table/core';

import { tableIcons } from '../../../../../../utils/tableIcons';

import { Typography, Table, Tag, Space, Form } from 'antd';

const { Title, Text } = Typography;

const Income = ({ props }) => {
  const initialIncomes = useSelector(state => state.requests.incomes);

  const [tableState, setTableState] = useState({
    columns: [
      { title: 'Name', field: 'name' },
      {
        title: 'Source of Income',
        field: 'sourceOfIncome',
        lookup: {
          wages: 'Wages',
          publicAssistance: '',
          pensionRetirement: '',
          unemploymentDissability: '',
          alimony: '',
        },
      },
      { title: 'Amount', field: 'amount' },
      {
        title: 'Pay Period',
        field: 'payPeriod',
        lookup: {
          weekly: 'Weekly',
          biweekly: 'Biweekly',
          monthly: 'Monthly',
        },
      },
    ],
    data: initialIncomes,
  });

  return (
    <div>
      <Title level={3}>Income Information</Title>
      <MaterialTable
        icons={tableIcons}
        title="Incomes"
        columns={tableState.columns}
        data={tableState.data}
      />
    </div>
  );
};
export default Income;
