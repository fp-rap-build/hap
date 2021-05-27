import { useState } from 'react';

import { useSelector } from 'react-redux';

import MaterialTable from '@material-table/core';

import { tableIcons } from '../../../../../../utils/tableIcons';

import { Typography, Table, Tag, Space, Form } from 'antd';
import { resolve } from 'path';

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
          publicAssistance: 'Public Assistance',
          pensionRetirement: 'Pension/ Retirement',
          unemploymentDissability: 'Unemployment or Disability',
          alimony: 'Alimony/ Child Support',
        },
      },
      { title: 'Amount', field: 'amount', type: 'numeric' },
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
        editable={{
          isDeletable: rowData => rowData !== null,
          isEditable: rowData => rowData !== null,
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              resolve();
              // Set the state first to instantly update the table
              console.log(newData);
              setTableState({
                ...tableState,
                data: tableState.data.map(row => {
                  if (row.id === oldData.id) {
                    return newData;
                  }
                  return row;
                }),
              });
            }),
        }}
      />
    </div>
  );
};
export default Income;
